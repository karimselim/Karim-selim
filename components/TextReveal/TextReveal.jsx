'use client';
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
  const clipRect = useRef(null);
  const textElRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const words = linesRef.current.querySelectorAll('.word');
        gsap.set(words, { yPercent: 100, opacity: 0, skewY: 10 });

        gsap.set(clipRect.current, { width: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reset play reset',
          },
        });

        tl.to(words, {
          yPercent: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.05,
        }).to(
          clipRect.current,
          {
            width: '100%',
            duration: 4,
            ease: 'power2.out',
          },
          '+=0.4'
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    init();
  }, []);

  return (
    <section ref={sectionRef} className="reveal">
      <div className="lines" ref={linesRef}>
        {lines.map(ln => (
          <h2 key={ln} className="line">
            {ln.split(' ').map((w, wi) => (
              <span key={wi} className="wordWrap">
                <span className="word">{w}&nbsp;</span>
              </span>
            ))}
          </h2>
        ))}
      </div>

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
          <text
            ref={textElRef}
            x="20"
            y="80"
            className="sigText"
            clipPath="url(#sigMask)"
          >
            Karim Selim
          </text>
        </svg>
      </div>

      <style jsx>{`
        .reveal {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #0d0d0d;
          color: #fff;
          overflow: hidden;
          padding: 0 1.5rem;
          text-align: center;
          position: relative;
        }

        /* headline */
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

        /* signature */
        .signature {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          width: clamp(220px, 40vw, 440px);
        }
        .sigSVG {
          width: 100%;
          height: auto;
        }
        .sigText {
          font-family: 'Rouge Script', cursive;
          font-size: 95px;
          fill: #fff;
        }
      `}</style>
    </section>
  );
};

export default TextReveal;
