import { gsap } from 'gsap';

export const animateDesktop = (
  cardRefs,
  stackRef,
  skillCards,
  categoryNames,
  isClient,
  onComplete
) => {
  if (!isClient) return;

  console.log('animateDesktop running', { cardRefs: cardRefs.current.length });

  const { innerWidth: w, innerHeight: h } = window;

  const offset = 220;
  const extendedOffset = 500;
  const stepSize = 70;

  const tl = gsap.timeline({
    delay: 0.5,
    onComplete: () => {
      console.log('Desktop animations complete');
      if (onComplete) onComplete();
    },
  });

  tl.to(stackRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');

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
        pointerEvents: 'none',
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
      stagger: 0.1,
    },
    '-=0.3'
  );

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
          duration: 0.475,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    });
  });

  tl.to(cardRefs.current, {
    pointerEvents: 'auto',
    duration: 0,
  });
};

export const animateMobile = (cardRefs, onComplete) => {
  let completedAnimations = 0;
  const totalCards = cardRefs.current.length;

  cardRefs.current.forEach((card, index) => {
    if (card) {
      const row = Math.floor(index / 4) + 1;
      const col = (index % 4) + 1;
      const angle = index * 0.4;
      const radius = 150 + index * 10;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 1,
          x: startX,
          y: startY,
          rotation: index * 15,
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          gridRow: row,
          gridColumn: col,
          pointerEvents: 'auto',
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.2,
          onComplete: () => {
            console.log(`Card ${index} placed at row ${row}, col ${col}`);
            completedAnimations++;
            if (completedAnimations === totalCards && onComplete) {
              console.log('Mobile animations complete');
              onComplete();
            }
          },
        }
      );
    }
  });
};

export const animateCardFlip = (
  card,
  cardInner,
  index,
  stackOrder,
  titleRef
) => {
  console.log('Animating card flip for index:', index);
  gsap.to(card, {
    x: 0,
    y: 0,
    zIndex: 1000 + stackOrder,
    duration: 0.5,
    ease: 'power2.out',
    onStart: () => {
      console.log('Animation start for card at index:', index);
      card.style.zIndex = 1000 + stackOrder;
      if (cardInner) {
        cardInner.style.transform = 'rotateY(180deg)';
      }
    },
    onUpdate: () => console.log('Animation update for index:', index),
    onComplete: () => console.log('Animation completed for index:', index),
  });
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
};

export const animateShowTitle = titleRef => {
  console.log('Title animation triggered');
  if (titleRef.current) {
    const chars = titleRef.current.querySelectorAll('span');
    if (chars.length === 0) {
      titleRef.current.innerHTML = titleRef.current.textContent
        .split('')
        .map(char => `<span>${char}</span>`)
        .join('');
    }
    gsap.to(titleRef.current, { opacity: 1, duration: 0 });
    gsap.fromTo(
      titleRef.current.querySelectorAll('span'),
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
      }
    );
  }
};
