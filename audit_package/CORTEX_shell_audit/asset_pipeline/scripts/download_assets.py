#!/usr/bin/env python3
"""
CORTEX 3D asset downloader.

Reads a curated source manifest and downloads approved assets into a normalized
folder structure. This script intentionally avoids any silent scraping logic.
Fill direct download URLs in the manifest before running it.
"""
from __future__ import annotations

import json
import os
import shutil
import sys
import urllib.request
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "manifests" / "source_assets.template.json"
DOWNLOAD_DIR = ROOT / "downloads"
LOG_DIR = ROOT / "logs"
OUTPUT_MANIFEST = ROOT / "manifests" / "asset_manifest.generated.json"


def ensure_dirs() -> None:
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)
    LOG_DIR.mkdir(parents=True, exist_ok=True)


def download_file(url: str, dest: Path) -> None:
    with urllib.request.urlopen(url) as response:
      # some sources return content with unknown length
      with dest.open("wb") as out:
        shutil.copyfileobj(response, out)


def main() -> int:
    ensure_dirs()
    if not MANIFEST.exists():
        print(f"Missing manifest: {MANIFEST}", file=sys.stderr)
        return 1

    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    assets = data.get("assets", [])
    results = []

    for asset in assets:
        asset_id = asset["id"]
        download_url = asset.get("download_url", "").strip()
        target_folder = asset.get("target_folder") or asset.get("category") or asset_id
        file_name = Path(download_url.split("?")[0]).name if download_url else f"{asset_id}.bin"
        asset_dir = DOWNLOAD_DIR / target_folder
        asset_dir.mkdir(parents=True, exist_ok=True)
        dest = asset_dir / file_name

        status = "skipped"
        error = ""
        if download_url:
            try:
                download_file(download_url, dest)
                status = "downloaded"
            except Exception as exc:
                status = "failed"
                error = str(exc)

        results.append({
            **asset,
            "download_status": status,
            "download_path": str(dest.relative_to(ROOT)) if dest.exists() else "",
            "error": error,
        })
        print(f"{asset_id}: {status}")

    OUTPUT_MANIFEST.write_text(
        json.dumps({"assets": results}, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"Wrote {OUTPUT_MANIFEST}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

