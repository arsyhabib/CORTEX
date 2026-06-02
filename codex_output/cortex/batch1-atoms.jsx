/* CORTEX DESIGN LIBRARY — Batch 1 Refined Atoms
   Preserves kernel's visual DNA: glass, purple/blue, rounded, iOS-like
   Enhanced: typography hierarchy, spacing, press states, mobile layout */

/* ── Design Tokens (Neural theme as primary) ── */
const DL = {
  bg: '#0a0a1a', bgAlt: '#12102a', surface: 'rgba(120,80,255,0.08)',
  glass: 'rgba(120,80,255,0.10)', glassBorder: 'rgba(160,120,255,0.22)',
  glassHigh: 'rgba(180,150,255,0.13)', shadowColor: 'rgba(99,102,241,0.25)',
  accent: '#a855f7', accentB: '#6366f1', gold: '#fbbf24',
  green: '#22c55e', red: '#ef4444', teal: '#06d6a0',
  text: '#f0eaff', sub: 'rgba(220,200,255,0.58)', mute: 'rgba(190,170,255,0.30)',
  grad: 'linear-gradient(135deg,#6366f1,#a855f7,#fbbf24)',
  gradA: 'linear-gradient(135deg,#a855f7,#6366f1)',
  gradCard: 'linear-gradient(145deg,rgba(99,102,241,0.13),rgba(168,85,247,0.06))',
  radius: 20, blur: 28, sat: 195,
};

/* ── Glass Card with tactile press ── */
function B1Card({ children, style, onClick, glow, pad = 16, className }) {
  const [p, setP] = React.useState(false);
  return React.createElement('div', {
    className:['b1-card', className].filter(Boolean).join(' '),
    onPointerDown: () => setP(true), onPointerUp: () => setP(false), onPointerLeave: () => setP(false),
    onClick,
    style: {
      backdropFilter: `blur(${DL.blur}px) saturate(${DL.sat}%)`,
      WebkitBackdropFilter: `blur(${DL.blur}px) saturate(${DL.sat}%)`,
      background: DL.glass, border: `1px solid ${DL.glassBorder}`,
      borderRadius: DL.radius, padding: pad, position: 'relative', overflow: 'hidden',
      boxShadow: glow
        ? `0 8px 32px ${DL.shadowColor}, 0 0 20px rgba(168,85,247,0.15), inset 0 1px 0 ${DL.glassHigh}`
        : `0 8px 32px ${DL.shadowColor}, inset 0 1px 0 ${DL.glassHigh}`,
      transition: 'all 0.42s cubic-bezier(0.16,1.22,0.24,1)',
      transform:`perspective(900px) rotateX(var(--cortex-card-tilt-y, 0deg)) rotateY(var(--cortex-card-tilt-x, 0deg)) translate3d(var(--cortex-card-shift-x, 0px), var(--cortex-card-shift-y, 0px), 0) rotateX(var(--cortex-touch-tilt-y, 0deg)) rotateY(var(--cortex-touch-tilt-x, 0deg)) rotateZ(var(--cortex-touch-roll-z, 0deg)) translate3d(var(--cortex-touch-shift-x, 0px), var(--cortex-touch-shift-y, 0px), 0) scale3d(calc(1 + var(--cortex-touch-scale, 0) * 1.25), calc(1 - var(--cortex-touch-squash, 0) * 0.02), 1) scale(calc(var(--cortex-motion-scale, 1) * var(--cortex-shake-scale, 1))) scale(${p && onClick ? 0.97 : 1})`,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }
  },
    React.createElement('div', { style: {
      position:'absolute', top:0, left:0, right:0, height:'40%',
      background:`linear-gradient(180deg,${DL.glassHigh},transparent)`,
      pointerEvents:'none', borderRadius:'inherit',
    }}),
    React.createElement('div', { style: { position:'relative', zIndex:1 } }, children)
  );
}

