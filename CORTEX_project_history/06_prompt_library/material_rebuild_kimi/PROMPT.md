# CORTEX Material Rebuild Prompt for Kimi

You are rebuilding the lecture-material domain for CORTEX from the original lecturer PDFs.

Goal:
- Produce a deeply detailed, structured, medically accurate rewrite of each lecture module.
- Keep the shell-ready JSON output concise in schema, but dense in content.
- This task is material-only. Do not generate new visuals, 3D, quiz banks, or exam sets unless a field explicitly asks for cross-links.
- Build two layers when needed: a source-faithful teaching layer and a surgical translation layer that rewrites awkward or OCR-noisy PPT language into cleaner, more readable teaching prose without changing the meaning.

Extraction mandate:
- Treat each PDF as the source of truth for one lecture module unless the document itself clearly contains multiple standalone lectures.
- Extract the full teaching spine of the document, not just a summary. That means:
  - title slide / opening slide / topic line
  - lecturer name, credentials, affiliation, course, block, batch, and date if visible
  - learning objectives, aims, or opening framing if present
  - all headings, subheadings, repeated emphasis text, and section separators
  - all readable explanatory paragraphs and bullets
  - definitions, criteria, thresholds, staging systems, scoring rules, and warning signs
  - pathophysiology, etiology, epidemiology, risk factors, and mechanism if present
  - symptoms, exam findings, localization clues, bedside reasoning, and red flags
  - diagnostic workup, algorithms, ordering logic, interpretation steps, and differential logic
  - treatment, management, escalation, contraindications, adverse effects, and medication details if present
  - tables, comparison matrices, lists of values, and legends
  - figure captions, diagram labels, chart titles, and the teaching point of each figure
  - lecturer emphasis, mnemonics, repeated pearls, and exam-high-yield notes
  - embedded cases, recall prompts, practice questions, or case-based teaching items
  - references or source attributions shown in the lecture
  - any unreadable / OCR-fragmentary area, which must be preserved conservatively and flagged clearly

What not to do:
- Do not convert a lecture into a generic summary.
- Do not flatten tables, algorithms, or slide logic into vague prose.
- Do not infer missing facts from medical knowledge when the PDF does not show them.
- Do not invent references, citations, doses, dates, page counts, or titles.
- Do not "improve" the lecture by replacing the lecturer's structure with a different narrative structure.
- Do not add unrelated anatomy, diseases, mechanisms, or visuals that are not grounded in the source.
- Do not copy the PPT text plek ketiplek unless the exact wording is clinically important, a formal definition, a threshold, a citation, or a named term.
- Do not let the surgical translation layer drift into a separate opinion piece; it must remain source-bound and clinically faithful.

Hard requirements:
- Work in 2 batches only: Batch 1 = 6E lecture PDFs, Batch 2 = 6F lecture PDFs.
- Treat each source PDF as one primary lecture module unless the source clearly contains multiple standalone lectures.
- Output must be in JSON only.
- Do not output markdown, prose, or commentary outside JSON.
- Maintain a rewrite ratio that keeps the original source dominant: at least 80% of the factual content must remain source-faithful, and no more than 20% may be agent-generated synthesis or smoothing.
- Keep agent-generated synthesis below 20% of the substance of the module. Use synthesis only for bridging, ordering, and teaching clarity, never for inventing missing content.
- Each lecture module should be expanded enough to serialize to a substantial JSON payload. Aim for a minimum of roughly 30 KB per lecture module when serialized, without padding, repetition, or fluff.
- Preserve citations, author names, slide headings, tables, and terminology whenever they exist in the source.
- Preserve uncertainty. Do not invent missing facts.
- If a section is OCR-fragmentary, mark it as `source_fragmentary` and summarize conservatively.
- Make the material clinically useful and detailed enough for study, review, and quick reference.
- For each module, include visual placement hints and `visual_targets` so the shell can place related visuals later.
- Do not embed final binary images. Use only references and layout hints.
- Keep the tone educational and polished, not casual.
- Use the surgical translation layer to normalize messy structure, broken sentence order, repeated slide fragments, and awkward phrasing while preserving the source's meaning and terminology.

