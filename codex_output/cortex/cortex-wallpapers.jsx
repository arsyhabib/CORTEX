/* CORTEX - Interactive Wallpaper Engine
   Three generated wallpaper concepts with pointer/touch-aware motion. */

const CORTEX_WALLPAPERS = [
  {
    id:'aurora',
    short:'Aurora',
    label:'Synaptic Aurora',
    icon:'A',
    file:'synaptic-aurora-membrane.png',
  },
  {
    id:'bubbly',
    short:'Bubbly',
    label:'Bubbly Kaleidoscope',
    icon:'B',
    file:'bubbly-kaleidoscope.png',
    mode:'generative',
  },
  {
    id:'organza',
    short:'Organza',
    label:'Organza Bloom',
    icon:'O',
    file:'chromatic-organza-bloom.png',
    mode:'generative',
  },
];

function cortexWallpaperAsset(file) {
  const rootPrefix = window.location.pathname.includes('/codex_output/cortex/') ? '' : 'codex_output/cortex/';
  return `${rootPrefix}assets/wallpapers/${file}`;
}

function CortexGenerativeBubblyWallpaper() {
  const bubbles = [
    { x:9, y:14, s:180, d:19, delay:-2.4, hue:'rgba(124,92,255,0.24)' },
    { x:73, y:9, s:220, d:24, delay:-8.8, hue:'rgba(52,211,255,0.20)' },
    { x:34, y:64, s:260, d:28, delay:-14.2, hue:'rgba(190,120,255,0.22)' },
    { x:86, y:72, s:150, d:21, delay:-5.7, hue:'rgba(72,255,210,0.14)' },
    { x:52, y:32, s:112, d:16, delay:-11.1, hue:'rgba(255,255,255,0.13)' },
    { x:18, y:82, s:118, d:18, delay:-6.2, hue:'rgba(92,130,255,0.16)' },
  ];
  const facets = [
    { x:17, y:20, w:32, h:58, r:-18, d:26, delay:-7 },
    { x:62, y:18, w:28, h:50, r:24, d:29, delay:-13 },
    { x:42, y:58, w:36, h:64, r:12, d:33, delay:-17 },
  ];
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className:'cortex-wallpaper-minimal-field' }),
    facets.map((f, i) => React.createElement('div', {
      key:`facet-${i}`,
      className:'cortex-live-facet',
      style:{
        left:`${f.x}%`, top:`${f.y}%`, width:`${f.w}%`, height:`${f.h}%`,
        '--facet-rotate':`${f.r}deg`, '--live-duration':`${f.d}s`, animationDelay:`${f.delay}s`,
      }
    })),
    bubbles.map((b, i) => React.createElement('div', {
      key:`bubble-${i}`,
      className:'cortex-live-bubble',
      style:{
        left:`${b.x}%`, top:`${b.y}%`, width:b.s, height:b.s,
        '--bubble-color':b.hue, '--live-duration':`${b.d}s`, animationDelay:`${b.delay}s`,
      }
    })),
    React.createElement('div', { className:'cortex-live-kaleidoscope-line line-a' }),
    React.createElement('div', { className:'cortex-live-kaleidoscope-line line-b' }),
    React.createElement('div', { className:'cortex-live-sheen' }),
  );
}

