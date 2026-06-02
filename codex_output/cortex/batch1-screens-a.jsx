/* CORTEX DESIGN LIBRARY — Batch 1 Screens (1-4)
   Page 1: Welcome / Entry
   Page 2: Home / Dashboard
   Page 3: Main Learning Page
   Page 4: Slide / Section Detail */

/* ═══════════════════════════════════════════
   PAGE 1 — WELCOME / ENTRY SCREEN
   Premium onboarding with liquid glass identity
   ═══════════════════════════════════════════ */
function PageWelcome({ onNavigate }) {
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    const t = [500,1200,2000,2800].map((d,i) => setTimeout(()=>setStep(i+1),d));
    return () => t.forEach(clearTimeout);
  }, []);

  const orbs = React.useMemo(() => [
    { x:15, y:20, s:180, c:'rgba(99,102,241,0.25)', d:11 },
    { x:75, y:15, s:140, c:'rgba(168,85,247,0.2)', d:13 },
    { x:50, y:70, s:200, c:'rgba(99,102,241,0.18)', d:15 },
    { x:85, y:75, s:120, c:'rgba(251,191,36,0.12)', d:10 },
  ], []);

  return React.createElement('div', {
    'data-screen-label': 'P1-Welcome',
    style: { position:'absolute', inset:0, display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', background:DL.bg, overflow:'hidden' }
  },
    /* Animated orbs background */
    React.createElement('div', { style:{ position:'absolute', inset:0, filter:'blur(60px)' }},
      orbs.map((o,i) => React.createElement('div', { key:i, style:{
        position:'absolute', left:`${o.x}%`, top:`${o.y}%`, width:o.s, height:o.s,
        background:o.c, borderRadius:'50%',
        animation:`morph-blob ${o.d}s ease-in-out infinite, float-slow ${o.d+3}s ease-in-out infinite`,
        animationDelay:`${i*-2}s`,
      }}))
    ),
    /* Content */
    React.createElement('div', { style:{ position:'relative', zIndex:2, textAlign:'center', padding:'0 40px', maxWidth:340 }},
      /* Logo mark */
      React.createElement('div', { style:{
        width:88, height:88, borderRadius:28, margin:'0 auto 24px',
        background:'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.15))',
        border:`1px solid ${DL.glassBorder}`,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:`0 8px 40px ${DL.shadowColor}, 0 0 60px rgba(168,85,247,0.15)`,
        opacity:step>=1?1:0, transform:step>=1?'scale(1) rotate(0deg)':'scale(0.5) rotate(-10deg)',
        transition:'all 0.8s cubic-bezier(0.34,1.56,0.64,1)',
      }},
        React.createElement('div', { style:{ fontSize:38 }}, '🧬')
      ),
      /* Title */
      React.createElement('div', { style:{
        fontSize:30, fontWeight:700, color:DL.text, letterSpacing:1.5,
        opacity:step>=2?1:0, transform:step>=2?'translateY(0)':'translateY(16px)',
        transition:'all 0.6s ease 0.1s',
      }}, 'CORTEX'),
      React.createElement('div', { style:{
        fontSize:11, letterSpacing:4, color:DL.accent, textTransform:'uppercase',
        marginTop:4, fontWeight:600,
        opacity:step>=2?1:0, transition:'all 0.5s ease 0.2s',
      }}, 'EDUCATION'),
      /* Tagline */
      React.createElement('div', { style:{
        fontSize:14, color:DL.sub, lineHeight:1.6, marginTop:20, textWrap:'pretty',
        opacity:step>=3?1:0, transform:step>=3?'translateY(0)':'translateY(12px)',
        transition:'all 0.5s ease',
      }}, 'Platform pembelajaran medis premium berbasis AI untuk mahasiswa & profesional.'),
      /* CTA */
      React.createElement('div', { style:{
        marginTop:32, opacity:step>=4?1:0, transform:step>=4?'translateY(0)':'translateY(16px)',
        transition:'all 0.5s ease',
      }},
        React.createElement(B1Button, {
          label:'Mulai Belajar', full:true, onClick:()=>onNavigate(2),
          style:{ padding:'14px 0' },
        }),
        React.createElement('div', { style:{ marginTop:14 }},
          React.createElement(B1Button, {
            label:'Sudah punya akun? Masuk', variant:'ghost', full:true,
            onClick:()=>onNavigate(2),
            style:{ background:'none', border:'none', color:DL.sub, fontSize:12 },
          })
        ),
      ),
      /* Dots / steps indicator */
      React.createElement('div', { style:{
        display:'flex', gap:6, justifyContent:'center', marginTop:28,
        opacity:step>=4?1:0, transition:'opacity 0.5s ease',
      }},
        [0,1,2].map(i => React.createElement('div', { key:i, style:{
          width: i===0?20:6, height:6, borderRadius:3,
          background: i===0 ? DL.accent : 'rgba(255,255,255,0.15)',
          transition:'all 0.3s ease',
        }}))
      ),
    )
  );
}

