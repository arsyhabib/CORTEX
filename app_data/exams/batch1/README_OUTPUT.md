# CORTEX Batch 1 Output - MCQ 6.E 2025

This package is the structured return bundle for Batch 1 / MCQ 6.E 2025.

## Main artifacts
- `original_exam_sets/mcq_6e_2025.original_exam_set.json` — archival reconstructed exam set with 40 main questions.
- `quiz_bank/mcq_6e_2025.quiz_bank.json` — active quiz items with complete options and usable answer keys.
- `glossary/batch_1_mcq_6e_2025.glossary.json` — terminology extracted from the question domain.
- `content_link_map/content_link_map.generated.json` — exam-set/page and question/glossary links.
- `page_registry/page_registry.generated.json` — routes for app integration.
- `course_manifest/course_manifest.generated.json` — integration manifest.
- `analysis_notes/` — coverage, source gaps, inference and deduplication notes.
- `qc/` — QC CSVs and schema validation report.

## Important warning
The original PDF contains OCR noise and several incomplete options. The active quiz bank intentionally excludes items that are unsafe for interactive exam mode due to missing options.
