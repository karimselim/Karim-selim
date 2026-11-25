// Very quiet ambient pad, synthesised in the browser (no audio file, no licence).
// Loaded only when the visitor presses "Music", never plays by itself.
let ctx = null;
let master = null;
let timer = null;

// Am, F, C, G: slow and open. Notes in Hz.
const CHORDS = [
  [110, 164.81, 220, 261.63],
  [87.31, 130.81, 174.61, 220],
  [130.81, 196, 261.63, 329.63],
  [98, 146.83, 196, 246.94],
];

const impulse = () => {
  const len = ctx.sampleRate * 3.5;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
    }
  }
  return buf;
};

const playChord = (notes, when, dur) => {
  notes.forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = i === 0 ? 'sine' : 'triangle';
    o.frequency.value = f;
    o.detune.value = (Math.random() - 0.5) * 8;
    const g = ctx.createGain();
    const peak = i === 0 ? 0.5 : 0.22;
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(peak, when + dur * 0.45);
    g.gain.linearRampToValueAtTime(0, when + dur + 2);
    o.connect(g).connect(master.input);
    o.start(when);
    o.stop(when + dur + 2.2);
  });
};

const build = () => {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  ctx = new AC();
  const out = ctx.createGain();
  out.gain.value = 0;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 700;
  const conv = ctx.createConvolver();
  conv.buffer = impulse();
  const dry = ctx.createGain();
  dry.gain.value = 0.5;
  const wet = ctx.createGain();
  wet.gain.value = 0.9;
  lp.connect(dry).connect(out);
  lp.connect(conv).connect(wet).connect(out);
  out.connect(ctx.destination);
  master = { input: lp, out };
  return true;
};

export const startMusic = () => {
  if (!ctx && !build()) return;
  ctx.resume();
  // Very soft on purpose.
  master.out.gain.cancelScheduledValues(ctx.currentTime);
  master.out.gain.setTargetAtTime(0.07, ctx.currentTime, 2.5);
  let i = 0;
  const step = () => {
    playChord(CHORDS[i % CHORDS.length], ctx.currentTime + 0.05, 9);
    i++;
  };
  step();
  timer = setInterval(step, 9000);
};

export const stopMusic = () => {
  if (timer) clearInterval(timer);
  timer = null;
  if (!ctx) return;
  master.out.gain.cancelScheduledValues(ctx.currentTime);
  master.out.gain.setTargetAtTime(0, ctx.currentTime, 0.8);
  const c = ctx;
  setTimeout(() => c.state === 'running' && c.suspend(), 3500);
};
