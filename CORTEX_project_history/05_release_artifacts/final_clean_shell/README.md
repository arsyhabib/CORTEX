# CORTEX Final Clean Shell

This folder is the cleanest reusable shell snapshot from the current CORTEX app stage.

## Included

- `index.html` — primary runtime shell
- `404.html` — GitHub Pages fallback entry, kept in sync with `index.html`
- `content_index.generated.json` — sample runtime content inventory contract

## Intended reuse

Use this shell when starting a new content-driven medical learning app with the same interaction language:

- liquid-glass shell
- mobile-first behavior
- sidebar + FAB navigation
- lecture domain rail
- exam-set rail
- search, glossary, summary, quiz, AI workspace, and 3D viewer lanes

## Reuse workflow

1. Copy `index.html` and `404.html` into the new app root.
2. Replace `content_index.generated.json` with the new content inventory.
3. Keep the same manifest pattern for:
   - lecture modules
   - exam sets
   - 3D runtime package
   - visual asset package
4. Re-run browser QA on desktop, tablet, and mobile before publishing.

## Notes

- This shell is public-safe by default.
- Provider secrets should stay in a proxy or server-side connector, never in the client shell.
- Runtime content counts are expected to come from packaged JSON, not from hardcoded buttons.
