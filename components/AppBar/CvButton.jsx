import React from 'react';
import styled, { keyframes } from 'styled-components';
import useCursorStyle from '../../hooks/useCursorStyle';

const glint = keyframes`
  0%, 70% { transform: translateX(-120%) skewX(-20deg); }
  100% { transform: translateX(260%) skewX(-20deg); }
`;

const href = '/Karim_Selim_QA_Resume.pdf';
const file = 'Karim_Selim_QA_Resume.pdf';

/* A small tarot card. Tilts toward the pointer, glints, shows its name on hover. */
const Card = styled.a`
  position: absolute;
  top: 40px;
  right: 138px;
  display: block;
  width: 36px;
  height: 52px;
  perspective: 300px;
  color: #d4af37;
  text-decoration: none;
  ${({ theme }) => theme.breakpoints.tablet`
    top: 18px;
    right: 110px;
  `};
  .face {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 4px 0 4px;
    overflow: hidden;
    border: 1px solid #d4af37;
    border-radius: 3px;
    background: radial-gradient(circle at 50% 38%, #5a0f14, #0b0102 78%);
    transform: rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg));
    transition: transform 0.25s ease-out, box-shadow 0.4s ease;
    will-change: transform;
  }
  .face::before {
    content: '';
    position: absolute;
    inset: 2px;
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 2px;
    pointer-events: none;
  }
  .face::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255, 240, 190, 0.35), transparent);
    animation: ${glint} 6s ease-in-out infinite;
    pointer-events: none;
  }
  .num {
    font: 7px/1 calibre, sans-serif;
    letter-spacing: 0.1em;
  }
  .lbl {
    font: 700 9px/1 calibre, sans-serif;
    letter-spacing: 0.14em;
  }
  .tip {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-top: 8px;
    transform: translate(-50%, -4px);
    white-space: nowrap;
    font: 11px/1 calibre, sans-serif;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.25s ease, transform 0.25s ease;
    pointer-events: none;
  }
  &:hover .face,
  &:focus-visible .face {
    box-shadow: 0 0 18px rgba(212, 175, 55, 0.45);
  }
  &:hover .tip,
  &:focus-visible .tip {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  &:active .face {
    transform: rotateY(180deg) scale(0.92);
    transition-duration: 0.35s;
  }
  &:focus-visible {
    outline: 2px solid #d4af37;
    outline-offset: 4px;
  }
  @media (prefers-reduced-motion: reduce) {
    .face::after { animation: none; }
    .face { transition: none; }
  }
`;

const CardButton = props => {
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  const ref = React.useRef(null);
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--ry', `${x * 36}deg`);
    ref.current.style.setProperty('--rx', `${-y * 28}deg`);
  };
  const leave = () => {
    ref.current.style.setProperty('--ry', '0deg');
    ref.current.style.setProperty('--rx', '0deg');
    removeCursorBorder();
  };
  return (
    <Card
      href={href}
      download={file}
      aria-label="Download CV (PDF)"
      onMouseEnter={addCursorBorder}
      onMouseMove={move}
      onMouseLeave={leave}
      {...props}
    >
      <span className="face" ref={ref}>
        <span className="num">XXI</span>
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6Z" fill="#d4af37" />
        </svg>
        <span className="lbl">CV</span>
      </span>
      <span className="tip">Download CV</span>
    </Card>
  );
};

export default CardButton;
