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

  const { innerWidth: w, innerHeight: h } = window;

  const offset = 220;
  const extendedOffset = 500;
  const stepSize = 70;

  const tl = gsap.timeline({
    delay: 0.5,
    onComplete: () => {
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
            completedAnimations++;
            if (completedAnimations === totalCards && onComplete) {
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
  gsap.to(card, {
    x: 0,
    y: 0,
    zIndex: 1000 + stackOrder,
    duration: 0.5,
    ease: 'power2.out',
    onStart: () => {
      card.style.zIndex = 1000 + stackOrder;
      if (cardInner) {
        cardInner.style.transform = 'rotateY(180deg)';
      }
    },
  });
  if (titleRef.current) {
    if (titleRef.current._floatTween) titleRef.current._floatTween.kill();
    const chars = titleRef.current.querySelectorAll('span');
    gsap.to(chars, {
      yPercent: 0,
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
  const title = titleRef.current;
  if (!title) return;
  let chars = title.querySelectorAll('span');
  if (chars.length === 0) {
    title.innerHTML = title.textContent
      .split('')
      .map(char => `<span>${char}</span>`)
      .join('');
    chars = title.querySelectorAll('span');
  }
  if (title._floatTween) title._floatTween.kill();
  gsap.set(title, { opacity: 1 });

  const tl = gsap.timeline();
  tl.fromTo(
    chars,
    { opacity: 0, y: 60, rotateX: -80, scale: 0.9, filter: 'blur(6px)' },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.08,
    }
  )
    // soft glow sweeps across the letters once they land
    .to(
      chars,
      {
        textShadow: '0 0 24px currentColor',
        duration: 0.35,
        ease: 'power2.out',
        stagger: { each: 0.08, yoyo: true, repeat: 1 },
      },
      '-=0.2'
    );

  // gentle idle float (uses yPercent so the flip-away animation on y still works)
  title._floatTween = gsap.to(chars, {
    yPercent: -8,
    duration: 1.6,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.12,
    delay: 1.6,
  });
};
