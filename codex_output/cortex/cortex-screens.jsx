/* CORTEX — Adaptive Screens (Splash, Course Detail, Quiz, Profile) */

/* ═══════════════════════════════════════════
   SPLASH / ONBOARDING SCREEN
   ═══════════════════════════════════════════ */
function SplashScreen({ onComplete, themeId }) {
  const theme = useTheme();
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t1 = setTimeout(()=>setStep(1), 600);
    const t2 = setTimeout(()=>setStep(2), 1400);
    const t3 = setTimeout(()=>setStep(3), 2200);
    return ()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  const logoEmojis = { neural:'🧠', aurora:'🌌', gold:'✨', neon:'💚', bloom:'🌸' };
  const taglines = {
    neural:'Activate Your Mind', aurora:'Explore Beyond Limits',
    gold:'Excellence Redefined', neon:'> hack_your_brain()', bloom:'Learn, Play, Grow ✨',
  };
  return React.createElement('div', { style: {
    position:'absolute', inset:0, display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', zIndex:100,
    background:theme.colors.bg,
  }},
    React.createElement(ThemeBackground, { themeId }),
    React.createElement('div', { style: { position:'relative', zIndex:2, textAlign:'center', padding:40 }},
      React.createElement('div', { style: {
        fontSize:72, marginBottom:20,
        opacity:step>=0?1:0, transform:step>=0?'scale(1)':'scale(0.5)',
        transition:'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
        filter: step>=1 ? `drop-shadow(0 0 30px rgba(${theme.colors.glow},0.6))` : 'none',
      }}, logoEmojis[themeId]),
      React.createElement('div', { style: {
        fontSize:28, fontWeight:theme.fontWeight.heading, color:theme.colors.text,
        letterSpacing:2, opacity:step>=1?1:0, transform:step>=1?'translateY(0)':'translateY(20px)',
        transition:'all 0.6s ease', transitionDelay:'0.1s',
        fontFamily: themeId==='neon'?'monospace':'inherit',
      }}, 'CORTEX'),
      React.createElement('div', { style: {
        fontSize:12, color:theme.colors.textSecondary, marginTop:8, letterSpacing:3,
        textTransform:'uppercase', opacity:step>=2?1:0,
        transition:'all 0.6s ease', fontWeight:300,
      }}, taglines[themeId]),
      React.createElement('div', { onClick:onComplete, style: {
        marginTop:40, opacity:step>=3?1:0, transition:'all 0.5s ease',
        cursor:'pointer',
      }},
        React.createElement('div', { style: {
          ...glassCardStyle(theme, { padding:'14px 40px', display:'inline-block' }),
        }},
          React.createElement('span', { style: {
            fontSize:14, fontWeight:600, color:theme.colors.accent1, letterSpacing:1,
          }}, themeId==='neon' ? '> START' : 'Mulai Belajar →')
        )
      )
    )
  );
}

/* ═══════════════════════════════════════════
   COURSE DETAIL SCREEN
   ═══════════════════════════════════════════ */