Extraction checklist for every source PDF:
- Title slide / opening slide details.
- Lecturer name, credentials, affiliation, and course context if shown.
- Document type clues such as lecture, handout, slide deck, case discussion, or review sheet.
- Whether the PDF is a single lecture, a continuation, or a composite of multiple sessions.
- Chapter or slide headings, subheadings, section labels, and repeated emphasis text.
- All readable explanatory paragraphs and slide bullets.
- Definitions, diagnostic criteria, thresholds, staging systems, and warning signs.
- Pathophysiology, etiologies, epidemiology, risk factors, and mechanisms whenever present.
- Signs and symptoms, bedside clues, exam findings, localization clues, and red flags.
- Diagnostic workup, algorithms, flowcharts, ordering logic, and interpretation steps.
- Treatment / management, first-line vs second-line decisions, contraindications, and escalation logic.
- Medication names, classes, doses, route notes, side effects, and safety cautions if present.
- Tables, matrix comparisons, legends, and value-based lists; preserve them as structured data.
- Figure captions, diagram labels, and the teaching point of images or schematics.
- Lecturer emphasis, repeated phrases, mnemonic cues, and exam-high-yield notes.
- Embedded practice questions, recall prompts, or case-based teaching items.
- References or source attributions shown in the source.
- Any source uncertainty, missing OCR, or visually unreadable sections.
- Sections that need surgical translation because the original PPT language is anomalous, repetitive, or difficult to scan quickly.
- Any explicit page/slide numbering visible in the PDF, especially when a figure, table, or algorithm is reused across slides.
- Any repeated teaching cues that indicate what the lecturer wants remembered for exams.

Output structure for each module:
- `module_id`
- `domain`
- `title`
- `source_file`
- `source_type`
- `source_author`
- `source_date`
- `status`
- `overview`
- `learning_goals`
- `key_points`
- `surgical_translation`
- `source_coverage`
- `evidence_map`
- `expanded_sections`
- `tables`
- `figure_notes`
- `table_notes`
- `diagnostic_logic`
- `differential_notes`
- `treatment_notes`
- `red_flags`
- `exam_focus`
- `glossary`
- `extraction_notes`
- `visual_targets`
- `crosslinks`
- `source_notes`
- `coverage_gaps`
- `confidence_summary`
- `qc_flags`

Expanded-section guidance:
- Preserve the original structure, but rewrite it into a richer teaching format.
- Split long sections into sub-sections where useful.
- Include bedside reasoning, localizable signs, exam keywords, and short recap lines.
- If tables are present in the source, reproduce them as structured arrays.
- If a source contains an algorithm or flow, preserve it as ordered steps.
- Prefer source-grounded expansion over creative rewriting.
- Add detail by unpacking source facts, not by inventing new facts.
- If a section is repeated across slides, deduplicate only when the meaning is identical.
- Keep the surgical translation layer readable and clean, but still anchored to the original slide order and medical meaning.
- Use surgical translation especially for slides that are text-dense, OCR-noisy, or structurally awkward; do not use it to invent new content.

Source coverage guidance:
- `source_coverage` should state what was extracted from the PDF, such as slides, tables, figures, algorithms, cases, and references.
- `evidence_map` should connect sections back to slide/page references or clearly named source fragments.
- If a source is weakly OCR’d, preserve that in `source_notes` and keep the rewrite conservative.
- If a source section is missing or unreadable, leave the content missing rather than filling it with a best guess. Flag it instead.
- If a section is clearer in surgical translation than in the raw slide wording, record that in `extraction_notes` rather than hiding the source issue.

Visual placement guidance:
- For each module, provide 3 to 8 visual targets.
- Each visual target should include:
  - `target_id`
  - `title`
  - `page_targets`
  - `visual_type`
  - `placement_hint`
  - `importance`
  - `caption_hint`
- Keep visual placement flexible so the shell can reflow later.

Return format:
- Return a JSON array or a JSON object containing `modules`, depending on the batch manifest.
- Keep keys stable and machine-readable.
- Do not use markdown fences.
- If the batch manifest indicates a strict object wrapper, return only that wrapper and nothing else.
- If you are unsure whether the batch manifest expects an array or wrapper object, obey the manifest files inside the package instead of guessing.
