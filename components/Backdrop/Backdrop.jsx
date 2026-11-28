import React from 'react';
import BackgroundOverlay from './styles';

const transition = {
  duration: 0.9,
  ease: [0.4, 0, 0.2, 1],
};

const variants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: 0,
  },
};

const Backdrop = props => {
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      bodyOverflow: body.style.overflowY,
      htmlOverflow: html.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      htmlOverscroll: html.style.overscrollBehavior,
    };
    body.style.overflowY = 'hidden';
    html.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    html.style.overscrollBehavior = 'none';

    // iOS Safari ignores overflow:hidden on the body, so block page scroll gestures too.
    const canScroll = el => {
      while (el && el !== document.body) {
        if (el.scrollHeight > el.clientHeight) {
          const oy = window.getComputedStyle(el).overflowY;
          if (oy === 'auto' || oy === 'scroll') return true;
        }
        el = el.parentElement;
      }
      return false;
    };
    const block = e => {
      if (!canScroll(e.target)) e.preventDefault();
    };
    document.addEventListener('touchmove', block, { passive: false });
    document.addEventListener('wheel', block, { passive: false });

    return () => {
      document.removeEventListener('touchmove', block);
      document.removeEventListener('wheel', block);
      body.style.overflowY = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      html.style.overscrollBehavior = prev.htmlOverscroll;
    };
  }, []);

  return (
    <BackgroundOverlay
      variants={variants}
      transition={transition}
      initial="initial"
      animate="animate"
      exit="initial"
      {...props}
    />
  );
};

export default Backdrop;
