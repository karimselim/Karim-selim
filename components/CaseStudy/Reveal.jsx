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

// A gold rule that draws itself from left to right.
export const Rule = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: inView ? 1 : 0 }}
      transition={{ duration: 1.2, ease }}
      style={{
        height: 1,
        background: '#d4af37',
        transformOrigin: 'left',
        gridColumn: '1 / -1',
      }}
    />
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
