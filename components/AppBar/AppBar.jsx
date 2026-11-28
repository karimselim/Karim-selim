import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useThemeContext } from '../../context/theme';
import Logo from '../Icons/Logo';
import MenuButton from '../MenuButton';
import { Slider, Container, StyledLink, MenuWrapper } from './styles';
import CvButton from './CvButton';

const getStyles = (direction = '') => {
  if (direction === 'down') return { top: 0 };
  if (direction === 'up') return { bottom: 0 };

  return {};
};

const variants = {
  hidden: { y: -131 },
  show: { y: 0 },
};

const AppBar = props => {
  const {
    direction = 'down',
    offset = 105,
    logoProps = {},
    style: styleProp = {},
    ...rootProps
  } = props;
  const [hidden, setHidden] = React.useState(false);
  const router = useRouter();
  const [{ theme: mode }] = useThemeContext();
  // Light mode on a phone: the hero video is dark and always visible, so the
  // black logo and menu icon vanish on it. Draw them white while it is behind.
  const [overVideo, setOverVideo] = React.useState(false);
  React.useEffect(() => {
    const check = () => {
      setOverVideo(
        mode === 'light' &&
          router.pathname === '/' &&
          window.innerWidth <= 767 &&
          window.scrollY < window.innerHeight - 70
      );
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [mode, router.pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      let shouldHide = false;
      let intersection = offset;
      let currentYPosition = 0;

      if (direction === 'down') {
        currentYPosition = window.scrollY;
      } else if (direction === 'up') {
        currentYPosition =
          document.documentElement.scrollTop + window.innerHeight;
        intersection = document.documentElement.scrollHeight - offset;
      }

      shouldHide = currentYPosition > intersection;
      if (shouldHide !== hidden) {
        setHidden(shouldHide);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [hidden, direction, offset]);

  const styles = getStyles(direction);

  return (
    <Slider
      variants={variants}
      initial="hidden"
      animate={hidden ? 'hidden' : 'show'}
      transition={{
        duration: 1,
        ease: [0.666, 0, 0.237, 1],
      }}
      style={{
        ...styles,
        ...(overVideo ? { '--hdr': '#fff' } : {}),
        ...styleProp,
      }}
      inert={hidden && direction === 'down' ? '' : undefined}
      aria-hidden={hidden && direction === 'down' ? 'true' : undefined}
      {...rootProps}
    >
      <Container>
        <Link href="/" passHref>
          <StyledLink title="Karim" data-cursor-no-magnet>
            <Logo {...logoProps} />
          </StyledLink>
        </Link>
        <CvButton />
        <MenuWrapper>
          <MenuButton title="Projects" />
        </MenuWrapper>
      </Container>
    </Slider>
  );
};

export default React.memo(AppBar);
