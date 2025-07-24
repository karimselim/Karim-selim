import styled from 'styled-components';

export const HoverMorphContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  object-fit: cover;
  flex: 2;

  @media (max-width: 762px) {
    display: none;
  }
`;
