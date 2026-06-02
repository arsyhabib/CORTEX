/* CORTEX — Main App Shell + Routing + Theme Switching */

const TAB_ITEMS = [
  { id:'home', icon:'🏠', label:'Home' },
  { id:'explore', icon:'🔍', label:'Explore' },
  { id:'quiz', icon:'🧪', label:'Quiz' },
  { id:'profile', icon:'👤', label:'Profil' },
];

function CortexApp() {
  const [t, setTweak] = useTweaks(CORTEX_DEFAULTS);
  const themeId = t.design;
  const [screen, setScreen] = React.useState('splash');
  const [tab, setTab] = React.useState('home');
  const [prevScreen, setPrevScreen] = React.useState(null);
  const theme = THEMES[themeId] || THEMES.neural;

  const navigate = React.useCallback((target) => {
    setPrevScreen(screen);
    setScreen(target);
    if(['home','explore','quiz','profile'].includes(target)) setTab(target);
  }, [screen]);

  const goBack = React.useCallback(() => {
    setScreen('home'); setTab('home');
  }, []);

  const renderContent = () => {
    if(screen === 'splash') {
      return React.createElement(SplashScreen, {
        themeId, onComplete: ()=>navigate('home')
      });
    }
    const HomeComp = HOME_COMPONENTS[themeId] || HomeNeural;
    switch(screen) {
      case 'home':
      case 'explore':
        return React.createElement('div', { key:'home-'+themeId, style: {
          flex:1, overflowY:'auto', paddingTop:8,
        }, className:'hide-scrollbar page-enter' },
          React.createElement(HomeComp, { onNavigate:navigate, userName:t.userName })
        );
      case 'course':
        return React.createElement('div', { key:'course', style: { flex:1, overflowY:'auto', paddingTop:4 }, className:'hide-scrollbar page-enter' },
          React.createElement(CourseDetailScreen, { onBack:goBack, onNavigate:navigate })
        );
      case 'quiz':
        return React.createElement('div', { key:'quiz', style: { flex:1, overflowY:'auto', paddingTop:4 }, className:'hide-scrollbar page-enter' },
          React.createElement(QuizScreen, { onBack:goBack })
        );
      case 'profile':
        return React.createElement('div', { key:'profile', style: { flex:1, overflowY:'auto', paddingTop:4 }, className:'hide-scrollbar page-enter' },
          React.createElement(ProfileScreen, { onBack:goBack })
        );
      default:
        return null;
    }
  };

  /* Design Indicator Pill */
  const DesignIndicator = () => {
    if(screen === 'splash') return null;
    return React.createElement('div', { style: {
      position:'absolute', top:52, left:'50%', transform:'translateX(-50%)',
      zIndex:50, animation:'slide-down 0.5s ease both', animationDelay:'0.5s',
    }},
      React.createElement('div', { style: {
        ...glassCardStyle(theme, {
          padding:'4px 14px', fontSize:10, fontWeight:600,
          color:theme.colors.accent1, letterSpacing:1,
          display:'flex', alignItems:'center', gap:6, whiteSpace:'nowrap',
          borderRadius:20,
        }),
      }},
        React.createElement('span', null, theme.emoji),
        React.createElement('span', null, `Design ${Object.keys(THEMES).indexOf(themeId)+1}: ${theme.name}`),
      )
    );
  };

  return React.createElement(ThemeProvider, { themeId },
    React.createElement(IOSDevice, {
      dark: true,
      noNav: true,
      style: { background: theme.colors.bg },
    },
      React.createElement('div', { style: {
        display:'flex', flexDirection:'column', height:'100%',
        background:theme.colors.bg, color:theme.colors.text,
        fontFamily: themeId==='neon' ? '"SF Mono", "Fira Code", monospace' : '"SF Pro Display", "Inter", -apple-system, sans-serif',
        position:'relative', overflow:'hidden',
      }},
        /* Animated Background */
        React.createElement('div', { style: { position:'absolute', inset:0, zIndex:0 }},
          React.createElement(ThemeBackground, { themeId })
        ),
        /* Design Indicator */
        React.createElement(DesignIndicator),
        /* Content */
        React.createElement('div', { style: { flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1, overflow:'hidden' }},
          renderContent()
        ),
        /* Tab Bar */
        screen !== 'splash' && React.createElement('div', { style: { position:'relative', zIndex:2 }},
          React.createElement(GlassTabBar, { tabs:TAB_ITEMS, active:tab, onSelect:navigate })
        ),
      )
    ),
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: 'Pilih Desain' }),
      React.createElement(TweakRadio, {
        label: 'Design', value: themeId,
        options: ['neural','aurora','gold','neon','bloom'],
        optionLabels: ['🧠 Neural','🌌 Aurora','✨ Gold','💚 Neon','🌸 Bloom'],
        onChange: (v) => { setTweak('design', v); setScreen('splash'); },
      }),
      React.createElement(TweakSection, { label: 'Personalisasi' }),
      React.createElement(TweakText, {
        label: 'Nama', value: t.userName,
        onChange: (v) => setTweak('userName', v),
      }),
      React.createElement(TweakSection, { label: 'Info Desain' }),
      React.createElement('div', { style: {
        padding:'8px 16px', fontSize:11, lineHeight:1.6,
        color:'rgba(255,255,255,0.5)',
      }},
        React.createElement('div', { style: { fontWeight:700, color:'rgba(255,255,255,0.8)', marginBottom:4 }}, `${theme.emoji} ${theme.name}`),
        React.createElement('div', null, theme.description),
        React.createElement('div', { style: { marginTop:8, fontSize:10 }},
          'Navigasi: Tap kartu untuk berpindah layar. Gunakan tab bar di bawah untuk navigasi utama.'
        ),
      ),
    ),
  );
}

Object.assign(window, { CortexApp });
