// components/Underline/UnderLine.jsx
import React, { useEffect, useRef } from 'react';
import { LineContainer, HoverBox } from './styles';

const UnderLine = () => {
  const path = useRef(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPath(progress);
  }, []);

  const setPath = progress => {
    const width = window.innerWidth * 1;
    if (path.current) {
      path.current.setAttributeNS(
        '',
        'd',
        `M0 50 Q${width * x} ${50 + progress}, ${width} 50`
      );
    }
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  const handleMouseEnter = () => {
    if (reqId) cancelAnimationFrame(reqId);
  };

  const handleMouseMove = e => {
    const { movementY, clientX } = e;
    const { left, width } = path.current.getBoundingClientRect();
    x = (clientX - left) / width;
    progress += movementY;
    setPath(progress);
  };

  const handleMouseLeave = () => {
    animateOut();
  };

  return (
    <LineContainer>
      <HoverBox
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      <svg>
        <path ref={path} className="path1" />
      </svg>
    </LineContainer>
  );
};

export default UnderLine;
