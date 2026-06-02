/* CORTEX — 5 Unique Home Screen Layouts */

const COURSES_DATA = [
  { id:1, icon:'🧬', title:'Anatomi Manusia Dasar', lessons:24, duration:'8 jam', progress:72, category:'Medis' },
  { id:2, icon:'💻', title:'React & Modern JavaScript', lessons:32, duration:'12 jam', progress:45, category:'Programming' },
  { id:3, icon:'🎨', title:'UI/UX Design Fundamentals', lessons:18, duration:'6 jam', progress:88, category:'Desain' },
  { id:4, icon:'🫀', title:'Kardiologi Klinis', lessons:20, duration:'10 jam', progress:30, category:'Medis' },
  { id:5, icon:'🐍', title:'Python untuk Data Science', lessons:28, duration:'14 jam', progress:15, category:'Programming' },
  { id:6, icon:'🖌️', title:'Digital Illustration Pro', lessons:16, duration:'5 jam', progress:60, category:'Seni' },
];

const CATEGORIES = [
  { id:'all', icon:'✦', label:'Semua' },
  { id:'medis', icon:'🩺', label:'Medis' },
  { id:'code', icon:'⌨️', label:'Coding' },
  { id:'design', icon:'🎨', label:'Desain' },
  { id:'art', icon:'🖌️', label:'Seni' },
];

/* ═══════════════════════════════════════════
   DESIGN 1: NEURAL PULSE
   Organic flowing layout with synaptic connections
   ═══════════════════════════════════════════ */
function HomeNeural({ onNavigate, userName }) {
  const theme = useTheme();
  return React.createElement('div', { style: { padding:'0 18px 20px', display:'flex', flexDirection:'column', gap:18 }},
    /* Header */
    React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', animation:'slide-down 0.5s ease both' }},
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize:11, color:theme.colors.textMuted, letterSpacing:1, textTransform:'uppercase', marginBottom:2 }}, 'Selamat Datang'),
        React.createElement('div', { style: { fontSize:22, fontWeight:700, color:theme.colors.text }}, userName || 'Cortexian 🧠'),
      ),
      React.createElement('div', { onClick:()=>onNavigate('profile'), style: { cursor:'pointer' }},
        React.createElement(StreakFlame, { days:14 })
      )
    ),
    /* XP Bar */
    React.createElement(GlassCard, { style: { padding:14 }},
      React.createElement(XPDisplay, { xp:2840, level:7 })
    ),
    /* Big Hero Card - "Brain Activity" */
    React.createElement(GlassCard, {
      onClick: () => onNavigate('course'),
      style: { padding:0, overflow:'hidden', animation:'scale-in 0.6s ease both', animationDelay:'0.1s' }
    },
      React.createElement('div', { style: {
        padding:'24px 20px', background: theme.colors.gradientCard,
        position:'relative',
      }},
        React.createElement(GlassBadge, { accent:true }, '🔥 Lanjutkan Belajar'),
        React.createElement('div', { style: { fontSize:18, fontWeight:700, color:theme.colors.text, margin:'12px 0 6px' }},
          'Anatomi Manusia Dasar'),
        React.createElement('div', { style: { fontSize:12, color:theme.colors.textSecondary, marginBottom:14 }},
          'Chapter 12: Sistem Saraf Pusat'),
        React.createElement(GlassProgress, { value:72, height:5 }),
        React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted, marginTop:6 }}, '72% — 6 lessons tersisa'),
      )
    ),
    /* Stats Row */
    React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }},
      React.createElement(StatCard, { icon:'⚡', label:'XP Hari Ini', value:180, delay:0.15 }),
      React.createElement(StatCard, { icon:'📚', label:'Selesai', value:47, delay:0.2 }),
      React.createElement(StatCard, { icon:'🏆', label:'Ranking', value:12, suffix:'th', delay:0.25 }),
    ),
    /* Category Pills */
    React.createElement('div', { style: { display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }, className:'hide-scrollbar' },
      CATEGORIES.map((cat,i) => React.createElement(GlassBadge, {
        key:cat.id, accent: i===0,
        style: { cursor:'pointer', whiteSpace:'nowrap', animation:`stagger-in 0.4s ease both`, animationDelay:`${0.3+i*0.05}s` }
      }, `${cat.icon} ${cat.label}`))
    ),
    /* Course List */
    React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:10 }},
      React.createElement('div', { style: { fontSize:15, fontWeight:700, color:theme.colors.text }}, 'Kursus Aktif'),
      COURSES_DATA.slice(0,4).map((c,i) =>
        React.createElement(CourseCard, { key:c.id, course:c, onClick:()=>onNavigate('course'), delay:0.35+i*0.08 })
      )
    ),
  );
}

