import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';
import DeathCard from './DeathCard';

const blink = keyframes`
  0%, 90%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(0.06); }
`;

const Dark = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
`;

const Eye = styled.svg`
  position: absolute;
  z-index: 55;
  width: ${({ w }) => w}vw;
  max-width: 190px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.9s ease;
  &[data-open='true'] {
    opacity: 0.55;
  }
  .lid {
    transform-origin: 60px 12px;
    animation: ${blink} ${({ d }) => d}s infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .lid {
      animation: none;
    }
  }
`;

const EyeSvg = React.forwardRef(({ w, d, style, open }, ref) => (
  <Eye ref={ref} viewBox="0 0 120 30" w={w} d={d} data-open={open} style={style} aria-hidden="true">
    <g className="lid" fill="#f4f4f0">
      <path d="M2 3 L50 14 L48 21 L12 13 Z" />
      <path d="M118 3 L70 14 L72 21 L108 13 Z" />
    </g>
  </Eye>
));

const flipIn = keyframes`
  0% { transform: perspective(1200px) rotateY(0deg) scale(0.9); }
  35% { transform: perspective(1200px) rotateY(0deg) scale(1); }
  75% { transform: perspective(1200px) rotateY(180deg) scale(1.03); }
  100% { transform: perspective(1200px) rotateY(180deg) scale(1.05); }
`;

const Flip = styled.div`
  position: relative;
  height: 82vh;
  aspect-ratio: 2 / 3;
  transform-style: preserve-3d;
  animation: ${flipIn} 1.6s ease-in-out both;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    animation: none !important;
  }
  img.front {
    transform: rotateY(180deg);
  }
`;

const shake = keyframes`
  0% { transform: translate(0, 0) scale(0.5); }
  12% { transform: translate(-14px, 8px) scale(1.12); }
  30% { transform: translate(12px, -10px) scale(1.05); }
  50% { transform: translate(-8px, 6px) scale(1.08); }
  100% { transform: translate(0, 0) scale(1.04); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9500;
  background: rgba(0, 0, 0, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    height: 82vh;
    max-width: 92vw;
    object-fit: contain;
    
  }
`;

const EYES = [
  { x: 4, y: 12, w: 11, d: 6.5 },
  { x: 80, y: 8, w: 9, d: 7.7 },
  { x: 86, y: 66, w: 12, d: 5.9 },
  { x: 6, y: 74, w: 10, d: 8.1 },
  ];

// Idle in Skills: the candle shrinks and eyes open in the dark. Move and they close.
const SkillsHorror = () => {
  const { enabled, reduced } = useHorror();
  const rootRef = useRef(null);
  const darkRef = useRef(null);
  const eyeRefs = useRef([]);
  const [idle, setIdle] = useState(false);
  const [view, setView] = useState(null); // null | 'card' | 'scare'

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const container = root && root.parentElement;
    if (!container) return;

    let visible = false;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lastMove = performance.now();
    let raf = null;
    let r = 260;
    let inView = 0;
    let lastFlicker = 0;
    let idleNow = false;
    let scared = false;

    const paint = () => {
      const rect = container.getBoundingClientRect();
      const x = mx - rect.left;
      const y = my - rect.top;
      const dark = reduced ? 0.6 : 0.9;
      darkRef.current.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(255,170,70,0.16) 0, rgba(255,140,40,0.05) ${r * 0.5}px, rgba(0,0,0,${dark * 0.4}) ${r * 0.85}px, rgba(0,0,0,${dark}) ${r * 1.45}px)`;
      eyeRefs.current.forEach(el => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        const dx = Math.max(-8, Math.min(8, (mx - (b.left + b.width / 2)) / 60));
        const dy = Math.max(-5, Math.min(5, (my - (b.top + b.height / 2)) / 90));
        el.style.setProperty('--dx', `${dx}px`);
        el.style.setProperty('--dy', `${dy}px`);
      });
    };

    const tick = now => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const idleFor = now - lastMove;
      const wantIdle = idleFor > 5000;
      if (wantIdle !== idleNow) {
        idleNow = wantIdle;
        setIdle(wantIdle);
      }
      // The fate card: if the visitor stays still, one card of the spread turns over.
      if (!reduced && idleFor > 9500 && !scared && !window.sessionStorage.getItem('horror-scared')) {
        scared = true;
        window.sessionStorage.setItem('horror-scared', '1');
        setView('scare');
        setTimeout(() => setView(v => (v === 'scare' ? null : v)), 3200);
      }
      const targetR = reduced ? 320 : idleNow ? 130 : 270;
      r += (targetR - r) * 0.05;
      if (!reduced && now - lastFlicker > 70) {
        lastFlicker = now;
        r += (Math.random() - 0.5) * 7;
      }
      paint();
    };

    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
      lastMove = performance.now();
    };

    const io = new IntersectionObserver(
      entries => {
        visible = entries[0].isIntersecting;
        if (visible) {
          lastMove = performance.now();
          inView = performance.now();
        } else {
          setIdle(false);
          idleNow = false;
        }
      },
      { threshold: 0.35 }
    );
    io.observe(container);
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled, reduced]);

  useEffect(() => {
    if (!view) return;
    const onKey = e => e.key === 'Escape' && setView(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view]);

  if (!enabled) return null;
  const eyesOpen = reduced || idle;
  return (
    <div ref={rootRef} aria-hidden={view ? undefined : 'true'}>
      <Dark ref={darkRef} aria-hidden="true" />
      {EYES.map((e, i) => (
        <EyeSvg
          key={i}
          ref={el => (eyeRefs.current[i] = el)}
          open={eyesOpen}
          w={e.w}
          d={e.d}
          style={{ left: `${e.x}%`, top: `${e.y}%`, transitionDelay: `${i * 0.35}s` }}
        />
      ))}
      {view &&
        ReactDOM.createPortal(
          <Overlay
            scare={view === 'scare'}
            role="dialog"
            aria-label="Death, card XIII"
            onClick={() => setView(null)}
          >
            {view === 'scare' ? (
              <Flip>
                <img src="/imgs/cardBack.png" alt="" />
                <DeathCard className="front" />
              </Flip>
            ) : (
              <DeathCard />
            )}
          </Overlay>,
          document.body
        )}
    </div>
  );
};

export default SkillsHorror;
