import styled, { css, keyframes } from 'styled-components';

const flicker = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  30% { transform: scale(1.12, 0.94); opacity: 0.92; }
  55% { transform: scale(0.94, 1.1); opacity: 1; }
  80% { transform: scale(1.06); opacity: 0.88; }
`;

// A small ember: the candle that lights the site. The ring (over the hero while
// erasing, and over menu links) is unchanged, only its default colour is gold.
export const StyledCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 100%;
  background: radial-gradient(
    circle,
    #fff1c2 0,
    #ffb347 28%,
    #ff6a1a 55%,
    rgba(160, 20, 8, 0) 74%
  );
  box-shadow: 0 0 18px 5px rgba(255, 110, 30, 0.45);
  transform: translate3d(-100%, -100%, 0);
  transition: all 0.1s ease-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 100%;
    animation: ${flicker} 1.4s ease-in-out infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  ${({ bordered, color, theme }) => {
    return (
      bordered &&
      css`
        width: 64px;
        height: 64px;
        margin: -32px 0 0 -32px;
        background: none;
        box-shadow: none;
        border: 5px solid ${color || theme.text};
      `
    );
  }};

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;
