# CORTEX Material Refinement Prompt for Kimi

You are refining a previously generated lecture-material JSON package for CORTEX.

## Goal
- Keep the exact same JSON structure, module count, IDs, filenames, references, and schema shape.
- Translate and normalize all human-readable prose into natural Bahasa Indonesia.
- Remove English leakage from explanatory text, while keeping clinical terms that are standard in medical education when they are more precise or more familiar in English.
- Preserve all factual meaning, sequencing, evidence links, and structure.
- Do not rebuild the content from scratch; refine the existing output.

## Inputs you may receive
- The Kimi-generated batch output JSON package.
- Optionally, the original source package used to create it.

## Priority order
1. Preserve the original JSON structure and all machine-readable keys.
2. Preserve factual meaning and source alignment.
3. Normalize language to Bahasa Indonesia.
4. Improve readability and consistency.
5. Leave unsupported or empty fields empty; do not invent content.

## What to translate to Indonesian
Translate these human-readable fields and text values:
- `overview`
- `learning_goals`
- `key_points`
- `surgical_translation.clean_teaching_text`
- `expanded_sections.heading`
- `expanded_sections.subheading`
- `expanded_sections.content_blocks[*].text`
- `expanded_sections.callouts[*]`
- `tables.title`
- `tables.rows[*][*]` when the row text is prose-like or explanatory
- `figure_notes.title`
- `figure_notes.teaching_point`
- `table_notes.title`
- `table_notes.transcription_note`
- `diagnostic_logic[*].title`
- `diagnostic_logic[*].explanation`
- `differential_notes[*].how_to_separate`
- `treatment_notes[*].phase`
- `treatment_notes[*].content`
- `red_flags[*]`
- `exam_focus[*]`
- `glossary[*].meaning`
- `extraction_notes[*]`
- `visual_targets[*].title`
- `visual_targets[*].caption_hint`
- `source_notes[*]`
- `coverage_gaps[*]`
- `confidence_summary` if it is prose-like
- `qc_flags[*]` if they contain human text

## What not to translate
Do not translate or modify:
- JSON keys
- `module_id`
- `domain`
- `source_file`
- `source_type`
- `source_author`
- `source_date`
- `status`
- IDs such as `section_id`, `table_id`, `figure_id`, `target_id`
- page/slide references
- filenames
- code-like identifiers
- medically standard abbreviations when they are best kept as-is: LP, LCS, CSF, CT, MRI, EEG, ICU, ICD, DSM, SSRI, TCA, SNRI, etc.

## Surgical translation rule
- When the text is awkward, OCR-noisy, repetitive, or structurally broken, rewrite it into clear Indonesian teaching prose.
- Do not copy the broken English literally if a cleaner Indonesian sentence can preserve the meaning.
- Do not add new facts, diagnoses, treatment steps, or references.
- Keep the meaning source-faithful and the order of ideas intact.
- If a section is already clean Indonesian, leave it alone or polish it lightly.

## Style target
- Natural, readable Bahasa Indonesia.
- Medical, educational, and professional tone.
- Avoid over-formal translation that sounds like machine output.
- Avoid slang, casual filler, or excessive English code-switching.
- Keep names, references, and proper medical terms intact where needed.

## Safety rules
- Do not invent missing content.
- Do not convert an empty field into a guessed translation.
- Do not change module counts or merge/split modules.
- Do not alter evidence maps or source references except to translate the surrounding prose.
- If a field is uncertain, preserve the uncertainty in Indonesian instead of guessing.

## Output requirements
- Return JSON only.
- Keep the same top-level wrapper as the input.
- Keep the same number of modules.
- Keep all IDs, filenames, and page targets stable.
- The only intended change is language normalization and light readability polishing.

## Final self-audit
Before returning JSON, confirm:
1. No stray English remains in prose except for technical terms and proper names.
2. The JSON structure is unchanged.
3. The number of modules is unchanged.
4. No facts were added or removed.
5. OCR-fragmentary or missing areas remain flagged, not guessed.

## Batch scope
- Batch 2 / 6F
- Source count: 13
- Domain: psychiatry and behavior
- Use the Kimi-generated Batch 2 output as the primary input for language normalization.
- If the original lecture source package is also attached, use it only to resolve ambiguity or verify source-specific terminology.
