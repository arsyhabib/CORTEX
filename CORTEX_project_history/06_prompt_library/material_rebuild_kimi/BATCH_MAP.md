# Kimi Material Batch Map

Use two batches only.

## Batch 1

**Scope:** 6E lecture PDFs  
**Source count:** 24 documents  
**Domain:** neurology and related neuro teaching

### Recommended handling
- Process as one batch with one module per source document.
- Preserve the original source order unless the manifest says a document is clearly a duplicate or a continuation.
- Give extra attention to slide-heavy or OCR-heavy documents.
- For each PDF, extract the complete lecture spine: opening slide, course context, headings, definitions, clinical logic, diagnostic flow, treatment, tables, figures, and exam pearls.
- Keep visual placement hints for later shell injection.
- Do not merge documents unless the source itself clearly indicates a continued lecture or split handout that should be one module.
- Preserve source filename exactly in `source_file`, even if the title is normalized.
- If a document is composite or contains an obvious continuation, keep it as one module only if the PDF itself reads like one uninterrupted lecture; otherwise split only when the source clearly declares separate lectures.
- If a slide/section is too fragmentary to reconstruct faithfully, flag it instead of guessing.

### Expected output
- `modules[]` array with 24 module objects
- `batch_id`: `batch_1_6e`
- `batch_label`: `Neurology / Batch 1 / 6E`

## Batch 2

**Scope:** 6F lecture PDFs  
**Source count:** 13 documents  
**Domain:** psychiatry and behavior

### Recommended handling
- Process as one batch with one module per source document.
- Preserve the original source order unless a doc is clearly a continuation or composite lecture.
- Keep psychopharmacology, diagnosis, and ethics detail intact.
- For each PDF, extract the full teaching spine: diagnostic criteria, core symptoms, risk factors, medication classes, side effects, safety cautions, contraindications, legal and ethical framing, and exam pitfalls.
- Give explicit `visual_targets` for any slide that naturally wants an infographic, comparison diagram, or summary strip.
- Keep psychiatry-specific terminology, medication details, and legal/ethical framing precise and conservative.
- If the source has decision trees or management flow, preserve them as structured steps rather than flattening them into prose.
- If a medication appears in the source, keep its class and the lecture's practical warning or use note when visible.

### Expected output
- `modules[]` array with 13 module objects
- `batch_id`: `batch_2_6f`
- `batch_label`: `Psychiatry dan Perilaku / Batch 2 / 6F`

## Content quality target

- The output must be substantially richer than the source text dump.
- Keep rewritten content faithful to the source and avoid invention.
- The output should be suitable for final app integration without further paraphrase.
- Every module should be dense enough that the serialized JSON is materially large and information-rich.
- The output should be detailed enough that the app can render it as the primary source of truth for the lecture surface, not as a teaser summary.
- Avoid compressing multiple source sections into one synthetic paragraph if the source clearly separates them.

## Visual rebind notes

- Visuals will be rebound later in the shell.
- Do not hardcode the final page layout.
- Add `visual_targets` so the application can place companion visuals after integration.
- Keep `page_targets` as stable references rather than final placement decisions.
- If a lecture has no obvious visual candidate, still provide a conservative visual target for a supportive diagram, summary strip, or comparison card that is explicitly implied by the source.
