/* CORTEX — Shared Glass UI Components */

/* ═══ GLASS CARD ═══ */
function GlassCard({ children, style, className, onClick, animate = true }) {
  const theme = useTheme();
  const [pressed, setPressed] = React.useState(false);
  return React.createElement('div', {
    className: className || '',
    onClick, onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false), onPointerLeave: () => setPressed(false),
    style: {
      ...glassCardStyle(theme),
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: pressed && onClick ? 'scale(0.97)' : 'scale(1)',
      cursor: onClick ? 'pointer' : 'default',
      position: 'relative', overflow: 'hidden',
      ...style,
    }
  },
    React.createElement('div', { style: {
      position:'absolute', top:0, left:0, right:0, height:'50%',
      background: `linear-gradient(180deg, ${theme.colors.glassHighlight}, transparent)`,
      pointerEvents:'none', borderRadius:'inherit',
    }}),
    React.createElement('div', { style: { position:'relative', zIndex:1 } }, children)
  );
}

/* ═══ ICON CIRCLE ═══ */
function IconCircle({ icon, size = 44, gradient, style }) {
  const theme = useTheme();
  return React.createElement('div', { style: {
    width: size, height: size, borderRadius: size/2,
    background: gradient || theme.colors.gradientAccent,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize: size*0.45, flexShrink:0,
    boxShadow: `0 4px 16px ${theme.colors.shadowColor}`,
    ...style,
  }}, icon);
}

/* ═══ BADGE / CHIP ═══ */
function GlassBadge({ children, accent, style }) {
  const theme = useTheme();
  return React.createElement('span', { style: {
    display:'inline-flex', alignItems:'center', gap:4,
    padding:'4px 12px', borderRadius:20,
    background: accent ? `${theme.colors.accent1}22` : theme.colors.glass,
    border: `1px solid ${accent ? theme.colors.accent1+'44' : theme.colors.glassBorder}`,
    color: accent ? theme.colors.accent1 : theme.colors.textSecondary,
    fontSize:11, fontWeight:600, letterSpacing:0.5,
    backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
    ...style,
  }}, children);
}

/* ═══ PROGRESS BAR ═══ */
function GlassProgress({ value = 0, height = 6, color, style }) {
  const theme = useTheme();
  return React.createElement('div', { style: {
    width:'100%', height, borderRadius: height,
    background: 'rgba(255,255,255,0.08)', overflow:'hidden', ...style,
  }},
    React.createElement('div', { style: {
      width:`${Math.min(100,Math.max(0,value))}%`, height:'100%',
      background: color || theme.colors.gradientAccent,
      borderRadius: height,
      transition:'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
      boxShadow: `0 0 12px ${theme.colors.shadowColor}`,
    }})
  );
}

/* ═══ ANIMATED COUNTER ═══ */
function AnimCounter({ end, duration = 1500, prefix = '', suffix = '' }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let start = 0; const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end]);
  return React.createElement('span', null, `${prefix}${val.toLocaleString()}${suffix}`);
}

/* ═══ STREAK FLAME ═══ */
function StreakFlame({ days, style }) {
  const theme = useTheme();
  return React.createElement('div', { style: {
    display:'flex', alignItems:'center', gap:6, ...style,
  }},
    React.createElement('span', { style: { fontSize:20, animation:'float 2s ease-in-out infinite' }}, '🔥'),
    React.createElement('div', null,
      React.createElement('div', { style: { fontSize:14, fontWeight:700, color:theme.colors.text }},
        React.createElement(AnimCounter, { end: days }), ' hari'),
      React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted }}, 'Streak')
    )
  );
}

/* ═══ XP DISPLAY ═══ */
function XPDisplay({ xp, level, style }) {
  const theme = useTheme();
  const nextLevel = level * 500;
  return React.createElement('div', { style: {
    display:'flex', alignItems:'center', gap:8, ...style
  }},
    React.createElement('div', { style: {
      width:36, height:36, borderRadius:18,
      background: theme.colors.gradientAccent,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:14, fontWeight:800, color:'#fff',
      boxShadow: `0 0 16px ${theme.colors.shadowColor}`,
    }}, level),
    React.createElement('div', { style: { flex:1 }},
      React.createElement('div', { style: {
        display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3
      }},
        React.createElement('span', { style: { color:theme.colors.text, fontWeight:600 }},
          React.createElement(AnimCounter, { end: xp }), ' XP'),
        React.createElement('span', { style: { color:theme.colors.textMuted }}, `${nextLevel} XP`),
      ),
      React.createElement(GlassProgress, { value: (xp/nextLevel)*100, height:4 })
    )
  );
}

/* ═══ TAB BAR ═══ */
function GlassTabBar({ tabs, active, onSelect }) {
  const theme = useTheme();
  return React.createElement('div', { style: {
    display:'flex', gap:0, padding:'8px 12px 28px',
    background: `linear-gradient(180deg, transparent, ${theme.colors.bg}cc)`,
    backdropFilter:'blur(30px)', WebkitBackdropFilter:'blur(30px)',
    borderTop:`1px solid ${theme.colors.glassBorder}`,
    position:'relative',
  }},
    tabs.map(tab => React.createElement('div', {
      key: tab.id,
      onClick: () => onSelect(tab.id),
      style: {
        flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
        padding:'6px 0', cursor:'pointer',
        transition:'all 0.3s ease',
      }
    },
      React.createElement('span', { style: {
        fontSize:22, transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transform: active===tab.id ? 'scale(1.2)' : 'scale(1)',
        filter: active===tab.id ? `drop-shadow(0 0 8px ${theme.colors.accent1})` : 'none',
      }}, tab.icon),
      React.createElement('span', { style: {
        fontSize:9, fontWeight: active===tab.id ? 700 : 500,
        color: active===tab.id ? theme.colors.accent1 : theme.colors.textMuted,
        letterSpacing:0.5, textTransform:'uppercase',
      }}, tab.label),
      active===tab.id && React.createElement('div', { style: {
        position:'absolute', bottom:26, width:4, height:4, borderRadius:2,
        background: theme.colors.accent1,
        boxShadow:`0 0 8px ${theme.colors.accent1}`,
      }})
    ))
  );
}

