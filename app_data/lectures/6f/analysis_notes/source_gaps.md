# Source Gaps and Cautions

- Batch manifest uses relative paths containing `6F/BAHAN AI AGENT/`, while the uploaded package stores actual files under `source_docs/6F/`. Files were matched by filename only.
- Two image-only documents and one mostly image-based document required OCR (`ind+eng`). OCR text is useful but not as reliable as machine-readable DOCX text; affected sections are marked with OCR provenance and medium confidence.
- Original lecturer slide images/media are referenced only as placeholders; they are not embedded in generated JSON assets because licensing/clearance needs review.
- No authentic complete original exam set with full options and answer key was detected. Question-like prompts are inventoried separately.
- Generated quizzes and flashcards are source-derived learning items, not claimed as original exam questions.


- Post-generation polish pass applied to wording-heavy fields while preserving provenance and reconstruction flags.

Post-generation surface polish applied: wording-heavy generated fields were rewritten to read more naturally while provenance and reconstruction flags were preserved.