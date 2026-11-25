import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-12px) rotate(-1deg); }
`;
const twinkle = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
`;

const Wrap = styled.div`
  position: absolute;
  z-index: 1;
  left: 5vw;
  top: 50%;
  width: min(15vw, 200px);
  margin-top: -14vw;
  animation: ${float} 8s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.9;
  & .tw {
    animation: ${twinkle} 3s ease-in-out infinite;
  }
  & .tw:nth-of-type(2n) {
    animation-delay: 1.1s;
  }
  @media (max-width: 1000px) {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    & .tw {
      animation: none;
    }
  }
`;

const star = (cx, cy, r) => {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = (Math.PI / 4) * i - Math.PI / 2;
    const rad = i % 2 ? r * 0.38 : r;
    pts.push(`${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`);
  }
  return pts.join(' ');
};

// Tarot XVII, The Star: one big star, seven small ones, a pitcher of water.
const StarCard = () => (
  <Wrap aria-hidden="true">
    <svg viewBox="0 0 200 300" width="100%">
      <rect width="200" height="300" rx="10" fill="#0b1020" />
      <rect x="8" y="8" width="184" height="284" rx="6" fill="none" stroke="#d4af37" strokeWidth="2" />
      <rect x="15" y="15" width="170" height="270" rx="4" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity=".7" />
      <text x="100" y="40" textAnchor="middle" fill="#d4af37" fontFamily="serif" fontSize="17" letterSpacing="4">XVII</text>
      <polygon className="tw" points={star(100, 120, 38)} fill="#d4af37" />
      {[[52, 78], [148, 78], [46, 150], [154, 150], [70, 52], [130, 52]].map(([x, y], i) => (
        <polygon key={i} className="tw" points={star(x, y, 9)} fill="#e9dcc0" />
      ))}
      <path d="M40 232 Q70 212 100 232 T160 232" fill="none" stroke="#7fd1c2" strokeWidth="2" />
      <path d="M40 246 Q70 226 100 246 T160 246" fill="none" stroke="#7fd1c2" strokeWidth="1.4" opacity=".7" />
      <text x="100" y="274" textAnchor="middle" fill="#d4af37" fontFamily="serif" fontSize="14" letterSpacing="5">THE STAR</text>
    </svg>
  </Wrap>
);

export default StarCard;
