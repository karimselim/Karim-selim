import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';

const driftA = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;
const driftB = keyframes`
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
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

// Each strip is the fog image followed by its mirror, so the tile edges always
// match (no cut when it wraps). Two strips move in opposite directions.
const Strip = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200vw;
  height: 38vh;
  display: flex;
  mix-blend-mode: screen;
  opacity: ${({ o }) => o};
  animation: ${({ rev }) => (rev ? driftB : driftA)} ${({ t }) => t}s linear infinite;
  will-change: transform;
  div {
    flex: 0 0 50%;
    height: 100%;
    background: url('/horror/fog.webp') center bottom / 100% 100% no-repeat;
  }
  div:nth-child(even) {
    transform: scaleX(-1);
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const FogWrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  transition: opacity 0.5s;
`;

const FogStrip = props => (
  <Strip {...props}>
    <div />
    <div />
    <div />
    <div />
  </Strip>
);

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
      if (fogRef.current) fogRef.current.style.opacity = inExperience ? '0' : '1';
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
      <FogWrap ref={fogRef}>
        <FogStrip o={0.16} t={110} />
        <FogStrip o={0.1} t={160} rev />
      </FogWrap>
    </Layer>
  );
};

export default Atmosphere;
