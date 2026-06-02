/* CORTEX DESIGN LIBRARY — Batch 1 Screens (5-8)
   Page 5: Mobile Sidebar State
   Page 6: Search Overlay
   Page 7: Settings Basic
   Page 8: Theme & Motion Showcase */

/* ═══════════════════════════════════════════
   PAGE 5 — MOBILE SIDEBAR STATE
   Slide-out navigation with glass overlay
   ═══════════════════════════════════════════ */
function PageSidebar({ onNavigate }) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { setTimeout(()=>setOpen(true), 300); }, []);

  const navItems = [
    { icon:'🏠', label:'Beranda', page:2, active:false },
    { icon:'📚', label:'Kursus Saya', page:4, active:true },
    { icon:'🧪', label:'Quiz & Latihan', page:3, active:false },
    { icon:'📊', label:'Progress', page:2, active:false },
    { icon:'🤖', label:'AI Tutor', page:3, active:false },
    { icon:'📖', label:'Glosarium', page:4, active:false },
    { icon:'🔍', label:'Pencarian', page:6, active:false },
  ];
  const bottomItems = [
    { icon:'⚙️', label:'Pengaturan', page:7 },
    { icon:'❓', label:'Bantuan', page:7 },
  ];

  return React.createElement('div', {
    'data-screen-label': 'P5-Sidebar',
    style:{ position:'relative', height:'100%', background:DL.bg, overflow:'hidden' }
  },
    /* Background page (dimmed) */
    React.createElement('div', { style:{
      position:'absolute', inset:0, opacity:0.3, filter:'blur(4px)',
      pointerEvents:'none',
    }},
      React.createElement('div', { style:{ padding:'60px 18px 20px' }},
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:DL.text }}, 'Halo, Dr. Raka'),
        React.createElement('div', { style:{ height:80, marginTop:16, borderRadius:DL.radius, background:DL.gradCard }}),
        React.createElement('div', { style:{ height:60, marginTop:10, borderRadius:DL.radius, background:DL.glass }}),
        React.createElement('div', { style:{ height:60, marginTop:10, borderRadius:DL.radius, background:DL.glass }}),
      ),
    ),
    /* Backdrop */
    React.createElement('div', {
      onClick:()=>{ setOpen(false); setTimeout(()=>onNavigate(2),300); },
      style:{
        position:'absolute', inset:0, zIndex:5,
        background:'rgba(0,0,0,0.5)',
        opacity:open?1:0, transition:'opacity 0.3s ease',
        cursor:'pointer',
      }
    }),
    /* Sidebar panel */
    React.createElement('div', { style:{
      position:'absolute', top:0, left:0, bottom:0, width:280, zIndex:10,
      background:'rgba(10,10,26,0.92)',
      backdropFilter:'blur(40px)', WebkitBackdropFilter:'blur(40px)',
      borderRight:`1px solid ${DL.glassBorder}`,
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition:'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
      display:'flex', flexDirection:'column',
      boxShadow:'20px 0 60px rgba(0,0,0,0.5)',
    }},
      /* User card */
      React.createElement('div', { style:{
        padding:'54px 20px 20px', borderBottom:`1px solid ${DL.glassBorder}`,
      }},
        React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:12 }},
          React.createElement('div', { style:{
            width:44, height:44, borderRadius:22, background:DL.gradA,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20,
            boxShadow:`0 0 16px ${DL.shadowColor}`,
          }}, '🧑‍🎓'),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:DL.text }}, 'Dr. Raka'),
            React.createElement('div', { style:{ fontSize:11, color:DL.sub }}, 'Level 7 • 2,840 XP'),
          ),
        ),
        React.createElement('div', { style:{ marginTop:12 }},
          React.createElement(B1Progress, { value:68, h:4 }),
          React.createElement('div', { style:{ fontSize:9, color:DL.mute, marginTop:4 }}, '68% ke Level 8'),
        ),
      ),
      /* Nav items */
      React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'12px 10px' }, className:'hide-scrollbar' },
        navItems.map((item,i) => React.createElement(B1Ripple, { key:i },
          React.createElement('div', {
            onClick:()=>{ setOpen(false); setTimeout(()=>onNavigate(item.page),300); },
            style:{
              display:'flex', alignItems:'center', gap:12, padding:'11px 12px',
              borderRadius:14, cursor:'pointer',
              background: item.active ? 'rgba(168,85,247,0.12)' : 'transparent',
              border: item.active ? `1px solid rgba(168,85,247,0.25)` : '1px solid transparent',
              transition:'all 0.2s ease',
              animation:'stagger-in 0.3s ease backwards', animationDelay:`${0.2+i*0.05}s`,
            }
          },
            React.createElement('span', { style:{ fontSize:18 }}, item.icon),
            React.createElement('span', { style:{
              fontSize:13, fontWeight: item.active ? 700 : 400,
              color: item.active ? DL.accent : DL.text,
            }}, item.label),
            item.active && React.createElement('div', { style:{
              marginLeft:'auto', width:6, height:6, borderRadius:3,
              background:DL.accent, boxShadow:`0 0 8px ${DL.accent}`,
            }}),
          )
        )),
      ),
      /* Bottom items */
      React.createElement('div', { style:{
        padding:'10px 10px 34px', borderTop:`1px solid ${DL.glassBorder}`,
      }},
        bottomItems.map((item,i) => React.createElement('div', {
          key:i, onClick:()=>{ setOpen(false); setTimeout(()=>onNavigate(item.page),300); },
          style:{
            display:'flex', alignItems:'center', gap:12, padding:'10px 12px',
            borderRadius:12, cursor:'pointer',
          }
        },
          React.createElement('span', { style:{ fontSize:16, opacity:0.5 }}, item.icon),
          React.createElement('span', { style:{ fontSize:12, color:DL.sub }}, item.label),
        )),
        /* App version */
        React.createElement('div', { style:{ textAlign:'center', marginTop:8, fontSize:9, color:DL.mute }},
          'Cortex Education v2.1.0'),
      ),
    ),
  );
}