/* ═══════════════════════════════════════════
   DESIGN 2: AURORA PRISM
   Panoramic horizontal cards, ethereal
   ═══════════════════════════════════════════ */
function HomeAurora({ onNavigate, userName }) {
  const theme = useTheme();
  return React.createElement('div', { style: { padding:'0 0 20px', display:'flex', flexDirection:'column', gap:16 }},
    /* Header */
    React.createElement('div', { style: { padding:'0 20px', display:'flex', justifyContent:'space-between', alignItems:'center', animation:'slide-down 0.5s ease both' }},
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize:22, fontWeight:600, color:theme.colors.text }}, `Hai, ${userName || 'Explorer'} ✦`),
        React.createElement('div', { style: { fontSize:12, color:theme.colors.textSecondary }}, 'Siap menjelajah hari ini?'),
      ),
      React.createElement(StreakFlame, { days:21, style: { cursor:'pointer' }, onClick:()=>onNavigate('profile') })
    ),
    /* Horizontal Featured Scroll */
    React.createElement('div', { style: {
      display:'flex', gap:14, overflowX:'auto', padding:'4px 20px', scrollSnapType:'x mandatory',
    }, className:'hide-scrollbar' },
      [
        { gradient:'linear-gradient(135deg, rgba(6,214,160,0.3), rgba(0,180,216,0.15))', title:'Anatomi Manusia', sub:'24 lessons', icon:'🧬', prog:72 },
        { gradient:'linear-gradient(135deg, rgba(224,64,251,0.25), rgba(6,214,160,0.1))', title:'React & JS Modern', sub:'32 lessons', icon:'💻', prog:45 },
        { gradient:'linear-gradient(135deg, rgba(0,180,216,0.25), rgba(224,64,251,0.1))', title:'UI/UX Design', sub:'18 lessons', icon:'🎨', prog:88 },
      ].map((card,i) => React.createElement(GlassCard, {
        key:i, onClick:()=>onNavigate('course'),
        style: {
          minWidth:240, padding:20, background:card.gradient, scrollSnapAlign:'start',
          animation:`slide-right 0.5s ease both`, animationDelay:`${0.1+i*0.1}s`,
        }
      },
        React.createElement('div', { style: { fontSize:36, marginBottom:12 }}, card.icon),
        React.createElement('div', { style: { fontSize:16, fontWeight:600, color:theme.colors.text, marginBottom:4 }}, card.title),
        React.createElement('div', { style: { fontSize:11, color:theme.colors.textSecondary, marginBottom:14 }}, card.sub),
        React.createElement(GlassProgress, { value:card.prog }),
        React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted, marginTop:6 }}, `${card.prog}% selesai`)
      ))
    ),
    /* Stats */
    React.createElement('div', { style: { padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }},
      React.createElement(StatCard, { icon:'🌟', label:'Total XP', value:2840, delay:0.3 }),
      React.createElement(StatCard, { icon:'📖', label:'Kursus Aktif', value:6, delay:0.35 }),
    ),
    /* XP Progress */
    React.createElement('div', { style: { padding:'0 20px' }},
      React.createElement(GlassCard, { style: { padding:14 }},
        React.createElement(XPDisplay, { xp:2840, level:7 })
      )
    ),
    /* Quick Actions */
    React.createElement('div', { style: { padding:'0 20px' }},
      React.createElement('div', { style: { fontSize:15, fontWeight:600, color:theme.colors.text, marginBottom:10 }}, 'Aksi Cepat'),
      React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }},
        [
          { icon:'🧪', label:'Quiz Harian', color:theme.colors.accent1 },
          { icon:'📊', label:'Leaderboard', color:theme.colors.accent2 },
          { icon:'🎯', label:'Tantangan', color:theme.colors.accent3 },
          { icon:'📝', label:'Catatan', color:theme.colors.accent1 },
        ].map((a,i) => React.createElement(GlassCard, {
          key:i, onClick:()=>onNavigate(i===0?'quiz':i===1?'profile':'course'),
          style: { padding:16, textAlign:'center', animation:`stagger-in 0.4s ease both`, animationDelay:`${0.4+i*0.06}s` }
        },
          React.createElement('div', { style: { fontSize:28, marginBottom:6 }}, a.icon),
          React.createElement('div', { style: { fontSize:12, fontWeight:600, color:theme.colors.text }}, a.label)
        ))
      )
    ),
  );
}

