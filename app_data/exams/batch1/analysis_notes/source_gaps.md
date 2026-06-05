# Source Gaps - Batch 1 / MCQ 6.E 2025

## Major gaps
1. Several OCR lines contain spelling noise: e.g., “impendesi”, “menigitis”, “mtro”, “cetriafson”, “veertigo”, “disfungi”, “bikonvek”. The JSON stores normalized wording while preserving `stem_original` and `source_lines`.
2. Q3 has an answer note for encephalitis HSV but lacks full original answer options.
3. Q6, Q18, Q25, Q26, Q30, and Q36 have only one visible/usable option in the source. These remain in original_exam_sets but are excluded from the active quiz bank.
4. Q7 is a stem-only item without usable answer options.
5. Q16 is incomplete and internally ambiguous: one option mentions entacapone, while side notes mention dopamine agonist/pramipexole and levodopa by age group.
6. Q23 has no clear answer highlight; the answer was inferred from neuroanatomy and marked medium confidence.
7. Q32 has no clear answer highlight and competing side notes; it is marked medium confidence.
8. Page 4 was not represented by the OCR transcript but contains Q39 and Q40. These were recovered visually.
9. Page 4 also shows an embedded Q75 reference screenshot. It was excluded from the main 6E sequence because it is not sequentially part of Q1-Q40.

## Downstream compiler recommendation
- Render low/medium confidence items with a visible uncertainty badge.
- Do not use placeholder-option items for timed exam mode unless the human editor supplies missing options.
- Keep `original_exam_sets` as the archival reconstruction layer and `quiz_bank` as the safe interactive layer.
