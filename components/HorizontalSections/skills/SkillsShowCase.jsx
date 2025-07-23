import React, { useRef, useEffect, useState } from 'react';
import { Container, CardsStack } from './styles';
import TarotCard from './TarotCard';
import { skillCards, categoryNames } from './SkillCards';
import gsap from 'gsap';

const SkillsShowcase = ({ cardRefsRef, stackRefRef }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const addCardRef = (el, i) => {
    cardRefsRef.current[i] = el;
  };

  const handleCardClick = (index, stackOrder) => {
    setSelectedCards(prev => {
      const alreadySelected = prev.includes(index);
      const newList = alreadySelected
        ? [...prev.filter(i => i !== index), index]
        : [...prev, index];
      if (isDesktop && !alreadySelected) {
        const card = cardRefsRef.current[index];
        if (card) {
          // const gsap = require('gsap');
          gsap.to(card, {
            x: 0,
            y: 0,
            zIndex: 1000 + stackOrder,
            duration: 0.5,
            ease: 'power2.out',
            onStart: () => {
              card.style.zIndex = 1000 + stackOrder;
              const cardInner = card.querySelector('.card-inner');
              if (cardInner) {
                cardInner.style.transform = 'rotateY(180deg)';
              }
            },
          });
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    setIsClient(true);
    setIsDesktop(window.innerWidth > 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <CardsStack ref={stackRefRef}>
        {skillCards.map((skill, i) => (
          <TarotCard
            key={skill.title}
            iconSrc={skill.iconSrc}
            title={skill.title}
            description={skill.description}
            subtitle={skill.subtitle}
            isSelected={selectedCards.includes(i)}
            zIndex={
              selectedCards.includes(i) ? 1000 + selectedCards.indexOf(i) : i
            }
            onClick={() => handleCardClick(i, selectedCards.length)}
            ref={el => addCardRef(el, i)}
          />
        ))}
      </CardsStack>
    </Container>
  );
};

export default SkillsShowcase;