/* ═══════════════════════════════════════════
   PAGE 6 — SEARCH OVERLAY
   Full-screen search with results & states
   ═══════════════════════════════════════════ */
function renderSearchContent(query, results, recents, trending, onNavigate) {
  if (query.length === 0) {
    return React.createElement(React.Fragment, null,
      React.createElement(B1Section, { title:'Pencarian Terakhir', action:'Hapus', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:20 }},
        recents.map(function(r,i) { return React.createElement(B1Badge, { key:i, style:{ cursor:'pointer' }},
          React.createElement('span', { style:{ fontSize:10, marginRight:2 }}, '🕒'), r
        ); })
      ),
      React.createElement(B1Section, { title:'Trending', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:6 }},
        trending.map(function(t,i) { return React.createElement('div', { key:i, style:{
          display:'flex', alignItems:'center', gap:10, padding:'10px 0',
          borderBottom:'1px solid rgba(255,255,255,0.04)', cursor:'pointer',
          animation:'stagger-in 0.3s ease backwards', animationDelay:i*0.05+'s',
        }},
          React.createElement('span', { style:{ fontSize:14, color:DL.accent, fontWeight:700, width:20, textAlign:'center' }}, i+1),
          React.createElement('span', { style:{ fontSize:13, color:DL.text }}, t),
          React.createElement('span', { style:{ marginLeft:'auto', fontSize:10, color:DL.mute }}, '\u2192')
        ); })
      )
    );
  }
  if (results.length > 0) {
    return React.createElement(React.Fragment, null,
      React.createElement('div', { style:{ fontSize:11, color:DL.mute, marginBottom:12 }},
        results.length + ' hasil untuk "' + query + '"'),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:8 }},
        results.map(function(r,i) { return React.createElement(B1Card, {
          key:i, pad:12, onClick:function(){onNavigate(3);},
          style:{ animation:'stagger-in 0.3s ease backwards', animationDelay:i*0.05+'s' },
        },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 }},
            React.createElement('span', { style:{ fontSize:24 }}, r.icon),
            React.createElement('div', { style:{ flex:1 }},
              React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DL.text }}, r.title),
              React.createElement('div', { style:{ fontSize:10, color:DL.mute }}, r.type)
            ),
            React.createElement('span', { style:{ fontSize:12, color:DL.mute }}, '\u2192')
          )
        ); })
      )
    );
  }
  return React.createElement('div', { style:{
    textAlign:'center', padding:'40px 20px', animation:'scale-in 0.4s ease backwards',
  }},
    React.createElement('div', { style:{ fontSize:48, marginBottom:12, opacity:0.4 }}, '🔍'),
    React.createElement('div', { style:{ fontSize:15, fontWeight:600, color:DL.text }}, 'Tidak ditemukan'),
    React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:4 }},
      'Tidak ada hasil untuk "' + query + '". Coba kata kunci lain.')
  );
}