/* ═══════════════════════════════════════════
   PAGE 2 — HOME / LIGHTWEIGHT DASHBOARD
   Clean medical learning dashboard
   ═══════════════════════════════════════════ */
function PageHome({ onNavigate }) {
  const courses = [
    { id:1, icon:'🧬', title:'Anatomi Manusia', sub:'Ch.12 — Sistem Saraf Pusat', progress:72, lessons:24, badge:'Lanjutkan' },
    { id:2, icon:'🫀', title:'Kardiologi Klinis', sub:'Ch.5 — Aritmia & EKG', progress:30, lessons:20, badge:null },
    { id:3, icon:'🧪', title:'Farmakologi Dasar', sub:'Ch.8 — Farmakokinetik', progress:55, lessons:16, badge:null },
  ];
  return React.createElement('div', {
    'data-screen-label': 'P2-Home',
    style:{ display:'flex', flexDirection:'column', height:'100%' }
  },
    /* Topbar */
    React.createElement(B1Topbar, {
      transparent: true,
      left: React.createElement('div', { style:{
        width:34, height:34, borderRadius:17, background:DL.gradA,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:15,
        boxShadow:`0 0 12px ${DL.shadowColor}`,
      }}, '🧑‍🎓'),
      title: null,
      right: React.createElement('div', { style:{ display:'flex', gap:8 }},
        React.createElement('span', { onClick:()=>onNavigate(6), style:{ fontSize:18, cursor:'pointer', opacity:0.6 }}, '🔍'),
        React.createElement('span', { onClick:()=>onNavigate(5), style:{ fontSize:18, cursor:'pointer', opacity:0.6 }}, '☰'),
      ),
    }),
    /* Scrollable content */
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'0 18px 20px' }, className:'hide-scrollbar' },
      /* Greeting */
      React.createElement('div', { style:{ marginBottom:18, animation:'slide-down 0.5s ease backwards' }},
        React.createElement('div', { style:{ fontSize:22, fontWeight:700, color:DL.text }}, 'Halo, Dr. Raka'),
        React.createElement('div', { style:{ fontSize:13, color:DL.sub, marginTop:2 }}, 'Lanjutkan perjalanan belajarmu'),
      ),
      /* Stats row */
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:18 }},
        [{i:'🔥',v:14,l:'Hari Streak'},{i:'⚡',v:2840,l:'Total XP'},{i:'📚',v:6,l:'Kursus'}].map((s,idx) =>
          React.createElement(B1Card, { key:idx, pad:12, style:{
            textAlign:'center', animation:'stagger-in 0.4s ease backwards', animationDelay:`${0.1+idx*0.06}s`,
          }},
            React.createElement('div', { style:{ fontSize:20, marginBottom:4 }}, s.i),
            React.createElement('div', { style:{
              fontSize:18, fontWeight:800, color:DL.text,
              background:DL.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}, React.createElement(B1Counter, { end:s.v })),
            React.createElement('div', { style:{ fontSize:9, color:DL.mute, marginTop:2, letterSpacing:0.5 }}, s.l),
          )
        )
      ),
      /* Continue Learning — Hero card */
      React.createElement(B1Card, {
        onClick:()=>onNavigate(3), glow:true,
        style:{ marginBottom:18, background:DL.gradCard, animation:'scale-in 0.5s ease backwards', animationDelay:'0.25s' },
      },
        React.createElement(B1Badge, { color:DL.gold, style:{ marginBottom:10 } }, '🔥 Lanjutkan'),
        React.createElement('div', { style:{ display:'flex', gap:14, alignItems:'flex-start' }},
          React.createElement(B1Icon, { icon:'🧬', size:52 }),
          React.createElement('div', { style:{ flex:1 }},
            React.createElement('div', { style:{ fontSize:16, fontWeight:700, color:DL.text, lineHeight:1.3 }}, 'Anatomi Manusia Dasar'),
            React.createElement('div', { style:{ fontSize:11, color:DL.sub, margin:'4px 0 10px' }}, 'Ch.12 — Sistem Saraf Pusat'),
            React.createElement(B1Progress, { value:72 }),
            React.createElement('div', { style:{ fontSize:10, color:DL.mute, marginTop:5 }}, '72% • 6 lessons tersisa'),
          )
        )
      ),
      /* Courses list */
      React.createElement(B1Section, { title:'Kursus Aktif', action:'Lihat Semua', style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:10 }},
        courses.map((c,i) => React.createElement(B1Card, {
          key:c.id, onClick:()=>onNavigate(3),
          style:{ animation:'stagger-in 0.4s ease backwards', animationDelay:`${0.35+i*0.07}s` },
        },
          React.createElement('div', { style:{ display:'flex', gap:12, alignItems:'center' }},
            React.createElement(B1Icon, { icon:c.icon, size:44 }),
            React.createElement('div', { style:{ flex:1 }},
              React.createElement('div', { style:{ fontSize:13, fontWeight:600, color:DL.text }}, c.title),
              React.createElement('div', { style:{ fontSize:10, color:DL.sub, margin:'2px 0 8px' }}, c.sub),
              React.createElement(B1Progress, { value:c.progress, h:4 }),
            ),
            React.createElement('span', { style:{ fontSize:12, color:DL.accent, fontWeight:700 }}, `${c.progress}%`),
          )
        ))
      ),
      /* Quick actions */
      React.createElement(B1Section, { title:'Aksi Cepat', style:{ marginTop:18, marginBottom:10 } }),
      React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }},
        [{i:'🧪',l:'Quiz Harian',n:4},{i:'📊',l:'Progress',n:2},{i:'🤖',l:'AI Tutor',n:3},{i:'📖',l:'Glosarium',n:3}].map((a,i) =>
          React.createElement(B1Card, { key:i, pad:14, onClick:()=>onNavigate(a.n), style:{
            textAlign:'center', animation:'stagger-in 0.3s ease backwards', animationDelay:`${0.55+i*0.06}s`,
          }},
            React.createElement('div', { style:{ fontSize:26, marginBottom:6 }}, a.i),
            React.createElement('div', { style:{ fontSize:11, fontWeight:600, color:DL.text }}, a.l),
          )
        )
      ),
    ),
  );
}

