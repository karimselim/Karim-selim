import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';

const drift = keyframes`
  from { background-position: 0 100%; }
  to { background-position: -1400px 100%; }
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

const Fog = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45vh;
  background: url('/horror/fog.webp') repeat-x;
  background-size: 1400px auto;
  mix-blend-mode: screen;
  opacity: 0.22;
  animation: ${drift} 90s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Light mood for the sections below the hero: red-black vignette and slow fog.
// Fades out completely over the hero.
const Atmosphere = () => {
  const { enabled } = useHorror();
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = null;
    const update = () => {
      raf = null;
      if (!ref.current) return;
      const t = (window.scrollY - window.innerHeight * 0.7) / (window.innerHeight * 0.5);
      ref.current.style.opacity = String(Math.max(0, Math.min(1, t)));
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
      <Fog />
    </Layer>
  );
};

export default Atmosphere;
