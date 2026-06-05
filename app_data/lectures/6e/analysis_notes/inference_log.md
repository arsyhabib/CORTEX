# Inference Log — Batch 1 / 6E

The following output elements are generated from source-context and must be treated as draft candidates until content QA:

- `summary` and `exam_focus` fields in lecture JSON files: generated from extracted headings, definitional sentences, and early meaningful source lines.
- `bilingual` sections: generated simplified Indonesian and English bridge text, marked with `generated_section` and confidence medium.
- `quiz_bank.generated.json`: generated quiz candidates from glossary/context, not authentic original exam questions.
- `flashcard_bank.generated.json`: generated from glossary terms.
- `visual_asset_manifest.generated.json` and `model3d_manifest.generated.json`: placeholder suggestions, not actual licensed assets.
- `original_exam_sets/*.json`: only for question-like/reasoning prompts detected in lecture files; marked reconstructed and low-confidence unless original options/answer key are present.

No external medical source was used. Claims and terms are either direct source text, source-contextual, or explicitly marked as generated/inferred.

Post-generation surface polish applied: wording-heavy generated fields were rewritten to read more naturally while provenance and reconstruction flags were preserved.