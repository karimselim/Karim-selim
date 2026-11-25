import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHorror } from '../../utils/horror';

const Dark = styled.div`
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
`;

// Skills: the room is dark and the cursor is a candle. Nothing else happens.
// The overlay is repainted only while the light moves or flickers.
const SkillsHorror = () => {
  const { reduced } = useHorror();
  const rootRef = useRef(null);
  const darkRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const container = root && root.parentElement;
    if (!container) return;

    let visible = false;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let raf = null;
    let r = 380;
    let lastFlicker = 0;
    let lastPaint = 0;
    let dirty = true;

    const paint = () => {
      const rect = container.getBoundingClientRect();
      const x = mx - rect.left;
      const y = my - rect.top;
      const dark = reduced ? 0.55 : 0.84;
      darkRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,170,70,0.16) 0, rgba(255,140,40,0.05) ${r * 0.5}px, rgba(0,0,0,${dark * 0.22}) ${r * 0.8}px, rgba(0,0,0,${dark}) ${r * 1.45}px)`;
    };

    const tick = now => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (!reduced && now - lastFlicker > 90) {
        lastFlicker = now;
        r = 380 + (Math.random() - 0.5) * 14;
        dirty = true;
      }
      if (dirty && now - lastPaint > 30) {
        lastPaint = now;
        dirty = false;
        paint();
      }
    };

    const onMove = e => {
      mx = e.clientX;
      my = e.clientY;
      dirty = true;
    };

    const io = new IntersectionObserver(
      entries => {
        visible = entries[0].isIntersecting;
        dirty = true;
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
  }, [reduced]);

  return (
    <div ref={rootRef} aria-hidden="true">
      <Dark ref={darkRef} />
    </div>
  );
};

export default SkillsHorror;
