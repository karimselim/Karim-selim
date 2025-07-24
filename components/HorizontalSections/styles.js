import styled from 'styled-components';

// Hero Header Styles
export const HeroHeader = styled.header`
  height: 100vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const HeroH1 = styled.h1`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: clamp(5rem, 9.9vw, 15rem);
  color: #e6e6e6;
`;

export const HeroH2 = styled.h2`
  letter-spacing: clamp(0.6rem, 0.75vw, 1.3rem);
  font-size: clamp(0.6rem, 0.75vw, 1.3rem);
  text-transform: uppercase;
  color: #0aa1ff;
`;

// Scroll Section Styles
export const ScrollSectionOuter = styled.div`
  overflow: hidden;
`;

export const ScrollSectionInner = styled.div`
  height: 100vh;
  width: 300vw;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const ScrollSection = styled.div`
  height: 100vh;
  width: 100vw;
  // display: flex;
  // justify-content: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ExpContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80%;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding-inline: 1rem;
  }
`;

export const ExpH2 = styled.h2`
  text-align: center;
  margin-top: 6rem;
  font-size: 4rem;
  text-transform: uppercase;
`;

export const ExpText = styled.div`
  position: relative;
  flex: 3;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const ExpDetails = styled.p`
  font-family: system-ui;
  margin-block: 0.5rem;
`;

export const ExpP = styled.div`
  position: relative;
  font-size: 1rem;
  line-height: 1.7;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ScrollH3 = styled.h3`
  color: ${({ theme }) => theme.colors.text}; // use theme color here
  letter-spacing: 3px;
  font-size: 2.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Footer Styles
export const Footer = styled.footer`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterSpan = styled.span`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: clamp(5rem, 9.9vw, 15rem);
  color: #e6e6e6;
`;
