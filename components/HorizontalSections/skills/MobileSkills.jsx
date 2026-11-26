import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { skillCards } from './SkillCards';
import { animateShowTitle } from './animations';

// Phone layout for the skills section: all cards fit on one screen, they are
// dealt from a deck at the bottom, then flip face up in a diagonal wave.
// Tap a card to lift it large, tap again to put it back.

const ROWS = [5, 4, 4, 4, 4]; // 21 cards, centered rows like a tarot spread

const Wrap = styled.div`
  position: relative;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-family: presicav, sans-serif;
  font-size: 2.1rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-align: center;
  margin: 0;
  padding-top: 1.1rem;
  height: 4.2rem;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text};
  opacity: 0;
  span {
    display: inline-block;
  }
`;

const Grid = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 4.2rem;
  bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.5rem;
  gap: var(--gap);
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--gap);
`;

const Slot = styled.button`
  position: relative;
  width: var(--cw);
  height: var(--ch);
  padding: 0;
  border: 0;
  background: none;
  perspective: 600px;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  cursor: pointer;
`;

const Inner = styled.div`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
`;

const Face = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 5px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.78);
  opacity: 0;
`;

const Big = styled.div`
  width: min(66vw, calc((100svh - 150px) * 2 / 3));
  aspect-ratio: 2 / 3;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 1px solid #d4af37;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.25);
`;

const Hint = styled.p`
  margin: 1rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #d4af37;
`;

const MobileSkills = () => {
  const wrapRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);
  const innerRefs = useRef([]);
  const overlayRef = useRef(null);
  const bigRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [size, setSize] = useState({ cw: 64, ch: 96, gap: 6 });
  const readyRef = useRef(false);

  // card size from the screen so 5 rows always fit
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const gap = 6;
      const byW = (w - 28 - gap * 4) / 5;
      const availH = h - 4.2 * 16 - 0.8 * 16 - gap * 4 - 4;
      const byH = ((availH / 5) * 2) / 3;
      const cw = Math.floor(Math.min(byW, byH));
      setSize({ cw, ch: Math.floor((cw * 3) / 2), gap });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // deal from the deck, then flip face up in a diagonal wave
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx;
    let started = false;

    const play = () => {
      if (started) return;
      started = true;
      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean);
        const inners = innerRefs.current.filter(Boolean);
        const box = el.getBoundingClientRect();
        const deckX = box.left + box.width / 2;
        const deckY = box.bottom + 40;
        animateShowTitle(titleRef);
        if (reduce) {
          gsap.set(inners, { rotateY: 180 });
          readyRef.current = true;
          return;
        }
        gsap.set(inners, { rotateY: 0 });
        cards.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          gsap.set(c, {
            x: deckX - (r.left + r.width / 2),
            y: deckY - (r.top + r.height / 2),
            rotation: gsap.utils.random(-25, 25),
            opacity: 1,
            scale: 0.9,
          });
        });
        const tl = gsap.timeline({
          onComplete: () => {
            readyRef.current = true;
          },
        });
        tl.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        });
        // face-up wave, corner to corner
        let idx = 0;
        const order = [];
        ROWS.forEach((n, r) => {
          for (let c = 0; c < n; c += 1) {
            order.push({ i: idx, d: r + c });
            idx += 1;
          }
        });
        order.forEach(({ i, d }) => {
          const inner = innerRefs.current[i];
          if (inner) {
            tl.to(
              inner,
              { rotateY: 180, duration: 0.9, ease: 'power2.inOut' },
              3.6 + d * 0.18
            );
          }
        });
      }, el);
    };

    // wait until the section scrolls into view
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.85 }
    );
    gsap.set(cardRefs.current.filter(Boolean), { opacity: 0 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  const lift = useCallback(i => {
    if (!readyRef.current) return;
    setOpen(i);
    requestAnimationFrame(() => {
      const card = cardRefs.current[i];
      const big = bigRef.current;
      const ov = overlayRef.current;
      if (!card || !big || !ov) return;
      const a = card.getBoundingClientRect();
      const b = big.getBoundingClientRect();
      gsap.set(ov, { opacity: 0 });
      gsap.to(ov, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        big,
        {
          x: a.left + a.width / 2 - (b.left + b.width / 2),
          y: a.top + a.height / 2 - (b.top + b.height / 2),
          scale: a.width / b.width,
          rotation: -6,
        },
        { x: 0, y: 0, scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.3)' }
      );
    });
  }, []);

  const drop = useCallback(() => {
    const i = open;
    const card = cardRefs.current[i];
    const big = bigRef.current;
    const ov = overlayRef.current;
    if (i === null || !card || !big || !ov) {
      setOpen(null);
      return;
    }
    const a = card.getBoundingClientRect();
    const b = big.getBoundingClientRect();
    gsap.to(ov, { opacity: 0, duration: 0.3 });
    gsap.to(big, {
      x: a.left + a.width / 2 - (b.left + b.width / 2),
      y: a.top + a.height / 2 - (b.top + b.height / 2),
      scale: a.width / b.width,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setOpen(null),
    });
  }, [open]);

  let k = -1;
  return (
    <Wrap ref={wrapRef}>
      <Title ref={titleRef}>Skills</Title>
      <Grid style={{ '--cw': `${size.cw}px`, '--ch': `${size.ch}px`, '--gap': `${size.gap}px` }}>
        {ROWS.map((n, r) => (
          <Row key={r}>
            {Array.from({ length: n }).map((_, c) => {
              k += 1;
              const i = k;
              const skill = skillCards[i];
              return (
                <Slot
                  key={skill.title}
                  ref={el => {
                    cardRefs.current[i] = el;
                  }}
                  aria-label={skill.title}
                  onClick={() => lift(i)}
                >
                  <Inner
                    ref={el => {
                      innerRefs.current[i] = el;
                    }}
                  >
                    <Face
                      style={{
                        backgroundImage: "url('/imgs/cardBack.png')",
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <Face
                      style={{
                        backgroundImage: `url(${skill.iconSrc})`,
                        transform: 'rotateY(180deg)',
                      }}
                    />
                  </Inner>
                </Slot>
              );
            })}
          </Row>
        ))}
      </Grid>
      {open !== null && (
        <Overlay ref={overlayRef} onClick={drop} role="dialog" aria-label={skillCards[open].title}>
          <Big
            ref={bigRef}
            style={{ backgroundImage: `url(${skillCards[open].iconSrc})` }}
          />
          <Hint>{skillCards[open].title} · tap to close</Hint>
        </Overlay>
      )}
    </Wrap>
  );
};

export default MobileSkills;
