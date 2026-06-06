#!/usr/bin/env python3
"""
PDF Extractor — Batch Page Extractor
=====================================
Menggunakan PyMuPDF (fitz) untuk:
1. Extract teks langsung dari setiap halaman
2. Render halaman sebagai PNG (untuk vision OCR)
3. Simpan ke struktur direktori batch

Output:
  /tmp/cortex-pipeline/
    pdfs/          ← symlink/copy PDF asli
    pages/         ← page images {pdf_name}/page_{n}.png
    text/          ← extracted text {pdf_name}/page_{n}.txt
    batch_00/      ← batch berisi page images untuk sub-agent
    batch_01/
    ...
"""
import os, sys, json, math, shutil
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print(json.dumps({"error": "PyMuPDF tidak terinstall. Jalankan: pip3 install pymupdf"}))
    sys.exit(1)

from PIL import Image

BASE_DIR = "/tmp/cortex-pipeline"
PDF_DIR = f"{BASE_DIR}/pdfs"
PAGES_DIR = f"{BASE_DIR}/pages"
TEXT_DIR = f"{BASE_DIR}/text"
BATCH_DIR = f"{BASE_DIR}/batches"
META_FILE = f"{BASE_DIR}/manifest.json"
DPI = 200  # resolusi render (cukup untuk OCR)
MAX_BATCH_SUBAGENTS = 40  # maksimal sub-agents paralel (makin banyak makin cepat)
PAGES_PER_BATCH = 10  # halaman per batch (lebih kecil = lebih paralel = lebih cepat)


def ensure_dirs():
    for d in [PDF_DIR, PAGES_DIR, TEXT_DIR, BATCH_DIR]:
        os.makedirs(d, exist_ok=True)


def extract_pdf(pdf_path):
    """Extract text + render pages from a single PDF."""
    pdf_path = Path(pdf_path)
    pdf_name = pdf_path.stem
    pdf_pages_dir = f"{PAGES_DIR}/{pdf_name}"
    pdf_text_dir = f"{TEXT_DIR}/{pdf_name}"
    os.makedirs(pdf_pages_dir, exist_ok=True)
    os.makedirs(pdf_text_dir, exist_ok=True)

    doc = fitz.open(str(pdf_path))
    total = len(doc)
    pages = []

    print(f"📄 {pdf_name}: {total} halaman", flush=True)

    for i in range(total):
        page = doc[i]
        page_num = i + 1

        # 1. Extract teks langsung
        text = page.get_text().strip()
        text_path = f"{pdf_text_dir}/page_{page_num:04d}.txt"
        with open(text_path, "w") as f:
            f.write(text if text else "[Halaman tanpa teks langsung — perlu OCR]")

        # 2. Render halaman ke PNG
        img_path = f"{pdf_pages_dir}/page_{page_num:04d}.png"
        if not os.path.exists(img_path):
            mat = fitz.Matrix(DPI / 72, DPI / 72)
            pix = page.get_pixmap(matrix=mat)
            pix.save(img_path)

        pages.append({
            "page": page_num,
            "pdf": pdf_name,
            "text_file": text_path,
            "image_file": img_path,
            "has_text": len(text) > 50,  # threshold: ada teks berarti
            "char_count": len(text),
        })

        if (i + 1) % 10 == 0:
            print(f"  ✅ {i+1}/{total} halaman", flush=True)

    doc.close()
    print(f"  ✅ Selesai: {pdf_name} ({total} halaman)", flush=True)
    return pdf_name, pages


