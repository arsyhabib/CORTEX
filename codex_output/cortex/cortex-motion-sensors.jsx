/* CORTEX - PWA motion sensor layer
   Subtle gyro tilt and shake impulse for browser/PWA contexts. */

function cortexClampMotion(value, min, max) {
  return Math.max(min, Math.min(max, value || 0));
}

function cortexSetMotionVars(x, y, force) {
  const root = document.documentElement;
  root.style.setProperty('--cortex-tilt-x', x.toFixed(3));
  root.style.setProperty('--cortex-tilt-y', y.toFixed(3));
  root.style.setProperty('--cortex-depth-x', `${(x * 12).toFixed(2)}px`);
  root.style.setProperty('--cortex-depth-y', `${(y * 9).toFixed(2)}px`);
  root.style.setProperty('--cortex-wallpaper-shift-x', `${(x * -5.8).toFixed(2)}px`);
  root.style.setProperty('--cortex-wallpaper-shift-y', `${(y * -3.7).toFixed(2)}px`);
  root.style.setProperty('--cortex-card-tilt-x', `${(x * 1.55).toFixed(3)}deg`);
  root.style.setProperty('--cortex-card-tilt-y', `${(y * -1.35).toFixed(3)}deg`);
  root.style.setProperty('--cortex-card-shift-x', `${(x * 0.6).toFixed(3)}px`);
  root.style.setProperty('--cortex-card-shift-y', `${(y * 0.48).toFixed(3)}px`);
  root.style.setProperty('--cortex-button-tilt-x', `${(x * 1.18).toFixed(3)}deg`);
  root.style.setProperty('--cortex-button-tilt-y', `${(y * -1.02).toFixed(3)}deg`);
  root.style.setProperty('--cortex-button-shift-x', `${(x * 0.38).toFixed(3)}px`);
  root.style.setProperty('--cortex-button-shift-y', `${(y * 0.3).toFixed(3)}px`);
  root.style.setProperty('--cortex-control-tilt-x', `${(x * 1.02).toFixed(3)}deg`);
  root.style.setProperty('--cortex-control-tilt-y', `${(y * -0.92).toFixed(3)}deg`);
  root.style.setProperty('--cortex-control-shift-x', `${(x * 0.3).toFixed(3)}px`);
  root.style.setProperty('--cortex-control-shift-y', `${(y * 0.24).toFixed(3)}px`);
  root.style.setProperty('--cortex-shake-force', (force || 0).toFixed(3));
}