/* ═══════════════════════════════════════════
   DESIGN 3: LIQUID GOLD
   Editorial luxury magazine layout
   ═══════════════════════════════════════════ */
function HomeGold({ onNavigate, userName }) {
  const theme = useTheme();
  return React.createElement('div', { style: { padding:'0 20px 20px', display:'flex', flexDirection:'column', gap:20 }},
    /* Luxury Header */
    React.createElement('div', { style: { textAlign:'center', padding:'8px 0', animation:'slide-down 0.6s ease both' }},
      React.createElement('div', { style: {
        fontSize:10, letterSpacing:4, textTransform:'uppercase', color:theme.colors.accent1,
        marginBottom:6, fontWeight:300,
      }}, '— CORTEX EDUCATION —'),
      React.createElement('div', { style: {
        fontSize:24, fontWeight:300, color:theme.colors.text, letterSpacing:1,
      }}, `${userName || 'Learner'}`),
      React.createElement('div', { style: { width:40, height:1, background:theme.colors.accent1, margin:'10px auto 0', opacity:0.5 }}),
    ),
    /* Gold Hero */
    React.createElement(GlassCard, { onClick:()=>onNavigate('course'), style: {
      padding:0, overflow:'hidden', borderRadius:theme.borderRadius,
      animation:'scale-in 0.6s ease both', animationDelay:'0.15s',
    }},
      React.createElement('div', { style: {
        padding:'28px 22px',
        background:'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(184,134,11,0.04))',
        borderBottom:`1px solid ${theme.colors.glassBorder}`,
      }},
        React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start' }},
          React.createElement('div', null,
            React.createElement(GlassBadge, { accent:true, style:{ marginBottom:12 }}, '✦ PREMIUM'),
            React.createElement('div', { style: { fontSize:18, fontWeight:300, color:theme.colors.text, letterSpacing:0.5, lineHeight:1.3 }},
              'Anatomi Manusia', React.createElement('br'), React.createElement('span', { style: { fontWeight:600 }}, 'Dasar')),
          ),
          React.createElement('div', { style: { fontSize:48, opacity:0.8, animation:'float 4s ease-in-out infinite' }}, '🧬')
        ),
        React.createElement('div', { style: { marginTop:16 }},
          React.createElement(GlassProgress, { value:72, height:3, color:theme.colors.gradientMain }),
          React.createElement('div', { style: { fontSize:10, color:theme.colors.accent2, marginTop:6, letterSpacing:1 }}, '72% COMPLETE'),
        )
      )
    ),
    /* Minimal Stats */
    React.createElement('div', { style: { display:'flex', justifyContent:'space-around', padding:'0 10px' }},
      [{v:'2,840', l:'XP'},{v:'14', l:'STREAK'},{v:'47', l:'DONE'},{v:'#12', l:'RANK'}].map((s,i) =>
        React.createElement('div', { key:i, style: {
          textAlign:'center', animation:'counter-up 0.5s ease both', animationDelay:`${0.3+i*0.08}s`
        }},
          React.createElement('div', { style: {
            fontSize:20, fontWeight:300, color:theme.colors.accent1, letterSpacing:1
          }}, s.v),
          React.createElement('div', { style: { fontSize:8, letterSpacing:2, color:theme.colors.textMuted, marginTop:4 }}, s.l),
        )
      )
    ),
    /* Course Grid - Magazine Style */
    React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:2 }},
      React.createElement('div', { style: { fontSize:9, letterSpacing:3, color:theme.colors.textMuted, textTransform:'uppercase', marginBottom:10 }}, 'YOUR COURSES'),
      COURSES_DATA.slice(0,4).map((c,i) =>
        React.createElement('div', { key:c.id, onClick:()=>onNavigate('course'), style: {
          display:'flex', alignItems:'center', gap:16, padding:'14px 0',
          borderBottom:`1px solid ${theme.colors.glassBorder}`,
          cursor:'pointer', animation:`stagger-in 0.4s ease both`, animationDelay:`${0.4+i*0.08}s`,
        }},
          React.createElement('span', { style: { fontSize:26 }}, c.icon),
          React.createElement('div', { style: { flex:1 }},
            React.createElement('div', { style: { fontSize:13, fontWeight:300, color:theme.colors.text, letterSpacing:0.3 }}, c.title),
            React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted, letterSpacing:1 }}, `${c.lessons} LESSONS`),
          ),
          React.createElement('div', { style: { fontSize:12, color:theme.colors.accent1, fontWeight:600 }}, `${c.progress}%`)
        )
      )
    ),
  );
}

