import React, { useRef, useEffect } from 'react';
import { ScrollH3, ScrollSection } from './styles';
import HoverMorphEffect from './components/HoverMorphEffect';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ScrollH3 style={{ color: 'white' }}>karim selim</ScrollH3>
      <HoverMorphEffect
        image1={'/imgs/second.jpg'}
        image2={'/imgs/first.jpg'}
        displacementImage={'/imgs/colorful-displacemnt.png'}
        intensity={0.7}
        width={400}
        height={300}
      />
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
        }}
      />
    </ScrollSection>
  );
};

export default WorkExperiene;
