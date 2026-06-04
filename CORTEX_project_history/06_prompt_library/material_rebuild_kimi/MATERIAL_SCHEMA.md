# Material Output Schema

Use this as the canonical structure for lecture-material rebuild output.

## Module object

```json
{
  "module_id": "lecture_6e_infeksi_001",
  "domain": "neuro_infection",
  "title": "Infeksi Sistem Saraf Pusat",
  "source_file": "EF Infeksi.docx",
  "source_type": "pdf_lecture",
  "source_author": "Mirna Marhami Iskandar",
  "source_date": null,
  "status": "finalized",
  "overview": "Short but dense module overview.",
  "learning_goals": ["...", "..."],
  "key_points": ["...", "..."],
  "surgical_translation": [
    {
      "translation_id": "st01",
      "section_id": "s01",
      "source_refs": ["slide 1", "slide 2"],
      "clean_teaching_text": "A clear, source-faithful rewrite of the awkward or noisy source section.",
      "notes": "Use this layer to normalize broken sentence order, repeated fragments, and OCR noise while keeping meaning intact."
    }
  ],
  "source_coverage": {
    "source_document_type": "pdf_lecture",
    "page_count": 42,
    "slides_seen": 42,
    "tables_seen": 3,
    "figures_seen": 5,
    "algorithms_seen": 2,
    "cases_seen": 1,
    "references_seen": 2,
    "appendices_seen": 0,
    "ocr_quality": "mixed"
  },
  "evidence_map": [
    {
      "section_id": "s01",
      "source_refs": ["slide 1", "slide 2", "page 3"],
      "note": "Opening overview and source author line."
    }
  ],
  "expanded_sections": [
    {
      "section_id": "s01",
      "heading": "Pendahuluan",
      "subheading": "What the learner should notice first",
      "content_blocks": [
        {
          "type": "paragraph",
          "text": "..."
        }
      ],
      "tables": [],
      "bullets": [],
      "callouts": [],
      "source_refs": ["slide 1", "slide 2"]
    }
  ],
  "tables": [
    {
      "table_id": "t01",
      "title": "Reference table",
      "columns": ["Term", "Meaning", "Clinical use"],
      "rows": [
        ["...", "...", "..."]
      ]
    }
  ],
  "figure_notes": [
    {
      "figure_id": "f01",
      "title": "LP safety and CSF workflow",
      "source_refs": ["slide 12", "page 13"],
      "teaching_point": "The figure shows the sequence before LP, the CSF collection step, and how the result changes management."
    }
  ],
  "table_notes": [
    {
      "table_id": "t01",
      "title": "Reference table",
      "source_refs": ["slide 8", "page 9"],
      "transcription_note": "Columns were preserved and row wording was normalized only where the source was OCR-noisy."
    }
  ],
  "diagnostic_logic": [
    {
      "step": 1,
      "title": "Recognize the syndrome",
      "explanation": "..."
    }
  ],
  "differential_notes": [
    {
      "item": "A",
      "how_to_separate": "..."
    }
  ],
  "treatment_notes": [
    {
      "phase": "acute",
      "content": "..."
    }
  ],
  "red_flags": ["..."],
  "exam_focus": ["..."],
  "glossary": [
    {
      "term": "term_name",
      "meaning": "..."
    }
  ],
  "extraction_notes": [
    "Opening slide included author and course context.",
    "Two tables were preserved in structured form.",
    "One figure was OCR-fragmentary and was flagged conservatively."
  ],
  "visual_targets": [
    {
      "target_id": "visual_01",
      "title": "Meningitis LCS Flow",
      "page_targets": ["page_9", "page_12"],
      "visual_type": "flowchart",
      "placement_hint": "after_intro",
      "importance": "high",
      "caption_hint": "Confirm LP safety, analyze LCS, then refine therapy."
    }
  ],
  "crosslinks": [
    {
      "type": "exam_set",
      "id": "exam_set_1",
      "reason": "Shared learning objective."
    }
  ],
  "source_notes": [
    "If OCR is fragmentary, mark this clearly.",
    "Do not invent missing factual claims."
  ],
  "coverage_gaps": [
    "Some low-resolution slides may only have partial OCR fidelity."
  ],
  "confidence_summary": "medium_high",
  "qc_flags": []
}
```

## Density targets

- Each module should be materially richer than a normal summary.
- Preserve equations, diagnostic thresholds, and table values.
- Use paragraph expansion where the source is terse.
- Keep factual accuracy above stylistic novelty.
- Maintain the source voice where the lecturer is clearly speaking.
- Avoid overcompression; the module should remain meaningfully detailed after serialization.
- If a visual or table exists in the source, do not drop it; preserve it as `figure_notes`, `table_notes`, or structured data in `expanded_sections`.
- If a field is not supported by the source, leave it empty or null and explain the gap in `source_notes` or `coverage_gaps`.
- The surgical translation layer should improve readability, not invent meaning; keep it aligned to the source order, terminology, and clinical intent.

## Anti-fluff rules

- Do not repeat the same idea in more than two forms.
- Do not pad with generic educational filler.
- Do not add new disease entities that are not implied by the source.
- Do not create fake references.
- Do not invent a polished narrative when the source is incomplete; preserve the incompleteness and flag it.
- Do not let the surgical translation layer drift into a generic re-summary; it must remain a faithful rewrite of the original lecture.
