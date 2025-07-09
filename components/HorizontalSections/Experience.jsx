// Experience.jsx
import React, { useRef, useEffect } from 'react';
import {
  ScrollSectionOuter,
  ScrollSectionInner,
  ScrollSection,
  ScrollH3,
} from './styles';
import WorkExperiene from './WorkExperiene';

function Experience() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, ScrollTriggerModule]) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.default;
          gsap.registerPlugin(ScrollTrigger);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: '+=3000', // enough scroll space
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Section 1: no scroll movement
          tl.to(sectionRef.current, { x: '0vw', duration: 1 });

          // Section 2: move after section 1 is done
          tl.to(sectionRef.current, { x: '-100vw', duration: 1 });

          // Section 3
          tl.to(sectionRef.current, { x: '-200vw', duration: 1 });
        }
      );
    }
  }, []);

  return (
    <ScrollSectionOuter>
      <div ref={triggerRef}>
        <ScrollSectionInner ref={sectionRef} style={{ display: 'flex' }}>
          <WorkExperiene />
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
