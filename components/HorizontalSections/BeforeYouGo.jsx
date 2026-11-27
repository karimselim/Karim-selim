'use client';
import { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  Space,
  WordInner,
  WordWrap,
  BeforeH3,
  BeforeH2,
  Author,
  Quote,
  Testimonial,
  Testimonials,
  Text,
  ContactLinks,
  ContentContainer,
  Section,
  StarCanvas,
} from './styles';
import { gsap } from 'gsap';
import { useThemeContext } from '../../context/theme';

const BeforeYouGo = () => {
  const [{ theme: mode }] = useThemeContext();
  const starRgb = mode === 'light' ? '70, 48, 12' : '255, 255, 255';
  const starRgbRef = useRef(starRgb);
  starRgbRef.current = starRgb;
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const textRef = useRef(null);
  const testimonialRefs = useRef([]);
  const authorRefs = useRef([]);
  const particlesRef = useRef([]);

  useLayoutEffect(() => {
    let frameId;
    const particleCount = 150;

    let visible = true;

    const initSky = () => {
      if (frameId) cancelAnimationFrame(frameId);
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

      // Motion is per second, not per frame, so 90/120Hz phones are not faster,
      // and on touch screens the stars drift at half speed.
      const slow = window.matchMedia('(pointer: coarse)').matches ? 0.5 : 1;
      let lastT = performance.now();
      const animateStars = () => {
        if (!ctx2d) return;
        const now = performance.now();
        const k = Math.min((now - lastT) / 16.67, 3) * slow;
        lastT = now;
        if (!visible) {
          frameId = requestAnimationFrame(animateStars);
          return;
        }
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach(star => {
          star.opacity =
            star.originalOpacity *
            (0.7 + 0.3 * Math.sin(Date.now() * star.twinkleSpeed + star.pulse));

          ctx2d.fillStyle = `rgba(${starRgbRef.current}, ${starRgbRef.current[0] === '7' ? Math.min(1, star.opacity + 0.25) : star.opacity})`;
          ctx2d.beginPath();
          ctx2d.arc(
            star.x,
            star.y,
            star.size * (1 + star.pulse * 0.5),
            0,
            Math.PI * 2
          );
          ctx2d.fill();

          star.y += (star.speed + star.vy) * k;
          star.x += star.vx * k;
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

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (canvasRef.current) io.observe(canvasRef.current);

    // touch scrolling can fire synthetic mouse moves that fling the stars
    if (!window.matchMedia('(pointer: coarse)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
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
      io.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  useLayoutEffect(() => {
    const animateText = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      let attempts = 0;
      const setupAnimations = () => {
        const horizontalScroll = gsap.getById('horizontal-scroll');
        if (!horizontalScroll) {
          attempts += 1;
          if (attempts < 120) {
            requestAnimationFrame(setupAnimations);
            return;
          }
          // Timeline never appeared (e.g. mobile): show the text instead of hiding it forever
          document
            .querySelectorAll(
              '.reveal-heading .word-inner, .reveal-text .word-inner, .reveal-quote .word-inner, .reveal-author .word-inner'
            )
            .forEach(el => {
              el.style.opacity = '1';
              el.style.transform = 'none';
            });
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
        const authors = authorRefs.current
          .filter(a => a)
          .flatMap(a => Array.from(a.querySelectorAll('.word-inner')));

        const elements = [
          ...headings,
          ...subheadings,
          ...text,
          ...quotes,
          ...authors,
        ];
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
            [...quotes, ...authors],
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
        '.reveal-heading .word-inner, .reveal-text .word-inner, .reveal-quote .word-inner, .reveal-author .word-inner'
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
      author: 'Weston Stearns, Founder of Landidly',
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
        <ContactLinks data-testid="contact-links">
          <a href="mailto:kareemsleem7@gmail.com">kareemsleem7@gmail.com</a>
          <a
            href="https://github.com/karimselim"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/karim-selim-qa"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </ContactLinks>
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
              <Author
                className="reveal-author"
                ref={el => (authorRefs.current[i] = el)}
              >
                {t.author.split(' ').map((word, j) => (
                  <WordWrap key={j}>
                    <WordInner className="word-inner">{word}</WordInner>
                    <Space> </Space>
                  </WordWrap>
                ))}
              </Author>
            </Testimonial>
          ))}
        </Testimonials>
      </ContentContainer>
    </Section>
  );
};

export default BeforeYouGo;
