import React from 'react';
import { useCursorContext } from '../../context/cursor';
import { StyledCursor } from './styles';

const Cursor = () => {
  const cursorRef = React.useRef();
  const [{ cursorStyle, position }, dispatch] = useCursorContext();
  const lastPoint = React.useRef(null);
  const borderedRef = React.useRef(cursorStyle.bordered);
  borderedRef.current = cursorStyle.bordered;
  const bigRef = React.useRef(cursorStyle.big);
  bigRef.current = cursorStyle.big;

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
      const shouldBig = !!(
        el &&
        el.closest &&
        el.closest('[data-cursor-big]')
      );
      if (shouldBig !== bigRef.current) {
        dispatch({
          type: shouldBig ? 'ADD_CURSOR_BIG' : 'REMOVE_CURSOR_BIG',
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

  // Every link gets the same magnetic pull the menu items have: hovering an
  // anchor locks the cursor to its centre until the pointer leaves the link.
  React.useEffect(() => {
    const onOver = event => {
      // Self-heal the ring/big look from the data attributes. React's
      // mouseenter simulation misses the first hover after the intro loader
      // unmounts under a resting pointer (the previous target is detached),
      // and mount-time settle checks can strip the ring in that window.
      // Add-only here: removal still comes from the elements' own handlers.
      const t = event.target;
      if (t && t.closest) {
        if (!borderedRef.current && t.closest('[data-cursor-ring]')) {
          dispatch({ type: 'ADD_CURSOR_BORDER' });
        }
        if (!bigRef.current && t.closest('[data-cursor-big]')) {
          dispatch({ type: 'ADD_CURSOR_BIG' });
        }
      }
      const a = t && t.closest && t.closest('a');
      if (!a || a.closest('[data-cursor-no-magnet]')) return;
      const r = a.getBoundingClientRect();
      dispatch({
        type: 'LOCK_CURSOR_POSITION',
        payload: {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          // Capped so a very large link can never freeze the cursor over a
          // huge area; oversized targets simply release instead.
          r: Math.min(Math.max(r.width, r.height) / 2 + 24, 140),
        },
      });
    };
    const onOut = event => {
      const a =
        event.target && event.target.closest && event.target.closest('a');
      if (!a) return;
      if (event.relatedTarget && a.contains(event.relatedTarget)) return;
      dispatch({ type: 'LOCK_CURSOR_POSITION', payload: null });
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [dispatch]);

  React.useEffect(() => {
    let lastProbe = 0;
    const onMouseMove = event => {
      lastPoint.current = { x: event.clientX, y: event.clientY };
      // The browser fires no mouseover/mouseenter at all for the first hover
      // after the intro loader unmounts under a resting pointer, so the ring
      // never turns on there. While the ring or big look is missing, re-check
      // what is under the pointer (throttled) and switch it on. Add-only:
      // removal stays with the elements' own mouseleave handlers.
      if (!borderedRef.current || !bigRef.current) {
        const now = performance.now();
        if (now - lastProbe > 150) {
          lastProbe = now;
          const el = document.elementFromPoint(event.clientX, event.clientY);
          if (el && el.closest) {
            if (!borderedRef.current && el.closest('[data-cursor-ring]')) {
              dispatch({ type: 'ADD_CURSOR_BORDER' });
            }
            if (!bigRef.current && el.closest('[data-cursor-big]')) {
              dispatch({ type: 'ADD_CURSOR_BIG' });
            }
          }
        }
      }
      // The sticky lock is normally released by mouseleave. If the locked button
      // is removed while hovered (menu open/close), that never fires and the
      // cursor stays frozen. A pointer well away from the lock releases it.
      let locked = position;
      if (
        locked &&
        Math.hypot(event.clientX - locked.x, event.clientY - locked.y) >
          (locked.r || 90)
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
      big={cursorStyle.big}
    />
  );
};

export default React.memo(Cursor);
