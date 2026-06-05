# Source Gaps — Batch 3

## Structural gaps
- The source is an explanation-heavy DOCX transcript, not a clean exam sheet.
- Options do not carry A/B/C/D/E labels in the transcript.
- Several options contain embedded lecturer/peer notes, answer hints, typos, or explanations; these were cleaned in `options` while raw wording is preserved in `origin.source_excerpt`.
- Page numbers were not available in the transcript, so provenance uses source line ranges rather than true page numbers.

## Visual gaps
- Two CT images are relevant and were preserved as visual assets:
  - `visual_assets/batch3_img_ct_epidural_hematoma.png`, after source line 287.
  - `visual_assets/batch3_img_ct_intracerebral_hemorrhage.png`, after source line 301.
- Two embedded images at the end of the DOCX appear unrelated to medical question content and were not linked to questions. Their presence is documented but not included as learning assets.

## Validation gaps
The following questions are most important for human review because the source does not provide a clean explicit answer marker or contains ambiguity: Q01, Q07, Q22, Q23, Q26, Q27, Q30, Q32, Q34, Q36, Q41, Q43, Q45, Q61, Q67, Q74.

## Non-extracted material
Lines 475–477 contain informal closing statements and were excluded from question/quiz/glossary outputs.