/* ── Badge ── */
function B1Badge({ children, color, style }) {
  const c = color || DL.accent;
  return React.createElement('span', { style: {
    display:'inline-flex', alignItems:'center', gap:4,
    padding:'3px 10px', borderRadius:20,
    background:`${c}18`, border:`1px solid ${c}38`,
    color:c, fontSize:10, fontWeight:700, letterSpacing:0.5,
    ...style,
  }}, children);
}

/* ── Progress Bar ── */
function B1Progress({ value = 0, h = 5, color }) {
  return React.createElement('div', { style:{
    width:'100%', height:h, borderRadius:h, background:'rgba(255,255,255,0.06)', overflow:'hidden',
  }},
    React.createElement('div', { style:{
      width:`${Math.min(100,Math.max(0,value))}%`, height:'100%',
      background: color || DL.gradA, borderRadius:h,
      transition:'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
      boxShadow: `0 0 8px rgba(168,85,247,0.4)`,
    }})
  );
}

/* ── Icon Circle ── */
function B1Icon({ icon, size = 40, gradient, style }) {
  return React.createElement('div', { style:{
    width:size, height:size, borderRadius:size*0.42,
    background: gradient || DL.gradA,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize: size*0.44, flexShrink:0,
    boxShadow: `0 4px 14px ${DL.shadowColor}`,
    ...style,
  }}, icon);
}

/* ── Section Title ── */
function B1Section({ title, action, onAction, style }) {
  return React.createElement('div', { style: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'2px 0', ...style,
  }},
    React.createElement('span', { style: { fontSize:15, fontWeight:700, color:DL.text, letterSpacing:0.2 }}, title),
    action && React.createElement('span', {
      onClick: onAction, style: { fontSize:11, color:DL.accent, cursor:'pointer', fontWeight:600 }
    }, action)
  );
}

/* ── Topbar ── */
function B1Topbar({ left, title, right, subtitle, transparent }) {
  return React.createElement('div', { style:{
    display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'6px 18px 8px', minHeight:44,
    ...(transparent ? {} : {
      backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      borderBottom:`1px solid ${DL.glassBorder}`,
    }),
  }},
    React.createElement('div', { style:{ minWidth:36, display:'flex', alignItems:'center' }}, left),
    React.createElement('div', { style:{ flex:1, textAlign:'center' }},
      title && React.createElement('div', { style:{ fontSize:15, fontWeight:700, color:DL.text }}, title),
      subtitle && React.createElement('div', { style:{ fontSize:10, color:DL.mute, marginTop:1 }}, subtitle),
    ),
    React.createElement('div', { style:{ minWidth:36, display:'flex', justifyContent:'flex-end', alignItems:'center' }}, right),
  );
}

/* ── Button ── */
function B1Button({ label, icon, onClick, variant = 'primary', full, style }) {
  const [p, setP] = React.useState(false);
  const isPrimary = variant === 'primary';
  return React.createElement('div', {
    className:'b1-button',
    onClick, onPointerDown:()=>setP(true), onPointerUp:()=>setP(false), onPointerLeave:()=>setP(false),
    style: {
      display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6,
      padding: isPrimary ? '12px 24px' : '10px 18px',
      borderRadius:14,
      background: isPrimary ? DL.gradA : DL.glass,
      border: isPrimary ? 'none' : `1px solid ${DL.glassBorder}`,
      color: isPrimary ? '#fff' : DL.text,
      fontSize:13, fontWeight:600, cursor:'pointer', userSelect:'none',
      boxShadow: isPrimary ? `0 4px 20px ${DL.shadowColor}` : 'none',
      transition:'all 0.38s cubic-bezier(0.16,1.22,0.24,1)',
      transform:`perspective(700px) rotateX(var(--cortex-button-tilt-y, 0deg)) rotateY(var(--cortex-button-tilt-x, 0deg)) translate3d(var(--cortex-button-shift-x, 0px), var(--cortex-button-shift-y, 0px), 0) rotateX(var(--cortex-touch-tilt-y, 0deg)) rotateY(var(--cortex-touch-tilt-x, 0deg)) rotateZ(var(--cortex-touch-roll-z, 0deg)) translate3d(var(--cortex-touch-shift-x, 0px), var(--cortex-touch-shift-y, 0px), 0) scale3d(calc(1 + var(--cortex-touch-scale, 0) * 1.15), calc(1 - var(--cortex-touch-squash, 0) * 0.018), 1) scale(calc(var(--cortex-motion-scale, 1) * var(--cortex-shake-scale, 1))) scale(${p ? 0.95 : 1})`,
      width: full ? '100%' : 'auto',
      ...style,
    }
  }, icon, label);
}

