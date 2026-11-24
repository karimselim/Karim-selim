import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { useHorror } from '../../utils/horror';
import {
  startHeartbeat,
  stopHeartbeat,
  whisper,
  creak,
  scareHit,
} from '../../utils/horrorSound';

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

const DeathBtn = styled.button`
  position: absolute;
  z-index: 56;
  left: 5vw;
  top: 50%;
  margin-top: -9vw;
  width: 11vw;
  max-width: 190px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transform: rotate(-6deg);
  filter: drop-shadow(0 0 18px rgba(212, 175, 55, 0.25)) brightness(0.85);
  transition: transform 0.4s, filter 0.4s;
  &:hover,
  &:focus-visible {
    transform: rotate(-2deg) scale(1.06);
    filter: drop-shadow(0 0 28px rgba(212, 60, 40, 0.55)) brightness(1.05);
    outline: none;
  }
  img {
    width: 100%;
    display: block;
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
    animation: ${({ scare }) => (scare ? shake : 'none')} 0.45s ease-out both;
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
          creak();
          clearTimeout(handTimer);
          handTimer = setTimeout(() => setHandUp(true), 4500);
        } else {
          clearTimeout(handTimer);
          setHandUp(false);
        }
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

    // One rare scare per visit, after the visitor has spent a while in Skills.
    let scareTimer = null;
    if (!reduced && !window.sessionStorage.getItem('horror-scared')) {
      const wait = 14000 + Math.random() * 8000;
      scareTimer = setInterval(() => {
        if (!visible || performance.now() - inView < wait) return;
        clearInterval(scareTimer);
        window.sessionStorage.setItem('horror-scared', '1');
        scareHit();
        setView('scare');
        setTimeout(() => setView(v => (v === 'scare' ? null : v)), 1700);
      }, 500);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      clearTimeout(handTimer);
      clearInterval(scareTimer);
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
      <DeathBtn
        type="button"
        aria-label="Death, card XIII. Open the card"
        onMouseEnter={() => startHeartbeat(72)}
        onMouseLeave={stopHeartbeat}
        onFocus={() => startHeartbeat(72)}
        onBlur={stopHeartbeat}
        onClick={() => {
          whisper();
          setView('card');
        }}
      >
        <img src="/horror/death.webp" alt="" loading="lazy" />
      </DeathBtn>
      {view &&
        ReactDOM.createPortal(
          <Overlay
            scare={view === 'scare'}
            role="dialog"
            aria-label="Death, card XIII"
            onClick={() => setView(null)}
          >
            <img src="/horror/death.webp" alt="Death, tarot card XIII" />
          </Overlay>,
          document.body
        )}
    </div>
  );
};

export default SkillsHorror;
