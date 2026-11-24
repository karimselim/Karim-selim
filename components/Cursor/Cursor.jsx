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
    let raf = null;
    const onScroll = () => {
      if (raf === null) {
        raf = requestAnimationFrame(() => {
          raf = null;
          sync();
        });
      }
    };
    window.addEventListener('scroll', onScroll, {
      passive: true,
      capture: true,
    });
    const interval = setInterval(sync, 150);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      clearInterval(interval);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [dispatch]);

  React.useEffect(() => {
    const onMouseMove = event => {
      lastPoint.current = { x: event.clientX, y: event.clientY };
      const x = position ? position.x : event.clientX;
      const y = position ? position.y : event.clientY;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [position]);

  return (
    <StyledCursor
      ref={cursorRef}
      color={cursorStyle.color}
      bordered={cursorStyle.bordered}
    />
  );
};

export default React.memo(Cursor);
