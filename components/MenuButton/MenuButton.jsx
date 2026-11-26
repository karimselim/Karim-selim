import React from 'react';
import { useMenuContext } from '../../context/menu';
import useCursorStyle from '../../hooks/useCursorStyle';
import StickyCursor from '../StickyCursor';
import { Button } from './styles';

const MenuButton = ({ sticky = true, title = '', ...props }, ref) => {
  const [{ isMenuOpen }, dispatch] = useMenuContext();
  const { addCursorBorder, removeCursorBorder, lockCursorPosition } = useCursorStyle();
  const btnRef = React.useRef(null);
  const pointer = React.useRef(null);

  React.useEffect(() => {
    const onMove = e => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  // When the menu opens or closes the button can move or hide under a still
  // pointer, so no mouseleave fires and the cursor stays stuck on the icon.
  // Re-check a few times while the layout settles: if the pointer is not really
  // on the button any more, release the lock and the ring right away.
  const firstRun = React.useRef(true);
  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return undefined;
    }
    const check = () => {
      const p = pointer.current;
      const btn = btnRef.current;
      const el = p && document.elementFromPoint(p.x, p.y);
      if (!btn || !el || !btn.contains(el)) {
        lockCursorPosition(null);
        removeCursorBorder();
      }
    };
    const timers = [50, 250, 600, 1200].map(t => setTimeout(check, t));
    return () => timers.forEach(clearTimeout);
  }, [isMenuOpen, lockCursorPosition, removeCursorBorder]);

  const handleOnToggle = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, [dispatch]);

  return (
    <StickyCursor sticky={sticky}>
      <Button
        onMouseEnter={addCursorBorder}
        onMouseLeave={removeCursorBorder}
        onClick={handleOnToggle}
        aria-label={title || 'Menu'}
        ref={node => {
          btnRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        {...props}
      >
        <span>{title}</span>
      </Button>
    </StickyCursor>
  );
};

export default React.memo(React.forwardRef(MenuButton));
