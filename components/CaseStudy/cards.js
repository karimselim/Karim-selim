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
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #d4af37;
  border: 1px solid #d4af37;
  padding: 0.2rem 0.6rem;
`;
