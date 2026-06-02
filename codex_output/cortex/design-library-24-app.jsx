/* CORTEX DESIGN LIBRARY - Consolidated Batch 0 + Pages 1-24
   Adaptive fullscreen shell for desktop, iPad/tablet, Android tablet, and mobile. */

const CORTEX_LIBRARY_PAGES = [
  { id:0, batch:'B0', label:'Kernel v0.1', icon:'Core', component:'PageBatch0Kernel' },
  { id:1, batch:'B1', label:'Welcome', icon:'P1', component:'PageWelcome' },
  { id:2, batch:'B1', label:'Home Dashboard', icon:'P2', component:'PageHome' },
  { id:3, batch:'B1', label:'Learning', icon:'P3', component:'PageLearning' },
  { id:4, batch:'B1', label:'Slide Detail', icon:'P4', component:'PageSlideDetail' },
  { id:5, batch:'B1', label:'Sidebar', icon:'P5', component:'PageSidebar' },
  { id:6, batch:'B1', label:'Search', icon:'P6', component:'PageSearch' },
  { id:7, batch:'B1', label:'Settings', icon:'P7', component:'PageSettings' },
  { id:8, batch:'B1', label:'Motion', icon:'P8', component:'PageMotionShowcase' },
  { id:9, batch:'B2', label:'Typography', icon:'P9', component:'PageTypographyReading' },
  { id:10, batch:'B2', label:'Bullets', icon:'P10', component:'PageBulletContent' },
  { id:11, batch:'B2', label:'Clinical Pearl', icon:'P11', component:'PageCalloutClinicalPearl' },
  { id:12, batch:'B2', label:'Image Cards', icon:'P12', component:'PageImageCard' },
  { id:13, batch:'B2', label:'Media Viewer', icon:'P13', component:'PageMediaViewer3D' },
  { id:14, batch:'B2', label:'Glossary', icon:'P14', component:'PageGlossaryTerms' },
  { id:15, batch:'B2', label:'Summary', icon:'P15', component:'PageQuickSummary' },
  { id:16, batch:'B2', label:'Bilingual', icon:'P16', component:'PageBilingualSimple' },
  { id:17, batch:'B3', label:'Quiz', icon:'P17', component:'PageQuiz' },
  { id:18, batch:'B3', label:'Flashcard', icon:'P18', component:'PageFlashcard' },
  { id:19, batch:'B3', label:'Progress', icon:'P19', component:'PageProgressDashboard' },
  { id:20, batch:'B3', label:'AI Workspace', icon:'P20', component:'PageAIWorkspace' },
  { id:21, batch:'B3', label:'Provider Settings', icon:'P21', component:'PageProviderAdvancedSettings' },
  { id:22, batch:'B3', label:'QuickRef Modal', icon:'P22', component:'PageQuickRefModal' },
  { id:23, batch:'B3', label:'Help Privacy', icon:'P23', component:'PageHelpAboutPrivacy' },
  { id:24, batch:'B3', label:'States Library', icon:'P24', component:'PageStatesLibrary' },
];

function useCortexLayoutMode() {
  const detect = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (w >= 1180) return 'desktop';
    if (w >= 760 || (coarse && Math.min(w, h) >= 700)) return 'tablet';
    return 'mobile';
  };
  const [mode, setMode] = React.useState(detect);
  React.useEffect(() => {
    const onResize = () => setMode(detect());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
  return mode;
}

const CORTEX_THEME_ORDER = ['neural', 'aurora', 'gold', 'neon', 'bloom'];

function cortexResolveTheme(themeId) {
  return THEMES[themeId] || THEMES.neural;
}

function cortexApplyThemeGlobals(themeId) {
  const theme = cortexResolveTheme(themeId);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.dataset.cortexTheme = theme.id;
    root.style.setProperty('--cortex-theme-bg', theme.colors.bg);
    root.style.setProperty('--cortex-theme-bg-alt', theme.colors.bgAlt);
    root.style.setProperty('--cortex-theme-surface', theme.colors.surface);
    root.style.setProperty('--cortex-theme-glass', theme.colors.glass);
    root.style.setProperty('--cortex-theme-glass-border', theme.colors.glassBorder);
    root.style.setProperty('--cortex-theme-glass-highlight', theme.colors.glassHighlight);
    root.style.setProperty('--cortex-theme-accent-1', theme.colors.accent1);
    root.style.setProperty('--cortex-theme-accent-2', theme.colors.accent2);
    root.style.setProperty('--cortex-theme-accent-3', theme.colors.accent3);
    root.style.setProperty('--cortex-theme-text', theme.colors.text);
    root.style.setProperty('--cortex-theme-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--cortex-theme-text-muted', theme.colors.textMuted);
    root.style.setProperty('--cortex-theme-shadow', theme.colors.shadowColor);
  }
  if (typeof window !== 'undefined' && typeof DL !== 'undefined') {
    DL.bg = theme.colors.bg;
    DL.bgAlt = theme.colors.bgAlt;
    DL.surface = theme.colors.surface;
    DL.glass = theme.colors.glass;
    DL.glassBorder = theme.colors.glassBorder;
    DL.glassHigh = theme.colors.glassHighlight;
    DL.shadowColor = theme.colors.shadowColor;
    DL.accent = theme.colors.accent1;
    DL.accentB = theme.colors.accent3;
    DL.gold = theme.colors.accent2;
    DL.green = theme.colors.accent1;
    DL.red = '#ef4444';
    DL.teal = theme.id === 'neon' ? theme.colors.accent2 : theme.id === 'bloom' ? theme.colors.accent2 : theme.colors.accent1;
    DL.text = theme.colors.text;
    DL.sub = theme.colors.textSecondary;
    DL.mute = theme.colors.textMuted;
    DL.grad = theme.colors.gradientMain;
    DL.gradA = theme.colors.gradientAccent;
    DL.gradCard = theme.colors.gradientCard;
  }
  return theme;
}

