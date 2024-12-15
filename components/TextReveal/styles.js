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
`;

export const Text = styled.div`
  font-size: 200px;
  font-family: 'Ogg';
`;

export const P = styled.p`
  background: ${({ theme }) =>
    `linear-gradient(to right, ${theme.gradientStart} 50%, ${theme.gradientEnd} 50%)`};
  background-size: 200% 100%;
  background-position-x: 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  margin-left: 50px;
  white-space: normal; /* Allow line breaks */
  word-wrap: break-word; /* Break words when necessary */
  overflow-wrap: break-word;

  & span {
    display: inline-block;
  }
`;

export const Space = styled.div`
  height: 15vh;
`;

export const SmallSpace = styled.div`
  height: 7.5vh;
`;
