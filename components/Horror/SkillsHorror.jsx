import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';

const blink = keyframes`
  0%, 90%, 100% { transform: translate(var(--dx, 0), var(--dy, 0)) scaleY(1); }
  94% { transform: translate(var(--dx, 0), var(--dy, 0)) scaleY(0.06); }
`;

const Dark = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
`;

const Eye = styled.img`
  position: absolute;
  z-index: 55;
  width: ${({ w }) => w}vw;
  max-width: 340px;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0;
  transition: opacity 0.9s ease;
  animation: ${blink} ${({ d }) => d}s infinite;
  &[data-open='true'] {
    opacity: 0.95;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Hand = styled.img`
  position: absolute;
  z-index: 54;
  bottom: 0;
  left: 74%;
  width: 11vw;
  max-width: 190px;
  pointer-events: none;
  mix-blend-mode: screen;
  transform: translateY(105%);
  transition: transform 2.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  &[data-up='true'] {
    transform: translateY(30%);
  }
`;

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
  { x: 1.5, y: 6, w: 17, d: 5.5 },
  { x: 2, y: 70, w: 15, d: 6.8 },
  { x: 43, y: 80, w: 13, d: 4.9 },
  { x: 81, y: 44, w: 16, d: 7.4 },
  { x: 42, y: 1, w: 12, d: 6.1 },
];

// Idle in Skills: the candle shrinks and eyes open in the dark. Move and they close.
const SkillsHorror = () => {
  const { enabled, reduced } = useHorror();
  const rootRef = useRef(null);
  const darkRef = useRef(null);
  const eyeRefs = useRef([]);
  const [idle, setIdle] = useState(false);
  const [handUp, setHandUp] = useState(false);
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
    let handTimer = null;
    let scared = false;

    const paint = () => {
      const rect = container.getBoundingClientRect();
      const x = mx - rect.left;
      const y = my - rect.top;
      const dark = reduced ? 0.5 : 0.8;
      darkRef.current.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(255,150,50,0.10) 0, rgba(0,0,0,0) ${r * 0.45}px, rgba(0,0,0,${dark * 0.35}) ${r * 0.8}px, rgba(0,0,0,${dark}) ${r * 1.5}px)`;
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
        if (wantIdle) {
          clearTimeout(handTimer);
          handTimer = setTimeout(() => setHandUp(true), 4500);
        } else {
          clearTimeout(handTimer);
          setHandUp(false);
        }
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
          setHandUp(false);
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
      clearTimeout(handTimer);
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
        <Eye
          key={i}
          ref={el => (eyeRefs.current[i] = el)}
          src="/horror/eyes.webp"
          alt=""
          loading="lazy"
          data-open={eyesOpen}
          w={e.w}
          d={e.d}
          style={{ left: `${e.x}%`, top: `${e.y}%`, transitionDelay: `${i * 0.35}s` }}
        />
      ))}
      {!reduced && <Hand src="/horror/hand.webp" alt="" loading="lazy" data-up={handUp} />}
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
                <img className="front" src="/horror/death.webp" alt="Death, tarot card XIII" />
              </Flip>
            ) : (
              <img src="/horror/death.webp" alt="Death, tarot card XIII" />
            )}
          </Overlay>,
          document.body
        )}
    </div>
  );
};

export default SkillsHorror;
