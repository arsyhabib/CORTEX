# Deduplication Report — Batch 5

## Strategy
The two DOCX files were treated as a family pair. Items were clustered by normalized stem similarity and token overlap. The canonical item was selected from the richest variant, prioritizing complete options and fuller stem context. All source variants are retained separately.

## Result
- Input candidate records after parsing: 183.
- Canonical clusters after deduplication: 108.
- Variant rows retained: 183.
- Placeholder/gap rows excluded from canonical exam set but documented: 7.

## Important cautions
- Several source lines contain shorthand annotations, such as `benar`, `harusnya`, arrows, and peer comments. These were preserved in the variant table but not blindly treated as authoritative.
- Some questions remain low-confidence because no explicit answer key exists or the source note is ambiguous.
