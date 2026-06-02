/* CORTEX DESIGN LIBRARY — Batch 1 App Shell
   Page router, tab bar, tweaks integration */

const BATCH1_PAGES = [
  { id:1, label:'Welcome', icon:'🚀' },
  { id:2, label:'Home', icon:'🏠' },
  { id:3, label:'Learning', icon:'📖' },
  { id:4, label:'Slide Detail', icon:'📋' },
  { id:5, label:'Sidebar', icon:'☰' },
  { id:6, label:'Search', icon:'🔍' },
  { id:7, label:'Settings', icon:'⚙️' },
  { id:8, label:'Motion', icon:'✨' },
];

function Batch1App() {
  const [t, setTweak] = useTweaks(BATCH1_DEFAULTS);
  const [page, setPage] = React.useState(1);
  const [animKey, setAnimKey] = React.useState(0);

  const navigate = React.useCallback((p) => {
    setAnimKey(k => k + 1);
    setPage(p);
  }, []);

  const renderPage = () => {
    const props = { onNavigate: navigate };
    switch(page) {
      case 1: return React.createElement(PageWelcome, props);
      case 2: return React.createElement(PageHome, props);
      case 3: return React.createElement(PageLearning, props);
      case 4: return React.createElement(PageSlideDetail, props);
      case 5: return React.createElement(PageSidebar, props);
      case 6: return React.createElement(PageSearch, props);
      case 7: return React.createElement(PageSettings, props);
      case 8: return React.createElement(PageMotionShowcase, props);
      default: return React.createElement(PageHome, props);
    }
  };

  /* Page indicator pill */
  const PageIndicator = () => {
    const info = BATCH1_PAGES.find(p => p.id === page);
    if (!info || page === 1) return null;
    return React.createElement('div', { style:{
      position:'absolute', top:52, left:'50%', transform:'translateX(-50%)',
      zIndex:50, pointerEvents:'none',
      animation:'slide-down 0.4s ease backwards',
    }},
      React.createElement('div', { style:{
        padding:'3px 12px', borderRadius:20,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        background:'rgba(120,80,255,0.12)', border:`1px solid ${DL.glassBorder}`,
        fontSize:9, fontWeight:700, color:DL.accent, letterSpacing:0.8,
        display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap',
        boxShadow:`0 4px 16px ${DL.shadowColor}`,
      }},
        React.createElement('span', null, info.icon),
        React.createElement('span', null, `Page ${info.id}: ${info.label}`),
      )
    );
  };

  /* Background particles */
  const BgParticles = React.useMemo(() => {
    const orbs = [
      { x:'15%', y:'20%', s:180, c:'rgba(99,102,241,0.18)', d:12 },
      { x:'75%', y:'15%', s:140, c:'rgba(168,85,247,0.14)', d:14 },
      { x:'50%', y:'65%', s:200, c:'rgba(99,102,241,0.12)', d:16 },
      { x:'85%', y:'80%', s:100, c:'rgba(251,191,36,0.08)', d:10 },
    ];
    return React.createElement('div', { style:{
      position:'absolute', inset:0, overflow:'hidden', filter:'blur(60px)', zIndex:0, pointerEvents:'none',
    }},
      orbs.map((o,i) => React.createElement('div', { key:i, style:{
        position:'absolute', left:o.x, top:o.y, width:o.s, height:o.s,
        background:o.c, borderRadius:'50%',
        animation:`morph-blob ${o.d}s ease-in-out infinite, float-slow ${o.d+3}s ease-in-out infinite`,
        animationDelay:`${i*-2.5}s`,
      }}))
    );
  }, []);

  return React.createElement(React.Fragment, null,
    React.createElement(IOSDevice, {
      dark: true, noNav: true,
      style: { background: DL.bg },
    },
      React.createElement('div', { style:{
        display:'flex', flexDirection:'column', height:'100%',
        background: DL.bg, color: DL.text,
        fontFamily: '"SF Pro Display", "Inter", -apple-system, sans-serif',
        position:'relative', overflow:'hidden',
      }},
        /* Background */
        BgParticles,
        /* Page indicator */
        React.createElement(PageIndicator),
        /* Page content */
        React.createElement('div', {
          key: animKey,
          style:{ flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1, overflow:'hidden' },
        }, renderPage()),
      )
    ),

    /* Tweaks Panel */
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label:'📄 Page Navigation' }),
      React.createElement(TweakSelect, {
        label:'Halaman',
        value: String(page),
        options: BATCH1_PAGES.map(p => String(p.id)),
        optionLabels: BATCH1_PAGES.map(p => `${p.icon} ${p.id}. ${p.label}`),
        onChange: v => navigate(Number(v)),
      }),
      React.createElement(TweakSection, { label:'📋 Page Index' }),
      React.createElement('div', { style:{ padding:'4px 16px' }},
        BATCH1_PAGES.map(p => React.createElement('div', {
          key: p.id,
          onClick: () => navigate(p.id),
          style:{
            display:'flex', alignItems:'center', gap:8, padding:'7px 10px',
            borderRadius:10, cursor:'pointer', marginBottom:2,
            background: page === p.id ? 'rgba(168,85,247,0.15)' : 'transparent',
            border: page === p.id ? '1px solid rgba(168,85,247,0.25)' : '1px solid transparent',
            transition:'all 0.2s ease',
          }
        },
          React.createElement('span', { style:{ fontSize:14 }}, p.icon),
          React.createElement('span', { style:{
            fontSize:11, fontWeight: page === p.id ? 700 : 400,
            color: page === p.id ? '#a855f7' : 'rgba(255,255,255,0.6)',
          }}, `${p.id}. ${p.label}`),
        ))
      ),
      React.createElement(TweakSection, { label:'ℹ️ Design Notes' }),
      React.createElement('div', { style:{
        padding:'6px 16px', fontSize:10, lineHeight:1.6, color:'rgba(255,255,255,0.4)',
      }},
        React.createElement('div', { style:{ fontWeight:700, color:'rgba(255,255,255,0.7)', marginBottom:4 }},
          '🧬 Cortex Design Library — Batch 1'),
        React.createElement('div', null, 'Core Experience & Navigation'),
        React.createElement('div', { style:{ marginTop:6 }}, '8 screens covering: app identity, shell, topbar, sidebar, content viewport, search, settings, theme & motion showcase.'),
        React.createElement('div', { style:{ marginTop:6 }}, 'Visual DNA: liquid glass, blue/purple gradient, rounded cards, iOS-native feel, tactile press states.'),
      ),
    ),
  );
}

Object.assign(window, { Batch1App });