function CortexMotionSensorControl() {
  const supported = typeof window !== 'undefined' &&
    ('DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window);
  const needsGesture = typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function';
  const [status, setStatus] = React.useState(supported ? 'idle' : 'unsupported');
  const motionRef = React.useRef({
    active:false,
    x:0,
    y:0,
    lastForce:0,
    lastShake:0,
    frame:null,
  });

  React.useEffect(() => {
    document.documentElement.dataset.motionSensor = status;
    document.documentElement.classList.toggle('cortex-sensor-active', status === 'active');
    document.documentElement.classList.toggle('cortex-sensor-unsupported', status === 'unsupported');
    return () => {
      document.documentElement.classList.remove('cortex-sensor-active', 'cortex-sensor-unsupported');
      document.documentElement.removeAttribute('data-motion-sensor');
    };
  }, [status]);

  React.useEffect(() => {
    return () => {
      if (motionRef.current.frame) cancelAnimationFrame(motionRef.current.frame);
      cortexSetMotionVars(0, 0, 0);
    };
  }, []);

  const attach = React.useCallback(() => {
    if (motionRef.current.active) return;
    motionRef.current.active = true;
    setStatus('active');

    const write = (nextX, nextY, force) => {
      if (motionRef.current.frame) cancelAnimationFrame(motionRef.current.frame);
      motionRef.current.frame = requestAnimationFrame(() => {
        motionRef.current.x = motionRef.current.x * 0.86 + nextX * 0.14;
        motionRef.current.y = motionRef.current.y * 0.86 + nextY * 0.14;
        cortexSetMotionVars(motionRef.current.x, motionRef.current.y, force || 0);
      });
    };

    const onOrientation = event => {
      const gamma = cortexClampMotion(event.gamma || 0, -32, 32);
      const beta = cortexClampMotion((event.beta || 0) - 20, -38, 38);
      const x = cortexClampMotion(gamma / 32, -1, 1);
      const y = cortexClampMotion(beta / 38, -1, 1);
      write(x, y, 0);
    };

    const onMotion = event => {
      const a = event.accelerationIncludingGravity || event.acceleration;
      if (!a) return;
      const force = Math.sqrt((a.x || 0) ** 2 + (a.y || 0) ** 2 + (a.z || 0) ** 2);
      const delta = Math.abs(force - motionRef.current.lastForce);
      motionRef.current.lastForce = force;
      const now = performance.now();
      if (delta > 7.5 && now - motionRef.current.lastShake > 540) {
        motionRef.current.lastShake = now;
        const jolt = Math.min(delta / 15, 1);
        document.documentElement.style.setProperty('--cortex-shake-force', jolt.toFixed(3));
        document.documentElement.style.setProperty('--cortex-shake-x', `${(jolt * 4.2).toFixed(2)}px`);
        document.documentElement.style.setProperty('--cortex-shake-y', `${(jolt * -3.1).toFixed(2)}px`);
        document.documentElement.style.setProperty('--cortex-shake-x-neg', `${(jolt * -3.6).toFixed(2)}px`);
        document.documentElement.style.setProperty('--cortex-shake-y-pos', `${(jolt * 2.2).toFixed(2)}px`);
        document.documentElement.style.setProperty('--cortex-shake-rot', `${(jolt * 1.05).toFixed(3)}deg`);
        document.documentElement.style.setProperty('--cortex-shake-rot-neg', `${(jolt * -0.82).toFixed(3)}deg`);
        document.documentElement.style.setProperty('--cortex-shake-rest', `${(jolt * 0.3).toFixed(3)}deg`);
        document.documentElement.classList.add('cortex-device-shake');
        window.setTimeout(() => document.documentElement.classList.remove('cortex-device-shake'), 620);
      }
    };

    window.addEventListener('deviceorientation', onOrientation, { passive:true });
    window.addEventListener('devicemotion', onMotion, { passive:true });

    motionRef.current.detach = () => {
      window.removeEventListener('deviceorientation', onOrientation);
      window.removeEventListener('devicemotion', onMotion);
      motionRef.current.active = false;
      cortexSetMotionVars(0, 0, 0);
    };
  }, []);

  const enable = React.useCallback(async () => {
    if (!supported) {
      setStatus('unsupported');
      return;
    }
    try {
      const requests = [];
      if (typeof DeviceOrientationEvent !== 'undefined' &&
          typeof DeviceOrientationEvent.requestPermission === 'function') {
        requests.push(DeviceOrientationEvent.requestPermission());
      }
      if (typeof DeviceMotionEvent !== 'undefined' &&
          typeof DeviceMotionEvent.requestPermission === 'function') {
        requests.push(DeviceMotionEvent.requestPermission());
      }
      const results = await Promise.all(requests);
      if (results.some(result => result !== 'granted')) {
        setStatus('denied');
        return;
      }
      attach();
    } catch (error) {
      setStatus('denied');
    }
  }, [attach, supported]);

  const disable = React.useCallback(() => {
    if (motionRef.current.detach) motionRef.current.detach();
    setStatus(supported ? 'idle' : 'unsupported');
  }, [supported]);

  const label = status === 'active' ? 'Gyro on'
    : status === 'denied' ? 'Gyro off'
    : status === 'unsupported' ? 'No gyro'
    : needsGesture ? 'Enable gyro' : 'Gyro';
  const color = status === 'active' ? DL.teal
    : status === 'denied' ? DL.gold
    : status === 'unsupported' ? DL.mute
    : DL.accent;

  return React.createElement('button', {
    type:'button',
    className:'cortex-motion-sensor-control cortex-motion-press',
    onClick:status === 'active' ? disable : enable,
    title:status === 'active'
      ? 'Motion sensor is active'
      : 'Enable subtle gyro tilt and shake response',
    'data-status':status,
    style:{ '--sensor-color':color },
  },
    React.createElement('span', { className:'sensor-dot' }),
    React.createElement('span', { className:'sensor-label-full' }, label),
    React.createElement('span', { className:'sensor-label-short' }, 'Gyro')
  );
}

Object.assign(window, { CortexMotionSensorControl });
