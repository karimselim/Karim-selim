import styled from 'styled-components';
import { motion } from 'framer-motion';
import containerStyles from '../../styles/shared/container';
import { secondaryFontStyle } from '../../styles/shared/text';
import DefaultBackdrop from '../Backdrop';
import DefaultSocialMedia from '../SocialMedia';
import MenuButton from '../MenuButton';

export const Backdrop = styled(DefaultBackdrop)`
  background: radial-gradient(ellipse at 30% 20%, rgba(120, 0, 14, 0.65) 0%, rgba(40, 0, 6, 0.9) 45%, #0c0102 100%);
  color: #f1e6c8;
`;

export const Container = styled.div`
  ${containerStyles};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  width: 100%;
  padding: 54px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled(Row)`
  & h3 {
    margin: -20px;
    margin-left: 0;
    ${secondaryFontStyle};
  }

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 29px 0;

    & h3 {
      font-size: 1.125rem;
      line-height: 1.2777777778;
    }
  `};
`;

export const Footer = styled(Row)`
  justify-content: flex-start;

  ${({ theme }) => theme.breakpoints.small`
    position: relative;
    flex-direction: column;
    align-items: flex-start;
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    padding: 32px 0;
  `};
`;

export const FooterText = styled.p`
  ${secondaryFontStyle};
  line-height: 24px;
  margin: 0;
  flex-shrink: 0;

  &.link {
    display: inline-block;
    margin-right: 64px;

    &:hover {
      color: #d4af37;
    }
  }

  &.copyright {
    font-size: 0.875rem;
    line-height: 1.0714285714;
  }

  ${({ theme }) => theme.breakpoints.small`
    font-size: 0.875rem;
    line-height: 1.0714285714;

    &.copyright {
      position: absolute;
      right: 0;
      bottom: 54px;
      font-size: 0.6875rem;
      line-height: 1.1818181818;
    }
  `};

  ${({ theme }) => theme.breakpoints.tablet`
    &.copyright {
      bottom: 32px;
    }
  `};
`;

export const SocialMedia = styled(DefaultSocialMedia)`
  justify-content: flex-end;
  width: 100%;

  & a svg path {
    fill: ${({ theme }) => '#f1e6c8'};
  }

  ${({ theme }) => theme.breakpoints.small`
    width: unset;
    justify-content: flex-start;
  `};
`;

export const Navigation = styled.nav`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
`;

export const Grid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  ${({ theme }) => theme.breakpoints.small`
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 70px;
    align-self: flex-start;
  `};
`;

export const Tile = styled(motion.a)`
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 4px;
  background: #0c0102;

  & video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.8) brightness(0.62);
    transition: filter 0.5s ease, transform 0.8s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(12, 1, 2, 0.92), rgba(80, 0, 10, 0.12) 55%);
  }

  & .num {
    position: absolute;
    z-index: 1;
    top: 12px;
    left: 14px;
    font-size: 0.8125rem;
    letter-spacing: 0.2em;
    color: #d4af37;
  }

  & .title {
    position: absolute;
    z-index: 1;
    left: 14px;
    right: 14px;
    bottom: 14px;
    font-size: 1.75rem;
    line-height: 1.1;
    font-weight: 900;
    text-transform: uppercase;
    color: #f1e6c8;
  }

  &:hover,
  &:focus-visible {
    border-color: #d4af37;
    outline: none;
    & video {
      filter: saturate(1) brightness(1);
      transform: scale(1.05);
    }
  }

  ${({ theme }) => theme.breakpoints.small`
    aspect-ratio: 1 / 1;
    & .title { font-size: 1.05rem; }
  `};
`;

export const Address = styled.address`
  margin-top: 17px;
  margin-bottom: 23px;
`;

export const CloseButton = styled(MenuButton)`
  margin: -20px;

  & span {
    color: ${({ theme }) => '#f1e6c8'};
  }

  &::before,
  &::after {
    margin-top: 0;
    background: ${({ theme }) => '#f1e6c8'};
  }

  &::before {
    transform: translateY(-50%) rotate(-45deg);
  }

  &::after {
    transform: translateY(-50%) rotate(45deg);
  }

  ${({ theme }) => theme.breakpoints.tablet`
    &::before {
      margin-top: 0;
    }

    &::after {
      margin-top: 0;
    }
  `};
`;
