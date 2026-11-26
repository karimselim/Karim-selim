import styled from 'styled-components';

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1.5rem;
  margin-top: 1.2rem;

  /* every card the same height as its row, and the same size in both lists */
  & > * {
    height: 100%;
  }
`;

export const Card = styled.article`
  display: grid;
  align-content: start;
  height: 100%;
  min-height: 24rem;
  box-sizing: border-box;
  gap: 1rem;
  padding: 1.6rem;
  border: 1px solid rgba(128, 128, 128, 0.4);
  transition: transform 0.4s cubic-bezier(0, 0.7, 0.29, 0.97),
    border-color 0.4s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: #d4af37;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
`;

export const CardLine = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  opacity: 0.8;
`;

export const Tag = styled.span`
  justify-self: start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d4af37;
  border: 1px solid #d4af37;
  padding: 0.3rem calc(0.6rem - 0.14em) 0.1rem 0.6rem;
`;
