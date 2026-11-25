import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useHorror, setHorror } from '../../utils/horror';

const flicker = keyframes`
  0%, 100% { transform: scale(1, 1) rotate(0deg); }
  25% { transform: scale(0.94, 1.06) rotate(-2deg); }
  50% { transform: scale(1.04, 0.95) rotate(1.5deg); }
  75% { transform: scale(0.97, 1.04) rotate(-1deg); }
`;
const smoke = keyframes`
  0% { opacity: 0; transform: translateY(0) scaleX(1); }
  30% { opacity: 0.7; }
  100% { opacity: 0; transform: translateY(-16px) scaleX(1.8); }
`;

const Btn = styled.button`
  position: fixed;
  right: 18px;
  bottom: 16px;
  z-index: 9000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  background: radial-gradient(circle at 30% 20%, rgba(70, 12, 16, 0.9), rgba(12, 2, 4, 0.92));
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.5);
  border-radius: 40px 40px 14px 14px;
  padding: 6px 16px 6px 10px;
  font: 13px/1 calibre, sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: ${({ on }) => (on ? '0 0 22px rgba(255,150,50,0.28)' : 'none')};
  transition: box-shadow 0.6s ease, border-color 0.3s ease;
  &:hover,
  &:focus-visible {
    border-color: #d4af37;
    outline: 2px solid #d4af37;
    outline-offset: 3px;
  }
  .flame {
    transform-origin: 50% 100%;
    animation: ${flicker} 1.3s ease-in-out infinite;
    opacity: ${({ on }) => (on ? 1 : 0)};
    transition: opacity 0.4s ease;
  }
  .smoke {
    opacity: 0;
    ${({ on }) => (on ? '' : `animation: ${smoke} 2.4s ease-out 1;`)}
  }
  @media (prefers-reduced-motion: reduce) {
    .flame,
    .smoke {
      animation: none;
    }
  }
`;

// Music toggle drawn as a candle: lit and flickering = music on, snuffed with smoke = off.
const HorrorToggle = () => {
  const { music } = useHorror();
  return (
    <Btn
      type="button"
      data-horror-ui
      on={music}
      aria-pressed={music}
      aria-label={music ? 'Turn the music off' : 'Turn the music on'}
      onClick={() => {
        import('../../utils/horrorMusic').then(m => (music ? m.stopMusic() : m.startMusic()));
        setHorror({ music: !music });
      }}
    >
      <svg width="22" height="34" viewBox="0 0 22 34" aria-hidden="true">
        <rect x="6" y="15" width="10" height="17" rx="1.5" fill="#e9dcc0" />
        <path d="M6 20 Q8 24 9 19 M13 17 Q15 22 16 18" stroke="#c9b690" fill="none" />
        <line x1="11" y1="15" x2="11" y2="11" stroke="#222" strokeWidth="1.4" />
        <g className="flame">
          <path d="M11 1 Q18 8 11 13 Q4 8 11 1Z" fill="#ff9d2e" />
          <path d="M11 6 Q14.5 9.5 11 12.5 Q7.5 9.5 11 6Z" fill="#fff2b0" />
        </g>
        <path className="smoke" d="M11 10 Q14 6 10 2" stroke="#9a9a9a" strokeWidth="1.3" fill="none" />
      </svg>
      <span>{music ? 'Music' : 'Music'}</span>
    </Btn>
  );
};

export default HorrorToggle;