function CortexGenerativeOrganzaWallpaper() {
  const ribbons = [
    { x:-10, y:12, w:72, h:20, r:-14, d:30, delay:-4, c:'rgba(149,120,255,0.18)' },
    { x:38, y:8, w:78, h:22, r:18, d:36, delay:-15, c:'rgba(60,220,255,0.14)' },
    { x:8, y:54, w:86, h:24, r:8, d:42, delay:-22, c:'rgba(210,130,255,0.17)' },
    { x:54, y:66, w:62, h:18, r:-22, d:34, delay:-10, c:'rgba(100,255,218,0.12)' },
  ];
  const pearls = [
    { x:18, y:24, s:70, d:18, delay:-2 },
    { x:82, y:20, s:54, d:22, delay:-8 },
    { x:66, y:76, s:86, d:26, delay:-14 },
    { x:30, y:82, s:44, d:20, delay:-11 },
  ];
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className:'cortex-wallpaper-organza-field' }),
    ribbons.map((r, i) => React.createElement('div', {
      key:`ribbon-${i}`,
      className:'cortex-live-ribbon',
      style:{
        left:`${r.x}%`, top:`${r.y}%`, width:`${r.w}%`, height:`${r.h}%`,
        '--ribbon-rotate':`${r.r}deg`, '--ribbon-color':r.c,
        '--live-duration':`${r.d}s`, animationDelay:`${r.delay}s`,
      }
    })),
    pearls.map((p, i) => React.createElement('div', {
      key:`pearl-${i}`,
      className:'cortex-live-pearl',
      style:{
        left:`${p.x}%`, top:`${p.y}%`, width:p.s, height:p.s,
        '--live-duration':`${p.d}s`, animationDelay:`${p.delay}s`,
      }
    })),
    React.createElement('div', { className:'cortex-live-organza-glow glow-a' }),
    React.createElement('div', { className:'cortex-live-organza-glow glow-b' }),
  );
}

