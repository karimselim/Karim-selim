import React, { useRef, useEffect } from 'react';
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
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
  transition: transform 0.6s ease-in-out;

  ${CardContainer}:hover & {
    transform: rotateY(360deg);
  }
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
`;

const CardBack = styled(CardFace)`
  background: url('/imgs/cardBack.png') center/cover no-repeat;
  transform: rotateY(180deg);
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

const TarotCard = React.forwardRef(({ iconSrc, title, index }, ref) => (
  <CardContainer ref={ref} style={{ zIndex: index }}>
    <CardInner>
      <CardFace>
        <CardIcon src={iconSrc} alt={title} />
        <CardTitle>{title}</CardTitle>
      </CardFace>
      <CardBack />
    </CardInner>
  </CardContainer>
));

// Config
const skillCards = [
  { title: 'React', iconSrc: '/icons/react.svg', category: 'Frameworks' },
  { title: 'JavaScript', iconSrc: '/icons/javascript.svg', category: 'Core' },
  { title: 'CSS3', iconSrc: '/icons/css3.svg', category: 'Core' },
  { title: 'GSAP', iconSrc: '/icons/gsap.svg', category: 'Tools' },
  { title: 'Git', iconSrc: '/icons/git.svg', category: 'Tools' },
  { title: 'Expo', iconSrc: '/icons/expo.svg', category: 'Mobile' },
];

const categoryNames = ['Core', 'Mobile', 'Tools', 'Frameworks'];

export default function App() {
  const titleRefs = useRef({});
  const cardRefs = useRef([]);
  const stackRef = useRef(null);
  cardRefs.current = [];

  const addCardRef = el => {
    if (el) cardRefs.current.push(el);
  };

  useEffect(() => {
    const { innerWidth: w, innerHeight: h } = window;

    const titlePositions = {
      Core: { x: w / 2, y: h * 0.1 },
      Mobile: { x: w / 2, y: h - h * 0.1 },
      Tools: { x: w * 0.1, y: h / 2 },
      Frameworks: { x: w - w * 0.1, y: h / 2 },
    };

    const tl = gsap.timeline();

    // Animate each title with longer duration
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

    // Fade in stack earlier
    tl.to(stackRef.current, { opacity: 1, duration: 0.6 }, '-=0.6');

    // Initial card states
    skillCards.forEach((card, index) => {
      gsap.set(cardRefs.current[index], {
        opacity: 0,
        scale: 0.2,
        rotation: gsap.utils.random(-90, 90),
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-200, 200),
        filter: 'blur(10px)',
        transformOrigin: 'center center',
      });
    });

    // ✨ Entrance animation
    tl.to(
      cardRefs.current,
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 2.2,
        ease: 'power4.out',
        stagger: {
          each: 0.08,
          from: 'random',
          ease: 'power2.inOut',
        },
        onUpdate: function () {
          cardRefs.current.forEach((card, i) => {
            const progress = this.targets()[i]._gsap;
            const glowIntensity =
              Math.sin(progress.progress * Math.PI * 2) * 15;
            const opacityGlow = progress.progress * 0.7;
            gsap.set(card, {
              boxShadow: `0 0 ${glowIntensity}px rgba(255, 255, 255, ${opacityGlow})`,
              scale: 1 + Math.sin(progress.progress * Math.PI) * 0.1,
            });
          });
        },
      },
      '-=1.4'
    );

    // Bounce pop
    tl.to(
      cardRefs.current,
      {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.4)',
        stagger: 0.08,
      },
      '-=0.4'
    );

    // Final category flyout with positions closer to center
    skillCards.forEach((card, index) => {
      let x = 0;
      let y = 0;

      switch (card.category) {
        case 'Frameworks':
          x = w / 2 - w * 0.2; // Closer to center (10% instead of 15%)
          break;
        case 'Tools':
          x = -(w / 2 - w * 0.2); // Closer to center
          break;
        case 'Core':
          y = -(h / 2 - h * 0.25); // Closer to center
          break;
        case 'Mobile':
          y = h / 2 - h * 0.25; // Closer to center
          break;
        default:
          break;
      }

      tl.to(
        cardRefs.current[index],
        {
          x,
          y,
          duration: 0.9,
          ease: 'power2.out',
        },
        '+=0.03'
      );
    });
  }, []);

  return (
    <Container>
      {/* Titles */}
      {categoryNames.map(name => (
        <CategorySection key={name} ref={el => (titleRefs.current[name] = el)}>
          <CategoryTitle>{name}</CategoryTitle>
        </CategorySection>
      ))}

      {/* Cards stack */}
      <CardsStack ref={stackRef}>
        {skillCards.map((skill, i) => (
          <TarotCard
            key={skill.title}
            iconSrc={skill.iconSrc}
            title={skill.title}
            index={i}
            ref={addCardRef}
          />
        ))}
      </CardsStack>
    </Container>
  );
}
