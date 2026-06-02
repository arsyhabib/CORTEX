/* CORTEX DESIGN LIBRARY - Batch 2 Atoms
   Additive helpers for reading, clinical content, image cards, and media states.
   Depends on Batch 1 atoms: DL, B1Card, B1Badge, B1Topbar, B1Button. */

function B2PageShell({ label, title, subtitle, onBack, right, children, footer }) {
  return React.createElement('div', {
    'data-screen-label': label,
    style: { display:'flex', flexDirection:'column', height:'100%' }
  },
    React.createElement(B1Topbar, {
      left: onBack && React.createElement('span', {
        onClick:onBack,
        style:{ fontSize:13, color:DL.accent, cursor:'pointer', fontWeight:600 }
      }, '< Back'),
      title,
      subtitle,
      right,
    }),
    React.createElement('div', {
      className:'hide-scrollbar cortex-motion-page',
      style:{ flex:1, overflowY:'auto', padding:'22px 18px 20px' }
    }, children),
    footer
  );
}

function B2Kicker({ children, color }) {
  return React.createElement('div', {
    style:{
      display:'flex', alignItems:'center', gap:7, marginBottom:8,
      fontSize:10, fontWeight:800, letterSpacing:1.2, textTransform:'uppercase',
      color:color || DL.accent,
    }
  }, children);
}

function B2ReadingBlock({ children, lead }) {
  return React.createElement('p', {
    style:{
      fontSize:lead ? 15 : 14,
      lineHeight:lead ? 1.78 : 1.74,
      color:lead ? 'rgba(240,234,255,0.86)' : DL.sub,
      margin: lead ? '0 0 14px' : '0 0 13px',
      fontWeight:lead ? 500 : 400,
      textWrap:'pretty',
    }
  }, children);
}

function B2StatPill({ label, value, color }) {
  return React.createElement('div', {
    className:'cortex-motion-card',
    style:{
      flex:1, minWidth:0, padding:'9px 10px', borderRadius:14,
      background:'rgba(255,255,255,0.05)', border:`1px solid ${DL.glassBorder}`,
    }
  },
    React.createElement('div', { style:{ fontSize:9, color:DL.mute, marginBottom:2 }}, label),
    React.createElement('div', { style:{ fontSize:12, fontWeight:800, color:color || DL.text, whiteSpace:'nowrap' }}, value),
  );
}

function B2Callout({ tone = 'pearl', title, children, icon }) {
  const tones = {
    pearl:{ color:DL.green, bg:'rgba(34,197,94,0.08)', border:'rgba(34,197,94,0.26)', icon:'*' },
    caution:{ color:DL.gold, bg:'rgba(251,191,36,0.08)', border:'rgba(251,191,36,0.30)', icon:'!' },
    note:{ color:DL.accent, bg:'rgba(168,85,247,0.09)', border:'rgba(168,85,247,0.28)', icon:'i' },
    evidence:{ color:DL.teal, bg:'rgba(6,214,160,0.07)', border:'rgba(6,214,160,0.26)', icon:'+' },
    danger:{ color:DL.red, bg:'rgba(239,68,68,0.08)', border:'rgba(239,68,68,0.25)', icon:'x' },
  };
  const t = tones[tone] || tones.note;
  return React.createElement(B1Card, {
    pad:14,
    className:'cortex-motion-card',
    style:{ background:t.bg, borderColor:t.border, marginBottom:10 }
  },
    React.createElement('div', { style:{ display:'flex', gap:11, alignItems:'flex-start' }},
      React.createElement('div', {
        style:{
          width:28, height:28, borderRadius:11, flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:`${t.color}1f`, border:`1px solid ${t.color}44`,
          color:t.color, fontSize:13, fontWeight:900,
        }
      }, icon || t.icon),
      React.createElement('div', { style:{ flex:1 }},
        React.createElement('div', { style:{ fontSize:12, fontWeight:800, color:t.color, marginBottom:4 }}, title),
        React.createElement('div', { style:{ fontSize:12, lineHeight:1.62, color:DL.sub }}, children),
      ),
    ),
  );
}

