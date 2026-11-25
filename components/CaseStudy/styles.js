import styled from 'styled-components';

export const Page = styled.main`
  min-height: 100vh;
  max-width: 980px;
  margin: 0 auto;
  padding: 9rem 1.5rem 6rem;
`;

export const Back = styled.a`
  display: inline-block;
  font-size: 1rem;
  opacity: 0.7;
  margin-bottom: 2.5rem;
  text-decoration: underline;
  text-underline-offset: 4px;

  &:hover {
    opacity: 1;
  }
`;

export const Kind = styled.p`
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d4af37;
  margin-bottom: 0.8rem;
`;

export const Title = styled.h1`
  font-size: clamp(2.6rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 1.2rem;
`;

export const Summary = styled.p`
  font-size: 1.35rem;
  line-height: 1.5;
  opacity: 0.8;
  max-width: 40rem;
`;

export const Block = styled.section`
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1.5rem 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid currentColor;
  border-top-color: rgba(128, 128, 128, 0.35);

  &:first-of-type {
    margin-top: 3.5rem;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const BlockTitle = styled.h2`
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d4af37;
`;

export const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const List = styled.ul`
  display: grid;
  gap: 0.8rem;

  li {
    font-size: 1.15rem;
    line-height: 1.55;
    padding-left: 1.2rem;
    position: relative;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7em;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d4af37;
  }
`;

export const Chips = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;

  li {
    font-size: 1rem;
    padding: 0.35rem 0.9rem;
    border: 1px solid rgba(128, 128, 128, 0.6);
    border-radius: 999px;
  }
`;

export const Stats = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Stat = styled.li`
  strong {
    display: block;
    font-size: 3rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  span {
    font-size: 1rem;
    opacity: 0.75;
    line-height: 1.4;
  }
`;

export const Links = styled.ul`
  display: grid;
  gap: 0.7rem;

  a {
    font-size: 1.15rem;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
