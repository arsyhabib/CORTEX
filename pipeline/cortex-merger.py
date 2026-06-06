#!/usr/bin/env python3
"""
CORTEX Merger — Gabung semua batch markdown → JSON CORTEX
==========================================================
Membaca semua output batch dari /tmp/cortex-pipeline/batches/
dan menggabungkannya menjadi 1 file markdown + 1 file JSON
untuk diintegrasikan ke aplikasi CORTEX.

Output:
  /tmp/cortex-pipeline/cortex_materi.md   ← Markdown lengkap
  /tmp/cortex-pipeline/cortex_materi.json ← JSON terstruktur
  /tmp/cortex-pipeline/cortex_stats.json  ← Statistik
"""
import json, os, re, glob
from pathlib import Path

BASE_DIR = "/tmp/cortex-pipeline"
BATCH_DIR = f"{BASE_DIR}/batches"
OUTPUT_MD = f"{BASE_DIR}/cortex_materi.md"
OUTPUT_JSON = f"{BASE_DIR}/cortex_materi.json"
OUTPUT_STATS = f"{BASE_DIR}/cortex_stats.json"


def parse_module_from_filename(pdf_name):
    """Coba extract nama modul dari filename PDF."""
    name = pdf_name.replace("_", " ").replace("-", " ").replace(".pdf", "")
    # Bersihin angka/suffix
    name = re.sub(r'\s+\d{4}$', '', name)  # tahun
    return name.strip().title()


def collect_all_batches():
    """Kumpulkan semua output batch."""
    all_results = []
    total_stats = {
        "total_pages": 0,
        "total_methods": {},
        "pdfs": set(),
    }

    batch_dirs = sorted(glob.glob(f"{BATCH_DIR}/batch_*/output/stats.json"))
    for stats_file in batch_dirs:
        with open(stats_file) as f:
            stats = json.load(f)
        total_stats["total_pages"] += stats["total_pages"]
        for m, count in stats["methods"].items():
            total_stats["total_methods"][m] = total_stats["total_methods"].get(m, 0) + count

        # Baca combined markdown
        combined_file = stats["combined_file"]
        if os.path.exists(combined_file):
            with open(combined_file) as f:
                md = f.read()
            # Parse per-page markdown
            pages = re.split(r'\n---\n', md)
            for page_md in pages:
                if not page_md.strip():
                    continue
                # Extract page info
                h_match = re.search(r'^## Halaman (\d+) \(([^)]+)\)', page_md, re.MULTILINE)
                method_match = re.search(r'_Extracted via: ([^_]+)_', page_md)
                if h_match:
                    page_num = int(h_match.group(1))
                    pdf_name = h_match.group(2)
                    method = method_match.group(1) if method_match else "unknown"
                    total_stats["pdfs"].add(pdf_name)
                    all_results.append({
                        "page": page_num,
                        "pdf": pdf_name,
                        "method": method,
                        "content": page_md,
                    })

    # Sort by PDF name then page number
    all_results.sort(key=lambda x: (x["pdf"], x["page"]))
    return all_results, total_stats


def build_markdown(results):
    """Gabung semua hasil menjadi 1 file markdown."""
    md = "# CORTEX — Materi Lengkap\n\n"
    md += f"Total: {len(results)} halaman dari {len(set(r['pdf'] for r in results))} file PDF\n\n"
    md += "---\n\n"

    current_pdf = None
    for r in results:
        if r["pdf"] != current_pdf:
            current_pdf = r["pdf"]
            module_name = parse_module_from_filename(current_pdf)
            md += f"\n# {module_name}\n\n"
            md += f"_File: {current_pdf}_\n\n"

        md += f"\n## Halaman {r['page']}\n\n"
        md += f"{r['content']}\n\n"

    return md


def build_cortex_json(results, total_stats):
    """Convert ke format JSON CORTEX."""
    # Group by PDF (module)
    modules = {}
    for r in results:
        pdf = r["pdf"]
        if pdf not in modules:
            modules[pdf] = {
                "id": pdf.replace(".pdf", "").replace(" ", "_").lower(),
                "title": parse_module_from_filename(pdf),
                "source_file": pdf,
                "total_pages": 0,
                "pages": [],
            }
        modules[pdf]["total_pages"] += 1
        modules[pdf]["pages"].append({
            "page": r["page"],
            "content": r["content"],
            "extraction_method": r["method"],
        })

    # Build CORTEX structure
    cortex = {
        "metadata": {
            "title": "CORTEX Medical Education Materials",
            "version": "1.0",
            "total_modules": len(modules),
            "total_pages": len(results),
            "extraction_stats": {
                "text_direct": total_stats["total_methods"].get("text_direct", 0),
                "gemini_vision": total_stats["total_methods"].get("gemini_vision", 0),
                "featherless_vision": total_stats["total_methods"].get("featherless_vision", 0),
                "dual_eye": total_stats["total_methods"].get("dual", 0),
                "fallback": total_stats["total_methods"].get("fallback", 0),
            },
            "generated_at": __import__("datetime").datetime.now().isoformat(),
        },
        "modules": list(modules.values()),
    }

    return cortex


def main():
    print("📖 Mengumpulkan hasil batch...", flush=True)
    results, stats = collect_all_batches()

    if not results:
        print("❌ Tidak ada hasil batch ditemukan. Jalankan pipeline dulu.")
        print(f"   Cari di: {BATCH_DIR}/batch_*/output/")
        sys.exit(1)

    print(f"\n📊 Statistik:")
    print(f"   Total halaman: {stats['total_pages']}")
    print(f"   Total file PDF: {len(stats['pdfs'])}")
    print(f"   Metode ekstraksi:")
    for method, count in sorted(stats["total_methods"].items()):
        pct = count / stats["total_pages"] * 100
        print(f"     - {method}: {count} ({pct:.1f}%)")

    # Generate markdown
    print(f"\n📝 Membuat markdown...", flush=True)
    md = build_markdown(results)
    with open(OUTPUT_MD, "w") as f:
        f.write(md)
    print(f"   ✅ {OUTPUT_MD} ({len(md)} chars)")

    # Generate JSON
    print(f"\n🔷 Membuat JSON CORTEX...", flush=True)
    cortex = build_cortex_json(results, stats)
    with open(OUTPUT_JSON, "w") as f:
        json.dump(cortex, f, indent=2, ensure_ascii=False)
    print(f"   ✅ {OUTPUT_JSON}")

    # Stats
    with open(OUTPUT_STATS, "w") as f:
        json.dump({
            "total_pages": stats["total_pages"],
            "total_pdfs": len(stats["pdfs"]),
            "pdfs": list(stats["pdfs"]),
            "methods": stats["total_methods"],
            "output_markdown": OUTPUT_MD,
            "output_json": OUTPUT_JSON,
            "markdown_size_kb": round(len(md) / 1024, 1),
        }, f, indent=2)
    print(f"   ✅ {OUTPUT_STATS}")

    print(f"\n{'='*50}")
    print(f"✅ SELESAI! Output siap:")
    print(f"   📄 Markdown: {OUTPUT_MD}")
    print(f"   📊 JSON:     {OUTPUT_JSON}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
