/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenuContext } from '../../context/menu';
import useCursorStyle from '../../hooks/useCursorStyle';
import useStyledTheme from '../../hooks/useStyledTheme';
import useMediaQuery from '../../hooks/useMediaQuery';
import routes from '../../utils/constants/routes';
import Arrow from '../Icons/Arrow';

import {
  listVariants,
  listItemsVariants,
  transition,
} from './variants';
import {
  Backdrop,
  Container,
  CloseButton,
  Header,
  Navigation,
  Grid,
  Tile,
  Footer,
  FooterText,
  Address,
  SocialMedia,
} from './styles';

const Menu = () => {
  const containerRef = React.useRef(null);
  const videoContainerRef = React.useRef(null);
  const [revealVideo, setRevealVideo] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const theme = useStyledTheme();
  const [{ isMenuOpen }] = useMenuContext();
  const {
    addCursorBorder,
    removeCursorBorder,
    addCursorColor,
    resetCursorColor,
  } = useCursorStyle();
  const isMobile = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.small}px)`
  );

  const handleAnimationComplete = React.useCallback(() => {
    addCursorColor(theme.text);
  }, [addCursorColor, theme.text]);

  const handleExitComplete = React.useCallback(() => {
    resetCursorColor();
  }, [resetCursorColor]);

  const handleHoverStart = React.useCallback(
    event => {
      addCursorBorder();
      setRevealVideo(event.target.name);
    },
    [addCursorBorder]
  );

  const handleHoverEnd = React.useCallback(() => {
    removeCursorBorder();
    setRevealVideo(null);
  }, [removeCursorBorder]);

  React.useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && containerRef.current && videoContainerRef.current) {
        const offset = 256;
        const { width } = containerRef.current.getBoundingClientRect();
        const left = (window.innerWidth - width) / 2 + offset;

        videoContainerRef.current.style.left = `${left}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isMenuOpen && (
        <Backdrop onAnimationComplete={handleAnimationComplete}>
          <Container ref={containerRef}>
            <Header>
              <h3>Projects</h3>
              <CloseButton title="Close" />
            </Header>
            <Navigation>
              <Grid
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {routes.map((route, i) => (
                  <Tile
                    key={route.id}
                    href={route.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${route.title}, opens the live project`}
                    variants={listItemsVariants}
                    transition={{ duration: 0.9, ease: transition.ease }}
                    onMouseEnter={addCursorBorder}
                    onMouseLeave={removeCursorBorder}
                  >
                    <video
                      src={`/videos/${route.video}`}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                    <span className="num">0{i + 1}</span>
                    <span className="title">{route.title}</span>
                  </Tile>
                ))}
              </Grid>
            </Navigation>
            <Footer>
              <FooterText
                className="link"
                as="a"
                href="mailto:kareemsleem7@gmail.com"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                kareemsleem7@gmail.com
              </FooterText>
              <FooterText
                className="link"
                as="a"
                href="tel:+201068679457"
                onMouseEnter={addCursorBorder}
                onMouseLeave={removeCursorBorder}
              >
                +201068679457
              </FooterText>
              <FooterText className="copyright">© Karim Selim {new Date().getFullYear()}</FooterText>
              {isMobile && (
                <Address>
                  <FooterText>Egypt, Damietta, Ras-Elbar</FooterText>
                </Address>
              )}
              <SocialMedia />
            </Footer>
          </Container>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Menu);
