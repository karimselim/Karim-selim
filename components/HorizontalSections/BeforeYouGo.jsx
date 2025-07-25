'use client';
import { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { ExpH2, ScrollH3 } from './styles';
import { gsap } from 'gsap';

const BeforeYouGo = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const textRef = useRef(null);
  const testimonialRefs = useRef([]);
  const particlesRef = useRef([]);

  useLayoutEffect(() => {
    let frameId;
    const particleCount = 150;

    const initSky = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx2d = canvas.getContext('2d');
      if (!ctx2d) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesRef.current = Array.from({ length: particleCount }, () => {
        const brightness = Math.random() * 0.8 + 0.2;
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.15 + 0.05,
          opacity: brightness,
          originalOpacity: brightness,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          vx: 0,
          vy: 0,
          angle: 0,
          orbitRadius: 0,
          pulse: 0,
        };
      });

      const animateStars = () => {
        if (!ctx2d) return;
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach(star => {
          star.opacity =
            star.originalOpacity *
            (0.7 + 0.3 * Math.sin(Date.now() * star.twinkleSpeed + star.pulse));

          ctx2d.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
          ctx2d.beginPath();
          ctx2d.arc(
            star.x,
            star.y,
            star.size * (1 + star.pulse * 0.5),
            0,
            Math.PI * 2
          );
          ctx2d.fill();

          star.y += star.speed + star.vy;
          star.x += star.vx;
          star.pulse *= 0.9;

          if (star.orbitRadius > 0) {
            star.angle += 0.05;
            star.vx += Math.cos(star.angle) * star.orbitRadius * 0.1;
            star.vy += Math.sin(star.angle) * star.orbitRadius * 0.1;
            star.orbitRadius *= 0.95;
          }

          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
            star.vx = 0;
            star.vy = 0;
            star.orbitRadius = 0;
            star.pulse = 0;
          }
        });

        frameId = requestAnimationFrame(animateStars);
      };

      animateStars();
    };

    const handleMouseMove = e => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particlesRef.current.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          star.orbitRadius = force * 30;
          star.angle = Math.atan2(dy, dx);
          star.pulse = force * 0.7;
          star.vx = -force * (dx / distance) * 2;
          star.vy = -force * (dy / distance) * 2;
        } else {
          star.vx *= 0.85;
          star.vy *= 0.85;
          star.orbitRadius *= 0.85;
          star.pulse *= 0.85;
        }
      });
    };

    initSky();

    window.addEventListener('mousemove', handleMouseMove);
    const onResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initSky();
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', onResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  useLayoutEffect(() => {
    const animateText = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const setupAnimations = () => {
        const horizontalScroll = gsap.getById('horizontal-scroll');
        if (!horizontalScroll) {
          console.warn('horizontal-scroll timeline not found, retrying...');
          requestAnimationFrame(setupAnimations);
          return;
        }

        const headings =
          headingRef.current?.querySelectorAll('.word-inner') || [];
        const subheadings =
          subheadingRef.current?.querySelectorAll('.word-inner') || [];
        const text = textRef.current?.querySelectorAll('.word-inner') || [];
        const quotes = testimonialRefs.current
          .filter(t => t)
          .flatMap(t =>
            Array.from(t.querySelectorAll('.reveal-quote .word-inner'))
          );

        console.log('Animating elements:', {
          headings: headings.length,
          subheadings: subheadings.length,
          text: text.length,
          quotes: quotes.length,
        });

        if (quotes.length === 0) {
          console.warn('No quote elements found. Checking DOM...');
          testimonialRefs.current.forEach((t, i) => {
            console.log(
              `Testimonial ${i} HTML:`,
              t?.querySelector('.reveal-quote')?.outerHTML || 'null'
            );
          });
        }

        const elements = [...headings, ...subheadings, ...text, ...quotes];
        if (elements.length === 0) {
          console.error('No elements to animate.');
          return;
        }

        gsap.set(elements, {
          yPercent: 100,
          opacity: 0,
          skewY: 10,
        });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              containerAnimation: horizontalScroll,
              start: 'left 200vw',
              toggleActions: 'play none none none',
              onEnter: () =>
                console.log('Animations started for BeforeYouGo section'),
              onEnterBack: () =>
                console.log('Animations started back for BeforeYouGo section'),
            },
          })
          .to(
            [...headings, ...subheadings],
            {
              yPercent: 0,
              opacity: 1,
              skewY: 0,
              duration: 2,
              ease: 'power4.out',
              stagger: 0.06,
            },
            0
          )
          .to(
            text,
            {
              yPercent: 0,
              opacity: 1,
              skewY: 0,
              duration: 2,
              ease: 'power4.out',
              stagger: 0.06,
            },
            0.3
          )
          .to(
            quotes,
            {
              yPercent: 0,
              opacity: 1,
              skewY: 0,
              duration: 1.8,
              ease: 'power2.out',
              stagger: 0.05,
            },
            0.6
          );
      };

      requestAnimationFrame(setupAnimations);
    };

    animateText().catch(error => {
      console.error('Animation error:', error);
      const elements = document.querySelectorAll(
        '.reveal-heading .word-inner, .reveal-text .word-inner, .reveal-quote .word-inner'
      );
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }, []);

  const textContent = `This portfolio is a snapshot of where I am — not where I'll stop. It captures the energy I've built, the mindset I bring, and the standards I hold myself to. I'm always learning, always refining, and always focused on delivering impactful, performant front-end experiences. If that resonates with you, I'd love to connect.`;

  const testimonials = [
    {
      quote:
        'Kareem is a joy to collaborate with. His openness to feedback and ability to quickly turn advice into action reflect his sharp intellect. His engineering expertise is steadily growing, making him a valuable asset to any team!',
      author: 'Wes Stearns, Founder of Landidly',
    },
    {
      quote:
        'Karim is a dependable and detail-driven frontend developer with a strong sense of design and user experience. He takes initiative, delivers high-quality work, and has been a valuable asset to our team.',
      author: 'Sarath C.S, Senior Architect at Cisco Systems (17 years)',
    },
  ];

  return (
    <Section ref={sectionRef} className="theme">
      <StarCanvas ref={canvasRef} />
      <ContentContainer>
        <BeforeH2
          className="reveal-heading"
          data-testid="before-h2"
          ref={headingRef}
        >
          {['Before', 'You', 'Go...'].map((word, i) => (
            <WordWrap key={i}>
              <WordInner className="word-inner">{word}</WordInner>
              <Space> </Space>
            </WordWrap>
          ))}
        </BeforeH2>
        <Text className="reveal-text" data-testid="before-text" ref={textRef}>
          {textContent.split(' ').map((word, i) => (
            <WordWrap key={i}>
              <WordInner className="word-inner">{word}</WordInner>
              <Space> </Space>
            </WordWrap>
          ))}
        </Text>
        <BeforeH3
          className="reveal-heading"
          data-testid="before-h3"
          ref={subheadingRef}
        >
          {['Words', 'From', 'Trusted', 'Voices'].map((word, i) => (
            <WordWrap key={i}>
              <WordInner className="word-inner">{word}</WordInner>
              <Space> </Space>
            </WordWrap>
          ))}
        </BeforeH3>
        <Testimonials className="Testimonials">
          {testimonials.map((t, i) => (
            <Testimonial key={i} ref={el => (testimonialRefs.current[i] = el)}>
              <Quote className="reveal-quote">
                {t.quote.split(' ').map((word, j) => (
                  <WordWrap key={j}>
                    <WordInner className="word-inner">{word}</WordInner>
                    <Space> </Space>
                  </WordWrap>
                ))}
              </Quote>
              <Author>{t.author}</Author>
            </Testimonial>
          ))}
        </Testimonials>
      </ContentContainer>
    </Section>
  );
};

// Styled Components
const StarCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 5rem 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem 1rem;
    justify-content: start;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
`;

const Text = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  max-width: 900px;
  margin: 0 auto 2rem;
  font-weight: 300;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Testimonials = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  max-width: 1000px;
  margin: 0 auto 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const Testimonial = styled.div`
  //   padding: 2rem;
  max-width: 450px;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.2;
  display: inline-block;

  &::before,
  &::after {
    content: '"';
    font-size: 1.2rem;
  }
`;

const Author = styled.cite`
  display: block;
  text-align: right;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1.4;
  font-style: normal;
  display: inline-block;
`;

const BeforeH2 = styled(ExpH2)`
  margin-bottom: 1.5rem;
  margin-top: 1rem !important;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BeforeH3 = styled(ScrollH3)`
  margin-block: 1.5rem;
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const WordWrap = styled.span`
  display: inline-block;
  overflow: hidden;
`;

const WordInner = styled.span`
  display: inline-block;
`;

const Space = styled.span`
  display: inline-block;
  width: 0.25em;
`;

export default BeforeYouGo;
