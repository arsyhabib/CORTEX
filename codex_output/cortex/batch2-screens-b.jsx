/* CORTEX DESIGN LIBRARY - Batch 2 Screens (13-16)
   Page 13: Media Viewer / 3D Anatomy Viewer Placeholder
   Page 14: Glossary / Terms Page
   Page 15: Quick Summary Page
   Page 16: Bilingual / Simpler Explanation State */

function PageMediaViewer3D({ onNavigate }) {
  const [mode, setMode] = React.useState('poster');
  const modeCopy = {
    poster:{ title:'Poster fallback', sub:'Static anatomy poster shown before loading starts.', badge:'Fallback' },
    loading:{ title:'Loading viewport', sub:'Skeleton overlay and scanline while media prepares.', badge:'Loading' },
    unsupported:{ title:'Unsupported state', sub:'Graceful message when 3D is not available.', badge:'Unsupported' },
    ready:{ title:'3D placeholder only', sub:'No real 3D implementation. Visual viewport mock for Batch 2.', badge:'Placeholder' },
  };
  const current = modeCopy[mode];

  return React.createElement(B2PageShell, {
    label:'P13-MediaViewer3D',
    title:'Media Viewer',
    subtitle:'3D placeholder',
    onBack:()=>onNavigate(12),
    right:React.createElement(B1Badge, { color: mode === 'unsupported' ? DL.gold : DL.teal }, current.badge),
  },
    React.createElement(B1Card, { glow:true, pad:0, style:{ overflow:'hidden', marginBottom:14 }},
      React.createElement('div', {
        style:{
          position:'relative', height:286, overflow:'hidden',
          background:'radial-gradient(circle at 50% 38%,rgba(168,85,247,0.25),transparent 28%), linear-gradient(145deg,rgba(8,12,30,0.98),rgba(28,18,58,0.92))',
          display:'flex', alignItems:'center', justifyContent:'center',
        }
      },
        React.createElement('div', { style:{
          position:'absolute', inset:0,
          backgroundImage:'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize:'24px 24px',
          opacity:0.35,
        }}),
        mode === 'loading' && React.createElement('div', { style:{
          position:'absolute', left:0, right:0, height:70,
          background:'linear-gradient(180deg,transparent,rgba(6,214,160,0.12),transparent)',
          animation:'scanline 1.8s linear infinite',
        }}),
        mode === 'unsupported'
          ? React.createElement('div', { style:{ textAlign:'center', padding:24 }},
              React.createElement('div', { style:{ fontSize:34, color:DL.gold, marginBottom:10 }}, '!'),
              React.createElement('div', { style:{ fontSize:16, color:DL.text, fontWeight:800 }}, '3D unavailable'),
              React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:5, lineHeight:1.55 }},
                'Use poster fallback and text explanation for this lesson.'),
            )
          : React.createElement('div', { style:{
              position:'relative', width:142, height:176, borderRadius:44,
              background:'linear-gradient(160deg,rgba(99,102,241,0.32),rgba(168,85,247,0.18))',
              border:'1px solid rgba(255,255,255,0.16)',
              boxShadow:`0 20px 70px ${DL.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.18)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              transform:mode === 'ready' ? 'rotateY(-12deg) rotateX(5deg)' : 'none',
              animation:mode === 'ready' ? 'float 3.8s ease-in-out infinite' : 'none',
            }},
              React.createElement('div', { style:{
                width:78, height:112, borderRadius:'46% 54% 44% 56%',
                background:'linear-gradient(135deg,rgba(240,234,255,0.28),rgba(6,214,160,0.10))',
                border:'1px solid rgba(255,255,255,0.18)',
              }}),
              React.createElement('div', { style:{ position:'absolute', bottom:18, fontSize:10, color:DL.sub, fontWeight:800 }},
                mode === 'poster' ? 'POSTER' : mode === 'loading' ? 'LOADING' : '3D MOCK'),
            ),
        React.createElement('div', { style:{
          position:'absolute', left:14, right:14, bottom:14, padding:'10px 12px',
          borderRadius:16, background:'rgba(10,10,26,0.54)',
          border:'1px solid rgba(255,255,255,0.12)',
          backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
        }},
          React.createElement('div', { style:{ fontSize:13, fontWeight:800, color:DL.text }}, current.title),
          React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:2, lineHeight:1.4 }}, current.sub),
        ),
      ),
    ),

    React.createElement('div', { style:{ marginBottom:14 }},
      React.createElement(B2Segmented, {
        value:mode,
        options:[
          { value:'poster', label:'Poster' },
          { value:'loading', label:'Loading' },
          { value:'unsupported', label:'No 3D' },
          { value:'ready', label:'Mock' },
        ],
        onChange:setMode,
      }),
    ),

    React.createElement(B1Section, { title:'Viewport Controls', style:{ marginBottom:9 } }),
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:14 }},
      ['Rotate','Zoom','Labels'].map((item, i) => React.createElement(B1Card, {
        key:i, pad:11, onClick:function(){},
        style:{ textAlign:'center', opacity:mode === 'unsupported' ? 0.45 : 1 },
      },
        React.createElement('div', { style:{ fontSize:16, color:DL.accent, fontWeight:900 }}, i === 0 ? '<>' : i === 1 ? '+' : 'Aa'),
        React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:5, fontWeight:700 }}, item),
      )),
    ),

    React.createElement(B2Callout, { tone:'caution', title:'Implementation boundary' },
      'This is intentionally a non-3D placeholder viewport. Batch 2 includes poster, loading, and unsupported states without loading models or real renderers.')
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
