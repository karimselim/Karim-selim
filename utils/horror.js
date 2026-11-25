import { useEffect, useState } from 'react';

let state = { enabled: true, music: false, reduced: false };
const listeners = new Set();
let inited = false;

export const initHorror = () => {
  if (inited || typeof window === 'undefined') return;
  inited = true;
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  state.reduced = mq.matches;
  const onChange = () => setHorror({ reduced: mq.matches });
  if (mq.addEventListener) mq.addEventListener('change', onChange);
};

export const getHorror = () => state;

export const setHorror = patch => {
  state = { ...state, ...patch };
  listeners.forEach(l => l(state));
};

export const useHorror = () => {
  const [s, setS] = useState(state);
  useEffect(() => {
    initHorror();
    setS(state);
    listeners.add(setS);
    return () => listeners.delete(setS);
  }, []);
  return s;
};
