# Source Gaps — Batch 1 / 6E

- `Pemeriksaan klinis neuro_250523_133200.docx`: no extractable text/tables; 12 embedded image(s). Manual visual review/OCR required.
- `STATUS EPILEPTIKUS koas.docx`: very low extractable text relative to 28 embedded images; likely PPT/image-heavy. Structured output includes extracted fragments plus visual-review warning.

## Important integration note
Text extraction from `.docx` preserves paragraphs and tables but does not validate captions or labels inside embedded raster images. Any visual-only slide should be inspected manually before final medical publication.



- Post-generation polish pass applied to wording-heavy fields while preserving provenance and reconstruction flags.

Post-generation surface polish applied: wording-heavy generated fields were rewritten to read more naturally while provenance and reconstruction flags were preserved.