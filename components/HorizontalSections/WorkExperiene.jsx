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
          <ScrollH3>Software Engineer Intern</ScrollH3>
          <ExpDetails>Gilroy, CA · Aug 2021 – Jan 2022</ExpDetails>
          <UnderLine />
          <ExpP>
            At Koalasoft, I worked remotely as a front-end intern, building
            responsive and accessible UI components using React and Tailwind
            CSS. I translated Figma designs into functional interfaces,
            integrated REST APIs, and focused on clean state management with
            hooks like <code>useState</code> and <code>useEffect</code>. I also
            added subtle GSAP animations to enhance the user experience and
            collaborated weekly with the team through GitHub and video calls.
          </ExpP>
        </ExpText>
        <HoverMorphEffect
          image1={'/imgs/second.jpg'}
          image2={'/imgs/first.jpg'}
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
