import { useEffect, useState } from 'react';

const KEY = 'horror-settings';
let state = { enabled: true, music: false, reduced: false };
const listeners = new Set();
let inited = false;

export const initHorror = () => {
  if (inited || typeof window === 'undefined') return;
  inited = true;
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) || '{}');
    if (typeof saved.enabled === 'boolean') state.enabled = saved.enabled;
  } catch (e) {}
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  state.reduced = mq.matches;
  const onChange = () => setHorror({ reduced: mq.matches });
  if (mq.addEventListener) mq.addEventListener('change', onChange);
};

export const getHorror = () => state;

export const setHorror = patch => {
  state = { ...state, ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ enabled: state.enabled }));
  } catch (e) {}
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
