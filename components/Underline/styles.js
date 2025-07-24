import styled from 'styled-components';

export const LineContainer = styled.div`
  width: 85%;
  height: 100px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HoverBox = styled.div`
  position: absolute;
  top: 0;
  height: 100px;
  width: 100%;
  z-index: 2;
`;

export const StyledPath = styled.path`
  fill: none;
  stroke: ${({ themeMode }) => (themeMode === 'dark' ? '#f2f2f2' : '#111111')};
  stroke-width: 3;
  transition: stroke 0.3s ease;
  z-index: 1;
`;
