import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Same easing as the rest of the site (AnimateOnScreen / menu).
export const ease = [0, 0.7, 0.29, 0.97];

// Fades and lifts its children once, when they scroll into view.
export const Reveal = ({ children, delay = 0, as = 'div', ...rest }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Title: every word slides up out of a mask, one after the other.
export const WordReveal = ({ text, delay = 0.2, ...rest }) => (
  <h1 aria-label={text} {...rest}>
    {text.split(' ').map((word, i) => (
      <span
        key={`${word}-${i}`}
        aria-hidden="true"
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'top',
          paddingBottom: '0.12em',
          marginRight: '0.28em',
        }}
      >
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease, delay: delay + i * 0.12 }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </h1>
);

// A gold line that draws itself left to right, then bounces like a string
// when the cursor moves across it (same feel as the Experience lines).
const HEIGHT = 40;

export const Rule = () => {
  const [wrapRef, inView] = useInView({ triggerOnce: true });
  const pathRef = React.useRef(null);
  const boxRef = React.useRef(null);
  const [width, setWidth] = React.useState(980);
  const state = React.useRef({ progress: 0, x: 0.5, time: Math.PI / 2, id: 0 });

  const draw = React.useCallback(
    value => {
      const { x } = state.current;
      if (pathRef.current) {
        pathRef.current.setAttribute(
          'd',
          `M0 ${HEIGHT / 2} Q${width * x} ${HEIGHT / 2 + value}, ${width} ${HEIGHT / 2}`
        );
      }
    },
    [width]
  );

  React.useEffect(() => {
    if (boxRef.current) setWidth(boxRef.current.getBoundingClientRect().width);
  }, []);

  React.useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    draw(0);
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    if (inView) {
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0, 0.7, 0.29, 0.97)';
      path.style.strokeDashoffset = '0';
    }
  }, [inView, draw]);

  React.useEffect(() => () => cancelAnimationFrame(state.current.id), []);

  const lerp = (a, b, t) => a * (1 - t) + b * t;

  const animateOut = () => {
    const st = state.current;
    draw(st.progress * Math.sin(st.time));
    st.time += 0.2;
    st.progress = lerp(st.progress, 0, 0.025);
    if (Math.abs(st.progress) > 0.75) {
      st.id = requestAnimationFrame(animateOut);
    } else {
      st.time = Math.PI / 2;
      st.progress = 0;
      draw(0);
    }
  };

  const onMove = e => {
    const st = state.current;
    const { left, width: w } = boxRef.current.getBoundingClientRect();
    st.x = (e.clientX - left) / w;
    st.progress = Math.max(-60, Math.min(60, st.progress + e.movementY));
    draw(st.progress);
  };

  return (
    <div
      ref={wrapRef}
      style={{ gridColumn: '1 / -1', position: 'relative', height: 1 }}
    >
      <div
        ref={boxRef}
        onMouseEnter={() => cancelAnimationFrame(state.current.id)}
        onMouseMove={onMove}
        onMouseLeave={animateOut}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -HEIGHT / 2,
          height: HEIGHT,
          zIndex: 2,
        }}
      >
        <svg
          width="100%"
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          preserveAspectRatio="none"
          style={{ overflow: 'visible', display: 'block' }}
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            fill="none"
            stroke="#d4af37"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

// Counts up to a number when it scrolls into view. Non numeric values stay.
export const Count = ({ value }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const target = Number(value);
  const isNumber = Number.isFinite(target);
  const [shown, setShown] = React.useState(isNumber ? 0 : value);

  React.useEffect(() => {
    if (!inView || !isNumber) return undefined;
    let frame;
    const start = performance.now();
    const duration = 1400;
    const tick = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, isNumber, target]);

  return <strong ref={ref}>{shown}</strong>;
};