/* ── Divider ── */
function B1Divider({ style }) {
  return React.createElement('div', { style: {
    height:1, background:DL.glassBorder, margin:'4px 0', ...style
  }});
}

/* ── Animated Counter ── */
function B1Counter({ end, duration = 1200, suffix = '' }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const s = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now()-s)/duration);
      setV(Math.round((1-Math.pow(1-p,3))*end));
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end]);
  return React.createElement('span', null, `${v.toLocaleString()}${suffix}`);
}

/* ── Toggle Switch ── */
function B1Toggle({ value, onChange, label }) {
  return React.createElement('div', {
    className:'b1-toggle',
    style: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'4px 0' }
  },
    label && React.createElement('span', { style:{ fontSize:13, color:DL.text }}, label),
    React.createElement('div', {
      onClick: () => onChange(!value),
      style: {
        width:46, height:26, borderRadius:13, padding:2,
        background: value ? DL.gradA : 'rgba(255,255,255,0.08)',
        border: `1px solid ${value ? 'transparent' : DL.glassBorder}`,
        cursor:'pointer', transition:'all 0.3s ease', position:'relative',
        boxShadow: value ? `0 0 12px ${DL.shadowColor}` : 'none',
      }
    },
      React.createElement('div', { style:{
        width:20, height:20, borderRadius:10,
        background:'#fff',
        transform: value ? 'translateX(20px)' : 'translateX(0)',
        transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow:'0 2px 6px rgba(0,0,0,0.3)',
      }})
    )
  );
}

/* ── Search Input ── */
function B1SearchInput({ value, onChange, placeholder, autoFocus, style }) {
  return React.createElement('div', { style:{
    display:'flex', alignItems:'center', gap:10,
    padding:'10px 14px', borderRadius:14,
    background:DL.glass, border:`1px solid ${DL.glassBorder}`,
    backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
    ...style,
  }, className:'b1-search-input'},
    React.createElement('span', { style:{ fontSize:16, opacity:0.5 }}, '🔍'),
    React.createElement('input', {
      value, onChange: e => onChange(e.target.value),
      placeholder: placeholder || 'Cari...',
      autoFocus,
      style: {
        flex:1, background:'none', border:'none', outline:'none',
        color:DL.text, fontSize:14, fontFamily:'inherit',
      }
    })
  );
}

/* ── Ripple effect on tap ── */
function B1Ripple({ children, style }) {
  const ref = React.useRef(null);
  const handleClick = (e) => {
    const el = ref.current; if(!el) return;
    const rect = el.getBoundingClientRect();
    const r = document.createElement('span');
    const d = Math.max(rect.width, rect.height);
    r.style.cssText = `position:absolute;width:${d}px;height:${d}px;border-radius:50%;
      background:rgba(168,85,247,0.2);left:${e.clientX-rect.left-d/2}px;
      top:${e.clientY-rect.top-d/2}px;animation:ripple 0.6s ease-out;pointer-events:none;`;
    el.appendChild(r);
    setTimeout(()=>r.remove(),600);
  };
  return React.createElement('div', {
    ref, onClick: handleClick,
    style: { position:'relative', overflow:'hidden', ...style }
  }, children);
}

Object.assign(window, {
  DL, B1Card, B1Badge, B1Progress, B1Icon, B1Section, B1Topbar,
  B1Button, B1Divider, B1Counter, B1Toggle, B1SearchInput, B1Ripple,
});
