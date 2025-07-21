import { gsap } from 'gsap';

export const animateDesktop = (
  cardRefs,
  stackRef,
  skillCards,
  categoryNames,
  isClient
) => {
  if (!isClient) return; // Skip animation during SSR

  console.log('animateDesktop running', { cardRefs: cardRefs.current.length });

  const { innerWidth: w, innerHeight: h } = window;

  const offset = 200;
  const extendedOffset = 450;
  const stepSize = 70;

  const tl = gsap.timeline({ delay: 0.5 }); // 0.5s initial delay

  // Show card stack
  tl.to(stackRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');

  // Initialize cards in stack
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

  // Animate cards to stack
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

  // Scatter cards to category positions
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
};

export const animateMobile = cardRefs => {
  cardRefs.current.forEach((card, index) => {
    if (card) {
      const row = Math.floor(index / 4) + 1; // Rows 1-5
      const col = (index % 4) + 1; // Columns 1-4
      const angle = index * 0.4;
      const radius = 150 + index * 10;
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.2,
          x: startX,
          y: startY,
          rotation: index * 15,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotation: 0,
          gridRow: row,
          gridColumn: col,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.2,
          onComplete: () =>
            console.log(`Card ${index} placed at row ${row}, col ${col}`),
        }
      );
    }
  });
};
