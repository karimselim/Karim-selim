import styled from 'styled-components';

export const LineContainer = styled.div`
  width: 85%;
  position: relative;
  min-height: 100px;
  left: 0;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 1;
    pointer-events: none;
  }

  .path1 {
    stroke-width: 1px;
    stroke: white;
    fill: none;
  }
`;

export const HoverBox = styled.div`
  height: 100px;
  width: 100%;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  &:hover {
    height: 120px;
  }
`;
