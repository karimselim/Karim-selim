import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    justify-items: center;
    align-items: center;
  }
`;

export const CardsStack = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 180px;
  z-index: 1;
  opacity: 0;

  @media (max-width: 768px) {
    position: static;
    transform: none;
    width: 100%;
    height: 100%;
    opacity: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    justify-items: center;
    align-items: center;
    padding-top: 40px;
  }
`;

export const CardContainer = styled.div`
  width: 120px;
  height: 180px;
  perspective: 800px;
  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    width: calc((100vw - 16px) / 4); /* 4 columns, 4px gaps, 4px padding */
    height: calc((100vh - 32px) / 5); /* 5 rows, 8px gaps, 4px padding */
    max-width: 120px;
    max-height: 140px;
    position: relative;
    transform: none;
  }
`;

export const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  position: relative;
`;

export const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  transform: rotateY(180deg);
  background-image: url('/imgs/test.png');
  background-size: cover;
  background-position: bottom;

  @media (max-width: 768px) {
    border-radius: 2px;
    background: transparent;
  }
`;

export const CardBack = styled(CardFace)`
  background: url('/imgs/cardBack.png') center/cover no-repeat;
  transform: rotateY(0deg);
  background-color: #ccc; /* Fallback if image fails */

  @media (max-width: 768px) {
    background: url('/imgs/cardBack.png') center/contain no-repeat;
    background-size: contain;
    background-position: center;
    background-color: transparent;
  }
`;

export const CardIcon = styled.img`
  height: 27px;
  margin-bottom: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 50%;
    height: 50%;
    max-width: 56px;
    max-height: 56px;
    margin-bottom: 4px;
  }
`;

export const CardTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    text-align: center;
  }
`;

export const SubTitle = styled.h5`
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.8px;
  margin: 4px 0;
  padding: 2px 6px;

  @media (max-width: 768px) {
    font-size: 0.6rem;
    padding: 1px 4px;
  }
`;

export const Description = styled.p`
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.3;
  padding: 0 8px;
  margin: 4px 0;

  @media (max-width: 768px) {
    font-size: 0.55rem;
    padding: 0 4px;
  }
`;
