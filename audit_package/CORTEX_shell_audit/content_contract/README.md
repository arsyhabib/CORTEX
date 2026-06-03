# CORTEX Content Injection Contract

This folder is the handoff layer before content generation.

## Purpose

- Keep the shell stable.
- Let content agents fill structured data only.
- Give GPT a clean audit surface for content, visuals, quiz, glossary, and 3D planning.

## Rules

1. Do not edit `index.html` or `404.html` when generating content.
2. Fill templates under `templates/` only.
3. Treat `schemas/` as the validation target.
4. Keep raw assets referenced by manifest, not embedded in JSON blobs.
5. Use lazy-loading and page-level mapping.

## Recommended workflow

1. Copy a template into a working file.
2. Fill the working file with real content.
3. Validate it against the schema.
4. Update the QC report.
5. Hand the completed package back for review or injection.

## What this package contains

- content manifest templates
- visual asset manifest templates
- 3D model manifest templates
- quiz and glossary templates
- AI feature and interaction templates
- QC report templates
- JSON schemas for validation