function CortexInteractiveWallpaper({ wallpaper, exhibition }) {
  const item = CORTEX_WALLPAPERS.find(w => w.id === wallpaper) || CORTEX_WALLPAPERS[0];
  const [pointer, setPointer] = React.useState({ x:50, y:45, px:0, py:0, angle:0 });
  const [ripples, setRipples] = React.useState([]);
  const frame = React.useRef(null);
  const touchRef = React.useRef({ x:50, y:45, t:0 });

  React.useEffect(() => {
    const root = document.documentElement;
    const update = (clientX, clientY, makeRipple) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = Math.max(0, Math.min(100, (clientX / window.innerWidth) * 100));
        const y = Math.max(0, Math.min(100, (clientY / window.innerHeight) * 100));
        const px = (x - 50) * -0.34;
        const py = (y - 50) * -0.28;
        const angle = Math.atan2(y - 50, x - 50) * 180 / Math.PI;
        const now = performance.now();
        const elapsed = Math.max(16, now - (touchRef.current.t || now));
        const deltaX = x - touchRef.current.x;
        const deltaY = y - touchRef.current.y;
        const velocity = Math.min(1, Math.hypot(deltaX, deltaY) / elapsed * 0.95);
        const xNorm = Math.max(-1, Math.min(1, (x - 50) / 50));
        const yNorm = Math.max(-1, Math.min(1, (y - 45) / 45));
        const touchScale = makeRipple ? 0.034 : 0.016 + velocity * 0.014;
        const touchSquash = makeRipple ? 1 : 0.45 + velocity * 0.7;
        const tiltX = Math.max(-6.2, Math.min(6.2, xNorm * 5.8 + deltaX * 0.15 + velocity * Math.sign(deltaX || 1) * 2.2));
        const tiltY = Math.max(-6.8, Math.min(6.8, yNorm * -6.4 + deltaY * 0.12 - velocity * Math.sign(deltaY || 1) * 1.8));
        const rollZ = Math.max(-8, Math.min(8, xNorm * 2.9 + deltaX * 0.18 - deltaY * 0.08 + velocity * 3.8 * Math.sign(deltaX || 1)));
        root.style.setProperty('--cortex-touch-tilt-x', `${tiltX.toFixed(3)}deg`);
        root.style.setProperty('--cortex-touch-tilt-y', `${tiltY.toFixed(3)}deg`);
        root.style.setProperty('--cortex-touch-roll-z', `${rollZ.toFixed(3)}deg`);
        root.style.setProperty('--cortex-touch-shift-x', `${(xNorm * 9.4 + deltaX * 0.35).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-shift-y', `${(yNorm * 7.4 + deltaY * 0.28).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-x', `${(xNorm * 24 + deltaX * 1.2).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-y', `${(yNorm * 18 + deltaY * 1.0).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-angle', `${(angle + 90).toFixed(2)}deg`);
        root.style.setProperty('--cortex-touch-scale', `${touchScale.toFixed(3)}`);
        root.style.setProperty('--cortex-touch-squash', `${touchSquash.toFixed(3)}`);
        root.style.setProperty('--cortex-touch-press', makeRipple ? '1' : '0.55');
        if (makeRipple) root.classList.add('cortex-touch-active');
        touchRef.current = { x, y, t: now };
        setPointer({ x, y, px, py, angle });
        if (makeRipple) {
          const id = Date.now();
          setRipples(rs => [...rs.slice(-2), { id, x, y }]);
          setTimeout(() => setRipples(rs => rs.filter(r => r.id !== id)), 950);
        }
      });
    };
    const settle = () => {
      root.classList.remove('cortex-touch-active');
      root.style.setProperty('--cortex-touch-tilt-x', '0deg');
      root.style.setProperty('--cortex-touch-tilt-y', '0deg');
      root.style.setProperty('--cortex-touch-roll-z', '0deg');
      root.style.setProperty('--cortex-touch-shift-x', '0px');
      root.style.setProperty('--cortex-touch-shift-y', '0px');
      root.style.setProperty('--cortex-touch-sheen-x', '0px');
      root.style.setProperty('--cortex-touch-sheen-y', '0px');
      root.style.setProperty('--cortex-touch-sheen-angle', '0deg');
      root.style.setProperty('--cortex-touch-scale', '0');
      root.style.setProperty('--cortex-touch-squash', '0');
      root.style.setProperty('--cortex-touch-press', '0');
    };
    const onPointerMove = e => update(e.clientX, e.clientY, false);
    const onPointerDown = e => update(e.clientX, e.clientY, true);
    const onPointerUp = () => settle();
    const onTouchMove = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, false);
    };
    const onTouchStart = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, true);
    };
    const onTouchEnd = () => settle();
    window.addEventListener('pointermove', onPointerMove, { passive:true });
    window.addEventListener('pointerdown', onPointerDown, { passive:true });
    window.addEventListener('pointerup', onPointerUp, { passive:true });
    window.addEventListener('touchmove', onTouchMove, { passive:true });
    window.addEventListener('touchstart', onTouchStart, { passive:true });
    window.addEventListener('touchend', onTouchEnd, { passive:true });
    window.addEventListener('touchcancel', onTouchEnd, { passive:true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, []);

  return React.createElement('div', {
    className:'cortex-wallpaper-layer',
    'data-wallpaper':item.id,
    'data-mode':item.mode || 'image',
    'data-exhibition':String(!!exhibition),
    style:{
      '--wallpaper-image':`url("${cortexWallpaperAsset(item.file)}")`,
      '--pointer-x':`${pointer.x}%`,
      '--pointer-y':`${pointer.y}%`,
      '--wallpaper-x':`calc(${pointer.px}px + var(--cortex-depth-x, 0px))`,
      '--wallpaper-y':`calc(${pointer.py}px + var(--cortex-depth-y, 0px))`,
      '--wallpaper-angle':`${pointer.angle}deg`,
    }
  },
    item.mode === 'generative'
      ? (item.id === 'bubbly'
          ? React.createElement(CortexGenerativeBubblyWallpaper)
          : React.createElement(CortexGenerativeOrganzaWallpaper))
      : React.createElement('div', { className:'cortex-wallpaper-image' }),
    React.createElement('div', { className:'cortex-wallpaper-caustic' }),
    React.createElement('div', { className:'cortex-wallpaper-hotspot' }),
    ripples.map(r => React.createElement('div', {
      key:r.id,
      className:'cortex-wallpaper-ripple',
      style:{ '--ripple-x':`${r.x}%`, '--ripple-y':`${r.y}%` },
    })),
    React.createElement('div', { className:'cortex-wallpaper-vignette' }),
  );
}

function CortexWallpaperToggle({ value, onChange }) {
  return React.createElement('div', { className:'cortex-wallpaper-toggle', role:'group', 'aria-label':'Wallpaper selector' },
    CORTEX_WALLPAPERS.map(item => React.createElement('button', {
      key:item.id,
      type:'button',
      'data-active':String(value === item.id),
      onClick:()=>onChange(item.id),
      title:item.label,
    },
      React.createElement('span', { className:'wallpaper-label-full' }, item.short),
      React.createElement('span', { className:'wallpaper-label-short' }, item.icon),
    ))
  );
}

Object.assign(window, { CORTEX_WALLPAPERS, CortexInteractiveWallpaper, CortexWallpaperToggle });
