# Refinement QC Rules

## Must pass
- JSON only.
- Same module count as input.
- Same wrapper shape as input.
- Same IDs, filenames, and page references.
- All readable prose should be in natural Bahasa Indonesia.
- Keep standard medical abbreviations and proper names intact where they are more precise than translation.
- Preserve source-faithful meaning and sequence.
- Do not invent content for missing fields.

## Language checks
- No English leakage in overview / learning_goals / key_points / expanded_sections / notes unless it is a proper term.
- If a sentence is already good Indonesian, do not over-translate it.
- If a field is technically better left in English, keep the term but translate the surrounding sentence.

## Structural checks
- Do not add or remove modules.
- Do not alter source references or evidence map anchors.
- Do not change the schema keys.
- Do not convert JSON into markdown or prose.

## Fidelity checks
- The refined output must still read like the same source content, only cleaner and more natural in Indonesian.
- If any area was unclear in the original, keep it conservative and mark the uncertainty in Indonesian.
