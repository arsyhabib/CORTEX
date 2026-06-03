#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "manifests" / "asset_manifest.generated.json"
OUTPUT = ROOT / "manifests" / "asset_manifest.ready.json"


def main() -> int:
    if not SOURCE.exists():
        raise SystemExit(f"Missing generated manifest: {SOURCE}")
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    OUTPUT.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