/* ═══════════════════════════════════════════
   PAGE 3 — MAIN LEARNING PAGE
   Slide-based medical content viewport
   ═══════════════════════════════════════════ */
function PageLearning({ onNavigate }) {
  const [slideIdx, setSlideIdx] = React.useState(0);
  const slides = [
    { title:'Sistem Saraf Pusat', sub:'Pengenalan & Anatomi Dasar' },
    { title:'Otak Besar (Cerebrum)', sub:'Struktur & Fungsi Lobus' },
    { title:'Otak Kecil (Cerebellum)', sub:'Koordinasi Motorik' },
  ];
  const total = slides.length;
  const s = slides[slideIdx];

  return React.createElement('div', {
    'data-screen-label': 'P3-Learning',
    style:{ display:'flex', flexDirection:'column', height:'100%' }
  },
    /* Topbar */
    React.createElement(B1Topbar, {
      left: React.createElement('span', { onClick:()=>onNavigate(2), style:{ fontSize:13, color:DL.accent, cursor:'pointer' }}, '← Back'),
      title: 'Anatomi Manusia',
      subtitle: `Slide ${slideIdx+1} / ${total}`,
      right: React.createElement('span', { onClick:()=>onNavigate(5), style:{ fontSize:16, cursor:'pointer', opacity:0.6 }}, '☰'),
    }),
    /* Slide progress */
    React.createElement('div', { style:{ padding:'0 18px 8px' }},
      React.createElement(B1Progress, { value:((slideIdx+1)/total)*100, h:3 }),
    ),
    /* Content viewport */
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'0 18px 20px' }, className:'hide-scrollbar' },
      /* Slide card */
      React.createElement(B1Card, { key:slideIdx, glow:true, style:{
        marginBottom:16, animation:'scale-in 0.4s ease backwards',
      }},
        React.createElement(B1Badge, { color:DL.teal }, `📖 Slide ${slideIdx+1}`),
        React.createElement('div', { style:{ fontSize:20, fontWeight:700, color:DL.text, marginTop:12, lineHeight:1.3 }}, s.title),
        React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:4 }}, s.sub),
      ),
      /* Image placeholder */
      React.createElement(B1Card, { pad:0, style:{ marginBottom:16, overflow:'hidden' }},
        React.createElement('div', { style:{
          height:160, background:'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))',
          display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8,
        }},
          React.createElement('div', { style:{ fontSize:40, opacity:0.4 }}, '🧠'),
          React.createElement('div', { style:{ fontSize:11, color:DL.mute }}, 'Diagram: Struktur Otak Manusia'),
        )
      ),
      /* Text content */
      React.createElement('div', { style:{ fontSize:14, lineHeight:1.75, color:DL.sub, textWrap:'pretty' }},
        'Sistem saraf pusat (SSP) terdiri dari otak dan medulla spinalis. SSP merupakan pusat pengolahan informasi utama dalam tubuh manusia, menerima input sensorik, mengintegrasikan data, dan mengirimkan respon motorik.',
        React.createElement('br'), React.createElement('br'),
        'Otak manusia memiliki berat sekitar 1,4 kg dan terdiri dari sekitar 86 miliar neuron yang saling terhubung melalui sinapsis.',
      ),
      /* Clinical callout */
      React.createElement(B1Card, { style:{
        marginTop:16, background:'rgba(34,197,94,0.08)', borderColor:'rgba(34,197,94,0.25)',
      }},
        React.createElement('div', { style:{ display:'flex', gap:10, alignItems:'flex-start' }},
          React.createElement('span', { style:{ fontSize:18 }}, '💡'),
          React.createElement('div', null,
            React.createElement('div', { style:{ fontSize:12, fontWeight:700, color:DL.green }}, 'Clinical Pearl'),
            React.createElement('div', { style:{ fontSize:12, color:DL.sub, marginTop:4, lineHeight:1.6 }},
              'Kerusakan pada area Broca menyebabkan afasia motorik — pasien memahami bahasa tetapi kesulitan memproduksi kata-kata.'),
          )
        )
      ),
      /* Key terms */
      React.createElement(B1Section, { title:'Istilah Kunci', style:{ marginTop:18, marginBottom:8 } }),
      React.createElement('div', { style:{ display:'flex', flexWrap:'wrap', gap:6 }},
        ['Neuron','Sinapsis','Cerebrum','Cerebellum','Medulla','Akson','Dendrit'].map(t =>
          React.createElement(B1Badge, { key:t, style:{ cursor:'pointer' }}, t)
        )
      ),
    ),
    /* Navigation footer */
    React.createElement('div', { style:{
      display:'flex', gap:10, padding:'12px 18px 28px',
      borderTop:`1px solid ${DL.glassBorder}`,
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
    }},
      React.createElement(B1Button, {
        label:'← Prev', variant:'ghost',
        onClick:()=>setSlideIdx(Math.max(0,slideIdx-1)),
        style:{ flex:1, opacity:slideIdx===0?0.3:1 },
      }),
      React.createElement(B1Button, {
        label: slideIdx<total-1 ? 'Next →' : 'Selesai ✓',
        onClick:()=> slideIdx<total-1 ? setSlideIdx(slideIdx+1) : onNavigate(4),
        style:{ flex:1 },
      }),
    ),
  );
}

