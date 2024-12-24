import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    // Ensure the code only runs on the client side
    if (typeof window !== 'undefined') {
      // Dynamically import GSAP and ScrollTrigger
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, ScrollTriggerModule]) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.default;

          // Register the plugin
          gsap.registerPlugin(ScrollTrigger);

          // Set up the animation
          const pin = gsap.fromTo(
            sectionRef.current,
            { translateX: 0 },
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

          // Cleanup on component unmount
          return () => {
            pin.kill();
          };
        }
      );
    }
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
            <ScrollH3>Section 3 updated</ScrollH3>
          </ScrollSection>
        </ScrollSectionInner>
      </div>
    </ScrollSectionOuter>
  );
}

export default Experience;