function PageBatch0Kernel({ onNavigate, mode, themeId, onThemeChange, theme }) {
  const currentThemeId = themeId || 'neural';
  const currentTheme = theme || cortexResolveTheme(currentThemeId);
  const compact = mode !== 'desktop';
  const themeRows = [
    { id:'neural', name:'Neural Pulse', note:'Core Claude DNA, synaptic purple-blue glass.' },
    { id:'aurora', name:'Aurora Prism', note:'Ethereal cyan/prism exploratory shell.' },
    { id:'gold', name:'Liquid Gold', note:'Editorial premium variation from Batch 0.' },
    { id:'neon', name:'Neon Matrix', note:'Cyber green hacker learning mood.' },
    { id:'bloom', name:'Sunset Bloom', note:'Warm playful alternate visual route.' },
  ];

  return React.createElement('div', {
    'data-screen-label':'P0-Batch0Kernel',
    className:'hide-scrollbar cortex-motion-page',
    style:{ height:'100%', overflowY:'auto', padding:compact ? '18px 18px calc(96px + env(safe-area-inset-bottom))' : '26px clamp(18px,4vw,38px) 34px' }
  },
    React.createElement(B1Card, { glow:true, className:'cortex-motion-card', style:{
      marginBottom:16,
      background:'linear-gradient(145deg,rgba(99,102,241,0.16),rgba(168,85,247,0.10))',
    }},
      React.createElement(B2Kicker, null, 'Batch 0 - Original Cortex Kernel'),
      React.createElement('div', { style:{ fontSize:28, fontWeight:900, color:DL.text, lineHeight:1.1, letterSpacing:0 }},
        'CORTEX DESIGN KERNEL v0.1'),
      React.createElement('div', { style:{ fontSize:13, color:DL.sub, lineHeight:1.65, marginTop:10, maxWidth:760 }},
        'Original Claude design foundation: theme engine, liquid-glass learning shell, animated backgrounds, tab navigation, home/course/quiz/profile patterns, and five visual directions.'),
      React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap', marginTop:14 }},
        ['liquid glass','blue/purple medical','iOS-like','smooth motion','rounded cards'].map((tag, i) =>
          React.createElement(B1Badge, { key:i, color:i === 0 ? DL.teal : undefined }, tag)
        )
      )
    ),

    React.createElement('div', { className:'cortex-responsive-grid', style:{ display:'grid', gridTemplateColumns:compact ? '1fr' : 'repeat(auto-fit,minmax(220px,1fr))', gap:12, marginBottom:16 }},
      themeRows.map((row, i) => React.createElement(B1Card, {
        key:row.id,
        onClick:()=>onThemeChange && onThemeChange(row.id),
        className:'cortex-motion-card cortex-motion-press',
        style:{
          background:currentThemeId === row.id ? 'rgba(168,85,247,0.16)' : DL.glass,
          borderColor:currentThemeId === row.id ? 'rgba(168,85,247,0.38)' : DL.glassBorder,
          animationDelay:`${i * 0.05}s`,
        }
      },
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12 }},
          React.createElement('div', { className:'cortex-motion-orb', style:{
            width:42, height:42, borderRadius:16,
            background:THEMES[row.id].colors.gradientAccent,
            boxShadow:`0 10px 24px ${THEMES[row.id].colors.shadowColor}`,
          }}),
          React.createElement('div', null,
            React.createElement('div', { style:{ color:DL.text, fontSize:14, fontWeight:900 }}, row.name),
            React.createElement('div', { style:{ color:DL.sub, fontSize:10, lineHeight:1.35, marginTop:3 }}, row.note),
          )
        )
      ))
    ),

    React.createElement('div', { className:'cortex-responsive-grid cortex-kernel-main-grid', style:{ display:'grid', gridTemplateColumns:compact ? '1fr' : 'minmax(0,1.2fr) minmax(260px,0.8fr)', gap:14 }},
      React.createElement(B1Card, { className:'cortex-motion-card', style:{
        minHeight:320,
        background:theme.colors.gradientCard,
        borderColor:theme.colors.glassBorder,
      }},
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }},
          React.createElement('div', { className:'cortex-motion-orb', style:{
            width:70, height:70, borderRadius:26,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:currentTheme.colors.gradientAccent,
            fontSize:32, boxShadow:`0 18px 48px ${currentTheme.colors.shadowColor}`,
          }}, currentTheme.emoji),
          React.createElement('div', null,
            React.createElement(B1Badge, { color:currentTheme.colors.accent1 }, 'Selected Batch 0 Theme'),
            React.createElement('div', { style:{ color:DL.text, fontSize:22, fontWeight:900, marginTop:8 }}, currentTheme.name),
            React.createElement('div', { style:{ color:DL.sub, fontSize:12, marginTop:3 }}, currentTheme.description),
          )
        ),
        React.createElement('div', { className:'cortex-responsive-grid', style:{ display:'grid', gridTemplateColumns:compact ? '1fr' : 'repeat(3,1fr)', gap:10, marginBottom:16 }},
          React.createElement(B2StatPill, { label:'Theme', value:currentThemeId }),
          React.createElement(B2StatPill, { label:'Blur', value:`${currentTheme.glass.blur}px`, color:currentTheme.colors.accent1 }),
          React.createElement(B2StatPill, { label:'Radius', value:`${currentTheme.borderRadius}px`, color:currentTheme.colors.accent2 }),
        ),
        React.createElement(B2Callout, { tone:'note', title:'Batch 0 preserved' },
          'This consolidated library keeps the original kernel as Page 0, then continues through the refined 24-page library.'),
      ),
      React.createElement(B1Card, { className:'cortex-motion-card', style:{ minHeight:320 }},
        React.createElement(B1Section, { title:'Jump Into Library', action:'24 pages' }),
        [1,8,9,13,17,21,24].map((id, i) => {
          const item = CORTEX_LIBRARY_PAGES.find(p => p.id === id);
          return React.createElement(B3Row, {
            key:id,
            title:`Page ${item.id}: ${item.label}`,
            sub:`${item.batch} - ${item.component}`,
            onClick:()=>onNavigate(id),
            right:React.createElement('span', { style:{ color:DL.accent, fontWeight:900 }}, '>'),
            active:i === 0,
          });
        })
      )
    )
  );
}

