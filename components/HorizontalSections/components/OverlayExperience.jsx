// components/WorkExperience/OverlayExperience.jsx
import React, { useRef, useEffect } from 'react';
import { useTheme } from 'styled-components'; // <-- import theme hook
import UnderLine from '../../Underline/Underline';
import HoverMorphEffect from '../components/HoverMorphEffect';
import {
  ExpContainer,
  ExpH2,
  ExpText,
  ScrollH3,
  ExpDetails,
  ExpP,
  ScrollSection,
} from '../styles';

const OverlayExperience = ({ triggerRef }) => {
  const overlayRef = useRef(null);
  const theme = useTheme(); // <-- get current theme

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
                  trigger: triggerRef.current,
                  start: 'top top',
                  end: '+=100%',
                  scrub: true,
                  pin: false,
                },
              }
            );
          }, triggerRef);

          return () => ctx.revert();
        }
      );
    }
  }, [triggerRef]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        backgroundColor: theme.backgroundOverlay || theme.background || 'black', // fallback
        zIndex: 10,
      }}
    >
      <ScrollSection style={{ paddingInline: '3%' }}>
        <ExpH2 data-text="Experience">Experience</ExpH2>
        <ExpContainer>
          <ExpText>
            <ScrollH3>99Bridges - QA Automation Engineer</ScrollH3>
            <ExpDetails>October 2025 – October 2026</ExpDetails>
            <UnderLine />
            <ExpP>
              At 99Bridges, I worked as a QA automation engineer, testing
              software, writing automated tests, and tracking issues in Jira.
            </ExpP>
          </ExpText>
          <HoverMorphEffect
            image1={'/imgs/coloful-closed.jpg'}
            image2={'/imgs/colorful-open.jpg'}
            displacementImage={'/imgs/colorful-displacemnt.png'}
            intensity={0.7}
            width={400}
            height={400}
          />
        </ExpContainer>
      </ScrollSection>
    </div>
  );
};

export default OverlayExperience;
