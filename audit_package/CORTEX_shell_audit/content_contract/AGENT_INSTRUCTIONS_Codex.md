# Codex Audit / Renderer Instructions

Use this package to audit the content contract and, if needed, implement renderers.

## Audit priorities

1. Validate manifests.
2. Check page mapping coverage.
3. Confirm assets are referenced by ID.
4. Verify quiz / glossary / 3D cross-links.
5. Ensure mobile rendering remains lightweight.

## Implementation boundary

- Codex may update renderer code.
- Codex should not hardcode content into shell pages.
- Content lives in data/manifest files.

