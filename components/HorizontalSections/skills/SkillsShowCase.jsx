import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Container, CardsStack } from './styles';
import TarotCard from './TarotCard';
import { skillCards, categoryNames } from './SkillCards';
import { animateDesktop, animateMobile } from './animations';

const SkillsShowcase = () => {
  const cardRefs = useRef([]);
  const stackRef = useRef(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const addCardRef = (el, i) => {
    cardRefs.current[i] = el;
  };

  const handleCardClick = (index, stackOrder) => {
    setSelectedCards(prev => {
      const alreadySelected = prev.includes(index);
      const newList = alreadySelected
        ? [...prev.filter(i => i !== index), index]
        : [...prev, index];
      if (isDesktop && !alreadySelected) {
        // Desktop: Animate selected card to center
        const card = cardRefs.current[index];
        if (card) {
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
    // Set isClient and isDesktop on client-side
    setIsClient(true);
    setIsDesktop(window.innerWidth > 768);

    // Run appropriate animation based on viewport
    if (window.innerWidth > 768) {
      console.log('Triggering desktop animation');
      animateDesktop(cardRefs, stackRef, skillCards, categoryNames, true);
    } else {
      console.log('Triggering mobile animation');
      animateMobile(cardRefs);
    }

    // Handle window resize to update isDesktop
    const handleResize = () => {
      const newIsDesktop = window.innerWidth > 768;
      setIsDesktop(newIsDesktop);
      // Re-run animations on resize if layout changes
      if (newIsDesktop) {
        animateDesktop(cardRefs, stackRef, skillCards, categoryNames, true);
      } else {
        animateMobile(cardRefs);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <CardsStack ref={stackRef}>
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
