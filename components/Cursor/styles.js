import styled, { css } from 'styled-components';

export const StyledCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  margin: -12px 0 0 -12px;
  border: 12px solid ${({ theme }) => theme.text};
  border-radius: 100%;
  transform: translate3d(-100%, -100%, 0);
  transition: all 0.1s ease-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};

  ${({ color }) => {
    // overrides default theme color
    return (
      color &&
      css`
        border: 12px solid ${color};
      `
    );
  }};

  ${({ bordered, color, theme }) => {
    // create a bordered style when hovering elements
    return (
      bordered &&
      css`
        width: 54px;
        height: 54px;
        margin: -27px 0 0 -27px;
        border-width: 3px;
        border-color: ${color || theme.text};

        /* same colour dot in the middle: the ring is the disc opened up */
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          margin: -4px 0 0 -4px;
          border-radius: 100%;
          background: ${color || theme.text};
        }
      `
    );
  }};

  /* hero scratch phase: ring stays on at the standard hover-ring size.
     Big only ever refines the ring; on its own it must not style anything
     (a big-without-ring state would render as a thick-bordered disc). */
  ${({ big, bordered }) =>
    big &&
    bordered &&
    css`
      width: 54px;
      height: 54px;
      margin: -27px 0 0 -27px;
    `};

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;
