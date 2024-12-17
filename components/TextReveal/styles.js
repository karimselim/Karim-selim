import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: 'Ogg';
  text-transform: uppercase;
  font-size: 120px;
  color: ${({ theme }) => theme.textColor};
  font-weight: lighter;
  font-style: italic;
  width: 100%;
  height: 35vh;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
`;

export const Text = styled.div`
  font-size: 200px;
  font-family: 'Ogg';
  width: 70%;

  /* Adjust for smaller screens */
  @media (max-width: 1200px) {
    font-size: 150px; /* Reduce font size for large tablets or smaller desktops */
  }

  @media (max-width: 992px) {
    font-size: 120px; /* Medium tablets or small desktops */
  }

  @media (max-width: 768px) {
    font-size: 80px; /* Tablets or larger phones */
  }

  @media (max-width: 576px) {
    font-size: 60px; /* Small phones */
    width: 100%;
    margin-inline: 5%;
  }

  @media (max-width: 360px) {
    font-size: 40px; /* Very small phones */
    width: 100%;
    margin-inline: 5%;
  }
`;

export const P = styled.p`
  background: ${({ theme }) =>
    `linear-gradient(to right, ${theme.gradientStart} 50%, ${theme.gradientEnd} 50%)`};
  background-size: 200% 100%;
  background-position-x: 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  white-space: normal; /* Allow line breaks */
  word-wrap: break-word; /* Break words when necessary */
  overflow-wrap: break-word;

  & span {
    display: inline-block;
  }
`;

export const Space = styled.div`
  height: 29vh;
`;

export const SmallSpace = styled.div`
  height: 7.5vh;
`;