function CourseDetailScreen({ onBack, onNavigate }) {
  const theme = useTheme();
  const chapters = [
    { id:1, title:'Pengenalan Anatomi', duration:'25 min', done:true },
    { id:2, title:'Sel dan Jaringan', duration:'30 min', done:true },
    { id:3, title:'Sistem Rangka', duration:'35 min', done:true },
    { id:4, title:'Sistem Otot', duration:'28 min', done:true },
    { id:5, title:'Sistem Pencernaan', duration:'32 min', done:true },
    { id:6, title:'Sistem Pernapasan', duration:'30 min', done:true },
    { id:7, title:'Sistem Kardiovaskular', duration:'40 min', done:true },
    { id:8, title:'Sistem Limfatik', duration:'25 min', done:true },
    { id:9, title:'Sistem Endokrin', duration:'35 min', done:true },
    { id:10, title:'Sistem Saraf Tepi', duration:'38 min', done:true },
    { id:11, title:'Sistem Saraf Otonom', duration:'30 min', done:true },
    { id:12, title:'Sistem Saraf Pusat', duration:'42 min', done:false, current:true },
    { id:13, title:'Organ Sensorik', duration:'28 min', done:false },
    { id:14, title:'Sistem Reproduksi', duration:'35 min', done:false },
  ];
  return React.createElement('div', { style: { display:'flex', flexDirection:'column', height:'100%' }},
    /* Header */
    React.createElement('div', { style: { padding:'4px 18px 14px', animation:'slide-down 0.4s ease both' }},
      React.createElement('div', { onClick:onBack, style: {
        fontSize:13, color:theme.colors.accent1, cursor:'pointer', marginBottom:12, display:'flex', alignItems:'center', gap:4,
      }}, '← Kembali'),
      React.createElement('div', { style: { display:'flex', gap:16, alignItems:'flex-start' }},
        React.createElement('div', { style: { fontSize:48, animation:'float 4s ease-in-out infinite' }}, '🧬'),
        React.createElement('div', { style: { flex:1 }},
          React.createElement(GlassBadge, { accent:true, style:{ marginBottom:6 }}, '🩺 Medis'),
          React.createElement('div', { style: { fontSize:18, fontWeight:theme.fontWeight.heading, color:theme.colors.text, lineHeight:1.3 }},
            'Anatomi Manusia Dasar'),
          React.createElement('div', { style: { fontSize:11, color:theme.colors.textSecondary, marginTop:4 }},
            '24 lessons • 8 jam • Dr. Sarah Chen'),
        )
      ),
      React.createElement('div', { style: { marginTop:14 }},
        React.createElement(GlassProgress, { value:72, height:6 }),
        React.createElement('div', { style: { display:'flex', justifyContent:'space-between', marginTop:6 }},
          React.createElement('span', { style: { fontSize:10, color:theme.colors.textMuted }}, '17/24 selesai'),
          React.createElement('span', { style: { fontSize:10, color:theme.colors.accent1, fontWeight:600 }}, '72%'),
        )
      ),
    ),
    /* Stats Row */
    React.createElement('div', { style: { display:'flex', gap:8, padding:'0 18px 14px' }},
      [{i:'⏱️',v:'5.8 jam',l:'Waktu'},{i:'⚡',v:'680 XP',l:'Earned'},{i:'🏅',v:'4',l:'Badges'}].map((s,i)=>
        React.createElement(GlassCard, { key:i, style: {
          flex:1, padding:'10px 8px', textAlign:'center',
          animation:`stagger-in 0.3s ease both`, animationDelay:`${0.1+i*0.08}s`,
        }},
          React.createElement('div', { style: { fontSize:16 }}, s.i),
          React.createElement('div', { style: { fontSize:13, fontWeight:700, color:theme.colors.text, marginTop:2 }}, s.v),
          React.createElement('div', { style: { fontSize:9, color:theme.colors.textMuted }}, s.l),
        )
      )
    ),
    /* Chapter List */
    React.createElement('div', { style: {
      flex:1, overflowY:'auto', padding:'0 18px 20px',
    }, className:'hide-scrollbar' },
      React.createElement('div', { style: { fontSize:13, fontWeight:700, color:theme.colors.text, marginBottom:10 }}, 'Chapters'),
      React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:6 }},
        chapters.map((ch,i) => React.createElement(GlassCard, {
          key:ch.id,
          onClick: ch.current ? ()=>onNavigate('quiz') : undefined,
          style: {
            padding:'12px 14px',
            background: ch.current ? `${theme.colors.accent1}15` : theme.colors.glass,
            border: ch.current ? `1px solid ${theme.colors.accent1}44` : `1px solid ${theme.colors.glassBorder}`,
            animation:`stagger-in 0.3s ease both`, animationDelay:`${0.2+i*0.04}s`,
          }
        },
          React.createElement('div', { style: { display:'flex', alignItems:'center', gap:12 }},
            React.createElement('div', { style: {
              width:28, height:28, borderRadius:14, flexShrink:0,
              background: ch.done ? theme.colors.gradientAccent : ch.current ? `${theme.colors.accent1}33` : 'rgba(255,255,255,0.05)',
              border: ch.done || ch.current ? 'none' : `1px solid ${theme.colors.glassBorder}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: ch.done ? 12 : 10, color:'#fff', fontWeight:700,
            }}, ch.done ? '✓' : ch.id),
            React.createElement('div', { style: { flex:1 }},
              React.createElement('div', { style: {
                fontSize:12, fontWeight: ch.current?700:400, color: ch.done||ch.current ? theme.colors.text : theme.colors.textMuted,
              }}, ch.title),
              React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted }}, ch.duration),
            ),
            ch.current && React.createElement(GlassBadge, { accent:true, style:{ fontSize:9 }}, '▶ PLAY')
          )
        ))
      )
    ),
  );
}

/* ═══════════════════════════════════════════
   QUIZ SCREEN
   ═══════════════════════════════════════════ */
function QuizScreen({ onBack }) {
  const theme = useTheme();
  const [current, setCurrent] = React.useState(0);
  const [selected, setSelected] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [answered, setAnswered] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const questions = [
    { q:'Bagian otak mana yang mengontrol keseimbangan tubuh?',
      opts:['Cerebrum','Cerebellum','Medulla Oblongata','Thalamus'], correct:1 },
    { q:'Neurotransmitter utama pada sistem saraf parasimpatik adalah?',
      opts:['Dopamin','Serotonin','Asetilkolin','Norepinefrin'], correct:2 },
    { q:'Berapa jumlah pasang saraf kranial pada manusia?',
      opts:['10 pasang','12 pasang','14 pasang','8 pasang'], correct:1 },
  ];
  const handleSelect = (idx) => {
    if(answered) return;
    setSelected(idx); setAnswered(true);
    if(idx === questions[current].correct) setScore(s=>s+1);
    setTimeout(()=>{
      if(current < questions.length-1) {
        setCurrent(c=>c+1); setSelected(null); setAnswered(false);
      } else { setShowResult(true); }
    }, 1200);
  };
  if(showResult) {
    return React.createElement('div', { style: {
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      height:'100%', padding:30, textAlign:'center',
    }},
      React.createElement('div', { style: { fontSize:72, marginBottom:20, animation:'scale-bounce 0.8s ease both' }},
        score===questions.length ? '🏆' : score>=2 ? '🌟' : '💪'),
      React.createElement('div', { style: { fontSize:24, fontWeight:theme.fontWeight.heading, color:theme.colors.text, marginBottom:8 }},
        score===questions.length ? 'Perfect!' : 'Bagus!'),
      React.createElement('div', { style: { fontSize:14, color:theme.colors.textSecondary, marginBottom:20 }},
        `${score}/${questions.length} jawaban benar`),
      React.createElement('div', { style: {
        fontSize:28, fontWeight:800, color:theme.colors.accent1,
        background:theme.colors.gradientMain, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        marginBottom:24,
      }}, `+${score*50} XP`),
      React.createElement(GlassCard, { onClick:onBack, style: { padding:'14px 40px', cursor:'pointer' }},
        React.createElement('span', { style: { color:theme.colors.accent1, fontWeight:600 }}, '← Kembali ke Dashboard')
      ),
    );
  }
  const q = questions[current];
  return React.createElement('div', { style: { display:'flex', flexDirection:'column', height:'100%' }},
    /* Header */
    React.createElement('div', { style: { padding:'4px 18px 14px' }},
      React.createElement('div', { onClick:onBack, style: {
        fontSize:13, color:theme.colors.accent1, cursor:'pointer', marginBottom:12,
      }}, '← Kembali'),
      React.createElement('div', { style: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }},
        React.createElement('div', { style: { fontSize:15, fontWeight:700, color:theme.colors.text }}, '🧪 Quiz Harian'),
        React.createElement(GlassBadge, null, `${current+1}/${questions.length}`),
      ),
      React.createElement(GlassProgress, { value:((current+1)/questions.length)*100, height:4 }),
    ),
    /* Question */
    React.createElement('div', { style: { flex:1, padding:'10px 18px 20px', display:'flex', flexDirection:'column', gap:14 }},
      React.createElement(GlassCard, { key:current, style: {
        padding:20, textAlign:'center', animation:'scale-in 0.4s ease both',
      }},
        React.createElement('div', { style: { fontSize:40, marginBottom:14 }}, '🧠'),
        React.createElement('div', { style: {
          fontSize:15, fontWeight:600, color:theme.colors.text, lineHeight:1.5, textWrap:'pretty',
        }}, q.q),
      ),
      React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:10 }},
        q.opts.map((opt,i) => {
          const isCorrect = i===q.correct;
          const isSelected = i===selected;
          let bg = theme.colors.glass;
          let border = theme.colors.glassBorder;
          if(answered) {
            if(isCorrect) { bg='rgba(34,197,94,0.15)'; border='rgba(34,197,94,0.5)'; }
            else if(isSelected && !isCorrect) { bg='rgba(239,68,68,0.15)'; border='rgba(239,68,68,0.5)'; }
          }
          return React.createElement(GlassCard, {
            key:i, onClick:()=>handleSelect(i),
            style: {
              padding:'14px 16px', background:bg, borderColor:border,
              animation:`stagger-in 0.4s ease both`, animationDelay:`${0.2+i*0.08}s`,
              transition:'all 0.3s ease',
              transform: isSelected ? 'scale(0.98)' : 'scale(1)',
            }
          },
            React.createElement('div', { style: { display:'flex', alignItems:'center', gap:12 }},
              React.createElement('div', { style: {
                width:28, height:28, borderRadius:14, flexShrink:0,
                background: answered && isCorrect ? 'rgba(34,197,94,0.3)' : answered && isSelected ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.06)',
                border:`1px solid ${answered && isCorrect ? 'rgba(34,197,94,0.5)' : answered && isSelected ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:12, fontWeight:700, color:'#fff',
              }}, answered ? (isCorrect ? '✓' : isSelected ? '✕' : String.fromCharCode(65+i)) : String.fromCharCode(65+i)),
              React.createElement('span', { style: {
                fontSize:13, color:theme.colors.text, fontWeight: isSelected?600:400,
              }}, opt)
            )
          );
        })
      ),
      /* Score Indicator */
      React.createElement('div', { style: { display:'flex', justifyContent:'center', gap:6, marginTop:8 }},
        questions.map((_,i) => React.createElement('div', { key:i, style: {
          width:8, height:8, borderRadius:4,
          background: i<current ? (i===0||(score>0&&i<score) ? theme.colors.accent1 : 'rgba(239,68,68,0.6)') : i===current ? theme.colors.accent1+'66' : 'rgba(255,255,255,0.1)',
          transition:'all 0.3s ease',
        }}))
      ),
    ),
  );
}

