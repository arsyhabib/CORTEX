#!/usr/bin/env python3
"""
Batch Vision Processor — Dipanggil oleh SUB-AGENT
==================================================
Memproses 1 batch berisi ~40 halaman:
1. Baca manifest.json batch
2. Untuk tiap halaman:
   a. Jika teks langsung tersedia (>=50 chars) → pakai itu
   b. Jika tidak → panggil Gemini Vision untuk OCR
3. Tulis markdown per halaman + gabungan
"""
import json, os, sys, base64, time, requests
from pathlib import Path

# ─── Konfigurasi ─────────────────────────────────────────────────────
GOOGLE_API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
FEATHERLESS_KEY = os.environ.get("FEATHERLESS_VISION_KEY")
GEMINI_MODEL = "gemini-2.5-flash-image"
VISION_MODE = os.environ.get("VISION_MODE", "gemini")  # gemini | featherless | dual

# ─── Gemini Vision ───────────────────────────────────────────────────

def vision_gemini(image_path, page_context=""):
    """OCR halaman via Gemini 2.5 Flash Image."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GOOGLE_API_KEY}"

    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()

    prompt = f"""Anda adalah asisten medis yang mengekstrak konten dari halaman PDF modul pembelajaran kedokteran.
Halaman ini adalah halaman #{page_context}.

Tugas Anda:
1. Baca SELURUH teks yang terlihat di halaman ini (bahasa Indonesia)
2. Perhatikan: judul, subjudul, paragraf, label gambar, tabel, diagram, poin-poin
3. Output dalam format MARKDOWN yang terstruktur
4. Jika ada gambar/diagram medis: tulis [Gambar: deskripsi singkat]
5. Jika ada tabel: gunakan format markdown table
6. Jangan menyingkat atau meringkas — ekstrak SELENGKAPNYA
7. Pertahankan terminologi medis asli (anatomi, fisiologi, dll)

Output hanya markdown, tanpa penjelasan tambahan."""

    resp = requests.post(url, headers={"Content-Type": "application/json"}, json={
        "contents": [{"parts": [
            {"text": prompt},
            {"inline_data": {"mime_type": "image/png", "data": b64}}
        ]}],
        "generationConfig": {"maxOutputTokens": 4096, "temperature": 0.1}
    }, timeout=120)

    if resp.status_code == 200:
        text = resp.json()["candidates"][0]["content"]["parts"][0]["text"]
        return {"success": True, "text": text}
    else:
        return {"success": False, "error": f"HTTP {resp.status_code}: {resp.text[:200]}"}


def batch_process(batch_dir):
    """Process all pages in a batch."""
    manifest_file = f"{batch_dir}/manifest.json"
    with open(manifest_file) as f:
        manifest = json.load(f)

    batch_id = manifest["batch_id"]
    pages = manifest["pages"]
    total = len(pages)
    output_dir = f"{batch_dir}/output"
    os.makedirs(output_dir, exist_ok=True)

    results = []
    print(f"\n📦 Batch {batch_id}: Processing {total} pages...", flush=True)

    for i, page in enumerate(pages):
        page_num = page["page"]
        pdf_name = page["pdf"]
        has_text = page["has_text"]
        text_file = page["text_file"]
        image_file = page["image"]

        print(f"  📄 [{i+1}/{total}] {pdf_name} h. {page_num}...", end=" ", flush=True)

        page_result = {
            "page": page_num,
            "pdf": pdf_name,
            "method": None,
            "markdown": None,
        }

        # Priority 1: Teks langsung (jika cukup)
        if has_text and os.path.exists(text_file):
            with open(text_file) as f:
                text = f.read().strip()
            if len(text) >= 50:
                page_result["markdown"] = text
                page_result["method"] = "text_direct"
                print("📝 teks langsung", flush=True)
                results.append(page_result)
                continue

        # Priority 2: Gemini Vision
        if GOOGLE_API_KEY and os.path.exists(image_file):
            context = f"{pdf_name}, halaman {page_num}"
            vision_result = vision_gemini(image_file, context)
            if vision_result["success"]:
                page_result["markdown"] = vision_result["text"]
                page_result["method"] = "gemini_vision"
                print("👁️ Gemini OCR", flush=True)
                results.append(page_result)
                continue
            else:
                print(f"⚠️ Gemini error: {vision_result['error'][:50]}", flush=True)

        # Jika semua gagal
        with open(text_file) as f:
            fallback = f.read()
        page_result["markdown"] = fallback if fallback.strip() else f"[Page {page_num} - extraction failed]"
        page_result["method"] = "fallback"
        print("⚠️ fallback", flush=True)
        results.append(page_result)

    # Save individual page markdowns
    for r in results:
        page_file = f"{output_dir}/page_{r['page']:04d}_{r['pdf']}.md"
        with open(page_file, "w") as f:
            f.write(f"# {r['pdf']} — Halaman {r['page']}\n\n")
            f.write(r["markdown"])

    # Save combined batch markdown
    combined = f"# Batch {batch_id}: {' & '.join(set(r['pdf'] for r in results))}\n\n"
    for r in results:
        combined += f"\n\n---\n## Halaman {r['page']} ({r['pdf']})\n_Extracted via: {r['method']}_\n\n{r['markdown']}\n"

    combined_file = f"{output_dir}/batch_{batch_id}_combined.md"
    with open(combined_file, "w") as f:
        f.write(combined)

    # Save stats
    methods = {}
    for r in results:
        m = r["method"]
        methods[m] = methods.get(m, 0) + 1

    stats = {
        "batch_id": batch_id,
        "total_pages": total,
        "processed": len(results),
        "methods": methods,
        "combined_file": combined_file,
    }

    with open(f"{output_dir}/stats.json", "w") as f:
        json.dump(stats, f, indent=2)

    print(f"\n✅ Batch {batch_id} selesai: {total} halaman")
    print(f"   Methods: {json.dumps(methods)}")
    print(f"   Output: {combined_file}", flush=True)

    return stats


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 batch-processor.py <batch_dir>")
        sys.exit(1)

    batch_dir = sys.argv[1]
    stats = batch_process(batch_dir)
    print(json.dumps(stats, indent=2))
