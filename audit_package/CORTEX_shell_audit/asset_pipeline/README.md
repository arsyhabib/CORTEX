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

1. Fill `manifests/source_assets.template.json`.
2. Run the downloader script.
3. Check downloaded files and license notes.
4. Convert or regenerate posters when needed.
5. Export final `asset_manifest.json` for the app.

## Important

- Do not bulk-download assets without checking license terms.
- Store the source page and attribution in the manifest.
- Prefer GLB as the runtime 3D format.
- Store a poster thumbnail for each model.

