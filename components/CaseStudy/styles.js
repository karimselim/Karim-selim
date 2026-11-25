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

export const Title = styled.div`
  h1 {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  font-family: 'Ogg', serif;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 400;
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
  gap: 2rem 3rem;
  padding: 0 0 3rem;

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

export const BugList = styled.ul`
  display: grid;
  gap: 1.1rem;

  li {
    display: grid;
    gap: 0.25rem;
    padding-left: 1.2rem;
    position: relative;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 6px;
    height: 6px;
    background: #ea281e;
  }

  strong {
    font-size: 1.15rem;
    font-weight: 900;
    line-height: 1.4;
  }

  span {
    font-size: 1.05rem;
    line-height: 1.5;
    opacity: 0.75;
  }
`;

export const Chip = styled.em`
  justify-self: start;
  font-style: normal;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border: 1px solid ${({ level }) => (level === 'High' ? '#ea281e' : level === 'Medium' ? '#d4af37' : 'rgba(128,128,128,0.7)')};
  color: ${({ level }) => (level === 'High' ? '#ea281e' : level === 'Medium' ? '#d4af37' : 'inherit')};
  opacity: ${({ level }) => (level === 'Low' ? 0.8 : 1)};
`;

export const BugHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
`;

export const AreaTag = styled.small`
  font-size: 0.8rem;
  opacity: 0.6;
`;

export const Chart = styled.div`
  display: grid;
  gap: 0.7rem;
  margin-bottom: 2.2rem;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr 2.5rem;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;

  @media (max-width: 700px) {
    grid-template-columns: 7rem 1fr 2rem;
  }
`;

export const Track = styled.div`
  height: 10px;
  background: rgba(128, 128, 128, 0.2);
`;

export const Fill = styled.div`
  height: 100%;
  background: ${({ tone }) => (tone === 'before' ? '#ea281e' : '#d4af37')};
`;

export const Compare = styled.div`
  display: grid;
  gap: 1.8rem;
  margin-bottom: 2rem;
`;

export const CompareRow = styled.div`
  display: grid;
  gap: 0.5rem;

  h3 {
    font-size: 1.05rem;
    font-weight: 900;
  }

  > div {
    display: grid;
    grid-template-columns: 5rem 1fr 5.5rem;
    align-items: center;
    gap: 1rem;
    font-size: 0.95rem;
  }

  span:first-child {
    opacity: 0.6;
  }

  span:last-child {
    text-align: right;
  }
`;
