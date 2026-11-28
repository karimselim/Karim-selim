/* eslint-disable react/no-unescaped-entities */
import { useRef } from 'react';
import gsap from 'gsap';
import { useEffect } from 'react';
import {
  LoaderContainer,
  Contain,
  Loadings,
  LoaderWrapper,
  Loader1,
  Loader2,
  Counter,
  Counter1,
  Counter2,
  Counter3,
  Number,
  Haze,
  Whispers,
} from './styles';

// Intro plays this much faster than the original 7.2s version
const SPEED = 1.4;
const t = seconds => Math.round((seconds / SPEED) * 1000) / 1000;

function Loader({ onFinish }) {
  const loading = useRef(null);
  const counter = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to('.counter3', { y: -2600, duration: t(5) })
      .to(
        '.counter2',
        { y: -1300, duration: t(3), delay: t(2) },
        '<' // Position argument
      )
      .to('.counter1', { y: -130, duration: t(1) }, `-=${t(1)}`);

    gsap.from('.loader1', { width: 0, duration: t(6) });
    gsap.from('.loader2', { width: 0, ease: 'power2.inOut', duration: t(7) }, '<');

    gsap.to('.digit', {
      top: -150,
      duration: t(1),
      stagger: t(0.15),
      delay: t(5),
      ease: 'expo.inOut',
    });
    gsap.to('.loader', {
      background: 'none',
      delay: t(6),
      duration: t(0.1),
    });
    gsap.to('.loader1', {
      rotate: 90,
      y: -50,
      duration: t(0.5),
      delay: t(6),
    });
    gsap.to('.loader2', { x: -68, y: 53, duration: t(0.5) }, '<');
    gsap.to('.loader', { scale: 50, duration: t(1), ease: 'power3.inOut' }, '>');
    gsap.to(
      '.loader',
      {
        rotate: 45,
        y: 500,
        x: 2000,
        duration: t(1),
        ease: 'power2.inOut',
      },
      '<'
    );
  }, []);

  useEffect(() => {
    // Tell the app when the exit animation has really finished, so a stalled
    // timeline (busy main thread, hidden tab) never gets cut off mid-load.
    gsap.to('.loadings', {
      opacity: 0,
      delay: t(7),
      duration: t(0.2),
      ease: 'power3.inOut',
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoaderContainer>
      <Contain className={`contain`}>
        <Loadings className={`loadings`} ref={loading}>
          <Haze />
          <Whispers aria-hidden="true">
            <span>Every click is a test</span>
            <span>Expect the unexpected input</span>
            <span>It never works on my machine</span>
          </Whispers>
          <LoaderWrapper className={`loader`}>
            <Loader1 className={`bar loader1`}></Loader1>
            <Loader2 className={` bar loader2`}></Loader2>
          </LoaderWrapper>

          <Counter ref={counter}>
            <Counter1 className={`counter1 digit`}>
              <Number>0</Number>
              <Number>1</Number>
            </Counter1>
            <Counter2 className={`counter2 digit`}>
              <Number>0</Number>
              <Number>1</Number>
              <Number>2</Number>
              <Number>3</Number>
              <Number>4</Number>
              <Number>5</Number>
              <Number>6</Number>
              <Number>7</Number>
              <Number>8</Number>
              <Number>9</Number>
              <Number>0</Number>
            </Counter2>
            <Counter3 className={`counter3 digit`}>
              <Number>0</Number>
              <Number>1</Number>
              <Number>2</Number>
              <Number>3</Number>
              <Number>4</Number>
              <Number>5</Number>
              <Number>6</Number>
              <Number>7</Number>
              <Number>8</Number>
              <Number>9</Number>
              <Number>0</Number>
              <Number>1</Number>
              <Number>2</Number>
              <Number>3</Number>
              <Number>4</Number>
              <Number>5</Number>
              <Number>6</Number>
              <Number>7</Number>
              <Number>8</Number>
              <Number>9</Number>
              <Number>0</Number>
            </Counter3>
          </Counter>
        </Loadings>
      </Contain>
    </LoaderContainer>
  );
}

export default Loader;