function PageSearch({ onNavigate }) {
  const [query, setQuery] = React.useState('');
  const [focused, setFocused] = React.useState(true);
  const allResults = [
    { icon:'🧬', title:'Anatomi Manusia Dasar', type:'Kursus', match:'anatomi' },
    { icon:'🧠', title:'Sistem Saraf Pusat', type:'Slide', match:'saraf' },
    { icon:'🫀', title:'Kardiologi Klinis', type:'Kursus', match:'kardiologi' },
    { icon:'💊', title:'Farmakokinetik', type:'Slide', match:'farmako' },
    { icon:'🦴', title:'Sistem Rangka', type:'Slide', match:'rangka' },
    { icon:'🔬', title:'Sel dan Jaringan', type:'Slide', match:'sel' },
    { icon:'🫁', title:'Sistem Pernapasan', type:'Slide', match:'napas' },
  ];
  const results = query.length > 0
    ? allResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.match.includes(query.toLowerCase()))
    : [];
  const recents = ['Sistem Saraf','Kardiologi','Farmakologi','EKG'];
  const trending = ['Anatomi Otak','Aritmia','Sinapsis','Neurotransmitter'];

  return React.createElement('div', {
    'data-screen-label': 'P6-Search',
    style:{ display:'flex', flexDirection:'column', height:'100%', background:DL.bg }
  },
    /* Header */
    React.createElement('div', { style:{ padding:'52px 18px 8px' }},
      React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'center' }},
        React.createElement('div', { style:{ flex:1 }},
          React.createElement(B1SearchInput, {
            value:query, onChange:setQuery, autoFocus:true,
            placeholder:'Cari kursus, slide, istilah...',
          }),
        ),
        React.createElement('span', {
          onClick:()=>onNavigate(2),
          style:{ fontSize:13, color:DL.accent, cursor:'pointer', fontWeight:600, flexShrink:0 },
        }, 'Batal'),
      ),
    ),
    /* Content */
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'8px 18px 20px' }, className:'hide-scrollbar' },
      renderSearchContent(query, results, recents, trending, onNavigate)
    ),
  );
}

/* ═══════════════════════════════════════════
   PAGE 7 — SETTINGS BASIC
   Clean settings with haptic/tactile controls
   ═══════════════════════════════════════════ */
