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

  // When the menu opens or closes the button can move, hide or swap (hamburger
  // to X and back) under a still pointer, so no mouseenter/mouseleave fires and
  // the cursor gets stuck with the wrong look. Re-check a few times while the
  // layout settles and make the cursor match what is really under the pointer:
  // the big ring and the magnetic lock while it is on the button, normal again
  // as soon as it is not.
  React.useEffect(() => {
    const check = () => {
      const p = pointer.current;
      const btn = btnRef.current;
      const el = p && document.elementFromPoint(p.x, p.y);
      if (btn && el && btn.contains(el)) {
        const r = btn.getBoundingClientRect();
        lockCursorPosition({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        addCursorBorder();
      } else if (!(el && el.closest && el.closest('[data-menu-button]'))) {
        // Pointer is on the other menu button (hamburger/X swap): that
        // instance's own check sets the look, so leave the cursor alone here.
        lockCursorPosition(null);
        removeCursorBorder();
      }
    };
    const timers = [50, 250, 600, 1200].map(t => setTimeout(check, t));
    return () => timers.forEach(clearTimeout);
  }, [isMenuOpen, lockCursorPosition, addCursorBorder, removeCursorBorder]);

  const handleOnToggle = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_MENU' });
  }, [dispatch]);

  return (
    <StickyCursor sticky={sticky}>
      <Button
        data-menu-button
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
