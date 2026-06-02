/* CORTEX DESIGN LIBRARY - Batch 3 Atoms
   Additive placeholders for quiz, study tools, AI workspace, settings, and states.
   Depends on Batch 1/2 atoms: DL, B1Card, B1Badge, B1Progress, B2PageShell, B2Callout. */

function B3Hero({ kicker, title, subtitle, color, right }) {
  return React.createElement(B1Card, { glow:true, style:{ marginBottom:14, animation:'scale-in 0.35s ease backwards' }},
    React.createElement('div', { style:{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'flex-start' }},
      React.createElement('div', { style:{ flex:1, minWidth:0 }},
        React.createElement(B2Kicker, { color:color || DL.accent }, kicker),
        React.createElement('div', { style:{ fontSize:21, fontWeight:850, color:DL.text, lineHeight:1.22, letterSpacing:0, textWrap:'balance' }}, title),
        subtitle && React.createElement('div', { style:{ fontSize:12, color:DL.sub, lineHeight:1.55, marginTop:7 }}, subtitle),
      ),
      right
    )
  );
}

function B3Choice({ label, text, selected, correct, onClick }) {
  const color = correct ? DL.green : selected ? DL.accent : DL.mute;
  return React.createElement(B1Card, {
    pad:12,
    onClick,
    style:{
      marginBottom:8,
      background:selected ? 'rgba(168,85,247,0.13)' : correct ? 'rgba(34,197,94,0.08)' : DL.glass,
      borderColor:selected ? 'rgba(168,85,247,0.38)' : correct ? 'rgba(34,197,94,0.28)' : DL.glassBorder,
    }
  },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'30px 1fr', gap:10, alignItems:'center' }},
      React.createElement('div', { style:{
        width:30, height:30, borderRadius:12,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:`${color}20`, border:`1px solid ${color}40`,
        color, fontSize:12, fontWeight:900,
      }}, label),
      React.createElement('div', { style:{ fontSize:13, lineHeight:1.45, color:selected || correct ? DL.text : DL.sub, fontWeight:selected ? 750 : 500 }}, text),
    )
  );
}

function B3MetricCard({ label, value, sub, color }) {
  return React.createElement(B1Card, { pad:12, style:{ minHeight:86 }},
    React.createElement('div', { style:{ fontSize:9, color:DL.mute, letterSpacing:0.7, textTransform:'uppercase', fontWeight:800 }}, label),
    React.createElement('div', { style:{ fontSize:22, color:color || DL.text, fontWeight:900, marginTop:5, lineHeight:1 }}, value),
    sub && React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:7, lineHeight:1.35 }}, sub),
  );
}

function B3Row({ title, sub, right, active, onClick, color }) {
  return React.createElement(B1Card, {
    pad:13,
    onClick,
    style:{
      marginBottom:9,
      background:active ? `${color || DL.accent}16` : DL.glass,
      borderColor:active ? `${color || DL.accent}44` : DL.glassBorder,
    }
  },
    React.createElement('div', { style:{ display:'flex', gap:10, justifyContent:'space-between', alignItems:'center' }},
      React.createElement('div', { style:{ minWidth:0, flex:1 }},
        React.createElement('div', { style:{ fontSize:13, color:DL.text, fontWeight:800, lineHeight:1.35 }}, title),
        sub && React.createElement('div', { style:{ fontSize:10, color:DL.sub, marginTop:3, lineHeight:1.35 }}, sub),
      ),
      right
    )
  );
}

function B3StateCard({ tone = 'note', title, sub, action, compact }) {
  const tones = {
    offline:{ color:DL.gold, icon:'OFF', bg:'rgba(251,191,36,0.08)' },
    loading:{ color:DL.accent, icon:'...', bg:'rgba(168,85,247,0.09)' },
    error:{ color:DL.red, icon:'ERR', bg:'rgba(239,68,68,0.08)' },
    unsupported:{ color:DL.teal, icon:'N/A', bg:'rgba(6,214,160,0.07)' },
    note:{ color:DL.accent, icon:'i', bg:DL.glass },
  };
  const t = tones[tone] || tones.note;
  return React.createElement(B1Card, {
    pad:compact ? 12 : 14,
    style:{ background:t.bg, borderColor:`${t.color}38`, marginBottom:10 }
  },
    React.createElement('div', { style:{ display:'grid', gridTemplateColumns:'36px 1fr', gap:11, alignItems:'start' }},
      React.createElement('div', { style:{
        width:36, height:36, borderRadius:14,
        display:'flex', alignItems:'center', justifyContent:'center',
        background:`${t.color}1f`, border:`1px solid ${t.color}40`,
        color:t.color, fontSize:10, fontWeight:900,
      }}, t.icon),
      React.createElement('div', null,
        React.createElement('div', { style:{ fontSize:13, color:DL.text, fontWeight:850, lineHeight:1.3 }}, title),
        React.createElement('div', { style:{ fontSize:11, color:DL.sub, lineHeight:1.48, marginTop:4 }}, sub),
        action && React.createElement('div', { style:{ marginTop:9 }},
          React.createElement(B1Badge, { color:t.color, style:{ cursor:'pointer' }}, action)
        ),
      ),
    ),
  );
}

function B3TinyToggle({ value, onChange }) {
  return React.createElement('div', { style:{ transform:'scale(0.86)', transformOrigin:'right center' }},
    React.createElement(B1Toggle, { value, onChange })
  );
}

Object.assign(window, {
  B3Hero, B3Choice, B3MetricCard, B3Row, B3StateCard, B3TinyToggle,
});
