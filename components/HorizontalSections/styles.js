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
/** */
export const StarCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

export const Section = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 5rem 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 1rem;
    justify-content: start;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
`;

export const Text = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  max-width: 900px;
  margin: 0 auto 2rem;
  font-weight: 300;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Testimonials = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Testimonial = styled.div`
  //   padding: 2rem;
  max-width: 450px;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Quote = styled.blockquote`
  font-style: italic;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.2;
  display: inline-block;

  &::before,
  &::after {
    content: '"';
    font-size: 1.2rem;
  }
`;

export const Author = styled.cite`
  display: block;
  text-align: right;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1.4;
  font-style: normal;
  display: inline-block;
`;

export const BeforeH2 = styled(ExpH2)`
  margin-bottom: 1.5rem;
  margin-top: 1rem !important;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const BeforeH3 = styled(ScrollH3)`
  margin-block: 1.5rem;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const WordWrap = styled.span`
  display: inline-block;
  overflow: hidden;
`;

export const WordInner = styled.span`
  display: inline-block;
`;

export const Space = styled.span`
  display: inline-block;
  width: 0.25em;
`;