/* ═══════════════════════════════════════════
   DESIGN 4: NEON MATRIX
   Terminal-inspired dashboard, monospace
   ═══════════════════════════════════════════ */
function HomeNeon({ onNavigate, userName }) {
  const theme = useTheme();
  const [cmdText, setCmdText] = React.useState('');
  React.useEffect(() => {
    const full = `> cortex --user ${userName||'user'} --init-dashboard`;
    let i=0;
    const iv=setInterval(()=>{ if(i<=full.length){setCmdText(full.slice(0,i));i++;}else clearInterval(iv);},30);
    return ()=>clearInterval(iv);
  },[]);
  return React.createElement('div', { style: { padding:'0 16px 20px', display:'flex', flexDirection:'column', gap:14, fontFamily:'monospace' }},
    /* Terminal Header */
    React.createElement(GlassCard, { style: { padding:'12px 14px', animation:'slide-down 0.5s ease both' }},
      React.createElement('div', { style: { display:'flex', gap:6, marginBottom:8 }},
        ['#ff5f57','#febc2e','#28c840'].map((c,i)=>
          React.createElement('div', { key:i, style: { width:8, height:8, borderRadius:4, background:c }})
        )
      ),
      React.createElement('div', { style: { fontSize:12, color:theme.colors.accent1, display:'flex', alignItems:'center' }},
        React.createElement('span', null, cmdText),
        React.createElement('span', { style: { display:'inline-block', width:7, height:14, background:theme.colors.accent1, marginLeft:2, animation:'blink-cursor 1s step-end infinite' }})
      ),
    ),
    /* Status Bar */
    React.createElement('div', { style: { display:'flex', gap:8 }},
      [
        { l:'STATUS', v:'ONLINE', c:theme.colors.accent1 },
        { l:'STREAK', v:'14D', c:theme.colors.accent2 },
        { l:'RANK', v:'#12', c:theme.colors.accent3 },
      ].map((s,i) => React.createElement(GlassCard, { key:i, style: {
        flex:1, padding:'10px 8px', textAlign:'center',
        animation:`stagger-in 0.3s ease both`, animationDelay:`${0.2+i*0.08}s`
      }},
        React.createElement('div', { style: { fontSize:8, letterSpacing:2, color:theme.colors.textMuted }}, s.l),
        React.createElement('div', { style: { fontSize:14, fontWeight:700, color:s.c, marginTop:4, fontFamily:'monospace' }}, s.v),
      ))
    ),
    /* XP */
    React.createElement(GlassCard, { style: { padding:14 }},
      React.createElement('div', { style: { fontSize:9, letterSpacing:2, color:theme.colors.textMuted, marginBottom:8 }}, 'XP_PROGRESS'),
      React.createElement(XPDisplay, { xp:2840, level:7 })
    ),
    /* Course Modules as "Processes" */
    React.createElement('div', null,
      React.createElement('div', { style: { fontSize:9, letterSpacing:2, color:theme.colors.textMuted, marginBottom:10 }}, 'ACTIVE_PROCESSES'),
      React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:8 }},
        COURSES_DATA.slice(0,4).map((c,i) =>
          React.createElement(GlassCard, { key:c.id, onClick:()=>onNavigate('course'), style: {
            padding:'12px 14px', animation:`stagger-in 0.4s ease both`, animationDelay:`${0.35+i*0.08}s`,
          }},
            React.createElement('div', { style: { display:'flex', alignItems:'center', gap:10 }},
              React.createElement('span', { style: { fontSize:10, color:theme.colors.accent1, fontFamily:'monospace' }}, `PID:${1024+c.id}`),
              React.createElement('span', { style: { fontSize:18 }}, c.icon),
              React.createElement('div', { style: { flex:1 }},
                React.createElement('div', { style: { fontSize:12, fontWeight:700, color:theme.colors.text, fontFamily:'monospace' }}, c.title),
                React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }},
                  React.createElement(GlassProgress, { value:c.progress, height:3, color:`${theme.colors.accent1}`, style:{ flex:1, marginRight:8 } }),
                  React.createElement('span', { style: { fontSize:10, color:theme.colors.accent1, fontFamily:'monospace' }}, `${c.progress}%`),
                )
              )
            )
          )
        )
      )
    ),
    /* Quick Commands */
    React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }},
      [{i:'⚡',l:'./quiz --daily'},{i:'📊',l:'./leaderboard'},{i:'🎯',l:'./challenge'},{i:'📋',l:'./notes'}].map((a,i)=>
        React.createElement(GlassCard, { key:i, onClick:()=>onNavigate(i===0?'quiz':'profile'), style: {
          padding:12, cursor:'pointer', animation:`stagger-in 0.3s ease both`, animationDelay:`${0.55+i*0.06}s`,
        }},
          React.createElement('div', { style: { fontSize:20, marginBottom:4 }}, a.i),
          React.createElement('div', { style: { fontSize:10, color:theme.colors.accent1, fontFamily:'monospace' }}, a.l),
        )
      )
    ),
  );
}

