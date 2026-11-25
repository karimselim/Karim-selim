import React, { useRef, useEffect } from 'react';
import {
  ScrollH3,
  ScrollSection,
  ExpText,
  ExpP,
  ExpDetails,
  ExpContainer,
  ExpH2,
} from './styles';
import HoverMorphEffect from './components/HoverMorphEffect';
import UnderLine from '../Underline/Underline';
import OverlayExperience from './components/OverlayExperience';

const WorkExperiene = () => {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
        ([gsapModule, ScrollTriggerModule]) => {
          const gsap = gsapModule.default;
          const ScrollTrigger = ScrollTriggerModule.default;
          gsap.registerPlugin(ScrollTrigger);

          const ctx = gsap.context(() => {
            gsap.fromTo(
              overlayRef.current,
              { xPercent: -100 },
              {
                xPercent: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  end: '+=100%',
                  scrub: true,
                  pin: false,
                },
              }
            );
          }, sectionRef);

          return () => ctx.revert();
        }
      );
    }
  }, []);

  return (
    <ScrollSection
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minWidth: '100vw',
        height: '100vh',
        paddingInline: '3%',
      }}
    >
      <ExpH2 data-text="Experience">Experience</ExpH2>
      <ExpContainer>
        <ExpText>
          <ScrollH3>99Bridges - QA Automation Engineer</ScrollH3>
          <ExpDetails>October 2025 – October 2026</ExpDetails>
          <UnderLine />
          <ExpP>
            At 99Bridges, I worked as a QA automation engineer. I designed and
            ran test plans and managed the full testware cycle for backend APIs
            and web frontends using Playwright, with Jira as the test management
            system. I found and documented 300+ bugs with clear severity, repro
            steps, and expected-vs-actual results, which helped reduce
            production incidents by 85%. I also built and maintained React
            Native features, which sharpened my root-cause analysis, and worked
            with cross-functional teams to add automated test runs to release
            pipelines.
          </ExpP>
        </ExpText>
        <HoverMorphEffect
          image1={'/imgs/qa-fail.jpg'}
          image2={'/imgs/qa-pass.jpg'}
          displacementImage={'/imgs/colorful-displacemnt.png'}
          intensity={0.7}
          width={400}
          height={300}
        />
      </ExpContainer>
      <OverlayExperience triggerRef={sectionRef} />
    </ScrollSection>
  );
};

export default WorkExperiene;
