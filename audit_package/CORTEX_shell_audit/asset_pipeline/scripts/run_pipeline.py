#!/usr/bin/env python3
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"


def run(script_name: str) -> None:
    script = SCRIPTS / script_name
    subprocess.run([sys.executable, str(script)], check=True)


def main() -> int:
    run("prepare_asset_folders.py")
    run("download_assets.py")
    run("extract_archives.py")
    run("export_manifest.py")
    print("CORTEX 3D asset pipeline complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

