/* CORTEX — Animated Backgrounds for each theme */

function NeuralBackground() {
  const canvasRef = React.useRef(null);
  const theme = useTheme();
  React.useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    let w = c.width = c.parentElement.offsetWidth;
    let h = c.height = c.parentElement.offsetHeight;
    const nodes = Array.from({length: 35}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
      r: Math.random()*3+1, pulse: Math.random()*Math.PI*2
    }));
    let raf;
    function draw(t) {
      ctx.clearRect(0,0,w,h);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>w) n.vx*=-1;
        if(n.y<0||n.y>h) n.vy*=-1;
        n.pulse += 0.02;
      });
      nodes.forEach((a,i) => {
        nodes.forEach((b,j) => {
          if(i>=j) return;
          const d = Math.hypot(a.x-b.x, a.y-b.y);
          if(d<120) {
            const alpha = (1-d/120)*0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        });
        const glow = Math.sin(a.pulse)*0.4+0.6;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r*glow*2, 0, Math.PI*2);
        ctx.fillStyle = `rgba(168,85,247,${glow*0.3})`;
        ctx.fill();
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(200,160,255,${glow*0.8})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw(0);
    return () => cancelAnimationFrame(raf);
  }, []);
  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.6 }
  });
}

function AuroraBackground() {
  return React.createElement('div', { style: { position:'absolute', inset:0, overflow:'hidden' }},
    [0,1,2,3].map(i => React.createElement('div', { key: i, style: {
      position:'absolute',
      width: '160%', height: '60%',
      left: '-30%',
      top: `${i*20-10}%`,
      background: [
        'radial-gradient(ellipse, rgba(6,214,160,0.2) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(0,180,216,0.18) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(224,64,251,0.15) 0%, transparent 70%)',
        'radial-gradient(ellipse, rgba(6,214,160,0.12) 0%, transparent 70%)',
      ][i],
      animation: `wave-flow ${12+i*3}s ease-in-out infinite`,
      animationDelay: `${i*-2}s`,
      filter: 'blur(40px)',
      borderRadius: '50%',
    }}))
  );
}

function MosaicBackground() {
  const tiles = React.useMemo(() =>
    Array.from({length: 48}, (_,i) => ({
      id: i, delay: Math.random()*5,
      duration: 3+Math.random()*4,
      opacity: 0.06+Math.random()*0.12,
      hue: Math.random()>0.5 ? 40+Math.random()*15 : 25+Math.random()*10,
    })), []);
  return React.createElement('div', {
    style: { position:'absolute', inset:0, display:'grid',
      gridTemplateColumns:'repeat(8,1fr)', gridTemplateRows:'repeat(6,1fr)', gap:2, padding:2, opacity:0.5 }
  }, tiles.map(t => React.createElement('div', { key: t.id, style: {
    background: `linear-gradient(135deg, hsla(${t.hue},60%,40%,${t.opacity}), hsla(${t.hue+10},50%,30%,${t.opacity*0.5}))`,
    borderRadius: 4,
    animation: `mosaic-tile ${t.duration}s ease-in-out infinite`,
    animationDelay: `${t.delay}s`,
    border: `1px solid rgba(212,175,55,0.08)`,
  }})));
}

function MatrixBackground() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const c = canvasRef.current; if(!c) return;
    const ctx = c.getContext('2d');
    let w = c.width = c.parentElement.offsetWidth;
    let h = c.height = c.parentElement.offsetHeight;
    const cols = Math.floor(w/14);
    const drops = Array(cols).fill(0).map(()=>Math.random()*h/14);
    const chars = '01アイウエオカキクケコ{}[]<>=/+';
    let raf; let frame = 0;
    function draw() {
      ctx.fillStyle = 'rgba(3,8,6,0.12)';
      ctx.fillRect(0,0,w,h);
      ctx.font = '12px monospace';
      if(frame%2===0) {
        drops.forEach((y,i) => {
          const ch = chars[Math.floor(Math.random()*chars.length)];
          const alpha = Math.random()*0.4+0.1;
          ctx.fillStyle = `rgba(0,255,136,${alpha})`;
          ctx.fillText(ch, i*14, y*14);
          if(y*14>h && Math.random()>0.975) drops[i]=0;
          drops[i] += 0.5;
        });
      }
      frame++;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return React.createElement('canvas', {
    ref: canvasRef,
    style: { position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.5 }
  });
}

function BloomBackground() {
  const blobs = React.useMemo(() => [
    { color: 'rgba(255,107,107,0.25)', size: 200, x: 20, y: 15, dur: 10 },
    { color: 'rgba(254,202,87,0.2)', size: 250, x: 70, y: 30, dur: 13 },
    { color: 'rgba(162,155,254,0.2)', size: 180, x: 40, y: 65, dur: 11 },
    { color: 'rgba(255,150,120,0.18)', size: 220, x: 80, y: 75, dur: 14 },
    { color: 'rgba(255,107,180,0.15)', size: 160, x: 15, y: 80, dur: 12 },
  ], []);
  return React.createElement('div', { style: { position:'absolute', inset:0, overflow:'hidden', filter:'blur(50px)' }},
    blobs.map((b,i) => React.createElement('div', { key: i, style: {
      position:'absolute', left:`${b.x}%`, top:`${b.y}%`,
      width: b.size, height: b.size,
      background: b.color, borderRadius:'50%',
      animation: `morph-blob ${b.dur}s ease-in-out infinite, float-slow ${b.dur+2}s ease-in-out infinite`,
      animationDelay: `${i*-2}s`,
    }}))
  );
}

function ThemeBackground({ themeId }) {
  const bgs = { neural: NeuralBackground, aurora: AuroraBackground, gold: MosaicBackground, neon: MatrixBackground, bloom: BloomBackground };
  const Bg = bgs[themeId];
  return Bg ? React.createElement(Bg) : null;
}

Object.assign(window, { ThemeBackground, NeuralBackground, AuroraBackground, MosaicBackground, MatrixBackground, BloomBackground });
