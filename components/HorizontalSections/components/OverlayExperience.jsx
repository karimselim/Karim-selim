// components/WorkExperience/OverlayExperience.jsx
import React, { useRef, useEffect } from 'react';
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
        backgroundColor: 'black',
        zIndex: 10,
        // pointerEvents: 'none',
      }}
    >
      <ScrollSection
        style={{
          //   pointerEvents: 'none',
          paddingInline: '3%',
        }}
      >
        <ExpH2 data-text="Experience">Experience</ExpH2>
        <ExpContainer>
          <ExpText>
            <ScrollH3>
              KoalaSoft - Hybrid Mobile Developer (Contract via SBARI)
            </ScrollH3>
            <ExpDetails>Santa Clara, CA · October 2024 – Present</ExpDetails>
            <UnderLine />
            <ExpP>
              At Koala Soft, I worked as a Cordova developer, building and
              maintaining cross-platform mobile applications using web
              technologies like HTML, CSS, and JavaScript. I integrated native
              plugins to access device features, worked closely with APIs for
              dynamic data handling, and optimized app performance across both
              Android and iOS. The role also involved debugging
              platform-specific issues and delivering updates through iterative
              releases.
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