function CortexLibraryNav({ page, onNavigate, mode }) {
  const groups = ['B0','B1','B2','B3'];
  return React.createElement('aside', { className:'cortex-library-nav hide-scrollbar', style:{
    width:mode === 'desktop' ? 292 : '100%',
    height:mode === 'desktop' ? '100%' : 'auto',
    overflowY:mode === 'desktop' ? 'auto' : 'hidden',
    overflowX:mode === 'desktop' ? 'hidden' : 'auto',
    padding:mode === 'desktop' ? '22px 14px' : '10px 14px',
    borderRight:mode === 'desktop' ? `1px solid ${DL.glassBorder}` : 'none',
    borderBottom:mode === 'desktop' ? 'none' : `1px solid ${DL.glassBorder}`,
    background:'rgba(10,10,26,0.70)',
    backdropFilter:'blur(28px) saturate(190%)',
    WebkitBackdropFilter:'blur(28px) saturate(190%)',
    flexShrink:0,
  }},
    React.createElement('div', { style:{
      display:mode === 'desktop' ? 'block' : 'flex',
      alignItems:'center',
      gap:12,
      minWidth:mode === 'desktop' ? 'auto' : 900,
    }},
      React.createElement('div', { style:{ marginBottom:mode === 'desktop' ? 18 : 0, minWidth:210 }},
        React.createElement('div', { style:{ color:DL.text, fontSize:18, fontWeight:900, letterSpacing:0 }}, 'CORTEX Library'),
        React.createElement('div', { style:{ color:DL.mute, fontSize:10, marginTop:4 }}, 'Batch 0 + Pages 1-24'),
      ),
      groups.map(group => React.createElement('div', { key:group, style:{
        marginBottom:mode === 'desktop' ? 16 : 0,
        display:mode === 'desktop' ? 'block' : 'flex',
        alignItems:'center',
        gap:6,
      }},
        React.createElement('div', { style:{
          fontSize:9, fontWeight:900, color:DL.accent, letterSpacing:1,
          margin:mode === 'desktop' ? '0 0 7px 8px' : '0 4px 0 0',
          minWidth:mode === 'desktop' ? 'auto' : 28,
        }}, group === 'B0' ? 'BATCH 0' : group),
        CORTEX_LIBRARY_PAGES.filter(p => p.batch === group).map(item => {
          const active = item.id === page;
          return React.createElement('button', {
            key:item.id,
            onClick:()=>onNavigate(item.id),
            className:'cortex-motion-press',
            style:{
              width:mode === 'desktop' ? '100%' : 118,
              display:'flex', alignItems:'center', gap:8,
              padding:'9px 10px', marginBottom:mode === 'desktop' ? 4 : 0,
              borderRadius:12, border:active ? '1px solid rgba(168,85,247,0.38)' : '1px solid transparent',
              background:active ? 'rgba(168,85,247,0.16)' : 'transparent',
              color:active ? DL.text : DL.sub,
              fontFamily:'inherit', cursor:'pointer', textAlign:'left',
              boxShadow:active ? `0 8px 22px ${DL.shadowColor}` : 'none',
            }
          },
            React.createElement('span', { style:{ fontSize:10, color:active ? DL.gold : DL.accent, fontWeight:900, minWidth:28 }}, item.icon),
            React.createElement('span', { style:{ fontSize:11, fontWeight:active ? 850 : 650, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}, item.label)
          );
        })
      ))
    )
  );
}

function CortexLibraryShell() {
  const mode = useCortexLayoutMode();
  const initialPage = Number(new URLSearchParams(window.location.search).get('page') || 0);
  const [page, setPage] = React.useState(CORTEX_LIBRARY_PAGES.some(p => p.id === initialPage) ? initialPage : 0);
  const [animKey, setAnimKey] = React.useState(0);
  const [wallpaper, setWallpaper] = React.useState(() => localStorage.getItem('cortex.wallpaper') || 'bubbly');
  const [themeId, setThemeId] = React.useState(() => localStorage.getItem('cortex.themeId') || 'neural');
  const current = CORTEX_LIBRARY_PAGES.find(p => p.id === page) || CORTEX_LIBRARY_PAGES[0];
  const isWelcomePage = page === 1;
  const theme = React.useMemo(() => cortexApplyThemeGlobals(themeId), [themeId]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(page));
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', next);
  }, [page]);

  React.useEffect(() => {
    localStorage.setItem('cortex.wallpaper', wallpaper);
  }, [wallpaper]);

  React.useEffect(() => {
    localStorage.setItem('cortex.themeId', themeId);
  }, [themeId]);

  const navigate = React.useCallback((target) => {
    const next = typeof target === 'number' ? target : Number(target);
    if (!CORTEX_LIBRARY_PAGES.some(p => p.id === next)) return;
    setAnimKey(k => k + 1);
    setPage(next);
  }, []);

  const renderPage = () => {
    const sharedProps = { onNavigate:navigate, themeId:theme.id, theme, onThemeChange:setThemeId };
    if (page === 0) return React.createElement(PageBatch0Kernel, { ...sharedProps, mode });
    const Comp = window[current.component];
    if (!Comp) {
      return React.createElement(B2PageShell, {
        label:'MissingPage',
        title:'Missing Page',
        subtitle:current.label,
        onBack:()=>navigate(0),
      }, React.createElement(B2Callout, { tone:'danger', title:'Component not loaded' }, current.component));
    }
    return React.createElement(Comp, sharedProps);
  };

  return React.createElement('div', {
    'data-current-page':page,
    'data-wallpaper-exhibition':String(isWelcomePage),
    'data-theme-id':theme.id,
    className:'cortex-library-root',
    style:{
    width:'100vw', height:'100dvh', minHeight:'100vh',
    background:theme.colors.bg, color:theme.colors.text, overflow:'hidden',
    fontFamily:'"SF Pro Display", "Inter", -apple-system, sans-serif',
    display:'flex', flexDirection:mode === 'desktop' ? 'row' : 'column',
    position:'relative',
  }},
    React.createElement(CortexInteractiveWallpaper, { wallpaper, exhibition:isWelcomePage }),
    React.createElement('div', { className:'cortex-library-ambient-orbs', style:{ position:'absolute', inset:0, pointerEvents:'none', filter:'blur(60px)', opacity:isWelcomePage ? 0.82 : 0.54 }},
      [
        { x:'8%', y:'12%', s:220, c:`${theme.colors.accent3}33`, d:12 },
        { x:'72%', y:'8%', s:180, c:`${theme.colors.accent1}2d`, d:15 },
        { x:'48%', y:'70%', s:260, c:`${theme.colors.accent2}14`, d:18 },
        { x:'86%', y:'78%', s:130, c:`${theme.colors.accent3}14`, d:10 },
      ].map((o,i) => React.createElement('div', { key:i, className:'cortex-motion-orb', style:{
        position:'absolute', left:o.x, top:o.y, width:o.s, height:o.s,
        borderRadius:'50%', background:o.c,
        animationDelay:`${i * -1.7}s`,
      }}))
    ),
    React.createElement(CortexLibraryNav, { page, onNavigate:navigate, mode, theme }),
    React.createElement('main', { style:{
      position:'relative', zIndex:1, flex:1, minWidth:0, minHeight:0,
      display:'flex', flexDirection:'column', overflow:'hidden',
    }},
      React.createElement('div', { className:'cortex-library-topbar', style:{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:mode === 'mobile' ? '10px 14px' : '14px 22px',
        borderBottom:`1px solid ${theme.colors.glassBorder}`,
        background:'rgba(10,10,26,0.42)',
        backdropFilter:'blur(22px)', WebkitBackdropFilter:'blur(22px)',
        flexShrink:0,
      }},
        React.createElement('div', null,
          React.createElement('div', { style:{ fontSize:mode === 'mobile' ? 13 : 15, color:theme.colors.text, fontWeight:900 }},
            `${current.batch} / Page ${current.id}: ${current.label}`),
          React.createElement('div', { style:{ fontSize:10, color:theme.colors.textMuted, marginTop:2 }},
            `Auto layout: ${mode} - ${window.innerWidth}x${window.innerHeight}`),
        ),
        React.createElement('div', { style:{ display:'flex', gap:8, alignItems:'center' }},
          React.createElement(CortexMotionSensorControl),
          React.createElement(CortexWallpaperToggle, { value:wallpaper, onChange:setWallpaper }),
          React.createElement(B1Badge, { color:mode === 'desktop' ? theme.colors.accent1 : mode === 'tablet' ? theme.colors.accent2 : theme.colors.accent3 }, mode.toUpperCase()),
          React.createElement(B1Badge, null, '0-24'),
        )
      ),
      React.createElement('section', {
        key:animKey,
        className:'cortex-library-content',
        style:{
          flex:1, minHeight:0, overflow:'hidden',
          padding:mode === 'desktop' ? 24 : mode === 'tablet' ? 18 : 0,
        }
      },
        React.createElement('div', { className:'cortex-library-stage', style:{
          height:'100%', width:'100%',
          maxWidth:mode === 'desktop' ? 'none' : '100%',
          margin:'0 auto', overflow:'hidden',
          borderRadius:mode === 'mobile' ? 0 : 28,
          border:mode === 'mobile' ? 'none' : `1px solid ${theme.colors.glassBorder}`,
          background:isWelcomePage ? 'rgba(10,10,26,0.38)' : 'rgba(10,10,26,0.58)',
          boxShadow:mode === 'mobile' ? 'none' : `0 18px 60px ${theme.colors.shadowColor}, inset 0 1px 0 ${theme.colors.glassHighlight}`,
          backdropFilter:isWelcomePage ? 'blur(14px) saturate(165%)' : 'blur(24px) saturate(180%)',
          WebkitBackdropFilter:isWelcomePage ? 'blur(14px) saturate(165%)' : 'blur(24px) saturate(180%)',
        }},
          React.createElement(ThemeProvider, { themeId:theme.id },
            React.createElement('div', { className:'cortex-library-stage-inner', style:{ height:'100%', overflow:'hidden', position:'relative' }}, renderPage())
          )
        )
      )
    )
  );
}

Object.assign(window, { CORTEX_LIBRARY_PAGES, PageBatch0Kernel, CortexLibraryShell });
