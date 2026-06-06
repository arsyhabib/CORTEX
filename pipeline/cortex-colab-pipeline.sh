#!/bin/bash
echo "CORTEX Pipeline on Colab Pro"
pip install -q pymupdf requests pillow 2>/dev/null
export GOOGLE_AI_API_KEY="${1:-$GOOGLE_AI_API_KEY}"
mkdir -p /content/drive/MyDrive/CORTEX/output
python3 /content/drive/MyDrive/CORTEX/pipeline/pdf-extractor.py /content/drive/MyDrive/CORTEX/input
for b in /tmp/cortex-pipeline/batches/batch_*; do
  python3 /content/drive/MyDrive/CORTEX/pipeline/batch-processor.py "$b"
done
python3 /content/drive/MyDrive/CORTEX/pipeline/cortex-merger.py \
  /tmp/cortex-pipeline/batches \
  /content/drive/MyDrive/CORTEX/output/cortex_materi.md \
  /content/drive/MyDrive/CORTEX/output/cortex_materi.json
echo "Done! Output: /content/drive/MyDrive/CORTEX/output/"
