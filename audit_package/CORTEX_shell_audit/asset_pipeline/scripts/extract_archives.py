#!/usr/bin/env python3
from __future__ import annotations

import json
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "manifests" / "asset_manifest.generated.json"
DOWNLOAD_DIR = ROOT / "downloads"
CONVERTED_DIR = ROOT / "converted"


def main() -> int:
    if not SOURCE.exists():
        raise SystemExit(f"Missing generated asset manifest: {SOURCE}")

    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    CONVERTED_DIR.mkdir(parents=True, exist_ok=True)

    for asset in data.get("assets", []):
        path = asset.get("download_path")
        if not path:
            continue
        download_path = ROOT / path
        if not download_path.exists():
            continue
        folder = CONVERTED_DIR / (asset.get("target_folder") or asset.get("category") or asset["id"])
        folder.mkdir(parents=True, exist_ok=True)
        if download_path.suffix.lower() == ".zip":
            extract_to = folder / asset["id"]
            extract_to.mkdir(parents=True, exist_ok=True)
            with zipfile.ZipFile(download_path) as zf:
                zf.extractall(extract_to)
            asset["extracted_to"] = str(extract_to.relative_to(ROOT))
        else:
            copied = folder / download_path.name
            shutil.copy2(download_path, copied)
            asset["converted_copy"] = str(copied.relative_to(ROOT))

    SOURCE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print("Archive extraction completed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

