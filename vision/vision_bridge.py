#!/usr/bin/env python3
"""
Vision Bridge v2 — Dual-Eye Architecture
=========================================
DeepSeek V4 Pro (otak) ← Featherless (Gemma-3-12B-VL) + Gemini 2.5 Flash (mata)

Mode:
  dual (default)      → kedua provider, return JSON + cross-check info
  --featherless-only   → paksa pake Featherless aja
  --gemini-only        → paksa pake Gemini aja (fallback kalau Featherless mati)

Output JSON agar DeepSeek bisa parsing & cross-check otomatis.
"""
import json
import base64
import subprocess
import sys
import os
import time
import concurrent.futures
import requests
from PIL import Image

# ─── Konfigurasi ─────────────────────────────────────────────────────
# Ambil dari environment variable (LobeHub inject otomatis)
FEATHERLESS_KEY = os.environ.get("FEATHERLESS_VISION_KEY") or os.environ.get("FEATHERLESS_KEY")
FEATHERLESS_MODEL = "DavidAU/gemma-3-12b-it-vl-Deepseek-v3.1-Heretic-Uncensored-Thinking"
GOOGLE_API_KEY = os.environ.get("GOOGLE_AI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash-image"

FEATHERLESS_URL = "https://api.featherless.ai/v1/chat/completions"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

# ─── Helpers ─────────────────────────────────────────────────────────

def image_to_base64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()


def get_mime(path):
    ext = path.lower().rsplit(".", 1)[-1]
    return {
        "jpg": "image/jpeg", "jpeg": "image/jpeg",
        "png": "image/png", "gif": "image/gif", "webp": "image/webp",
    }.get(ext, "image/png")


def optimize_image(path, max_dim=2048, quality=85):
    """Resize gambar kalau terlalu besar (Gemini limit ~4MB base64)."""
    img = Image.open(path)
    if max(img.size) > max_dim:
        img.thumbnail((max_dim, max_dim), Image.LANCZOS)
        opt_path = "/tmp/vision_optimized.png"
        img.save(opt_path, optimize=True, quality=quality)
        return opt_path
    return path


def screenshot(path="/tmp/vision_capture.png"):
    """Ambil screenshot full desktop (macOS)."""
    subprocess.run(["screencapture", "-x", path], check=True)
    return optimize_image(path)


# ─── Provider: Featherless (Gemma-3-12B-VL) ─────────────────────────

def call_featherless(b64, mime, prompt):
    if not FEATHERLESS_KEY:
        return {"success": False, "error": "FEATHERLESS_KEY tidak ditemukan"}
    try:
        start = time.time()
        resp = requests.post(
            FEATHERLESS_URL,
            headers={
                "Authorization": f"Bearer {FEATHERLESS_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": FEATHERLESS_MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {"url": f"data:{mime};base64,{b64}"},
                            },
                        ],
                    }
                ],
                "max_tokens": 800,
            },
            timeout=60,
        )
        elapsed = time.time() - start
        resp.raise_for_status()
        text = resp.json()["choices"][0]["message"]["content"]
        return {"success": True, "provider": "Featherless", "model": FEATHERLESS_MODEL,
                "description": text, "latency": round(elapsed, 2)}
    except Exception as e:
        return {"success": False, "provider": "Featherless", "error": str(e)}


# ─── Provider: Gemini 2.5 Flash (Google AI) ─────────────────────────

def call_gemini(b64, mime, prompt):
    if not GOOGLE_API_KEY:
        return {"success": False, "error": "GOOGLE_AI_API_KEY tidak ditemukan"}
    try:
        start = time.time()
        resp = requests.post(
            f"{GEMINI_URL}?key={GOOGLE_API_KEY}",
            headers={"Content-Type": "application/json"},
            json={
                "contents": [
                    {
                        "parts": [
                            {"text": prompt},
                            {"inline_data": {"mime_type": mime, "data": b64}},
                        ]
                    }
                ],
                "generationConfig": {"maxOutputTokens": 800},
            },
            timeout=60,
        )
        elapsed = time.time() - start
        resp.raise_for_status()
        data = resp.json()
        text = data["candidates"][0]["content"]["parts"][0]["text"]
        return {"success": True, "provider": "Gemini", "model": GEMINI_MODEL,
                "description": text, "latency": round(elapsed, 2)}
    except Exception as e:
        return {"success": False, "provider": "Gemini", "error": str(e)}