/* ═══════════════════════════════════════════
   PAGE 4 — SLIDE / SECTION DETAIL PAGE
   Deep dive into a specific topic section
   ═══════════════════════════════════════════ */
function PageSlideDetail({ onNavigate }) {
  const chapters = [
    { id:1, t:'Pengenalan Anatomi', dur:'25 min', done:true },
    { id:2, t:'Sel dan Jaringan', dur:'30 min', done:true },
    { id:3, t:'Sistem Rangka', dur:'35 min', done:true },
    { id:4, t:'Sistem Otot', dur:'28 min', done:true },
    { id:5, t:'Sistem Pencernaan', dur:'32 min', done:true },
    { id:6, t:'Sistem Kardiovaskular', dur:'40 min', done:true },
    { id:7, t:'Sistem Pernapasan', dur:'30 min', done:true },
    { id:8, t:'Sistem Limfatik', dur:'25 min', done:true },
    { id:9, t:'Sistem Endokrin', dur:'35 min', done:true },
    { id:10, t:'Sistem Saraf Tepi', dur:'38 min', done:true },
    { id:11, t:'Sistem Saraf Otonom', dur:'30 min', done:true },
    { id:12, t:'Sistem Saraf Pusat', dur:'42 min', done:false, current:true },
    { id:13, t:'Organ Sensorik', dur:'28 min', done:false },
    { id:14, t:'Sistem Reproduksi', dur:'35 min', done:false },
  ];
  return React.createElement('div', {
    'data-screen-label': 'P4-SlideDetail',
    style:{ display:'flex', flexDirection:'column', height:'100%' }
  },
    React.createElement(B1Topbar, {
      left: React.createElement('span', { onClick:()=>onNavigate(2), style:{ fontSize:13, color:DL.accent, cursor:'pointer' }}, '← Back'),
      title: 'Detail Kursus',
      right: React.createElement('span', { style:{ fontSize:16, opacity:0.5 }}, '⋯'),
    }),
    React.createElement('div', { style:{ flex:1, overflowY:'auto', padding:'0 18px 20px' }, className:'hide-scrollbar' },
      /* Hero */
      React.createElement(B1Card, { glow:true, style:{ marginBottom:16, animation:'scale-in 0.4s ease backwards' }},
        React.createElement('div', { style:{ display:'flex', gap:14 }},
          React.createElement('div', { style:{ fontSize:48, animation:'float 4s ease-in-out infinite' }}, '🧬'),
          React.createElement('div', { style:{ flex:1 }},
            React.createElement(B1Badge, { color:DL.teal }, '🩺 Medis'),
            React.createElement('div', { style:{ fontSize:18, fontWeight:700, color:DL.text, marginTop:6, lineHeight:1.3 }}, 'Anatomi Manusia Dasar'),
            React.createElement('div', { style:{ fontSize:11, color:DL.sub, marginTop:4 }}, '14 chapters • 8 jam • Dr. Sarah Chen'),
          ),
        ),
        React.createElement('div', { style:{ marginTop:14 }},
          React.createElement(B1Progress, { value:72, h:5 }),
          React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', marginTop:6 }},
            React.createElement('span', { style:{ fontSize:10, color:DL.mute }}, '11/14 selesai'),
            React.createElement('span', { style:{ fontSize:10, color:DL.accent, fontWeight:700 }}, '72%'),
          ),
        ),
      ),
      /* Stats */
      React.createElement('div', { style:{ display:'flex', gap:8, marginBottom:16 }},
        [{i:'⏱️',v:'5.8 jam',l:'Waktu'},{i:'⚡',v:'680 XP',l:'Earned'},{i:'🏅',v:'4',l:'Badges'}].map((s,idx) =>
          React.createElement(B1Card, { key:idx, pad:10, style:{
            flex:1, textAlign:'center', animation:'stagger-in 0.3s ease backwards', animationDelay:`${0.1+idx*0.07}s`,
          }},
            React.createElement('div', { style:{ fontSize:16 }}, s.i),
            React.createElement('div', { style:{ fontSize:13, fontWeight:700, color:DL.text, marginTop:3 }}, s.v),
            React.createElement('div', { style:{ fontSize:9, color:DL.mute }}, s.l),
          )
        )
      ),
      /* Chapters */
      React.createElement(B1Section, { title:'Chapters', action:`${chapters.length} total`, style:{ marginBottom:10 } }),
      React.createElement('div', { style:{ display:'flex', flexDirection:'column', gap:6 }},
        chapters.map((ch,i) => React.createElement(B1Card, {
          key:ch.id, pad:12,
          onClick: ch.current ? ()=>onNavigate(3) : undefined,
          style:{
            background: ch.current ? 'rgba(168,85,247,0.12)' : DL.glass,
            borderColor: ch.current ? 'rgba(168,85,247,0.35)' : DL.glassBorder,
            animation:'stagger-in 0.3s ease backwards', animationDelay:`${0.2+i*0.03}s`,
          }
        },
          React.createElement('div', { style:{ display:'flex', alignItems:'center', gap:10 }},
            React.createElement('div', { style:{
              width:26, height:26, borderRadius:13, flexShrink:0,
              background: ch.done ? DL.gradA : ch.current ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)',
              border: !ch.done && !ch.current ? `1px solid ${DL.glassBorder}` : 'none',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:ch.done ? 10 : 9, color:'#fff', fontWeight:700,
            }}, ch.done ? '✓' : ch.id),
            React.createElement('div', { style:{ flex:1 }},
              React.createElement('div', { style:{
                fontSize:12, fontWeight:ch.current?700:400,
                color: ch.done||ch.current ? DL.text : DL.mute,
              }}, ch.t),
              React.createElement('div', { style:{ fontSize:9, color:DL.mute }}, ch.dur),
            ),
            ch.current && React.createElement(B1Badge, { color:DL.accent }, '▶ Mulai'),
          )
        ))
      ),
    ),
  );
}

Object.assign(window, { PageWelcome, PageHome, PageLearning, PageSlideDetail });
