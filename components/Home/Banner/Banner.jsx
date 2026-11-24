import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useCursorStyle from '../../../hooks/useCursorStyle';
import useWindowSize from '../../../hooks/useWindowSize';
import useStyledTheme from '../../../hooks/useStyledTheme';
import CanvasEraser from '../../CanvasEraser';
import { BannerSection, BannerTitle, VideoContainer } from './styles';

const titleAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemTitleAnimation = {
  initial: { y: '100vh' },
  animate: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Banner = () => {
  const canvasRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const windowSize = useWindowSize();
  const theme = useStyledTheme();
  const { addCursorBorder, removeCursorBorder } = useCursorStyle();
  // Wait for web fonts (Typekit) so the title is not re-laid-out after it appears
  const [titleReady, setTitleReady] = React.useState(false);
  useEffect(() => {
    let done = false;
    const go = () => {
      if (!done) {
        done = true;
        requestAnimationFrame(() => setTitleReady(true));
      }
    };
    const t = setTimeout(go, 3000);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(go);
    } else {
      go();
    }
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error('Error attempting to play video:', error);
        });
      }
    };

    playVideo();

    // Stop decoding the hero video while it is scrolled out of view
    let observer;
    if (videoRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
      observer.observe(videoRef.current);
    }

    const handleTouchStart = () => {
      playVideo();
      document.removeEventListener('touchstart', handleTouchStart);
    };

    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <BannerSection style={{ height: windowSize.height }}>
      <VideoContainer>
        <video
          ref={videoRef}
          src="/videos/second(2).mp4"
          height="100%"
          width="100%"
          loop
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/imgs/hero-poster.jpg"
          disablePictureInPicture
          disableRemotePlayback
        />
      </VideoContainer>
      <CanvasEraser
        ref={canvasRef}
        width={windowSize.width}
        height={windowSize.height}
        size={120}
        data-cursor-ring
        background={theme.background}
        onMouseEnter={addCursorBorder}
        onMouseLeave={removeCursorBorder}
      />
      <BannerTitle
        variants={titleAnimation}
        initial="initial"
        animate={titleReady ? 'animate' : 'initial'}
      >
        <motion.span variants={itemTitleAnimation} className="view">
          kA
        </motion.span>
        <motion.span variants={itemTitleAnimation}>RIM</motion.span>
      </BannerTitle>
    </BannerSection>
  );
};

export default React.memo(Banner);
