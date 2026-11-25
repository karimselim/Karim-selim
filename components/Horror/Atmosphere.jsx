import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';

const rise = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
`;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s;
  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.5) 100%)'
      : 'none'};
`;

const LINES = [
  'XIII  Death: regression found in checkout',
  'VII   The Chariot: release is moving too fast',
  'XVI   The Tower: production is down',
  'XVIII The Moon: flaky test, passed on retry',
  'II    The High Priestess: hidden requirement',
  'PASS  X The Wheel: the suite is green again',
  'XV    The Devil: it works on my machine',
  'IX    The Hermit: reproduced in isolation',
  'XVII  The Star: bug fixed and verified',
  '0     The Fool: skipped the test plan',
];

// The bugs that never leave: a quiet, slowly rising test log in the lower-left
// corner. Relates the mood to QA instead of generic horror.
const TraceBox = styled.div`
  position: absolute;
  left: 2.2vw;
  bottom: 3vh;
  width: 38vw;
  height: 26vh;
  overflow: hidden;
  opacity: 0.4;
  transition: opacity 0.5s;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.7;
  color: ${({ theme }) => (theme.mode === 'light' ? '#5a4326' : '#cbbf9a')};
  white-space: pre;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TraceList = styled.div`
  animation: ${rise} 60s linear infinite;
  will-change: transform;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
  .ok {
    color: ${({ theme }) => (theme.mode === 'light' ? '#8a6a12' : '#d4af37')};
  }
`;

const Trace = React.forwardRef((props, ref) => {
  const all = LINES.concat(LINES);
  return (
    <TraceBox ref={ref} aria-hidden="true">
      <TraceList>
        {all.map((l, i) => (
          <div key={i} className={l.startsWith('PASS') ? 'ok' : undefined}>
            {l}
          </div>
        ))}
      </TraceList>
    </TraceBox>
  );
});

// Light mood for the sections below the hero: red-black vignette and slow fog.
// Fades out completely over the hero.
const Atmosphere = () => {
  const { enabled } = useHorror();
  const ref = useRef(null);
  const fogRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = null;
    const update = () => {
      raf = null;
      if (!ref.current) return;
      const t = (window.scrollY - window.innerHeight * 0.7) / (window.innerHeight * 0.5);
      ref.current.style.opacity = String(Math.max(0, Math.min(1, t)));
      // No fog over the Experience slides: it washed the photos out.
      const v = window.scrollY / window.innerHeight;
      const inExperience = v > 2.1 && v < 4.7;
      if (fogRef.current) fogRef.current.style.opacity = inExperience ? '0' : '0.32';
    };
    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <Layer ref={ref} aria-hidden="true">
      <Trace ref={fogRef} />
    </Layer>
  );
};

export default Atmosphere;
