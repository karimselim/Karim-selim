import React, { useRef, useEffect } from 'react';
import {
  ScrollSectionOuter,
  ScrollSectionInner,
  ScrollSection,
  ScrollH3,
} from './styles';
import WorkExperiene from './WorkExperiene';
import SkillsShowcase from './skills/SkillsShowCase';
import { animateDesktop, animateMobile } from './skills/animations';
import { skillCards, categoryNames } from './skills/SkillCards';
import BeforeYouGo from './BeforeYouGo';

function Experience() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const cardRefsRef = useRef([]);
  const stackRefRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, ScrollTriggerModule]) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.default;
          gsap.registerPlugin(ScrollTrigger);
          // Phone URL bar show/hide must not refresh the triggers mid-scroll (jump).
          ScrollTrigger.config({ ignoreMobileResize: true });

          const tl = gsap.timeline({
            id: 'horizontal-scroll', // ID for containerAnimation
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top top',
              end: '+=3000',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(sectionRef.current, { x: '0vw', duration: 1, ease: 'none' })
            .to(sectionRef.current, { x: '-100vw', duration: 1, ease: 'none' })
            .to(sectionRef.current, { x: '-200vw', duration: 1, ease: 'none' });
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
            <SkillsShowcase
              cardRefsRef={cardRefsRef}
              stackRefRef={stackRefRef}
            />
          </ScrollSection>
          <ScrollSection>
            <BeforeYouGo />
          </ScrollSection>
        </ScrollSectionInner>
      </div>
    </ScrollSectionOuter>
  );
}

export default Experience;