/* ═══ COURSE CARD ═══ */
function CourseCard({ course, onClick, delay = 0 }) {
  const theme = useTheme();
  return React.createElement(GlassCard, {
    onClick,
    style: {
      padding:16, animation: `stagger-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both`,
      animationDelay: `${delay}s`,
    }
  },
    React.createElement('div', { style: { display:'flex', gap:14, alignItems:'flex-start' }},
      React.createElement(IconCircle, { icon: course.icon, size: 48 }),
      React.createElement('div', { style: { flex:1, minWidth:0 }},
        React.createElement('div', { style: {
          fontSize:14, fontWeight:theme.fontWeight.heading, color:theme.colors.text,
          marginBottom:3, textWrap:'pretty',
        }}, course.title),
        React.createElement('div', { style: {
          fontSize:11, color:theme.colors.textSecondary, marginBottom:8,
        }}, `${course.lessons} lessons • ${course.duration}`),
        React.createElement(GlassProgress, { value: course.progress }),
        React.createElement('div', { style: {
          fontSize:10, color:theme.colors.textMuted, marginTop:4,
        }}, `${course.progress}% selesai`)
      )
    )
  );
}

/* ═══ STAT CARD ═══ */
function StatCard({ icon, label, value, suffix, delay = 0 }) {
  const theme = useTheme();
  return React.createElement(GlassCard, {
    style: {
      padding:14, textAlign:'center',
      animation: `stagger-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both`,
      animationDelay: `${delay}s`,
    }
  },
    React.createElement('div', { style: { fontSize:24, marginBottom:6 }}, icon),
    React.createElement('div', { style: {
      fontSize:22, fontWeight:800, color:theme.colors.text,
      background: theme.colors.gradientMain, WebkitBackgroundClip:'text',
      WebkitTextFillColor:'transparent', backgroundClip:'text',
    }}, React.createElement(AnimCounter, { end: value, suffix })),
    React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted, marginTop:2 }}, label)
  );
}

/* ═══ ACHIEVEMENT BADGE ═══ */
function AchievementBadge({ icon, title, unlocked, delay = 0 }) {
  const theme = useTheme();
  return React.createElement('div', { style: {
    display:'flex', flexDirection:'column', alignItems:'center', gap:6,
    opacity: unlocked ? 1 : 0.3, filter: unlocked ? 'none' : 'grayscale(100%)',
    animation: unlocked ? `scale-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) both` : 'none',
    animationDelay: `${delay}s`,
  }},
    React.createElement('div', { style: {
      width:52, height:52, borderRadius:26,
      background: unlocked ? theme.colors.gradientAccent : 'rgba(255,255,255,0.05)',
      border: `2px solid ${unlocked ? theme.colors.accent1 : 'rgba(255,255,255,0.1)'}`,
      display:'flex', alignItems:'center', justifyContent:'center', fontSize:24,
      boxShadow: unlocked ? `0 0 20px ${theme.colors.shadowColor}` : 'none',
    }}, icon),
    React.createElement('span', { style: {
      fontSize:9, color: unlocked ? theme.colors.textSecondary : theme.colors.textMuted,
      textAlign:'center', maxWidth:60, lineHeight:1.2,
    }}, title)
  );
}

/* ═══ LEADERBOARD ROW ═══ */
function LeaderRow({ rank, name, xp, isUser, delay = 0 }) {
  const theme = useTheme();
  const medals = { 1:'🥇', 2:'🥈', 3:'🥉' };
  return React.createElement(GlassCard, {
    style: {
      padding:'10px 14px',
      background: isUser ? `${theme.colors.accent1}15` : theme.colors.glass,
      border: isUser ? `1px solid ${theme.colors.accent1}44` : `1px solid ${theme.colors.glassBorder}`,
      animation: `stagger-in 0.4s ease both`, animationDelay: `${delay}s`,
    }
  },
    React.createElement('div', { style: { display:'flex', alignItems:'center', gap:12 }},
      React.createElement('span', { style: { fontSize:16, width:28, textAlign:'center' }},
        medals[rank] || React.createElement('span', { style: { color:theme.colors.textMuted, fontSize:13, fontWeight:700 }}, `#${rank}`)),
      React.createElement('div', { style: {
        width:32, height:32, borderRadius:16,
        background: theme.colors.gradientCard,
        border: `1px solid ${theme.colors.glassBorder}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:14, fontWeight:600, color:theme.colors.text,
      }}, name[0]),
      React.createElement('div', { style: { flex:1 }},
        React.createElement('div', { style: { fontSize:13, fontWeight:isUser?700:500, color:theme.colors.text }},
          name, isUser && ' (Kamu)'),
        React.createElement('div', { style: { fontSize:10, color:theme.colors.textMuted }},
          React.createElement(AnimCounter, { end: xp, suffix:' XP' }))
      )
    )
  );
}

Object.assign(window, {
  GlassCard, IconCircle, GlassBadge, GlassProgress, AnimCounter,
  StreakFlame, XPDisplay, GlassTabBar, CourseCard, StatCard,
  AchievementBadge, LeaderRow,
});
