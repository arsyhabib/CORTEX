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

function CortexSoftBlendWallpaper({ palette, mode }) {
  const orbs = [
    { x:10, y:16, s:54, d:24, delay:-2, c:palette[0], ox:10, oy:-14 },
    { x:68, y:10, s:62, d:28, delay:-10, c:palette[1], ox:-14, oy:10 },
    { x:34, y:62, s:78, d:34, delay:-16, c:palette[2], ox:8, oy:12 },
    { x:82, y:74, s:42, d:22, delay:-6, c:palette[3], ox:-8, oy:-10 },
  ];
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className:`cortex-soft-blend-scene cortex-soft-blend-scene--${mode}` }),
    orbs.map((orb, i) => React.createElement('div', {
      key:`orb-${mode}-${i}`,
      className:`cortex-soft-blend-orb orb-${i + 1}`,
      style:{
        left:`${orb.x}%`,
        top:`${orb.y}%`,
        width:`${orb.s}vmax`,
        height:`${orb.s}vmax`,
        '--orb-color':orb.c,
        '--orb-duration':`${orb.d}s`,
        '--orb-delay':`${orb.delay}s`,
        '--orb-offset-x':`${orb.ox}px`,
        '--orb-offset-y':`${orb.oy}px`,
      }
    })),
    React.createElement('div', { className:'cortex-soft-blend-sweep sweep-a' }),
    React.createElement('div', { className:'cortex-soft-blend-sweep sweep-b' }),
  );
}

function CortexInteractiveWallpaper({ wallpaper, exhibition }) {
  const item = CORTEX_WALLPAPERS.find(w => w.id === wallpaper) || CORTEX_WALLPAPERS[0];
  const [pointer, setPointer] = React.useState({ x:50, y:45, px:0, py:0, angle:0 });
  const [ripples, setRipples] = React.useState([]);
  const frame = React.useRef(null);
  const touchRef = React.useRef({ x:50, y:45, t:0 });
  const interactiveSelector = '.b1-card, .b1-button, .b1-toggle, .b1-search-input, .cortex-motion-sensor-control, .cortex-library-nav button, .cortex-wallpaper-toggle button';
  const coarsePointer = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const performanceMode = coarsePointer;

  React.useEffect(() => {
    const root = document.documentElement;
    root.dataset.cortexMotionMode = performanceMode ? 'lite' : 'rich';
    if (performanceMode) {
      return () => {
        delete root.dataset.cortexMotionMode;
      };
    }
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
        const allowRipple = makeRipple && !coarsePointer;
        const touchScale = allowRipple
          ? 0.018
          : coarsePointer
            ? 0.003 + velocity * 0.002
            : 0.008 + velocity * 0.006;
        const touchSquash = allowRipple
          ? 0.48
          : coarsePointer
            ? 0.08 + velocity * 0.05
            : 0.18 + velocity * 0.26;
        root.style.setProperty('--cortex-touch-shift-x', `${(xNorm * 4.2 + deltaX * 0.16).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-shift-y', `${(yNorm * 3.4 + deltaY * 0.13).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-x', `${(xNorm * 8 + deltaX * 0.34).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-y', `${(yNorm * 7 + deltaY * 0.28).toFixed(2)}px`);
        root.style.setProperty('--cortex-touch-sheen-angle', `${(angle + 90).toFixed(2)}deg`);
        root.style.setProperty('--cortex-touch-scale', `${touchScale.toFixed(3)}`);
        root.style.setProperty('--cortex-touch-squash', `${touchSquash.toFixed(3)}`);
        root.style.setProperty('--cortex-touch-press', allowRipple ? '0.8' : coarsePointer ? '0.12' : '0.42');
        if (allowRipple) root.classList.add('cortex-touch-active');
        touchRef.current = { x, y, t: now };
        setPointer({ x, y, px, py, angle });
        if (allowRipple) {
          const id = Date.now();
          setRipples(rs => [...rs.slice(-1), { id, x, y }]);
          setTimeout(() => setRipples(rs => rs.filter(r => r.id !== id)), 860);
        }
      });
    };
    const shouldBurstWallpaper = eventTarget => {
      if (!eventTarget || !eventTarget.closest) return true;
      if (eventTarget.closest(interactiveSelector)) return false;
      return true;
    };
    const settle = () => {
      root.classList.remove('cortex-touch-active');
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
    const onPointerDown = e => update(e.clientX, e.clientY, shouldBurstWallpaper(e.target));
    const onPointerUp = () => settle();
    const onTouchMove = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, false);
    };
    const onTouchStart = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, shouldBurstWallpaper(e.target));
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
      delete root.dataset.cortexMotionMode;
    };
  }, [performanceMode]);

  return React.createElement('div', {
    className:'cortex-wallpaper-layer',
    'data-wallpaper':item.id,
    'data-mode':item.mode || 'image',
    'data-motion-mode':performanceMode ? 'lite' : 'rich',
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
    performanceMode
      ? React.createElement('div', { className:'cortex-wallpaper-performance-field' })
      : item.id === 'aurora'
      ? React.createElement(CortexSoftBlendWallpaper, {
          mode:'aurora',
          palette:[
            'rgba(68, 122, 255, 0.26)',
            'rgba(166, 92, 255, 0.22)',
            'rgba(48, 211, 255, 0.18)',
            'rgba(255, 255, 255, 0.10)',
          ],
        })
      : item.id === 'bubbly'
        ? React.createElement(CortexSoftBlendWallpaper, {
            mode:'bubbly',
            palette:[
              'rgba(124, 92, 255, 0.28)',
              'rgba(52, 211, 255, 0.22)',
              'rgba(72, 255, 196, 0.16)',
              'rgba(255, 255, 255, 0.10)',
            ],
          })
        : React.createElement(CortexSoftBlendWallpaper, {
            mode:'organza',
            palette:[
              'rgba(203, 108, 255, 0.22)',
              'rgba(63, 220, 255, 0.16)',
              'rgba(255, 150, 205, 0.20)',
              'rgba(255, 216, 116, 0.12)',
            ],
          }),
    !performanceMode && React.createElement('div', { className:'cortex-wallpaper-caustic' }),
    !performanceMode && React.createElement('div', { className:'cortex-wallpaper-hotspot' }),
    !performanceMode && ripples.map(r => React.createElement('div', {
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