def create_batches(all_pages):
    """Bagi semua halaman ke dalam batch untuk sub-agents."""
    # Hapus batch lama
    if os.path.exists(BATCH_DIR):
        shutil.rmtree(BATCH_DIR)
    os.makedirs(BATCH_DIR, exist_ok=True)

    n_batches = min(MAX_BATCH_SUBAGENTS, math.ceil(len(all_pages) / PAGES_PER_BATCH))
    batch_size = math.ceil(len(all_pages) / n_batches)

    batches = []
    for b in range(n_batches):
        start = b * batch_size
        end = min(start + batch_size, len(all_pages))
        batch_pages = all_pages[start:end]

        batch_dir = f"{BATCH_DIR}/batch_{b:02d}"
        os.makedirs(batch_dir, exist_ok=True)

        # Copy page images to batch dir (symlink biar hemat space)
        batch_manifest = []
        for p in batch_pages:
            src = p["image_file"]
            dst = f"{batch_dir}/page_{p['page']:04d}_{p['pdf']}.png"
            if not os.path.exists(dst):
                try:
                    os.symlink(os.path.abspath(src), dst)
                except:
                    shutil.copy2(src, dst)

            # Juga copy text file
            txt_src = p["text_file"]
            txt_dst = f"{batch_dir}/page_{p['page']:04d}_{p['pdf']}.txt"
            if not os.path.exists(txt_dst):
                try:
                    os.symlink(os.path.abspath(txt_src), txt_dst)
                except:
                    shutil.copy2(txt_src, txt_dst)

            batch_manifest.append({
                "page": p["page"],
                "pdf": p["pdf"],
                "image": dst,
                "text_file": txt_dst,
                "has_text": p["has_text"],
                "char_count": p["char_count"],
            })

        # Simpan manifest batch
        with open(f"{batch_dir}/manifest.json", "w") as f:
            json.dump({
                "batch_id": b,
                "total_batches": n_batches,
                "pages": batch_manifest,
                "total_pages": len(batch_manifest),
            }, f, indent=2)

        batches.append({
            "batch_id": b,
            "dir": batch_dir,
            "total_pages": len(batch_manifest),
        })
        print(f"  Batch {b:02d}: {len(batch_manifest)} halaman → {batch_dir}", flush=True)

    return batches


def main():
    import glob

    ensure_dirs()

    # Cari semua PDF di PDF_DIR atau argumen
    if len(sys.argv) > 1:
        pdf_files = [f for f in sys.argv[1:] if f.endswith(".pdf")]
        # Juga cari direktori
        for arg in sys.argv[1:]:
            if os.path.isdir(arg):
                pdf_files.extend(glob.glob(f"{arg}/*.pdf"))
    else:
        # Default: cari di PDF_DIR
        pdf_files = glob.glob(f"{PDF_DIR}/*.pdf")

    if not pdf_files:
        print(json.dumps({
            "error": "Tidak ada file PDF ditemukan.",
            "usage": "python3 pdf-extractor.py <pdf1.pdf> <pdf2.pdf> ... atau taruh PDF di /tmp/cortex-pipeline/pdfs/"
        }, indent=2))
        sys.exit(1)

    print(f"\n{'='*50}")
    print(f"📚 PDF EXTRACTOR — {len(pdf_files)} file ditemukan")
    print(f"{'='*50}\n")

    # Copy PDFs ke PDF_DIR
    all_pages = []
    for pdf in pdf_files:
        shutil.copy2(pdf, f"{PDF_DIR}/{os.path.basename(pdf)}")
        pdf_name, pages = extract_pdf(pdf)
        all_pages.extend(pages)

    # Simpan manifest global
    total_pages = len(all_pages)
    print(f"\n📊 Total: {len(pdf_files)} PDF = {total_pages} halaman")

    # Buat batch
    print(f"\n📦 Membagi ke dalam batch...")
    batches = create_batches(all_pages)

    manifest = {
        "total_pdfs": len(pdf_files),
        "total_pages": total_pages,
        "total_batches": len(batches),
        "pages_per_batch": PAGES_PER_BATCH,
        "max_sub_agents": MAX_BATCH_SUBAGENTS,
        "batch_dir": BATCH_DIR,
        "batches": batches,
        "pdf_dir": PDF_DIR,
        "pages_dir": PAGES_DIR,
    }

    with open(META_FILE, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"\n✅ Selesai! Manifest: {META_FILE}")
    print(f"   Total: {total_pages} halaman, {len(batches)} batch")
    print(f"   Jalankan: python3 pdf-pipeline.py\n")

    # Output JSON untuk parsing
    print(json.dumps(manifest, indent=2))


if __name__ == "__main__":
    main()
