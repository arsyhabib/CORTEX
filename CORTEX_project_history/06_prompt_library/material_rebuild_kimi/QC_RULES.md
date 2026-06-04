# QC Rules for Material Rebuild

## Must pass

- JSON only.
- Exactly one module per source document unless the source is clearly composite.
- No empty `overview`, `expanded_sections`, `exam_focus`, or `visual_targets`.
- No invented citations or fake references.
- No payloads that are just summaries of summaries.
- Each module should remain source-faithful and detailed.
- Each module must preserve the lecture's actual structure: title slide context, headings, subheadings, tables, figures, and algorithmic order when present.
- Each module must include at least one `evidence_map` entry that clearly links the content to source page/slide references.
- Each module must include `source_coverage`, `source_notes`, and `extraction_notes` so we can audit what was really extracted.
- Every table or figure that materially appears in the source must be represented as structured content or explicitly noted as missing / unreadable.

## Consistency rules

- Use stable IDs.
- Preserve source filenames exactly in `source_file`.
- Use `status: finalized` only when the module is complete.
- Mark uncertain OCR sections as `source_fragmentary`.
- Keep section headings aligned with the source structure.
- Keep table columns consistent within each module.
- Keep `visual_targets` grounded in explicit source material; no invented visual themes.
- Keep `crosslinks` conservative: link only to real app surfaces or clearly relevant domain neighbors.

## Content density rules

- Aim for a serialized module size equivalent to roughly 30 KB or more of dense content.
- Use explanation, reasoning, and recap, but do not repeat the same idea over and over.
- Expand where the source is terse.
- Keep quotation reuse minimal and only when the lecturer wording is itself important.
- If a source is mostly OCR-dense but text-light, expand only from what can be read with confidence and flag the rest.
- If the source is sparse, do not force the 30 KB target by padding; instead preserve the true source density and document the gap.

## Allowed synthesis

- Short bridge sentences that connect sections.
- Teaching clarifications that are directly implied by the source.
- Exam-focus framing based on the source.
- Visual placement hints.
- Short source-faithful connectors that preserve sequence and classroom logic.

## Forbidden synthesis

- New medical claims not supported by the source.
- New exam facts.
- New visuals that do not belong to the source.
- Filling blanks with confident guesses.
- Generic filler that makes the lecture sound polished but removes the lecturer's actual emphasis.
- Rewriting a table, figure, or algorithm into a vague paragraph when the source clearly provides a structured form.

## Output validation checklist

- 24 modules in Batch 1.
- 13 modules in Batch 2.
- Every module has `visual_targets`.
- Every module has `glossary` or a rationale if none exist.
- Every module has `exam_focus`.
- Every module has `source_notes`.
- Every module has `source_coverage` and `evidence_map`.
- Every module has at least one extraction note explaining what was captured or what was unreadable.
- Every module with a table or figure has a corresponding structured note or explicit gap note.

## Final self-audit before returning JSON

1. Confirm the source PDF title and file name are correct.
2. Confirm the module count matches the batch manifest.
3. Confirm there is no markdown outside the JSON.
4. Confirm the module contains the source's main teaching flow, not a generic rewrite.
5. Confirm no field was invented from outside the PDF.
6. Confirm every unreadable region is flagged rather than guessed.
7. Confirm tables and figures are represented structurally or called out as missing.
8. Confirm visual targets are tied to explicit source content and can later be rebound safely in the shell.
