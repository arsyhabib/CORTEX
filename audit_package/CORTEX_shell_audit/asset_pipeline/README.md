# CORTEX 3D Asset Pipeline

This folder is the automation layer for collecting, organizing, and registering free or approved 3D medical assets.

## Goal

- Search or curate source candidates.
- Download approved assets.
- Normalize file structure.
- Produce manifests for the app shell.
- Keep licensing and attribution visible.

## Recommended sources

- NIH 3D
- BodyParts3D
- Z-Anatomy

## Workflow

1. Start with `manifests/source_assets.starter.json`.
2. If needed, copy it to a project-specific manifest.
3. Run `scripts/run_pipeline.py` for the full flow.
4. Check downloaded files and license notes.
5. Convert or regenerate posters when needed.
6. Export final `asset_manifest.ready.json` for the app.

## Quick start

```bash
cd audit_package/CORTEX_shell_audit/asset_pipeline
python3 scripts/run_pipeline.py
```

If you only want to prepare folders first:

```bash
python3 scripts/prepare_asset_folders.py
```

## Important

- Do not bulk-download assets without checking license terms.
- Store the source page and attribution in the manifest.
- Prefer GLB as the runtime 3D format.
- Store a poster thumbnail for each model.
