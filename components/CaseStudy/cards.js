import styled from 'styled-components';

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.5rem;
  margin-top: 1.2rem;
`;

export const Card = styled.article`
  display: grid;
  align-content: start;
  gap: 1rem;
  padding: 1.6rem;
  border: 1px solid rgba(128, 128, 128, 0.4);
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
