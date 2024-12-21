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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScrollH3 = styled.h3`
  color: #e6e6e6;
  letter-spacing: clamp(1rem, 2vw, 4rem);
  font-size: clamp(1rem, 2vw, 4rem);
  text-transform: uppercase;
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
