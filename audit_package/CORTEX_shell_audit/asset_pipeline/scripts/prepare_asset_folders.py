#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "manifests" / "source_assets.template.json"
BASE = ROOT / "downloads"
POSTERS = ROOT / "posters"
CONVERTED = ROOT / "converted"


def main() -> int:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    for asset in data.get("assets", []):
        folder = asset.get("target_folder") or asset.get("category") or asset["id"]
        (BASE / folder).mkdir(parents=True, exist_ok=True)
        (POSTERS / folder).mkdir(parents=True, exist_ok=True)
        (CONVERTED / folder).mkdir(parents=True, exist_ok=True)
    print("Asset folders prepared.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