function PageSettings({ onNavigate, themeId: themeIdProp, theme: themeProp, onThemeChange }) {
  const themeKeys = ['neural', 'aurora', 'gold', 'neon', 'bloom'];
  const [localThemeId, setLocalThemeId] = React.useState('neural');
  const currentThemeId = themeIdProp || localThemeId;
  const currentTheme = themeProp || THEMES[currentThemeId] || THEMES.neural;
  const setThemeId = onThemeChange || setLocalThemeId;
  const [darkMode, setDarkMode] = React.useState(true);
  const [haptic, setHaptic] = React.useState(true);
  const [hapticIntensity, setHapticIntensity] = React.useState(70);
  const [notifications, setNotifications] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  const SettingsRow = ({ icon, label, right, onClick, sub }) =>
    React.createElement('div', {
      onClick, style:{
        display:'flex', alignItems:'center', gap:12, padding:'12px 0',
        borderBottom:`1px solid rgba(255,255,255,0.04)`,
        cursor: onClick ? 'pointer' : 'default',
      }
    },
      React.createElement('span', { style:{ fontSize:18 }}, icon),
      React.createElement('div', { style:{ flex:1 }},
        React.createElement('div', { style:{ fontSize:13, color:DL.text }}, label),
        sub && React.createElement('div', { style:{ fontSize:10, color:DL.mute, marginTop:1 }}, sub),
      ),
      right || React.createElement('span', { style:{ fontSize:12, color:DL.mute }}, '›'),
    );

  return React.createElement('div', {
    'data-screen-label': 'P7-Settings',
    style:{ display:'flex', flexDirection:'column', height:'100%' }
  },
    React.createElement(B1Topbar, {
      left: React.createElement('span', { onClick:()=>onNavigate(2), style:{ fontSize:13, color:DL.accent, cursor:'pointer' }}, '← Back'),
      title: 'Pengaturan',
    }),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'4px 18px 20px' }, className:'hide-scrollbar' },
      /* Appearance */
      React.createElement(B1Section, { title:'Tampilan', style:{ marginBottom:4, marginTop:8 } }),
      React.createElement(SettingsRow, {
        icon:'🌙', label:'Mode Gelap',
        right: React.createElement(B1Toggle, { value:darkMode, onChange:setDarkMode }),
      }),
      React.createElement(B1Card, { pad:14, style:{ margin:'10px 0 12px', background:'rgba(255,255,255,0.045)' }},
        React.createElement(B2Kicker, { color:currentTheme.colors.accent1 }, 'Global theme'),
        React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', gap:12, alignItems:'start', marginBottom:12 }},
          React.createElement('div', { style:{ minWidth:0, flex:1 }},
            React.createElement('div', { style:{ fontSize:16, fontWeight:850, color:DL.text, lineHeight:1.2 }}, currentTheme.name),
            React.createElement('div', { style:{ fontSize:11, color:DL.sub, marginTop:4, lineHeight:1.45 }}, currentTheme.description),
          ),
          React.createElement(B1Badge, { color:currentTheme.colors.accent1 }, currentThemeId.toUpperCase()),
        ),
        React.createElement('div', { style:{ marginTop:8, padding:'10px 12px', borderRadius:16, background:currentTheme.colors.gradientCard, border:`1px solid ${currentTheme.colors.glassBorder}` }},
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:8 }},
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, 'Neural'),
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, 'Aurora'),
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, 'Gold'),
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, 'Neon'),
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, 'Bloom'),
          ),
          React.createElement('input', {
            type:'range',
            min:0,
            max:themeKeys.length - 1,
            step:1,
            value:Math.max(0, themeKeys.indexOf(currentThemeId)),
            onChange: e => setThemeId(themeKeys[Math.max(0, Math.min(themeKeys.length - 1, Number(e.target.value))) ]),
            style:{
              width:'100%',
              margin:'4px 0 0',
              accentColor:currentTheme.colors.accent1,
            },
          }),
        ),
        React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:6, marginTop:10 }},
          themeKeys.map((id, i) => {
            const meta = THEMES[id] || THEMES.neural;
            const active = id === currentThemeId;
            return React.createElement('div', {
              key:id,
              onClick:()=>setThemeId(id),
              style:{
                padding:'8px 6px',
                borderRadius:12,
                cursor:'pointer',
                border:`1px solid ${active ? meta.colors.glassBorder : 'transparent'}`,
                background:active ? 'rgba(255,255,255,0.065)' : 'rgba(255,255,255,0.03)',
                textAlign:'center',
              }
            },
              React.createElement('div', { style:{ width:14, height:14, borderRadius:999, margin:'0 auto 6px', background:meta.colors.gradientAccent, boxShadow:`0 0 10px ${meta.colors.shadowColor}` } }),
              React.createElement('div', { style:{ fontSize:9, fontWeight:800, color:active ? DL.text : DL.mute, lineHeight:1.15 }}, meta.name.split(' ')[0]),
            );
          })
        ),
        React.createElement('div', { style:{ fontSize:10, color:DL.mute, marginTop:8, lineHeight:1.45 }},
          'Tema ini mengalir ke seluruh 24 halaman: warna accent, glass, bayangan, surface, dan nuansa shell ikut berubah serentak.'
        ),
      ),
      React.createElement(SettingsRow, {
        icon:'✨', label:'Reduced Motion',
        sub:'Kurangi animasi untuk aksesibilitas',
        right: React.createElement(B1Toggle, { value:reducedMotion, onChange:setReducedMotion }),
      }),

      /* Haptic / Tactile Section */
      React.createElement(B1Section, { title:'Haptic & Sentuhan', style:{ marginTop:18, marginBottom:4 } }),
      React.createElement(B1Card, { pad:14, style:{ marginTop:8, marginBottom:4 }},
        React.createElement(B1Toggle, { value:haptic, onChange:setHaptic, label:'Feedback Haptic' }),
        haptic && React.createElement(React.Fragment, null,
          React.createElement('div', { style:{ marginTop:12 }},
            React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginBottom:6 }},
              React.createElement('span', { style:{ fontSize:11, color:DL.sub }}, 'Intensitas'),
              React.createElement('span', { style:{ fontSize:11, color:DL.accent, fontWeight:700 }}, `${hapticIntensity}%`),
            ),
            React.createElement('input', {
              type:'range', min:0, max:100, value:hapticIntensity,
              onChange: e => setHapticIntensity(Number(e.target.value)),
              style:{ width:'100%', accentColor:DL.accent },
            }),
          ),
          React.createElement('div', { style:{ display:'flex', gap:6, marginTop:10 }},
            ['Ringan','Sedang','Kuat'].map((l,i) => React.createElement(B1Badge, {
              key:i,
              color: hapticIntensity <= 33 && i===0 ? DL.accent
                : hapticIntensity <= 66 && i===1 ? DL.accent
                : hapticIntensity > 66 && i===2 ? DL.accent : undefined,
              style:{ flex:1, justifyContent:'center', cursor:'pointer', fontSize:9 },
            }, l)),
          ),
          React.createElement('div', { style:{ fontSize:10, color:DL.mute, marginTop:8 }},
            '💡 Haptic feedback memberikan respons sentuhan saat menekan tombol, menyelesaikan quiz, dan navigasi slide.'),
        ),
      ),

      /* Learning */
      React.createElement(B1Section, { title:'Pembelajaran', style:{ marginTop:14, marginBottom:4 } }),
      React.createElement(SettingsRow, {
        icon:'🔔', label:'Notifikasi',
        right: React.createElement(B1Toggle, { value:notifications, onChange:setNotifications }),
      }),
      React.createElement(SettingsRow, {
        icon:'▶️', label:'Auto-play Slide',
        right: React.createElement(B1Toggle, { value:autoPlay, onChange:setAutoPlay }),
      }),
      React.createElement(SettingsRow, {
        icon:'🌐', label:'Bahasa', sub:'Indonesia',
      }),

      /* Account */
      React.createElement(B1Section, { title:'Akun', style:{ marginTop:14, marginBottom:4 } }),
      React.createElement(SettingsRow, { icon:'👤', label:'Profil', sub:'Dr. Raka' }),
      React.createElement(SettingsRow, { icon:'🔑', label:'Keamanan' }),
      React.createElement(SettingsRow, { icon:'📤', label:'Ekspor Data' }),
      React.createElement(SettingsRow, { icon:'❓', label:'Bantuan & FAQ' }),

      /* Footer */
      React.createElement('div', { style:{ textAlign:'center', marginTop:20, padding:'10px 0' }},
        React.createElement('div', { style:{ fontSize:10, color:DL.mute }}, 'Cortex Education v2.1.0'),
        React.createElement('div', { style:{ fontSize:9, color:DL.mute, marginTop:4 }}, '© 2026 Cortex Labs'),
      ),
    ),
  );
}

