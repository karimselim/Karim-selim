import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TextReveal = () => {
  const lines = [
    'Humans feel before they think.',
    'So I’m designing emotions in motion.',
    'That’s why your brand doesn’t just show — it shines.',
  ];

  const sectionRef = useRef(null);
  const linesRef = useRef(null);
  const paragraphRef = useRef(null);
  const clipRect = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      const ctx = gsap.context(() => {
        const words = linesRef.current.querySelectorAll('.word');
        gsap.set(words, { yPercent: 100, opacity: 0, skewY: 10 });

        const pWords = paragraphRef.current.querySelectorAll('.pWord');
        gsap.set(pWords, { y: 20, opacity: 0 });

        gsap.set(clipRect.current, { width: 0 });

        const tl = gsap.timeline({
          scrollTrigger: !isMobile
            ? {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play reset play reset',
              }
            : undefined,
        });

        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.05,
        })
          .to(
            pWords,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.04,
            },
            '+=0.2'
          )
          .to(
            clipRect.current,
            {
              width: '100%',
              duration: 4,
              ease: 'power2.out',
            },
            isMobile ? 0 : '+=0.4'
          );

        if (isMobile) {
          gsap.to(clipRect.current, {
            width: '100%',
            duration: 4,
            ease: 'power2.out',
            delay: 0.5,
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    init();
  }, []);

  const aboutText = `I turn caffeine and complex briefs into interactive stories users can’t stop scrolling. Think of me as the front‑end wizard who fights with CSS so you don’t have to. When I’m not animating pixels, I’m busy optimising them — because smooth beats choppy every time.`;

  return (
    <section ref={sectionRef} className="reveal">
      <div className="lines" ref={linesRef}>
        {lines.map(ln => (
          <h2 key={ln} className="line">
            {ln.split(' ').map((w, wi) => (
              <span key={wi} className="wordWrap">
                <span className="word">{w} </span>
              </span>
            ))}
          </h2>
        ))}
      </div>

      <p ref={paragraphRef} className="aboutP">
        {aboutText.split(' ').map((w, i) => (
          <span key={i} className="pWord">
            {w} 
          </span>
        ))}
      </p>

      <div className="signature">
        <svg
          viewBox="0 0 700 120"
          className="sigSVG"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="sigMask">
              <rect ref={clipRect} x="0" y="0" width="0" height="120" />
            </clipPath>
          </defs>
          <text x="20" y="80" className="sigText" clipPath="url(#sigMask)">
            Karim Selim
          </text>
        </svg>
      </div>

      <style jsx>{`
        :root {
          --bg-color: #ffffff;
          --text-color: #0d0d0d;
        }
        [data-theme='dark'] {
          --bg-color: #0d0d0d;
          --text-color: #ffffff;
        }

        .reveal {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--bg-color);
          color: var(--text-color);
          overflow: hidden;
          padding: 0 1.5rem;
          text-align: center;
          position: relative;
          margin-bottom: 7rem;
        }
        .line {
          margin: 0;
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 700;
          line-height: 1.15;
          overflow: hidden;
        }
        .wordWrap {
          display: inline-block;
          overflow: hidden;
        }
        .word {
          display: inline-block;
          transform-origin: top left;
        }
        .aboutP {
          max-width: 760px;
          margin-top: 2.5rem;
          font-size: clamp(1.2rem, 2.8vw, 1.6rem);
          line-height: 1.9;
        }
        .pWord {
          display: inline-block;
        }
        .signature {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: clamp(220px, 40vw, 440px);
          color: var(--text-color);
        }
        .sigSVG {
          width: 100%;
          height: auto;
        }
        .sigText {
          font-family: 'Rouge Script', cursive;
          font-size: 95px;
          fill: currentColor;
        }
      `}</style>
    </section>
  );
};

export default TextReveal;
