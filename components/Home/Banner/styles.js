import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BannerSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  margin-bottom: 305px;
  background: ${({ theme }) => theme.background};

  & canvas {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.tablet`
    margin-bottom: 90px;
  `};
`;

export const VideoContainer = styled.div`
  height: 100%;
  width: 100%;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  & video {
    object-fit: cover;

    &::-webkit-media-controls {
      display: none !important;
    }
    &::-webkit-media-controls-enclosure {
      display: none !important;
    }
  }
`;

export const BannerTitle = styled(motion.h1)`
  position: absolute;
  bottom: -93px;
  left: -20px;
  font-size: 420px;
  font-size: 26.25rem;
  pointer-events: none;
  line-height: 0.6714285714;
  z-index: 10;

  & span {
    display: block;
    will-change: transform;
    backface-visibility: hidden;
  }

  ${({ theme }) => theme.breakpoints.small`
    left: -10px;
    bottom: -63px;
    font-size: 280px;
    font-size: 17.5rem;
    line-height: .6821428571;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    left: -6px;
    bottom: -36px;
    max-width: calc(100% + 6px);
    font-size: 160px;
    font-size: 10rem;
    line-height: .68125;
  `};

  /* light mode on a phone: the dark hero video is always visible behind it */
  ${({ theme }) =>
    theme.mode === 'dark'
      ? ''
      : theme.breakpoints.tablet`
    color: #fff;
  `};
`;
