# CORTEX Content Injection Contract

This folder is the handoff layer before content generation.

## Purpose

- Keep the shell stable.
- Let content agents fill structured data only.
- Give GPT a clean audit surface for content, visuals, quiz, glossary, and 3D planning.

## Main content domains

### Lecture material domain

Use this for PDF kuliah dosen and lecture-derived content. It should map to reading, bullets, callouts, image cards, glossary, summary, and bilingual/explanation pages.

### Original exam question domain

Use this for real question sets from previous years or grouped recall sets. Keep this separate from lecture material because the structure is question-first and each set may need its own page group.

### Page routing idea

- lecture index and lecture detail pages keep the PDF-derived flow
- each original exam set should get its own page route or route group
- the exam set route should expose the question list first, then the explanation layer, then the related material links

## Why the domains are separate

- lecture content is explanation-first
- question sets are recall-first
- each domain needs different QC fields
- each domain may map to different pages
- exam sets often need provenance and reconstruction confidence

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

## What to prepare before content generation

- lecture material manifests per PDF
- original exam set manifests per year/set
- page routing for lecture pages and set-question pages
- topic-to-page mapping
- question-to-module mapping
- page registry entries for lecture and exam-set routes
- visual manifest entries for diagrams and supporting images
- glossary entries for recurring exam vocabulary
- 3D refs only when relevant

## What this package contains

- content manifest templates
- visual asset manifest templates
- 3D model manifest templates
- quiz and glossary templates
- AI feature and interaction templates
- QC report templates
- schema files for lecture material, exam sets, and link maps
- JSON schemas for validation
