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
  bottom: -0.06em;
  left: 0;
  font-family: calibre, sans-serif;
  font-weight: 900;
  font-size: 13vw;
  pointer-events: none;
  line-height: 0.8;
  z-index: 10;

  & span {
    display: block;
    will-change: transform;
    backface-visibility: hidden;
  }

  & span:first-child {
    font-family: 'Rouge Script', cursive;
    font-weight: 400;
    font-size: 1.5em;
    line-height: 0.9;
    padding-right: 0.12em;
  }

  ${({ theme }) => theme.breakpoints.small`
    left: 0;
    bottom: -0.01em;
    font-size: 15vw;
    line-height: 0.8;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    left: 0;
    bottom: -0.02em;
    font-size: 14vw;
    line-height: 0.8;
  `};

  /* light mode on a phone: the dark hero video is always visible behind it */
  ${({ theme }) =>
    theme.mode === 'dark'
      ? ''
      : theme.breakpoints.tablet`
    color: #fff;
  `};
`;