/* ═══════════════════════════════════════════
   PAGE 8 — THEME & MOTION SHOWCASE
   Visual showcase of glass, motion, and press states
   ═══════════════════════════════════════════ */
function PageMotionShowcase({ onNavigate }) {
  const [pressState, setPressState] = React.useState(null);
  const [longPressed, setLongPressed] = React.useState(false);
  const [showCtxMenu, setShowCtxMenu] = React.useState(false);
  const longPressTimer = React.useRef(null);

  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setLongPressed(true);
      setShowCtxMenu(true);
    }, 600);
  };
  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
    setLongPressed(false);
  };

  /* Animated glass orb */
  const GlassOrb = ({ size, x, y, delay }) => React.createElement('div', { style:{
    position:'absolute', left:x, top:y, width:size, height:size, borderRadius:'50%',
    background:'rgba(168,85,247,0.08)',
    border:`1px solid rgba(168,85,247,0.15)`,
    backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
    animation:`float-slow ${6+delay}s ease-in-out infinite`,
    animationDelay:`${delay*-1}s`,
    boxShadow:`inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 20px rgba(99,102,241,0.15)`,
  }});

  return React.createElement('div', {
    'data-screen-label': 'P8-MotionShowcase',
    style:{ display:'flex', flexDirection:'column', height:'100%' }
  },
    React.createElement(B1Topbar, {
      left: React.createElement('span', { onClick:()=>onNavigate(7), style:{ fontSize:13, color:DL.accent, cursor:'pointer' }}, '← Back'),
      title: 'Tema & Motion',
    }),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'4px 18px 20px' }, className:'hide-scrollbar' },

      /* Glass Showcase */
      React.createElement(B1Section, { title:'Liquid Glass', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{
        position:'relative', height:160, borderRadius:DL.radius, overflow:'hidden',
        background:'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.05))',
        border:`1px solid ${DL.glassBorder}`, marginBottom:16,
      }},
        React.createElement(GlassOrb, { size:60, x:'10%', y:'20%', delay:0 }),
        React.createElement(GlassOrb, { size:45, x:'55%', y:'40%', delay:2 }),
        React.createElement(GlassOrb, { size:35, x:'75%', y:'15%', delay:4 }),
        React.createElement(GlassOrb, { size:50, x:'30%', y:'60%', delay:1 }),
        React.createElement('div', { style:{
          position:'absolute', bottom:12, left:14, right:14,
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          background:'rgba(255,255,255,0.08)', borderRadius:14, padding:'10px 14px',
          border:`1px solid rgba(255,255,255,0.12)`,
        }},
          React.createElement('div', { style:{ fontSize:11, color:DL.text, fontWeight:600 }}, 'Frosted Glass Surface'),
          React.createElement('div', { style:{ fontSize:9, color:DL.mute }}, 'blur(28px) • saturate(195%) • layered depth'),
        ),
      ),

      /* Press States Showcase */
      React.createElement(B1Section, { title:'Press & Long-Press States', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10, marginBottom:16 }},
        /* Normal press */
        React.createElement(B1Card, {
          onClick:()=>setPressState('tap'),
          style:{ background: pressState==='tap' ? 'rgba(168,85,247,0.15)' : DL.glass },
        },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 }},
            React.createElement(B1Icon, { icon:'👆', size:36 }),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DL.text }}, 'Tap / Press'),
              React.createElement('div', { style:{ fontSize:10, color:DL.sub }}, 'Scale 0.97 + glow feedback'),
            ),
          )
        ),
        /* Long press demo */
        React.createElement(B1Card, {
          pad:16,
          style:{
            background: longPressed ? 'rgba(251,191,36,0.12)' : DL.glass,
            borderColor: longPressed ? 'rgba(251,191,36,0.35)' : DL.glassBorder,
            transition:'all 0.3s ease',
          },
        },
          React.createElement('div', {
            onPointerDown:handleLongPressStart,
            onPointerUp:handleLongPressEnd,
            onPointerLeave:handleLongPressEnd,
            style:{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' },
          },
            React.createElement(B1Icon, { icon:'👇', size:36, gradient:'linear-gradient(135deg,#fbbf24,#f59e0b)' }),
            React.createElement('div', null,
              React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DL.text }}, 'Long Press (Tahan 600ms)'),
              React.createElement('div', { style:{ fontSize:10, color:DL.sub }}, 'Border glow + context menu reveal'),
            ),
          ),
          /* Context menu */
          showCtxMenu && React.createElement(B1Card, { pad:0, style:{
            marginTop:12, animation:'scale-in 0.3s cubic-bezier(0.34,1.56,0.64,1) backwards',
            background:'rgba(20,18,40,0.95)',
          }},
            ['📋 Salin Teks', '📌 Bookmark', '🔗 Bagikan', '🗑️ Hapus'].map((item,i) =>
              React.createElement('div', { key:i, onClick:()=>setShowCtxMenu(false), style:{
                padding:'11px 14px', fontSize:12, color:DL.text, cursor:'pointer',
                borderBottom: i<3 ? `1px solid rgba(255,255,255,0.04)` : 'none',
              }}, item)
            ),
          ),
        ),
        /* Ripple */
        React.createElement(B1Ripple, null,
          React.createElement(B1Card, null,
            React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 }},
              React.createElement(B1Icon, { icon:'💧', size:36, gradient:'linear-gradient(135deg,#06d6a0,#00b4d8)' }),
              React.createElement('div', null,
                React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DL.text }}, 'Ripple Effect'),
                React.createElement('div', { style:{ fontSize:10, color:DL.sub }}, 'Tap di mana saja untuk melihat ripple'),
              ),
            ),
          ),
        ),
      ),

      /* Animation Showcase */
      React.createElement(B1Section, { title:'Motion Primitives', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:16 }},
        [
          { label:'Float', anim:'float 3s ease-in-out infinite', icon:'🫧' },
          { label:'Pulse Glow', anim:'pulse-glow 2s ease-in-out infinite', icon:'💫' },
          { label:'Morph Blob', anim:'morph-blob 6s ease-in-out infinite', icon:'🔮' },
          { label:'Shimmer', anim:'shimmer 2s linear infinite', icon:'✨' },
        ].map((m,i) => React.createElement(B1Card, { key:i, pad:14, style:{ textAlign:'center' }},
          React.createElement('div', { style:{
            fontSize:28, marginBottom:6,
            animation:m.anim,
            ...(m.label==='Shimmer' ? {
              background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)',
              backgroundSize:'200% 100%',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            } : {}),
          }}, m.icon),
          React.createElement('div', { style:{ fontSize:10, color:DL.sub, fontWeight:600 }}, m.label),
        )),
      ),

      /* Color Tokens */
      React.createElement(B1Section, { title:'Design Tokens', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }},
        [
          { c:DL.accent, l:'Accent' },
          { c:DL.accentB, l:'AccentB' },
          { c:DL.gold, l:'Gold' },
          { c:DL.green, l:'Green' },
          { c:DL.red, l:'Red' },
          { c:DL.teal, l:'Teal' },
        ].map((tok,i) => React.createElement('div', { key:i, style:{
          display:'flex', alignItems:'center', gap:6,
        }},
          React.createElement('div', { style:{
            width:24, height:24, borderRadius:8, background:tok.c,
            border:`1px solid rgba(255,255,255,0.1)`,
            boxShadow:`0 0 12px ${tok.c}44`,
          }}),
          React.createElement('div', { style:{ fontSize:10, color:DL.sub }}, tok.l),
        )),
      ),

      /* Typography Scale */
      React.createElement(B1Section, { title:'Typography', style:{ marginBottom:10 } }),
      React.createElement(B1Card, { pad:14 },
        [
          { s:24, w:700, l:'Heading 1' },
          { s:18, w:700, l:'Heading 2' },
          { s:15, w:600, l:'Heading 3' },
          { s:13, w:400, l:'Body' },
          { s:11, w:400, l:'Caption' },
          { s:9, w:600, l:'Overline' },
        ].map((t,i) => React.createElement('div', { key:i, style:{
          fontSize:t.s, fontWeight:t.w, color: i<3 ? DL.text : DL.sub,
          padding:'4px 0', borderBottom: i<5 ? `1px solid rgba(255,255,255,0.03)` : 'none',
        }}, `${t.l} — ${t.s}px`)),
      ),
    ),
  );
}

Object.assign(window, { PageSidebar, PageSearch, PageSettings, PageMotionShowcase });
