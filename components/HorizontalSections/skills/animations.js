import { gsap } from 'gsap';

const stopTitleMotion = title => {
  if (title._tl) title._tl.kill();
  if (title._call) title._call.kill();
  title._tl = null;
  title._call = null;
};
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

  // cards are 128x192; keep the four groups on screen on smaller desktops
  const offset = Math.min(265, h / 2 - 140);
  const extendedOffset = Math.min(540, w / 2 - 100);
  const stepSize = 75;

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
    stopTitleMotion(titleRef.current);
    titleRef.current.querySelectorAll('span').forEach(c => {
      c.textContent = c.dataset.char || c.textContent;
    });
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

// "Skills" decodes out of a buggy, scrambled state: red noise glyphs lock into the
// real letters one by one with a green "pass" flash. After that it glitches
// (RGB split) on a random letter every few seconds, like a flaky test that passes.
export const animateShowTitle = titleRef => {
  const title = titleRef.current;
  if (!title) return;
  let chars = title.querySelectorAll('span');
  if (chars.length === 0) {
    title.innerHTML = title.textContent
      .split('')
      .map(char => `<span data-char="${char}">${char}</span>`)
      .join('');
    chars = title.querySelectorAll('span');
  }
  stopTitleMotion(title);

  const list = Array.from(chars);
  const n = list.length;
  const baseColor = getComputedStyle(title).color;
  const glyphs = '!<>-_/[]{}=+*^?#01';

  gsap.set(title, { opacity: 1 });
  gsap.set(list, {
    opacity: 0,
    y: 0,
    yPercent: 0,
    rotateX: 0,
    scale: 1,
    filter: 'none',
    textShadow: 'none',
    x: 0,
    color: '#ff4d3d',
  });
  // fixed widths so changing glyphs do not shift the layout
  list.forEach(c => {
    c.textContent = c.dataset.char;
    c.style.minWidth = `${c.offsetWidth}px`;
    c.style.textAlign = 'center';
  });

  const state = { p: 0 };
  const locked = new Array(n).fill(false);
  const tl = gsap.timeline();
  title._tl = tl;
  tl.to(list, { opacity: 0.9, duration: 0.3, stagger: 0.05 }, 0).to(
    state,
    {
      p: 1,
      duration: 2,
      ease: 'none',
      onUpdate: () => {
        const tick = Math.floor(state.p * 40);
        list.forEach((c, i) => {
          if (locked[i]) return;
          const lockAt = 0.2 + (i / Math.max(n - 1, 1)) * 0.65;
          if (state.p >= lockAt) {
            locked[i] = true;
            c.textContent = c.dataset.char;
            gsap.fromTo(
              c,
              { color: '#35e08a', scale: 1.3, opacity: 1 },
              {
                color: baseColor,
                scale: 1,
                duration: 0.6,
                ease: 'power3.out',
                // clear the colour too, so the letters follow the theme (light/dark)
                clearProps: 'scale,color',
              }
            );
          } else if (c._tick !== tick) {
            c._tick = tick;
            c.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        });
      },
    },
    0.2
  );

  const glitchOnce = () => {
    if (!document.body.contains(title)) return;
    const picks = [list[Math.floor(Math.random() * n)]];
    if (Math.random() > 0.5) picks.push(list[Math.floor(Math.random() * n)]);
    gsap
      .timeline()
      .to(picks, {
        x: () => gsap.utils.random(-5, 5),
        textShadow: '3px 0 #ff2e2e, -3px 0 #2ee6ff',
        duration: 0.05,
        repeat: 5,
        yoyo: true,
      })
      .set(picks, { x: 0, textShadow: 'none' });
    title._call = gsap.delayedCall(3 + Math.random() * 2, glitchOnce);
  };
  title._call = gsap.delayedCall(3.2, glitchOnce);
};
