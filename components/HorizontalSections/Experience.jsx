import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  ScrollSectionOuter,
  ScrollSectionInner,
  ScrollSection,
  ScrollH3,
} from './styles';
import { Skills } from './';

function Experience() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: '-200vw',
        ease: 'none',
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '2000 top',
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      {
      }
      pin.kill();
    };
  }, []);

  return (
    <ScrollSectionOuter>
      <div ref={triggerRef}>
        <ScrollSectionInner ref={sectionRef}>
          <Skills />
          <ScrollSection>
            <ScrollH3>Section 2</ScrollH3>
          </ScrollSection>
          <ScrollSection>
            <ScrollH3>Section 3</ScrollH3>
          </ScrollSection>
        </ScrollSectionInner>
      </div>
    </ScrollSectionOuter>
  );
}

export default Experience;
