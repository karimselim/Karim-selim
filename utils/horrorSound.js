// All sound is synthesised with the Web Audio API: no audio files, no licences.
// Nothing plays until the visitor presses the sound button (browser rule, and polite).
let ctx = null;
let master = null;
let hbTimer = null;

const noiseBuffer = () => {
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    d[i] = last * 3.5;
  }
  return buf;
};

const startDrone = () => {
  const out = ctx.createGain();
  out.gain.value = 0.16;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 160;
  [55, 55.6, 82.4].forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = i === 2 ? 'sine' : 'sawtooth';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = i === 2 ? 0.5 : 0.35;
    o.connect(g).connect(lp);
    o.start();
  });
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lg = ctx.createGain();
  lg.gain.value = 60;
  lfo.connect(lg).connect(lp.frequency);
  lfo.start();
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer();
  n.loop = true;
  const ng = ctx.createGain();
  ng.gain.value = 0.25;
  n.connect(ng).connect(lp);
  n.start();
  lp.connect(out).connect(master);
};

export const enableSound = () => {
  if (typeof window === 'undefined') return;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    startDrone();
  }
  ctx.resume();
  master.gain.setTargetAtTime(0.9, ctx.currentTime, 0.4);
};

export const disableSound = () => {
  stopHeartbeat();
  if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
};

const on = () => ctx && master && master.gain.value > 0.05;

const thump = (t, freq, vol) => {
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(35, t + 0.18);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.3);
};

export const startHeartbeat = (bpm = 70) => {
  stopHeartbeat();
  if (!on()) return;
  const beat = () => {
    if (!on()) return;
    const t = ctx.currentTime;
    thump(t, 70, 0.9);
    thump(t + 0.22, 60, 0.6);
  };
  beat();
  hbTimer = setInterval(beat, 60000 / bpm);
};

export const stopHeartbeat = () => {
  if (hbTimer) clearInterval(hbTimer);
  hbTimer = null;
};

export const whisper = () => {
  if (!on()) return;
  const t = ctx.currentTime;
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer();
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 6;
  bp.frequency.setValueAtTime(1800, t);
  bp.frequency.linearRampToValueAtTime(3200, t + 1.4);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.5, t + 0.5);
  g.gain.linearRampToValueAtTime(0, t + 1.5);
  n.connect(bp).connect(g).connect(master);
  n.start(t);
  n.stop(t + 1.6);
};

export const creak = () => {
  if (!on()) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(95, t);
  o.frequency.linearRampToValueAtTime(150, t + 0.5);
  o.frequency.linearRampToValueAtTime(110, t + 0.8);
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 500;
  bp.Q.value = 8;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.18, t + 0.1);
  g.gain.linearRampToValueAtTime(0, t + 0.85);
  o.connect(bp).connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.9);
};

export const scareHit = () => {
  if (!on()) return;
  const t = ctx.currentTime;
  thump(t, 110, 1.4);
  const n = ctx.createBufferSource();
  n.buffer = noiseBuffer();
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.9, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
  n.connect(g).connect(master);
  n.start(t);
  n.stop(t + 0.8);
};
