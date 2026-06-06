#!/bin/bash
# ============================================================
# CORTEX PDF Pipeline — Orchestrator CLI
# ============================================================
# Pipeline lengkap: PDF → Markdown → JSON CORTEX
# Dengan parallel sub-agents untuk kecepatan maksimal
#
# Cara Pakai:
#   1. Taruh semua PDF di folder /tmp/cortex-pipeline/pdfs/
#      ATAU langsung:
#       ./cortex-pipeline.sh pdf1.pdf pdf2.pdf ...
#
#   2. Jalankan pipeline:
#       ./cortex-pipeline.sh
#
#   3. Output:
#       /tmp/cortex-pipeline/cortex_materi.md
#       /tmp/cortex-pipeline/cortex_materi.json
# ============================================================
set -e

BASE_DIR="/tmp/cortex-pipeline"
EXTRACTOR="$HOME/Desktop/pdf-extractor.py"
BATCH_PROC="$HOME/Desktop/batch-processor.py"
MERGER="$HOME/Desktop/cortex-merger.py"
API_KEYS="$HOME/.zshrc"

# Warna output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔══════════════════════════════════════════════════╗"
echo "║       CORTEX PDF PIPELINE v1.0                  ║"
echo "║       PDF → Markdown → JSON (Parallel Batch)    ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"

# Source API keys
if [ -f "$API_KEYS" ]; then
    source "$API_KEYS"
    echo -e "${GREEN}✅ API keys loaded${NC}"
fi

# ── Step 1: Copy PDFs ──
mkdir -p "$BASE_DIR/pdfs"

if [ $# -gt 0 ]; then
    echo -e "\n${YELLOW}📥 Copy ${#} file PDF...${NC}"
    for pdf in "$@"; do
        if [ -f "$pdf" ]; then
            cp "$pdf" "$BASE_DIR/pdfs/"
            echo "   ✅ $pdf"
        else
            echo -e "   ${RED}❌ Not found: $pdf${NC}"
        fi
    done
fi

# ── Step 2: Extract pages ──
echo -e "\n${YELLOW}📚 Extract pages from PDFs...${NC}"
python3 "$EXTRACTOR" "$BASE_DIR/pdfs"/*.pdf > "$BASE_DIR/extract_output.json" 2>&1
echo -e "${GREEN}✅ Extraction complete${NC}"

# Baca manifest
MANIFEST=$(python3 -c "
import json
with open('$BASE_DIR/manifest.json') as f:
    d = json.load(f)
print(json.dumps({
    'batches': len(d['batches']),
    'pages': d['total_pages'],
    'pdfs': d['total_pdfs'],
    'batch_ids': [b['batch_id'] for b in d['batches']],
    'batch_dirs': [b['dir'] for b in d['batches']],
}))
")

echo ""
echo "📊 Pipeline Info:"
echo "   PDFs: $(echo $MANIFEST | python3 -c "import json,sys;print(json.load(sys.stdin)['pdfs'])")"
echo "   Pages: $(echo $MANIFEST | python3 -c "import json,sys;print(json.load(sys.stdin)['pages'])")"
echo "   Batches: $(echo $MANIFEST | python3 -c "import json,sys;print(json.load(sys.stdin)['batches'])")"

# ── Step 3: Proses Batch (sequential fallback) ──
echo -e "\n${YELLOW}🔧 Processing batches...${NC}"

BATCH_IDS=($(echo $MANIFEST | python3 -c "import json,sys; ids=json.load(sys.stdin)['batch_ids']; print(' '.join(str(i) for i in ids))"))
BATCH_DIRS=($(echo $MANIFEST | python3 -c "import json,sys; dirs=json.load(sys.stdin)['batch_dirs']; print(' '.join(dirs))"))

for i in "${!BATCH_IDS[@]}"; do
    bid="${BATCH_IDS[$i]}"
    bdir="${BATCH_DIRS[$i]}"
    echo -e "\n${BLUE}📦 Batch ${bid}: ${bdir}${NC}"
    
    GOOGLE_AI_API_KEY="$GOOGLE_AI_API_KEY" \
    FEATHERLESS_VISION_KEY="$FEATHERLESS_VISION_KEY" \
    VISION_MODE="gemini" \
    python3 "$BATCH_PROC" "$bdir"
    
    echo -e "${GREEN}   ✅ Batch ${bid} done${NC}"
done

# ── Step 4: Merge to JSON ──
echo -e "\n${YELLOW}🔷 Merging all batches → Markdown + JSON...${NC}"
python3 "$MERGER"

echo -e "\n${GREEN}${BOLD}"
echo "╔══════════════════════════════════════════════════╗"
echo "║       ✅ PIPELINE COMPLETE                       ║"
echo "╚══════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""
echo "📄 Markdown: $BASE_DIR/cortex_materi.md"
echo "📊 JSON:     $BASE_DIR/cortex_materi.json"
echo "📈 Stats:    $BASE_DIR/cortex_stats.json"
echo ""
echo "Total size:"
ls -lh "$BASE_DIR/cortex_materi.json" "$BASE_DIR/cortex_materi.md" 2>/dev/null
