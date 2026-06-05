# Inference Log - Batch 2 / MCQ 6.3 TRAPEZIUS
## Normalization decisions
- Q01: status `missing_in_source`, confidence `low`. Sumber hanya berisi fragmen stem; opsi dan jawaban tidak tersedia.
- Q02: status `missing_in_source`, confidence `low`. Sumber hanya berisi fragmen stem; opsi dan jawaban tidak tersedia.
- Q03: status `missing_in_source`, confidence `low`. Sumber hanya berisi fragmen stem; jawaban tidak tersedia.
- Q05: status `missing_in_source`, confidence `low`. Sumber tidak menyediakan jawaban; detail lokasi nyeri juga disebut lupa, sehingga rekonstruksi diagnosis harus diverifikasi manual.
- Q11: status `confirmed_bold_in_pdf_with_spelling_noise`, confidence `medium`. Sumber menulis “Sertaline”, kemungkinan merujuk sertraline. Ejaan sumber dipertahankan dalam stem_original; normalisasi dicatat sebagai sertraline.
- Q12: status `missing_in_source`, confidence `low`. Jawaban tidak tersedia pada sumber. Secara konsep mungkin berkaitan dengan nervus fasialis, tetapi tidak dimasukkan sebagai jawaban karena tidak tertulis pada PDF.
- Q13: status `confirmed_bold_in_pdf_with_spelling_noise`, confidence `medium`. Sumber menulis “Syndrome Sundower”; istilah yang lebih lazim adalah sundowning/sundowner syndrome. Normalisasi dilakukan dengan tetap mencatat noise sumber.
- Q19: status `answer_fragment_in_source`, confidence `medium`. Sumber hanya menuliskan jawaban/frasa “anti kolinesterase inhibit”. Konteks klinis lengkap tidak tersedia sehingga item dipertahankan sebagai answer-fragment.
- Q32: status `confirmed_bold_in_pdf_abbreviation`, confidence `medium`. Sumber menandai “fdia”. Akronim ini dipertahankan; perlu verifikasi apakah dimaksudkan sebagai factitious disorder imposed on another dalam konteks lengkap.
- Q33: status `answer_embedded_in_source`, confidence `high`. Sumber memberikan aturan interpretasi langsung dalam tanda kurung.
- Q36: status `confirmed_bold_in_pdf_but_options_missing`, confidence `medium`. Sumber menandai “benar semua”, tetapi opsi yang dirujuk tidak tersedia. Jawaban dipertahankan, namun interpretasinya bergantung pada opsi asli.
- Q40: status `confirmed_bold_in_pdf_with_spelling_noise`, confidence `high`. Sumber menandai anoreksia “neevosa” (noise OCR/ejaan), dinormalisasi menjadi anoreksia nervosa.
- Q41: status `missing_in_source`, confidence `low`. Sumber hanya memuat fragmen stem; jawaban/stadium spesifik tidak tersedia.
- Q42: status `answer_fragment_in_source`, confidence `medium`. Sumber hanya menyediakan fragmen “skenario kasus” dan jawaban gangguan somatisasi; detail skenario tidak tersedia.
- Q43: status `answer_fragment_in_source`, confidence `medium`. Sumber hanya menyediakan fragmen “skenario kasus” dan jawaban gangguan konversi; detail skenario tidak tersedia.
- Q47: status `confirmed_bold_in_pdf_but_options_incomplete`, confidence `medium`. Sumber hanya menampilkan opsi a dan menandai stupor. Opsi lain tidak tersedia, sehingga item dipertahankan sebagai parsial.

## Placeholder option rule
- Where source options were absent, the JSON uses placeholder options solely to pass schema validation. The answer key is based on source bold/answer fragments when present.