function B2Bullet({ text, sub, tone, index }) {
  const color = tone === 'warn' ? DL.gold : tone === 'ok' ? DL.green : DL.accent;
  return React.createElement('div', {
    className:'cortex-motion-press',
    style:{
      display:'grid', gridTemplateColumns:'24px 1fr', gap:9, padding:'10px 0',
      borderBottom:'1px solid rgba(255,255,255,0.045)',
      animation:'stagger-in 0.35s ease backwards', animationDelay:`${0.04 * (index || 0)}s`,
    }
  },
    React.createElement('div', {
      style:{
        width:24, height:24, borderRadius:9, background:`${color}1f`,
        border:`1px solid ${color}40`, color, display:'flex',
        alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:900,
      }
    }, index != null ? index + 1 : '-'),
    React.createElement('div', null,
      React.createElement('div', { style:{ fontSize:13, color:DL.text, fontWeight:650, lineHeight:1.45 }}, text),
      sub && React.createElement('div', { style:{ marginTop:7, display:'flex', flexDirection:'column', gap:5 }},
        sub.map((item, i) => React.createElement('div', {
          key:i,
          style:{ display:'flex', gap:7, color:DL.sub, fontSize:11, lineHeight:1.45 }
        },
          React.createElement('span', { style:{ color:DL.mute }}, '->'),
          React.createElement('span', null, item),
        ))
      ),
    ),
  );
}

function B2PressHint({ active, label }) {
  return React.createElement('div', {
    style:{
      display:'inline-flex', alignItems:'center', gap:6, padding:'5px 9px',
      borderRadius:999, border:`1px solid ${active ? 'rgba(251,191,36,0.42)' : DL.glassBorder}`,
      background:active ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.045)',
      color:active ? DL.gold : DL.mute, fontSize:9, fontWeight:800,
      transform:active ? 'scale(1.03)' : 'scale(1)', transition:'all 0.22s ease',
    }
  }, React.createElement('span', { className: active ? 'cortex-motion-pill' : undefined }, active ? 'HOLD' : 'PRESS'), label);
}

function B2ImageCard({ title, subtitle, badge, tint, icon, children, onClick }) {
  return React.createElement(B1Card, {
    pad:0,
    onClick,
    className:'cortex-motion-card cortex-motion-press',
    style:{ overflow:'hidden', marginBottom:12, borderRadius:22 }
  },
    React.createElement('div', {
      style:{
        height:150, position:'relative', overflow:'hidden',
        background:tint || 'linear-gradient(135deg,rgba(99,102,241,0.24),rgba(168,85,247,0.12))',
        display:'flex', alignItems:'center', justifyContent:'center',
      }
    },
      React.createElement('div', { style:{
        position:'absolute', inset:0,
        background:'radial-gradient(circle at 28% 22%,rgba(255,255,255,0.18),transparent 28%), radial-gradient(circle at 76% 70%,rgba(6,214,160,0.12),transparent 24%)',
      }}),
      React.createElement('div', {
        className:'cortex-motion-orb',
        style:{
          width:82, height:82, borderRadius:28,
          background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.14)',
          backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:38, boxShadow:`0 12px 34px ${DL.shadowColor}`,
        }
      }, icon || 'IMG'),
      badge && React.createElement('div', { style:{ position:'absolute', top:10, left:10 }},
        React.createElement(B1Badge, { color:DL.teal }, badge)
      ),
    ),
    React.createElement('div', { style:{ padding:14 }},
      React.createElement('div', { style:{ fontSize:14, fontWeight:800, color:DL.text, lineHeight:1.35 }}, title),
      React.createElement('div', { style:{ fontSize:11, color:DL.sub, marginTop:3, lineHeight:1.45 }}, subtitle),
      children
    ),
  );
}

function B2Segmented({ value, options, onChange }) {
  return React.createElement('div', {
    style:{
      display:'flex', gap:3, padding:3, borderRadius:14,
      background:'rgba(255,255,255,0.055)', border:`1px solid ${DL.glassBorder}`,
    }
  },
    options.map(opt => {
      const active = opt.value === value;
      return React.createElement('button', {
        key:opt.value,
        className:'cortex-motion-press',
        onClick:()=>onChange(opt.value),
        style:{
          appearance:'none', border:0, flex:1, minWidth:0,
          borderRadius:11, padding:'8px 7px',
          background:active ? DL.gradA : 'transparent',
          color:active ? '#fff' : DL.sub, fontSize:10, fontWeight:800,
          fontFamily:'inherit', cursor:'pointer',
          boxShadow:active ? `0 4px 16px ${DL.shadowColor}` : 'none',
          animation:active ? 'pill-jiggle 3.8s cubic-bezier(0.34,1.56,0.64,1) infinite' : 'none',
          transition:'all 0.2s ease',
        }
      }, opt.label);
    })
  );
}

Object.assign(window, {
  B2PageShell, B2Kicker, B2ReadingBlock, B2StatPill, B2Callout,
  B2Bullet, B2PressHint, B2ImageCard, B2Segmented,
});