/* ═══════════════════════════════════════════
   PROFILE / ACHIEVEMENT SCREEN
   ═══════════════════════════════════════════ */
function ProfileScreen({ onBack }) {
  const theme = useTheme();
  const achievements = [
    { icon:'🔥', title:'7-Day Streak', unlocked:true },
    { icon:'🧬', title:'Bio Master', unlocked:true },
    { icon:'💻', title:'Code Ninja', unlocked:true },
    { icon:'🏆', title:'Top 10', unlocked:true },
    { icon:'📚', title:'Bookworm', unlocked:true },
    { icon:'🎯', title:'Perfectionist', unlocked:false },
    { icon:'⚡', title:'Speed Learner', unlocked:false },
    { icon:'🌟', title:'All Stars', unlocked:false },
  ];
  const leaderboard = [
    { rank:1, name:'Aria Putri', xp:4200 },
    { rank:2, name:'Budi Santoso', xp:3850 },
    { rank:3, name:'Citra Dewi', xp:3600 },
    { rank:4, name:'Dimas Prakoso', xp:3100 },
    { rank:5, name:'Eka Saputra', xp:2950 },
    { rank:12, name:'Kamu', xp:2840, isUser:true },
  ];
  return React.createElement('div', { style: { display:'flex', flexDirection:'column', height:'100%' }},
    React.createElement('div', { style: { padding:'4px 18px 0' }},
      React.createElement('div', { onClick:onBack, style: { fontSize:13, color:theme.colors.accent1, cursor:'pointer', marginBottom:12 }}, '← Kembali'),
    ),
    React.createElement('div', { style: { flex:1, overflowY:'auto', padding:'0 18px 20px' }, className:'hide-scrollbar' },
      /* Profile Header */
      React.createElement('div', { style: { textAlign:'center', marginBottom:20, animation:'slide-down 0.5s ease both' }},
        React.createElement('div', { style: {
          width:80, height:80, borderRadius:40, margin:'0 auto 12px',
          background:theme.colors.gradientMain,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:36, boxShadow:`0 0 30px ${theme.colors.shadowColor}`,
          border:`3px solid ${theme.colors.glassBorder}`,
        }}, '🧑‍🎓'),
        React.createElement('div', { style: { fontSize:20, fontWeight:theme.fontWeight.heading, color:theme.colors.text }}, 'Cortexian'),
        React.createElement('div', { style: { fontSize:11, color:theme.colors.textSecondary, marginTop:4 }}, 'Bergabung 3 bulan lalu'),
      ),
      /* Level & XP */
      React.createElement(GlassCard, { style: { padding:16, marginBottom:14, animation:'scale-in 0.5s ease both', animationDelay:'0.1s' }},
        React.createElement(XPDisplay, { xp:2840, level:7 }),
      ),
      /* Stats Grid */
      React.createElement('div', { style: { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8, marginBottom:16 }},
        React.createElement(StatCard, { icon:'🔥', label:'Streak', value:14, suffix:' hari', delay:0.2 }),
        React.createElement(StatCard, { icon:'📚', label:'Kursus', value:6, delay:0.25 }),
        React.createElement(StatCard, { icon:'⏱️', label:'Jam Belajar', value:42, delay:0.3 }),
      ),
      /* Achievements */
      React.createElement('div', { style: { fontSize:14, fontWeight:700, color:theme.colors.text, marginBottom:12 }}, '🏅 Achievements'),
      React.createElement('div', { style: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:18 }},
        achievements.map((a,i) => React.createElement(AchievementBadge, { key:i, ...a, delay:0.35+i*0.06 }))
      ),
      /* Leaderboard */
      React.createElement('div', { style: { fontSize:14, fontWeight:700, color:theme.colors.text, marginBottom:12 }}, '🏆 Leaderboard'),
      React.createElement('div', { style: { display:'flex', flexDirection:'column', gap:6 }},
        leaderboard.map((l,i) => React.createElement(LeaderRow, { key:l.rank, ...l, delay:0.5+i*0.06 }))
      ),
    ),
  );
}

Object.assign(window, { SplashScreen, CourseDetailScreen, QuizScreen, ProfileScreen });