/* ═══════════════════════════════════════════
   DESIGN 5: SUNSET BLOOM
   Bento grid with warm playful energy
   ═══════════════════════════════════════════ */
function HomeBloom({ onNavigate, userName }) {
  const theme = useTheme();
  return React.createElement('div', { style: { padding:'0 16px 20px', display:'flex', flexDirection:'column', gap:14 }},
    /* Playful Header */
    React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', animation:'slide-down 0.5s ease both' }},
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize:24, fontWeight:800, color:theme.colors.text }}, `Hey ${userName||'Bestie'}! 👋`),
        React.createElement('div', { style: { fontSize:13, color:theme.colors.textSecondary }}, 'Let\'s crush it today ✨'),
      ),
      React.createElement(StreakFlame, { days:14 })
    ),
    /* Bento Grid */
    React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr', gridAutoRows:'auto', gap:10 }},
      /* Big Card - spans 2 cols */
      React.createElement(GlassCard, { onClick:()=>onNavigate('course'), style: {
        gridColumn:'1 / -1', padding:20,
        background:'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(254,202,87,0.08))',
        animation:'scale-in 0.5s ease both', animationDelay:'0.1s',
      }},
        React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'flex-start' }},
          React.createElement('div', null,
            React.createElement(GlassBadge, { accent:true, style:{marginBottom:10} }, '🔥 Continue'),
            React.createElement('div', { style: { fontSize:17, fontWeight:800, color:theme.colors.text, lineHeight:1.3 }}, 'Anatomi Manusia'),
            React.createElement('div', { style: { fontSize:12, color:theme.colors.textSecondary, margin:'4px 0 12px' }}, 'Ch.12: Sistem Saraf'),
            React.createElement(GlassProgress, { value:72, height:6 }),
          ),
          React.createElement('div', { style: { fontSize:50, animation:'float 3s ease-in-out infinite' }}, '🧬')
        )
      ),
      /* Stats Bento */
      React.createElement(GlassCard, { style: { padding:16, animation:'stagger-in 0.4s ease both', animationDelay:'0.2s' }},
        React.createElement('div', { style: { fontSize:32, marginBottom:4 }}, '⚡'),
        React.createElement('div', { style: {
          fontSize:28, fontWeight:800, color:theme.colors.accent1,
        }}, React.createElement(AnimCounter, { end: 2840 })),
        React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted }}, 'Total XP'),
      ),
      React.createElement(GlassCard, { onClick:()=>onNavigate('quiz'), style: {
        padding:16, background:'linear-gradient(135deg, rgba(162,155,254,0.15), rgba(255,107,107,0.05))',
        animation:'stagger-in 0.4s ease both', animationDelay:'0.25s',
      }},
        React.createElement('div', { style: { fontSize:32, marginBottom:4 }}, '🧪'),
        React.createElement('div', { style: { fontSize:16, fontWeight:800, color:theme.colors.text }}, 'Quiz Harian'),
        React.createElement('div', { style: { fontSize:10, color:theme.colors.accent3 }}, 'Belum dikerjakan!'),
      ),
      /* Level Card */
      React.createElement(GlassCard, { style: { gridColumn:'1 / -1', padding:14, animation:'stagger-in 0.4s ease both', animationDelay:'0.3s' }},
        React.createElement(XPDisplay, { xp:2840, level:7 })
      ),
    ),
    /* Courses */
    React.createElement('div', { style: { fontSize:16, fontWeight:800, color:theme.colors.text }}, 'Kursus Kamu 📚'),
    React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:10 }},
      COURSES_DATA.slice(0,3).map((c,i) =>
        React.createElement(CourseCard, { key:c.id, course:c, onClick:()=>onNavigate('course'), delay:0.4+i*0.08 })
      )
    ),
    /* Leaderboard Peek */
    React.createElement(GlassCard, { onClick:()=>onNavigate('profile'), style: {
      padding:16, background:'linear-gradient(135deg, rgba(254,202,87,0.1), rgba(162,155,254,0.05))',
      animation:'stagger-in 0.4s ease both', animationDelay:'0.6s',
    }},
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center' }},
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize:14, fontWeight:800, color:theme.colors.text }}, '🏆 Leaderboard'),
          React.createElement('div', { style: { fontSize:11, color:theme.colors.textSecondary }}, 'Kamu ranking #12 minggu ini!'),
        ),
        React.createElement('div', { style: { fontSize:24, color:theme.colors.accent2 }}, '→')
      )
    ),
  );
}

const HOME_COMPONENTS = { neural:HomeNeural, aurora:HomeAurora, gold:HomeGold, neon:HomeNeon, bloom:HomeBloom };

Object.assign(window, { HOME_COMPONENTS, HomeNeural, HomeAurora, HomeGold, HomeNeon, HomeBloom, COURSES_DATA, CATEGORIES });
