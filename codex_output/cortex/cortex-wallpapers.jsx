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
  },
  {
    id:'organza',
    short:'Organza',
    label:'Organza Bloom',
    icon:'O',
    file:'chromatic-organza-bloom.png',
  },
];

function cortexWallpaperAsset(file) {
  const rootPrefix = window.location.pathname.includes('/codex_output/cortex/') ? '' : 'codex_output/cortex/';
  return `${rootPrefix}assets/wallpapers/${file}`;
}

function CortexInteractiveWallpaper({ wallpaper }) {
  const item = CORTEX_WALLPAPERS.find(w => w.id === wallpaper) || CORTEX_WALLPAPERS[0];
  const [pointer, setPointer] = React.useState({ x:50, y:45, px:0, py:0, angle:0 });
  const [ripples, setRipples] = React.useState([]);
  const frame = React.useRef(null);

  React.useEffect(() => {
    const update = (clientX, clientY, makeRipple) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = Math.max(0, Math.min(100, (clientX / window.innerWidth) * 100));
        const y = Math.max(0, Math.min(100, (clientY / window.innerHeight) * 100));
        const px = (x - 50) * -0.34;
        const py = (y - 50) * -0.28;
        const angle = Math.atan2(y - 50, x - 50) * 180 / Math.PI;
        setPointer({ x, y, px, py, angle });
        if (makeRipple) {
          const id = Date.now();
          setRipples(rs => [...rs.slice(-2), { id, x, y }]);
          setTimeout(() => setRipples(rs => rs.filter(r => r.id !== id)), 950);
        }
      });
    };
    const onPointerMove = e => update(e.clientX, e.clientY, false);
    const onPointerDown = e => update(e.clientX, e.clientY, true);
    const onTouchMove = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, false);
    };
    const onTouchStart = e => {
      const t = e.touches && e.touches[0];
      if (t) update(t.clientX, t.clientY, true);
    };
    window.addEventListener('pointermove', onPointerMove, { passive:true });
    window.addEventListener('pointerdown', onPointerDown, { passive:true });
    window.addEventListener('touchmove', onTouchMove, { passive:true });
    window.addEventListener('touchstart', onTouchStart, { passive:true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return React.createElement('div', {
    className:'cortex-wallpaper-layer',
    'data-wallpaper':item.id,
    style:{
      '--wallpaper-image':`url("${cortexWallpaperAsset(item.file)}")`,
      '--pointer-x':`${pointer.x}%`,
      '--pointer-y':`${pointer.y}%`,
      '--wallpaper-x':`${pointer.px}px`,
      '--wallpaper-y':`${pointer.py}px`,
      '--wallpaper-angle':`${pointer.angle}deg`,
    }
  },
    React.createElement('div', { className:'cortex-wallpaper-image' }),
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
