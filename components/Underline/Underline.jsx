import React, { useEffect, useRef, useState } from 'react';
import { LineContainer, HoverBox } from './styles';

const UnderLine = () => {
  const pathRef = useRef(null);
  const svgRef = useRef(null);
  const [svgWidth, setSvgWidth] = useState(1920);

  // Bounce variables
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSvgWidth(window.innerWidth);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateDraw();
        } else {
          resetLine();
        }
      },
      { threshold: 0.5 }
    );

    if (svgRef.current) observer.observe(svgRef.current);
    return () => svgRef.current && observer.unobserve(svgRef.current);
  }, []);

  const generatePath = (progressValue = 0) => {
    const width = svgWidth;
    const height = 100;
    const controlX = width * x;
    const controlY = height / 2 + progressValue;
    return `M0 ${height / 2} Q${controlX} ${controlY}, ${width} ${height / 2}`;
  };

  const animateDraw = () => {
    const path = pathRef.current;
    const length = path.getTotalLength();

    path.setAttribute('d', generatePath(0)); // default curve
    path.style.transition = 'none';
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.getBoundingClientRect(); // force repaint

    path.style.transition = 'stroke-dashoffset 1.2s ease-out';
    path.style.strokeDashoffset = '0';
  };

  const resetLine = () => {
    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.transition = 'stroke-dashoffset 0.5s ease-in';
    path.style.strokeDashoffset = length;
    resetBounce();
  };

  // --- Bounce Interactions ---
  const setPath = progressValue => {
    if (pathRef.current) {
      pathRef.current.setAttribute('d', generatePath(progressValue));
    }
  };

  const lerp = (a, b, t) => a * (1 - t) + b * t;

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    time += 0.2;
    setPath(newProgress);
    progress = lerp(progress, 0, 0.025);

    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetBounce();
    }
  };

  const resetBounce = () => {
    time = Math.PI / 2;
    progress = 0;
    cancelAnimationFrame(reqId);
  };

  const handleMouseEnter = () => {
    cancelAnimationFrame(reqId);
  };

  const handleMouseMove = e => {
    const { movementY, clientX } = e;
    const { left, width } = pathRef.current.getBoundingClientRect();
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
      <svg
        ref={svgRef}
        width="100%"
        height="100px"
        viewBox={`0 0 ${svgWidth} 100`}
        preserveAspectRatio="none"
      >
        <path ref={pathRef} className="path1" />
      </svg>
    </LineContainer>
  );
};

export default UnderLine;
