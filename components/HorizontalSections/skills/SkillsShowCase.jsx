import React, { useRef, useEffect, useState } from 'react';
import { Container, CardsStack } from './styles';
import TarotCard from './TarotCard';
import { skillCards, categoryNames } from './SkillCards';
import { animateDesktop, animateMobile } from './animations';
import gsap from 'gsap';
import styled from 'styled-components';

// Styled component for the centered h2 with individual character spans
const SkillsTitle = styled.h2`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: #ffffff;
  opacity: 0; /* Ensure it's hidden initially */
  z-index: 10; /* Low z-index to prevent overlap */
  pointer-events: none; /* Prevent interaction with h2 */
  display: flex;
  gap: 6px;

  span {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px) scale(0.7) rotate(8deg);
    filter: blur(3px);
    text-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
`;

const SkillsShowcase = ({ cardRefsRef, stackRefRef }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const titleRef = useRef(null);

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
              // Hide the Skills title characters when a card is clicked
              if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll('span');
                gsap.to(chars, {
                  opacity: 0,
                  y: 40,
                  scale: 0.7,
                  rotate: 8,
                  filter: 'blur(3px)',
                  textShadow: '0 0 0 rgba(255, 255, 255, 0)',
                  duration: 0.4,
                  ease: 'power2.out',
                  stagger: 0.03,
                });
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

  useEffect(() => {
    if (isClient && titleRef.current) {
      // Split the text into characters and wrap each in a span
      const text = titleRef.current.textContent;
      titleRef.current.innerHTML = text
        .split('')
        .map(char => `<span>${char}</span>`)
        .join('');

      const showTitle = () => {
        console.log('showTitle triggered');
        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll('span');
          gsap.to(titleRef.current, { opacity: 1, duration: 0 }); // Ensure parent is visible
          gsap.fromTo(
            chars,
            {
              opacity: 0,
              y: 40,
              scale: 0.7,
              rotate: 8,
              filter: 'blur(3px)',
              textShadow: '0 0 0 rgba(255, 255, 255, 0)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: 'blur(0px)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
              duration: 1.2,
              ease: 'power4.inOut',
              stagger: 0.1,
              delay: 0.3,
            }
          );
        }
      };

      if (isDesktop) {
        animateDesktop(
          cardRefsRef,
          stackRefRef,
          skillCards,
          categoryNames,
          isClient,
          showTitle
        );
      } else {
        animateMobile(cardRefsRef, showTitle);
      }
    }
  }, [isClient, isDesktop, cardRefsRef, stackRefRef]);

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
      <SkillsTitle ref={titleRef}>Skills</SkillsTitle>
    </Container>
  );
};

export default SkillsShowcase;
