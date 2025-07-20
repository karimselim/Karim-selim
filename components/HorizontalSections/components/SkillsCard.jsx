import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #111;
  overflow: hidden;
`;

const CategorySection = styled.div`
  position: absolute;
  z-index: 2;
`;

const CategoryTitle = styled.h3`
  color: #fff;
  font-size: clamp(1rem, 4vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  white-space: nowrap;
`;

const CardsStack = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 180px;
  z-index: 1;
  opacity: 0;
`;

const CardContainer = styled.div`
  width: 120px;
  height: 180px;
  perspective: 800px;
  position: absolute;
  top: 0;
  left: 0;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  color: #333;
  transform: rotateY(180deg); /* Front face hidden by default */
`;

const CardBack = styled(CardFace)`
  background: url('/imgs/cardBack.png') center/cover no-repeat;
  transform: rotateY(0deg); /* Back face visible by default */
  background-color: #ccc; /* Fallback if image fails */
`;

const CardIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
`;

const CardTitle = styled.h4`
  font-size: 0.9rem;
  margin: 0;
`;

const TarotCard = React.forwardRef(
  ({ iconSrc, title, isSelected, zIndex, onClick }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      if (!isSelected) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isSelected) {
        setIsHovered(false);
      }
    };

    return (
      <CardContainer
        ref={ref}
        style={{ zIndex }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardInner
          className="card-inner"
          style={{
            transform:
              isSelected || isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <CardFace>
            {' '}
            {/* Front face, shown after flip */}
            <CardIcon src={iconSrc} alt={title} />
            <CardTitle>{title}</CardTitle>
          </CardFace>
          <CardBack /> {/* Back face, shown by default */}
        </CardInner>
      </CardContainer>
    );
  }
);

// Skills
const skillCards = [
  // Core
  { title: 'JavaScript', iconSrc: '/icons/javascript.svg', category: 'Core' },
  { title: 'TypeScript', iconSrc: '/icons/typescript.svg', category: 'Core' },
  { title: 'HTML5', iconSrc: '/icons/html5.svg', category: 'Core' },
  { title: 'CSS3', iconSrc: '/icons/css3.svg', category: 'Core' },

  // Frameworks
  { title: 'React', iconSrc: '/icons/react.svg', category: 'Frameworks' },
  { title: 'Next.js', iconSrc: '/icons/nextjs.svg', category: 'Frameworks' },
  {
    title: 'Tailwind CSS',
    iconSrc: '/icons/tailwind.svg',
    category: 'Frameworks',
  },
  {
    title: 'React Hook Form',
    iconSrc: '/icons/react-hook-form.svg',
    category: 'Frameworks',
  },
  { title: 'Zod', iconSrc: '/icons/zod.svg', category: 'Frameworks' },
  { title: 'Redux', iconSrc: '/icons/redux.svg', category: 'Frameworks' },

  // Mobile
  {
    title: 'React Native',
    iconSrc: '/icons/react-native.svg',
    category: 'Mobile',
  },
  { title: 'Cordova', iconSrc: '/icons/cordova.svg', category: 'Mobile' },
  { title: 'Expo', iconSrc: '/icons/expo.svg', category: 'Mobile' },
  { title: 'Firebase', iconSrc: '/icons/expo.svg', category: 'Mobile' },

  // Tools
  { title: 'Git', iconSrc: '/icons/git.svg', category: 'Tools' },
  { title: 'Jest', iconSrc: '/icons/jest.svg', category: 'Tools' },
  {
    title: 'Unit Testing',
    iconSrc: '/icons/unit-testing.svg',
    category: 'Tools',
  },
  { title: 'CI/CD', iconSrc: '/icons/cicd.svg', category: 'Tools' },
  { title: 'GSAP', iconSrc: '/icons/gsap.svg', category: 'Tools' },
  { title: 'Yup', iconSrc: '/icons/yup.svg', category: 'Tools' },
];

const categoryNames = ['Core', 'Mobile', 'Tools', 'Frameworks'];

export default function App() {
  const titleRefs = useRef({});
  const cardRefs = useRef([]);
  const stackRef = useRef(null);
  const [selectedCards, setSelectedCards] = useState([]);

  const addCardRef = (el, i) => {
    cardRefs.current[i] = el;
  };

  const animateToCenter = (index, stackOrder) => {
    const card = cardRefs.current[index];
    if (!card) return;

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
  };

  const handleCardClick = index => {
    setSelectedCards(prev => {
      const alreadySelected = prev.includes(index);
      const newList = alreadySelected
        ? [...prev.filter(i => i !== index), index]
        : [...prev, index];

      animateToCenter(index, newList.length - 1);
      return newList;
    });
  };

  useEffect(() => {
    const { innerWidth: w, innerHeight: h } = window;

    const offset = 200;
    const extendedOffset = 450;
    const stepSize = 70;

    const tl = gsap.timeline();

    const titlePositions = {
      Core: { x: w / 2, y: h * 0.1 },
      Mobile: { x: w / 2, y: h - h * 0.1 },
      Tools: { x: w * 0.1, y: h / 2 },
      Frameworks: { x: w - w * 0.1, y: h / 2 },
    };

    categoryNames.forEach(name => {
      const el = titleRefs.current[name];
      if (!el) return;

      const { x, y } = titlePositions[name];
      gsap.set(el, { xPercent: -50, yPercent: -50 });
      tl.fromTo(
        el,
        { x: w / 2, y: h / 2, opacity: 0 },
        { x, y, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.2'
      );
    });

    tl.to(stackRef.current, { opacity: 1, duration: 0.6 }, '-=0.6');

    skillCards.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (card) {
        gsap.set(card, {
          opacity: 0,
          scale: 0.2,
          rotation: gsap.utils.random(-90, 90),
          x: gsap.utils.random(-200, 200),
          y: gsap.utils.random(-200, 200),
          filter: 'blur(10px)',
        });
      }
    });

    tl.to(
      cardRefs.current,
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.05,
      },
      '-=1.0'
    );

    // Scatter after entrance
    const cardsByCategory = skillCards.reduce((acc, card, index) => {
      acc[card.category] = acc[card.category] || [];
      acc[card.category].push({ card, ref: cardRefs.current[index] });
      return acc;
    }, {});

    Object.entries(cardsByCategory).forEach(([category, cards]) => {
      const isHorizontal = ['Core', 'Mobile'].includes(category);
      const numCards = cards.length;

      let baseX = 0,
        baseY = 0;
      if (category === 'Core') baseY = -offset;
      if (category === 'Mobile') baseY = offset;
      if (category === 'Tools') baseX = -extendedOffset;
      if (category === 'Frameworks') baseX = extendedOffset;

      cards.forEach((item, i) => {
        let x = isHorizontal ? (i - (numCards - 1) / 2) * stepSize : baseX;
        let y = isHorizontal ? baseY : (i - (numCards - 1) / 2) * stepSize;
        x += w / 2 - w / 2;
        y += h / 2 - h / 2;

        tl.to(
          item.ref,
          {
            x,
            y,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        );
      });
    });
  }, []);

  return (
    <Container>
      {categoryNames.map(name => (
        <CategorySection key={name} ref={el => (titleRefs.current[name] = el)}>
          <CategoryTitle>{name}</CategoryTitle>
        </CategorySection>
      ))}

      <CardsStack ref={stackRef}>
        {skillCards.map((skill, i) => (
          <TarotCard
            key={skill.title}
            iconSrc={skill.iconSrc}
            title={skill.title}
            isSelected={selectedCards.includes(i)}
            zIndex={
              selectedCards.includes(i) ? 1000 + selectedCards.indexOf(i) : i
            }
            onClick={() => handleCardClick(i)}
            ref={el => addCardRef(el, i)}
          />
        ))}
      </CardsStack>
    </Container>
  );
}
