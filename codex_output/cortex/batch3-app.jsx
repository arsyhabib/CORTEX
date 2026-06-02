/* CORTEX DESIGN LIBRARY - Batch 3 App Shell
   Pages 17-24 only. Batch 1 and Batch 2 files remain preserved. */

const BATCH3_PAGES = [
  { id:17, label:'Quiz', icon:'Quiz' },
  { id:18, label:'Flashcard', icon:'Card' },
  { id:19, label:'Progress Dashboard', icon:'Dash' },
  { id:20, label:'AI Workspace', icon:'AI' },
  { id:21, label:'Provider Settings', icon:'Set' },
  { id:22, label:'QuickRef Modal', icon:'Ref' },
  { id:23, label:'Help About Privacy', icon:'Info' },
  { id:24, label:'States Library', icon:'State' },
];

function Batch3App() {
  const [t, setTweak] = useTweaks(BATCH3_DEFAULTS);
  const initialPage = Number(new URLSearchParams(window.location.search).get('page') || t.page || 17);
  const [page, setPage] = React.useState(BATCH3_PAGES.some(p => p.id === initialPage) ? initialPage : 17);
  const [animKey, setAnimKey] = React.useState(0);

  const navigate = React.useCallback((p) => {
    setAnimKey(k => k + 1);
    setPage(p);
    setTweak('page', p);
  }, [setTweak]);

  const renderPage = () => {
    const props = { onNavigate:navigate };
    switch(page) {
      case 17: return React.createElement(PageQuiz, props);
      case 18: return React.createElement(PageFlashcard, props);
      case 19: return React.createElement(PageProgressDashboard, props);
      case 20: return React.createElement(PageAIWorkspace, props);
      case 21: return React.createElement(PageProviderAdvancedSettings, props);
      case 22: return React.createElement(PageQuickRefModal, props);
      case 23: return React.createElement(PageHelpAboutPrivacy, props);
      case 24: return React.createElement(PageStatesLibrary, props);
      default: return React.createElement(PageQuiz, props);
    }
  };

  const PageIndicator = () => {
    const info = BATCH3_PAGES.find(p => p.id === page);
    if (!info) return null;
    return React.createElement('div', {
      style:{
        position:'absolute', top:52, left:'50%', transform:'translateX(-50%)',
        zIndex:50, pointerEvents:'none', animation:'slide-down 0.35s ease backwards',
      }
    },
      React.createElement('div', {
        style:{
          padding:'3px 12px', borderRadius:20,
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          background:'rgba(120,80,255,0.12)', border:`1px solid ${DL.glassBorder}`,
          fontSize:9, fontWeight:800, color:DL.accent, letterSpacing:0.4,
          display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap',
          boxShadow:`0 4px 16px ${DL.shadowColor}`,
        }
      },
        React.createElement('span', null, info.icon),
        React.createElement('span', null, `Page ${info.id}: ${info.label}`),
      )
    );
  };

  const BgParticles = React.useMemo(() => {
    const orbs = [
      { x:'8%', y:'18%', s:180, c:'rgba(99,102,241,0.17)', d:12 },
      { x:'74%', y:'12%', s:150, c:'rgba(168,85,247,0.15)', d:14 },
      { x:'54%', y:'68%', s:220, c:'rgba(6,214,160,0.08)', d:17 },
      { x:'84%', y:'82%', s:110, c:'rgba(251,191,36,0.08)', d:10 },
    ];
    return React.createElement('div', {
      style:{ position:'absolute', inset:0, overflow:'hidden', filter:'blur(60px)', zIndex:0, pointerEvents:'none' }
    },
      orbs.map((o,i) => React.createElement('div', {
        key:i,
        style:{
          position:'absolute', left:o.x, top:o.y, width:o.s, height:o.s,
          background:o.c, borderRadius:'50%',
          animation:`morph-blob ${o.d}s ease-in-out infinite, float-slow ${o.d + 3}s ease-in-out infinite`,
          animationDelay:`${i * -2.5}s`,
        }
      }))
    );
  }, []);

  return React.createElement(React.Fragment, null,
    React.createElement(IOSDevice, { dark:true, noNav:true, style:{ background:DL.bg } },
      React.createElement('div', {
        style:{
          display:'flex', flexDirection:'column', height:'100%',
          background:DL.bg, color:DL.text,
          fontFamily:'"SF Pro Display", "Inter", -apple-system, sans-serif',
          position:'relative', overflow:'hidden',
        }
      },
        BgParticles,
        React.createElement(PageIndicator),
        React.createElement('div', {
          key:animKey,
          style:{ flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1, overflow:'hidden' },
        }, renderPage()),
      )
    ),

    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label:'Page Navigation' }),
      React.createElement(TweakSelect, {
        label:'Halaman',
        value:String(page),
        options:BATCH3_PAGES.map(p => String(p.id)),
        optionLabels:BATCH3_PAGES.map(p => `${p.id}. ${p.label}`),
        onChange:v => navigate(Number(v)),
      }),
      React.createElement(TweakSection, { label:'Batch 3 Index' }),
      React.createElement('div', { style:{ padding:'4px 16px' }},
        BATCH3_PAGES.map(p => React.createElement('div', {
          key:p.id,
          onClick:() => navigate(p.id),
          style:{
            display:'flex', alignItems:'center', gap:8, padding:'7px 10px',
            borderRadius:10, cursor:'pointer', marginBottom:2,
            background:page === p.id ? 'rgba(168,85,247,0.15)' : 'transparent',
            border:page === p.id ? '1px solid rgba(168,85,247,0.25)' : '1px solid transparent',
            transition:'all 0.2s ease',
          }
        },
          React.createElement('span', { style:{ fontSize:10, color:DL.accent, fontWeight:900, width:30 }}, p.icon),
          React.createElement('span', {
            style:{
              fontSize:11, fontWeight:page === p.id ? 800 : 400,
              color:page === p.id ? DL.accent : 'rgba(255,255,255,0.62)',
            }
          }, `${p.id}. ${p.label}`),
        ))
      ),
      React.createElement(TweakSection, { label:'Design Notes' }),
      React.createElement('div', {
        style:{ padding:'6px 16px', fontSize:10, lineHeight:1.6, color:'rgba(255,255,255,0.45)' }
      },
        React.createElement('div', { style:{ fontWeight:800, color:'rgba(255,255,255,0.72)', marginBottom:4 }},
          'Cortex Design Library - Batch 3'),
        React.createElement('div', null, 'Pages 17-24: quiz, flashcard, progress, AI workspace, provider and haptic settings, QuickRef modal, help/privacy, and fallback states.'),
        React.createElement('div', { style:{ marginTop:6 }}, 'Design placeholders only. No real quiz engine, AI provider calls, API keys, haptic device access, or 3D rendering.'),
      ),
    )
  );
}

Object.assign(window, { Batch3App });
