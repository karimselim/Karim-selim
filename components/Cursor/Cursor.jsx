import React from 'react';
import { useCursorContext } from '../../context/cursor';
import { StyledCursor } from './styles';

const Cursor = () => {
  const cursorRef = React.useRef();
  const [{ cursorStyle, position }, dispatch] = useCursorContext();
  const lastPoint = React.useRef(null);
  const borderedRef = React.useRef(cursorStyle.bordered);
  borderedRef.current = cursorStyle.bordered;

  // Keep the ring/closed look in sync with what is under the pointer even when the
  // mouse is not moving (loader ends, page scrolls under a still cursor).
  React.useEffect(() => {
    const sync = () => {
      const p = lastPoint.current;
      if (!p) return;
      const el = document.elementFromPoint(p.x, p.y);
      const shouldRing = !!(
        el &&
        el.closest &&
        el.closest('[data-cursor-ring]')
      );
      if (shouldRing !== borderedRef.current) {
        dispatch({
          type: shouldRing ? 'ADD_CURSOR_BORDER' : 'REMOVE_CURSOR_BORDER',
        });
      }
    };
    // The hit test forces layout work, so while scrolling run it at most about
    // every 120ms instead of every frame (the ring still catches up right after).
    let raf = null;
    let lastRun = 0;
    const onScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(() => {
          const now = performance.now();
          if (now - lastRun < 120) {
            raf = null;
            clearTimeout(timer);
            timer = setTimeout(onScroll, 130 - (now - lastRun));
            return;
          }
          lastRun = now;
          raf = null;
          sync();
        });
      }
    };
    let timer = null;
    window.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    });
    // Banner fires this once the loader is gone and the hero is on screen
    window.addEventListener('cursor-sync', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('cursor-sync', onScroll);
      clearTimeout(timer);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [dispatch]);

  React.useEffect(() => {
    const onMouseMove = event => {
      lastPoint.current = { x: event.clientX, y: event.clientY };
      // The sticky lock is normally released by mouseleave. If the locked button
      // is removed while hovered (menu open/close), that never fires and the
      // cursor stays frozen. A pointer well away from the lock releases it.
      let locked = position;
      if (
        locked &&
        Math.hypot(event.clientX - locked.x, event.clientY - locked.y) > 90
      ) {
        locked = null;
        dispatch({ type: 'LOCK_CURSOR_POSITION', payload: null });
      }
      const x = locked ? locked.x : event.clientX;
      const y = locked ? locked.y : event.clientY;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [position, dispatch]);

  return (
    <StyledCursor
      ref={cursorRef}
      color={cursorStyle.color}
      bordered={cursorStyle.bordered}
    />
  );
};

export default React.memo(Cursor);
