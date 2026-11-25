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
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 45%,
    rgba(10, 0, 0, 0.6) 100%
  );
`;

const LINES = [
  'FAIL  tests/checkout.spec.ts',
  'expect(received).toBe(expected)',
  '  Expected: 200   Received: 500',
  '  at CartPage.pay (cart.page.ts:42)',
  'retrying (2/3)...',
  'flaky: passed on retry. suspicious.',
  'PASS  tests/login.spec.ts',
  'Error: locator.click: Timeout 30000ms',
  '  waiting for getByRole("button", { name: "Pay" })',
  'bug filed: JIRA-481  severity: high',
  'it works on my machine',
  '1 failed, 14 passed',
];

// The bugs that never leave: a quiet, slowly rising test log in the lower-left
// corner. Relates the mood to QA instead of generic horror.
const TraceBox = styled.div`
  position: absolute;
  left: 2.2vw;
  bottom: 3vh;
  width: 34vw;
  height: 26vh;
  overflow: hidden;
  opacity: 0.32;
  transition: opacity 0.5s;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent);
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.7;
  color: #b0141e;
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
    color: #d4af37;
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