# ─── Cross-Check Logic ──────────────────────────────────────────────

def cross_check(f_result, g_result):
    """Bandingkan hasil kedua provider."""
    f_ok = f_result and f_result.get("success")
    g_ok = g_result and g_result.get("success")

    if f_ok and g_ok:
        f_desc = f_result["description"].strip().lower()
        g_desc = g_result["description"].strip().lower()

        # Hitung similarity keyword sederhana
        f_words = set(f_desc.split())
        g_words = set(g_desc.split())
        overlap = f_words & g_words
        total = f_words | g_words
        similarity = round(len(overlap) / len(total) * 100, 1) if total else 0

        # Deteksi potensi kontradiksi
        contradictions = []
        # Cek angka-angka penting
        f_numbers = {w for w in f_words if w.replace(".", "").isdigit() and len(w) > 1}
        g_numbers = {w for w in g_words if w.replace(".", "").isdigit() and len(w) > 1}
        if f_numbers and g_numbers and f_numbers != g_numbers:
            contradictions.append(f"Beda angka: Featherless={f_numbers}, Gemini={g_numbers}")

        return {
            "status": "both_ok",
            "word_overlap": f"{similarity}%",
            "contradictions": contradictions if contradictions else None,
            "featherless_words": len(f_words),
            "gemini_words": len(g_words),
            "verdict": "Konsisten" if similarity > 40 else "Perlu dicek DeepSeek",
        }

    if f_ok and not g_ok:
        return {"status": "gemini_failed", "error": g_result.get("error")}
    if g_ok and not f_ok:
        return {"status": "featherless_failed", "error": f_result.get("error")}
    return {"status": "both_failed", "errors": [f_result.get("error"), g_result.get("error")]}


# ─── Main ────────────────────────────────────────────────────────────

def main():

    # Parse arguments
    args = sys.argv[1:]
    prompt = "Describe this image in detail — what objects, text, colors, layout, people, and context do you see?"
    image_path = None
    mode = "dual"

    for arg in args:
        if arg == "--featherless-only":
            mode = "featherless"
        elif arg == "--gemini-only":
            mode = "gemini"
        elif arg.startswith("--prompt="):
            prompt = arg.split("=", 1)[1]
        elif not arg.startswith("--"):
            image_path = arg

    # Dapatkan image
    if image_path and os.path.exists(image_path):
        image_path = optimize_image(image_path)
    else:
        image_path = screenshot()

    b64 = image_to_base64(image_path)
    mime = get_mime(image_path)

    result = {
        "mode": mode,
        "image_path": image_path,
        "image_size": f"{os.path.getsize(image_path) / 1024:.1f} KB",
        "featherless": None,
        "gemini": None,
        "cross_check": None,
    }

    # ── Dual: parallel call ──
    if mode == "dual":
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            f_future = pool.submit(call_featherless, b64, mime, prompt)
            g_future = pool.submit(call_gemini, b64, mime, prompt)
            result["featherless"] = f_future.result()
            result["gemini"] = g_future.result()

        result["cross_check"] = cross_check(result["featherless"], result["gemini"])

        # Fallback: kalau salah satu error, pake yang berhasil
        f_ok = result["featherless"] and result["featherless"].get("success")
        g_ok = result["gemini"] and result["gemini"].get("success")

        if not f_ok and g_ok:
            result["fallback"] = "Gemini (Featherless gagal)"
        elif f_ok and not g_ok:
            result["fallback"] = "Featherless (Gemini gagal)"
        elif not f_ok and not g_ok:
            result["fallback"] = "⚠️ KEDUA PROVIDER GAGAL"
            print(json.dumps(result, indent=2))
            sys.exit(1)
        else:
            result["fallback"] = None  # both OK

    # ── Single Provider ──
    elif mode == "featherless":
        result["featherless"] = call_featherless(b64, mime, prompt)
    elif mode == "gemini":
        result["gemini"] = call_gemini(b64, mime, prompt)
    else:
        print(json.dumps({"error": f"Unknown mode: {mode}"}))
        sys.exit(1)

    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
