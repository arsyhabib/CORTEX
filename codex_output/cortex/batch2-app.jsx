/* CORTEX DESIGN LIBRARY - Batch 2 App Shell
   Pages 9-16 only. Batch 1 files remain preserved. */

const BATCH2_PAGES = [
  { id:9, label:'Typography Reading', icon:'Aa' },
  { id:10, label:'Bullets', icon:'List' },
  { id:11, label:'Clinical Pearl', icon:'Pearl' },
  { id:12, label:'Image Cards', icon:'Image' },
  { id:13, label:'Media / 3D Mock', icon:'3D' },
  { id:14, label:'Glossary', icon:'Terms' },
  { id:15, label:'Quick Summary', icon:'Sum' },
  { id:16, label:'Bilingual Simple', icon:'Lang' },
];

function Batch2App() {
  const [t, setTweak] = useTweaks(BATCH2_DEFAULTS);
  const initialPage = Number(new URLSearchParams(window.location.search).get('page') || t.page || 9);
  const [page, setPage] = React.useState(BATCH2_PAGES.some(p => p.id === initialPage) ? initialPage : 9);
  const [animKey, setAnimKey] = React.useState(0);

  const navigate = React.useCallback((p) => {
    setAnimKey(k => k + 1);
    setPage(p);
    setTweak('page', p);
  }, [setTweak]);

  const renderPage = () => {
    const props = { onNavigate:navigate };
    switch(page) {
      case 9: return React.createElement(PageTypographyReading, props);
      case 10: return React.createElement(PageBulletContent, props);
      case 11: return React.createElement(PageCalloutClinicalPearl, props);
      case 12: return React.createElement(PageImageCard, props);
      case 13: return React.createElement(PageMediaViewer3D, props);
      case 14: return React.createElement(PageGlossaryTerms, props);
      case 15: return React.createElement(PageQuickSummary, props);
      case 16: return React.createElement(PageBilingualSimple, props);
      default: return React.createElement(PageTypographyReading, props);
    }
  };

  const PageIndicator = () => {
    const info = BATCH2_PAGES.find(p => p.id === page);
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
      { x:'10%', y:'18%', s:190, c:'rgba(99,102,241,0.17)', d:12 },
      { x:'72%', y:'12%', s:150, c:'rgba(168,85,247,0.15)', d:14 },
      { x:'52%', y:'66%', s:220, c:'rgba(6,214,160,0.08)', d:17 },
      { x:'82%', y:'82%', s:110, c:'rgba(251,191,36,0.08)', d:10 },
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
    React.createElement(IOSDevice, {
      dark:true, noNav:true,
      style:{ background:DL.bg },
    },
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
        options:BATCH2_PAGES.map(p => String(p.id)),
        optionLabels:BATCH2_PAGES.map(p => `${p.id}. ${p.label}`),
        onChange:v => navigate(Number(v)),
      }),
      React.createElement(TweakSection, { label:'Batch 2 Index' }),
      React.createElement('div', { style:{ padding:'4px 16px' }},
        BATCH2_PAGES.map(p => React.createElement('div', {
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
          React.createElement('span', { style:{ fontSize:10, color:DL.accent, fontWeight:900, width:28 }}, p.icon),
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
          'Cortex Design Library - Batch 2'),
        React.createElement('div', null, 'Pages 9-16: reading, bullets, clinical callouts, image cards, media placeholder states, glossary, summary, and bilingual simpler explanation.'),
        React.createElement('div', { style:{ marginTop:6 }}, 'Preserves Batch 1 liquid glass, blue/purple medical palette, rounded cards, tactile states, and mobile-first iOS framing.'),
      ),
    )
  );
}

Object.assign(window, { Batch2App });
