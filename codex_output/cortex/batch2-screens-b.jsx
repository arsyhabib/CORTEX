/* CORTEX DESIGN LIBRARY - Batch 2 Screens (13-16)
   Page 13: Media Viewer / 3D Anatomy Viewer Placeholder
   Page 14: Glossary / Terms Page
   Page 15: Quick Summary Page
   Page 16: Bilingual / Simpler Explanation State */

const CORTEX_3D_PACKAGE_ROOT = 'CORTEX_project_history/05_release_artifacts/3d_final_ship_package/';
const CORTEX_3D_MANIFEST_URL = `${CORTEX_3D_PACKAGE_ROOT}manifests/final_ship_3d_manifest.json`;

const CORTEX_3D_ASSET_COPY = {
  nih_skeleton_001: {
    title: 'Human Skeleton',
    badge: 'Skeleton',
    caption: 'Interactive 3D skeleton reference for general anatomy, posture, trauma, and orientation.',
    hint: 'General anatomy / posture / trauma',
    alt: 'Three-dimensional human skeleton model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-016838',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
  nih_brain_001: {
    title: 'Brain anatomy model',
    badge: 'Neuro',
    caption: 'Interactive 3D brain reference for neuroanatomy, localization, seizure, and stroke-oriented teaching.',
    hint: 'Neuroanatomy / localization / stroke',
    alt: 'Three-dimensional brain anatomy model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-021159',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
  nih_eye_001: {
    title: 'Eye anatomy model',
    badge: 'Ophthalmic',
    caption: 'Interactive 3D eye reference for cranial nerve, visual pathway, and ophthalmology-oriented teaching.',
    hint: 'Cranial nerve / visual pathway',
    alt: 'Three-dimensional eye anatomy model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-020962',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
  nih_heart_001: {
    title: 'Heart anatomy model',
    badge: 'Cardio',
    caption: 'Interactive 3D heart reference for cardiovascular anatomy, perfusion, and systemic physiology.',
    hint: 'Perfusion / physiology / systemic circulation',
    alt: 'Three-dimensional whole heart anatomy model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-002636',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
  nih_lung_001: {
    title: 'Lung anatomy model',
    badge: 'Thorax',
    caption: 'Interactive 3D lung reference for respiratory anatomy, oxygenation, and thoracic teaching.',
    hint: 'Respiration / oxygenation / thorax',
    alt: 'Three-dimensional lung anatomy model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-021008',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
  nih_kidney_001: {
    title: 'Kidney anatomy model',
    badge: 'Renal',
    caption: 'Interactive 3D kidney reference for renal anatomy, fluid-electrolyte, and systemic disease teaching.',
    hint: 'Renal function / fluid-electrolyte',
    alt: 'Three-dimensional kidney anatomy model.',
    sourcePage: 'https://3d.nih.gov/entries/3DPX-020967',
    sourceLabel: 'NIH 3D',
    license: 'NIH 3D entry license (verify on page)',
  },
};

const CORTEX_3D_FALLBACK_BINDING = {
  page_id: 13,
  binding_id: 'page_13_core_anatomy_3d_viewer',
  binding_type: 'viewer3d_with_selector_and_poster_fallback',
  scope: 'active_runtime_only',
  title: 'Core Anatomy 3D Viewer',
  load_policy: {
    initial_render: 'poster_first',
    model_load: 'lazy_on_page_enter_or_user_tap',
    default_asset_id: 'nih_skeleton_001',
    selector_enabled: true,
    selector_asset_order: [
      'nih_skeleton_001',
      'nih_brain_001',
      'nih_eye_001',
      'nih_heart_001',
      'nih_lung_001',
      'nih_kidney_001',
    ],
    preserve_poster_during_load: true,
    failure_state: 'show_poster_caption_attribution_and_retry_button',
  },
  asset_bindings: [
    {
      asset_id: 'nih_skeleton_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/skeleton/Skeleton_NIH3D.glb',
      poster_path: 'assets/posters/3d/skeleton/nih_skeleton_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
    {
      asset_id: 'nih_brain_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/brain/brain.glb',
      poster_path: 'assets/posters/3d/brain/nih_brain_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
    {
      asset_id: 'nih_eye_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/eye/3d-vh-f-eye-l.glb',
      poster_path: 'assets/posters/3d/eye/nih_eye_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
    {
      asset_id: 'nih_heart_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/heart/ALM0006_Whole_NIH3D.glb',
      poster_path: 'assets/posters/3d/heart/nih_heart_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
    {
      asset_id: 'nih_lung_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/lung/3d-vh-f-lung.glb',
      poster_path: 'assets/posters/3d/lung/nih_lung_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
    {
      asset_id: 'nih_kidney_001',
      role: 'primary_selectable_model',
      model_path: 'assets/models/kidney/VH_F_Kidney_L.glb',
      poster_path: 'assets/posters/3d/kidney/nih_kidney_001.webp',
      fit_strategy: 'contain',
      status: 'final_ship_ready',
    },
  ],
  ui_requirements: {
    container_fit: 'content_fit_policy.viewer3d',
    safe_area: 'respect_mobile_safe_area_insets',
    controls: ['rotate', 'zoom', 'reset_view', 'model_selector', 'load_or_retry'],
    keyboard_accessibility: true,
    touch_accessibility: true,
    caption_visible_when_collapsed: true,
    attribution_visible_or_available_in_asset_info_panel: true,
  },
  content_pairing_notes: [
    'Brain: neuroanatomy, stroke, seizure, central-vs-peripheral localization.',
    'Eye: cranial nerve, visual pathway, dizziness/vertigo and ophthalmology references.',
    'Skeleton: general anatomy, posture, trauma, and reference pages.',
    'Heart: systemic physiology, perfusion, and case-based cardiovascular references.',
    'Lung: oxygenation, respiratory compromise, and thoracic teaching.',
    'Kidney: renal function, fluid-electrolyte, and systemic disease contexts.',
  ],
};

function PageMediaViewer3D({ onNavigate }) {
  const [manifest, setManifest] = React.useState(null);
  const [manifestStatus, setManifestStatus] = React.useState('loading');
  const [selectedAssetId, setSelectedAssetId] = React.useState(null);
  const [viewerState, setViewerState] = React.useState('poster');
  const [loadNonce, setLoadNonce] = React.useState(0);

  React.useEffect(() => {
    let alive = true;
    fetch(CORTEX_3D_MANIFEST_URL, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!alive) return;
        setManifest(data);
        setManifestStatus('ready');
      })
      .catch(() => {
        if (!alive) return;
        setManifest(null);
        setManifestStatus('fallback');
      });
    return () => {
      alive = false;
    };
  }, []);

  const pageBinding = React.useMemo(() => {
    const fromManifest = manifest && Array.isArray(manifest.page_binding_map)
      ? manifest.page_binding_map.find((entry) => entry.page_id === 13)
      : null;
    return fromManifest || CORTEX_3D_FALLBACK_BINDING;
  }, [manifest]);

  const assets = React.useMemo(() => {
    const list = Array.isArray(pageBinding.asset_bindings) ? [...pageBinding.asset_bindings] : [];
    const order = (pageBinding.load_policy && pageBinding.load_policy.selector_asset_order) || [];
    if (order.length) {
      list.sort((a, b) => order.indexOf(a.asset_id) - order.indexOf(b.asset_id));
    }
    return list;
  }, [pageBinding]);

  React.useEffect(() => {
    if (!assets.length) return;
    const defaultAssetId = (pageBinding.load_policy && pageBinding.load_policy.default_asset_id) || assets[0].asset_id;
    setSelectedAssetId((prev) => (prev && assets.some((asset) => asset.asset_id === prev) ? prev : defaultAssetId));
  }, [assets, pageBinding]);

  React.useEffect(() => {
    if (!selectedAssetId) return;
    setViewerState('loading');
    setLoadNonce((value) => value + 1);
  }, [selectedAssetId]);

  const selectedAsset = assets.find((asset) => asset.asset_id === selectedAssetId) || assets[0] || null;
  const selectedMeta = selectedAsset ? (CORTEX_3D_ASSET_COPY[selectedAsset.asset_id] || {}) : {};
  const selectedPoster = selectedAsset
    ? `${CORTEX_3D_PACKAGE_ROOT}${selectedAsset.poster_path}`
    : `${CORTEX_3D_PACKAGE_ROOT}assets/posters/3d/shared/model3d_unavailable.webp`;
  const selectedThumb = selectedAsset
    ? `${CORTEX_3D_PACKAGE_ROOT}${selectedAsset.poster_path.replace('.webp', '_thumb.webp')}`
    : `${CORTEX_3D_PACKAGE_ROOT}assets/posters/3d/shared/model3d_unavailable_thumb.webp`;
  const selectedModel = selectedAsset ? `${CORTEX_3D_PACKAGE_ROOT}${selectedAsset.model_path}` : '';
  const viewerBadge = viewerState === 'ready'
    ? '3D ready'
    : viewerState === 'error'
      ? 'Poster fallback'
      : viewerState === 'loading'
        ? 'Loading local GLB'
        : 'Poster first';
  const manifestBadge = manifestStatus === 'ready'
    ? 'Manifest live'
    : manifestStatus === 'fallback'
      ? 'Embedded fallback'
      : 'Manifest loading';

  const triggerReload = React.useCallback(() => {
    if (!selectedAsset) return;
    setViewerState('loading');
    setLoadNonce((value) => value + 1);
  }, [selectedAsset]);

  const openSource = React.useCallback(() => {
    const sourcePage = selectedAsset && selectedMeta.sourcePage;
    if (sourcePage && typeof window !== 'undefined') window.open(sourcePage, '_blank', 'noopener,noreferrer');
  }, [selectedAsset, selectedMeta]);

  return React.createElement(B2PageShell, {
    label:'P13-MediaViewer3D',
    title:'Media Viewer',
    subtitle:'3D anatomy viewer',
    onBack:()=>onNavigate(12),
    right:React.createElement(B1Badge, { color: manifestStatus === 'ready' ? DL.teal : manifestStatus === 'fallback' ? DL.gold : DL.accent }, manifestBadge),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, { color:DL.teal }, 'Final ship runtime'),
      React.createElement('div', { style:{ fontSize:24, fontWeight:900, color:DL.text, lineHeight:1.12 }}, 'Page 13 reads a real 3D manifest now'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, lineHeight:1.6, marginTop:8 }},
        'The shell now resolves local NIH 3D GLB paths with poster-first fallback. The poster stays visible until the model loads, and the page remains useful even if the browser cannot hydrate the custom element.'),
      React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap', marginTop:12 }},
        React.createElement(B1Badge, { color:DL.accent }, `${assets.length} models`),
        React.createElement(B1Badge, { color:DL.teal }, 'Poster fallback'),
        React.createElement(B1Badge, { color:DL.gold }, manifestBadge),
      ),
    ),

    React.createElement(B1Card, { glow:true, pad:0, style:{ overflow:'hidden', marginBottom:14 }},
      React.createElement('div', { style:{
        display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12,
        padding:'14px 14px 12px',
        borderBottom:`1px solid ${DL.glassBorder}`,
        background:'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
      }},
        React.createElement('div', { style:{ minWidth:0 }},
          React.createElement('div', { style:{ fontSize:11, fontWeight:900, letterSpacing:1.1, color:DL.teal, textTransform:'uppercase' }}, pageBinding.title || 'Core Anatomy 3D Viewer'),
          React.createElement('div', { style:{ fontSize:18, fontWeight:900, color:DL.text, lineHeight:1.15, marginTop:4 }}, selectedMeta.title || 'Select an anatomy model'),
          React.createElement('div', { style:{ fontSize:11, color:DL.sub, lineHeight:1.5, marginTop:5, maxWidth:640 }},
            selectedMeta.caption || 'Poster-first 3D anatomy viewer with local GLB runtime, captioned fallback, and mobile-safe fit.'),
        ),
        React.createElement(B1Badge, { color: viewerState === 'ready' ? DL.green : viewerState === 'error' ? DL.gold : viewerState === 'loading' ? DL.gold : DL.accent }, viewerBadge),
      ),
      React.createElement('div', { style:{
        padding:14,
        background:'radial-gradient(circle at 50% 18%, rgba(168,85,247,0.16), transparent 24%), linear-gradient(160deg, rgba(8,10,28,0.98), rgba(22,17,49,0.92))',
      }},
        React.createElement('div', { style:{
          position:'relative',
          width:'100%',
          maxWidth:680,
          aspectRatio:'4 / 3',
          margin:'0 auto',
          borderRadius:24,
          overflow:'hidden',
          backgroundImage:`linear-gradient(180deg, rgba(7,11,24,0.74), rgba(7,11,24,0.74)), url(${selectedPoster})`,
          backgroundSize:'cover',
          backgroundPosition:'center',
          border:`1px solid ${DL.glassBorder}`,
          boxShadow:`0 24px 72px ${DL.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        }},
          React.createElement('div', { style:{
            position:'absolute',
            inset:0,
            backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize:'26px 26px',
            opacity:0.30,
            pointerEvents:'none',
          }}),
          selectedAsset && React.createElement('model-viewer', {
            key:`${selectedAssetId}-${loadNonce}`,
            src:selectedModel,
            poster:selectedPoster,
            alt:selectedMeta.alt || '3D anatomy model',
            style:{ width:'100%', height:'100%', position:'absolute', inset:0, display:'block', background:'transparent' },
            'camera-controls': true,
            'auto-rotate': true,
            'auto-rotate-delay': 1400,
            'shadow-intensity': 0.8,
            'interaction-prompt': 'auto',
            'reveal': 'auto',
            'loading': 'eager',
            'touch-action': 'pan-y',
            onLoad:()=>setViewerState('ready'),
            onError:()=>setViewerState('error'),
          }),
          React.createElement('div', { style:{
            position:'absolute',
            left:12,
            right:12,
            bottom:12,
            padding:'10px 12px',
            borderRadius:16,
            background:'rgba(8, 10, 24, 0.66)',
            border:`1px solid ${DL.glassBorder}`,
            backdropFilter:'blur(18px)',
            WebkitBackdropFilter:'blur(18px)',
            display:'flex',
            justifyContent:'space-between',
            gap:10,
            alignItems:'center',
          }},
            React.createElement('div', { style:{ minWidth:0 }},
              React.createElement('div', { style:{ fontSize:12, fontWeight:850, color:DL.text }}, viewerState === 'ready' ? 'Drag, zoom, and inspect' : viewerState === 'error' ? 'Poster fallback is preserved' : 'Poster stays visible while model loads'),
              React.createElement('div', { style:{ fontSize:10, color:DL.sub, lineHeight:1.45, marginTop:2 }}, selectedMeta.hint || 'Poster-first local GLB playback using the final ship manifest.'),
            ),
            React.createElement('div', { style:{ display:'flex', gap:8, flexShrink:0 }},
              React.createElement('button', {
                type:'button',
                onClick:triggerReload,
                className:'cortex-motion-press',
                style:{
                  padding:'10px 12px',
                  borderRadius:14,
                  border:`1px solid ${DL.glassBorder}`,
                  background:'rgba(255,255,255,0.06)',
                  color:DL.text,
                  fontFamily:'inherit',
                  fontSize:11,
                  fontWeight:850,
                  cursor:'pointer',
                },
              }, viewerState === 'error' ? 'Retry' : 'Reload'),
              React.createElement('button', {
                type:'button',
                onClick:openSource,
                className:'cortex-motion-press',
                style:{
                  padding:'10px 12px',
                  borderRadius:14,
                  border:'none',
                  background:DL.grad,
                  color:'#fff',
                  fontFamily:'inherit',
                  fontSize:11,
                  fontWeight:900,
                  cursor:'pointer',
                },
              }, 'NIH page'),
            ),
          ),
        ),
      ),
    ),

    React.createElement(B1Section, { title:'Model Selector', style:{ marginBottom:10 } }),
    React.createElement('div', { style:{
      display:'grid',
      gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',
      gap:10,
      marginBottom:14,
    }},
      assets.map((asset) => {
        const meta = CORTEX_3D_ASSET_COPY[asset.asset_id] || {};
        const active = selectedAssetId === asset.asset_id;
        return React.createElement('button', {
          key:asset.asset_id,
          type:'button',
          onClick:()=>setSelectedAssetId(asset.asset_id),
          className:'cortex-motion-press',
          style:{
            display:'flex',
            alignItems:'center',
            gap:10,
            width:'100%',
            padding:10,
            borderRadius:18,
            border:active ? '1px solid rgba(168,85,247,0.45)' : `1px solid ${DL.glassBorder}`,
            background:active ? 'rgba(168,85,247,0.14)' : DL.glass,
            color:'inherit',
            fontFamily:'inherit',
            cursor:'pointer',
            textAlign:'left',
            boxShadow:active ? `0 12px 34px ${DL.shadowColor}` : 'none',
          },
        },
          React.createElement('img', {
            src:`${CORTEX_3D_PACKAGE_ROOT}${asset.poster_path.replace('.webp', '_thumb.webp')}`,
            alt:meta.alt || meta.title || asset.asset_id,
            style:{
              width:52,
              height:52,
              borderRadius:16,
              objectFit:'cover',
              flexShrink:0,
              border:`1px solid ${DL.glassBorder}`,
              boxShadow:'0 8px 18px rgba(0,0,0,0.18)',
            },
          }),
          React.createElement('div', { style:{ minWidth:0, flex:1 }},
            React.createElement('div', { style:{ fontSize:13, fontWeight:900, color:DL.text, lineHeight:1.15 }}, meta.title || asset.asset_id),
            React.createElement('div', { style:{ fontSize:10, color:DL.sub, lineHeight:1.4, marginTop:4 }}, meta.hint || meta.caption || asset.fit_strategy),
            React.createElement('div', { style:{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }},
              React.createElement(B1Badge, { color: active ? DL.teal : DL.accent, style:{ padding:'4px 8px', minHeight:0 }}, asset.fit_strategy || 'contain'),
              React.createElement(B1Badge, { color: DL.gold, style:{ padding:'4px 8px', minHeight:0 }}, 'NIH 3D'),
            ),
          ),
        );
      }),
    ),

    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(190px, 1fr))', gap:10, marginBottom:14 }},
      React.createElement(B1Card, { pad:13 },
        React.createElement('div', { style:{ fontSize:11, fontWeight:900, letterSpacing:1, textTransform:'uppercase', color:DL.teal }}, 'Manifest status'),
        React.createElement('div', { style:{ fontSize:15, fontWeight:900, color:DL.text, marginTop:5 }}, manifestStatus === 'ready' ? 'Fetched from final ship package' : 'Embedded fallback runtime'),
        React.createElement('div', { style:{ fontSize:10, color:DL.sub, lineHeight:1.55, marginTop:4 }}, 'The runtime keeps a local fallback so this page still works even when opened directly from file:// or when the manifest fetch is blocked.'),
      ),
      React.createElement(B1Card, { pad:13 },
        React.createElement('div', { style:{ fontSize:11, fontWeight:900, letterSpacing:1, textTransform:'uppercase', color:DL.gold }}, 'Source'),
        React.createElement('div', { style:{ fontSize:15, fontWeight:900, color:DL.text, marginTop:5 }}, selectedMeta.sourceLabel || 'NIH 3D'),
        React.createElement('div', { style:{ fontSize:10, color:DL.sub, lineHeight:1.55, marginTop:4 }}, selectedMeta.sourcePage || 'https://3d.nih.gov/'),
      ),
      React.createElement(B1Card, { pad:13 },
        React.createElement('div', { style:{ fontSize:11, fontWeight:900, letterSpacing:1, textTransform:'uppercase', color:DL.accent }}, 'License'),
        React.createElement('div', { style:{ fontSize:15, fontWeight:900, color:DL.text, marginTop:5 }}, selectedMeta.license || 'NIH 3D entry license'),
        React.createElement('div', { style:{ fontSize:10, color:DL.sub, lineHeight:1.55, marginTop:4 }}, 'Verify attribution wording on the source page before public release.'),
      ),
    ),

    React.createElement(B2Callout, { tone:'note', title:'Archived atlas note' },
      'BodyParts3D remains archived reference only. The active page 13 selector uses the six NIH 3D assets bundled in the final ship package, while atlas browsing can be activated later as a separate pass if we decide it is worth the extra complexity.')
  );
}

function PageGlossaryTerms({ onNavigate }) {
  const [query, setQuery] = React.useState('');
  const terms = [
    { term:'Autoregulation', type:'Physiology', def:'A local control process that helps keep blood flow relatively stable despite pressure changes.' },
    { term:'Aphasia', type:'Neurology', def:'A language impairment affecting expression, comprehension, or both.' },
    { term:'Edema', type:'Pathology', def:'Excess fluid accumulation in tissue spaces, shown here as dummy educational copy.' },
    { term:'Perfusion', type:'Circulation', def:'Delivery of blood to tissue through capillary networks.' },
    { term:'Synapse', type:'Cell Biology', def:'A specialized junction where neurons communicate with target cells.' },
  ];
  const shown = terms.filter(t => (t.term + t.type + t.def).toLowerCase().includes(query.toLowerCase()));

  return React.createElement(B2PageShell, {
    label:'P14-Glossary',
    title:'Glossary',
    subtitle:'Terms & definitions',
    onBack:()=>onNavigate(13),
    right:React.createElement(B1Badge, null, `${shown.length} terms`),
  },
    React.createElement(B1SearchInput, {
      value:query,
      onChange:setQuery,
      placeholder:'Search dummy terms...',
      style:{ marginBottom:14 },
    }),

    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, null, 'Term bank'),
      React.createElement('div', { style:{ fontSize:20, fontWeight:800, color:DL.text, lineHeight:1.25 }},
        'Medical Vocabulary for Fast Review'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, lineHeight:1.55, marginTop:7 }},
        'Dummy glossary entries with tags, definitions, and press-ready rows.'),
    ),

    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 }},
      shown.map((item, i) => React.createElement(B1Card, {
        key:item.term,
        pad:14,
        onClick:function(){},
        style:{ animation:'stagger-in 0.3s ease backwards', animationDelay:`${i * 0.04}s` },
      },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }},
          React.createElement('div', { style:{ flex:1 }},
            React.createElement('div', { style:{ fontSize:15, fontWeight:850, color:DL.text }}, item.term),
            React.createElement('div', { style:{ fontSize:12, lineHeight:1.58, color:DL.sub, marginTop:5 }}, item.def),
          ),
          React.createElement(B1Badge, { color:i % 2 ? DL.teal : DL.accent }, item.type),
        ),
        React.createElement('div', { style:{ display:'flex', gap:6, marginTop:11 }},
          ['Save','Explain','Quiz'].map((action, idx) => React.createElement(B1Badge, {
            key:idx,
            style:{ flex:1, justifyContent:'center', cursor:'pointer' },
          }, action)),
        ),
      )),
    ),
  );
}

function PageQuickSummary({ onNavigate }) {
  const points = [
    'Stable structure makes medical reading faster on mobile.',
    'Clinical pearls should be visually distinct but not visually loud.',
    'Image and media placeholders need graceful fallback states.',
    'Glossary actions should support save, simplify, and quiz flows.',
  ];

  return React.createElement(B2PageShell, {
    label:'P15-QuickSummary',
    title:'Summary',
    subtitle:'End of lesson',
    onBack:()=>onNavigate(14),
    right:React.createElement(B1Badge, { color:DL.gold }, '4 takeaways'),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, { color:DL.gold }, 'Quick summary'),
      React.createElement('div', { style:{ fontSize:22, fontWeight:850, color:DL.text, lineHeight:1.22 }},
        'What to Remember from This Section'),
      React.createElement('div', { style:{ display:'flex', gap:8, marginTop:13 }},
        React.createElement(B2StatPill, { label:'TIME', value:'2 min' }),
        React.createElement(B2StatPill, { label:'RECALL', value:'High', color:DL.green }),
        React.createElement(B2StatPill, { label:'NEXT', value:'Quiz' }),
      ),
    ),

    React.createElement(B1Card, { pad:15, style:{ marginBottom:14 }},
      points.map((point, i) => React.createElement('div', {
        key:i,
        style:{
          display:'grid', gridTemplateColumns:'30px 1fr', gap:10, alignItems:'start',
          padding:'10px 0', borderBottom:i < points.length - 1 ? '1px solid rgba(255,255,255,0.045)' : 'none',
        }
      },
        React.createElement('div', { style:{
          width:30, height:30, borderRadius:12, background:i === 0 ? DL.gradA : 'rgba(255,255,255,0.055)',
          border:i === 0 ? 'none' : `1px solid ${DL.glassBorder}`,
          color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:12, fontWeight:900,
        }}, i + 1),
        React.createElement('div', { style:{ fontSize:13, lineHeight:1.55, color:DL.sub, paddingTop:3 }}, point),
      )),
    ),

    React.createElement(B1Section, { title:'Recall Actions', style:{ marginBottom:9 } }),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }},
      [
        { title:'5-question quiz', sub:'Dummy practice set', color:DL.accent },
        { title:'Flashcards', sub:'Review saved terms', color:DL.teal },
        { title:'Simplify', sub:'Plain-language mode', color:DL.gold },
        { title:'Bookmark', sub:'Save summary card', color:DL.green },
      ].map((item, i) => React.createElement(B1Card, {
        key:i, pad:13, onClick: i === 2 ? ()=>onNavigate(16) : function(){},
      },
        React.createElement('div', { style:{ fontSize:13, fontWeight:850, color:item.color, lineHeight:1.3 }}, item.title),
        React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:4 }}, item.sub),
      )),
    ),

    React.createElement(B2Callout, { tone:'pearl', title:'End-state affordance' },
      'A summary screen should offer a clear next step without crowding the learner after a dense section.')
  );
}

function PageBilingualSimple({ onNavigate }) {
  const [mode, setMode] = React.useState('simple');
  const simple = mode === 'simple';

  return React.createElement(B2PageShell, {
    label:'P16-BilingualSimple',
    title:'Simpler',
    subtitle:'Bilingual state',
    onBack:()=>onNavigate(15),
    right:React.createElement(B1Badge, { color:simple ? DL.gold : DL.teal }, simple ? 'Simple' : 'Bilingual'),
  },
    React.createElement(B1Card, { glow:true, style:{ marginBottom:14 }},
      React.createElement(B2Kicker, { color:simple ? DL.gold : DL.teal }, 'Accessible explanation'),
      React.createElement('div', { style:{ fontSize:21, fontWeight:850, color:DL.text, lineHeight:1.22 }},
        'Perfusion Explained for Different Reading Needs'),
      React.createElement('div', { style:{ fontSize:12, color:DL.sub, lineHeight:1.55, marginTop:7 }},
        'Dummy state showing simpler wording and bilingual support inside the same mobile frame.'),
    ),

    React.createElement('div', { style:{ marginBottom:14 }},
      React.createElement(B2Segmented, {
        value:mode,
        options:[
          { value:'simple', label:'Simple ID' },
          { value:'bilingual', label:'ID + EN' },
          { value:'medical', label:'Medical' },
        ],
        onChange:setMode,
      }),
    ),

    mode === 'bilingual'
      ? React.createElement(React.Fragment, null,
          React.createElement(B1Card, { pad:15, style:{ marginBottom:12 }},
            React.createElement(B1Badge, { color:DL.teal, style:{ marginBottom:10 }}, 'Indonesia'),
            React.createElement(B2ReadingBlock, { lead:true },
              'Perfusi adalah aliran darah yang membawa oksigen ke jaringan. Jika aliran ini turun, sel tubuh bisa bekerja lebih lambat atau rusak.'),
          ),
          React.createElement(B1Card, { pad:15, style:{ marginBottom:14 }},
            React.createElement(B1Badge, { color:DL.accent, style:{ marginBottom:10 }}, 'English'),
            React.createElement(B2ReadingBlock, { lead:true },
              'Perfusion means blood flow that delivers oxygen to tissue. When flow drops, cells may slow down or become injured.'),
          ),
        )
      : React.createElement(B1Card, { pad:16, style:{ marginBottom:14 }},
          React.createElement(B1Badge, { color:simple ? DL.gold : DL.accent, style:{ marginBottom:10 }},
            simple ? 'Simpler wording' : 'Medical wording'),
          React.createElement(B2ReadingBlock, { lead:true },
            simple
              ? 'Bayangkan darah seperti layanan antar oksigen. Perfusi berarti oksigen sampai ke tempat yang membutuhkan. Jika jalannya terganggu, tubuh memberi tanda seperti lemah, bingung, atau pucat.'
              : 'Perfusion is the delivery of oxygenated blood to tissue beds through vascular networks, influenced by pressure, resistance, and local autoregulation.'),
          React.createElement(B2ReadingBlock, null,
            simple
              ? 'Versi sederhana membantu pelajar baru memahami inti konsep sebelum masuk ke istilah teknis.'
              : 'The medical version is useful after the learner understands the simple model and is ready for mechanism-level detail.'),
        ),

    React.createElement(B1Section, { title:'Support Tools', style:{ marginBottom:9 } }),
    React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:9, marginBottom:14 }},
      [
        { label:'Read aloud', sub:'Voice-friendly sentence length' },
        { label:'Compare terms', sub:'Plain term beside medical term' },
        { label:'Long-press word', sub:'Reveal definition and translation' },
      ].map((item, i) => React.createElement(B1Card, { key:i, pad:13, onClick:function(){} },
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'center' }},
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:13, color:DL.text, fontWeight:800 }}, item.label),
            React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:2 }}, item.sub),
          ),
          React.createElement(B2PressHint, { active:i === 2, label:i === 2 ? 'Define' : 'Open' }),
        ),
      )),
    ),

    React.createElement(B2Callout, { tone:'note', title:'State requirement' },
      'This page demonstrates bilingual and simpler explanation states using dummy content only.')
  );
}

Object.assign(window, {
  PageMediaViewer3D, PageGlossaryTerms, PageQuickSummary, PageBilingualSimple,
});
