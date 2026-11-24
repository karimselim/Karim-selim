import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ThemeContextProvider, useThemeContext } from '../context/theme';
import { CursorContextProvider } from '../context/cursor';
import { MenuContextProvider } from '../context/menu';
import GlobalStyles from '../styles/global';
import darkTheme from '../styles/themes/dark';
import lightTheme from '../styles/themes/light';
import AppBar from '../components/AppBar';
import Cursor from '../components/Cursor';
import Menu from '../components/Menu';
import { Loader } from '../components/Loader';

const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const ThemedApp = ({ children }) => {
  const [state] = useThemeContext();
  const currentTheme = themes[state.theme];

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const Header = () => <AppBar direction="down" renderAs="header" />;

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let stopPreload = () => {};
    const initialTimer = setTimeout(() => {
      // Warm the browser cache with the heavy assets while the intro animation plays.
      // Loader timing/animation is unchanged; nothing keeps loading once it ends.
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      // Mobile: only the hero video (saves data). Desktop: hero + project videos.
      const assets = isMobile
        ? ['/videos/second(2).mp4']
        : [
            '/videos/second(2).mp4',
            '/videos/home.mp4',
            '/videos/coffee.mp4',
            '/videos/fifth.mp4',
            '/videos/tut.mp4',
          ];
      const controller = new AbortController();
      assets.forEach(url =>
        fetch(url, { signal: controller.signal }).catch(() => {})
      );
      stopPreload = () => controller.abort();

      const preloadResources = async () => {
        await new Promise(resolve => setTimeout(resolve, 4000));
        setIsLoaded(true);
      };

      preloadResources();

      setTimeout(() => {
        stopPreload();
        setLoading(false);
      }, 7000);
    }, 1000);

    // Cleanup on component unmount
    return () => {
      clearTimeout(initialTimer);
      stopPreload();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Karim Nation</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/yzi3byl.css" />
      </Head>
      <style jsx global>{`
        @font-face {
          font-family: 'Rouge Script';
          src: url('/fonts/MrDeHaviland-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: calibre;
          font-weight: 400;
          font-style: normal;
          font-display: swap;
          src: url('/fonts/CalibreTest-Regular.otf') format('opentype'),
            url('/fonts/calibre-test-regular.woff') format('woff');
        }

        @font-face {
          font-family: calibre;
          font-weight: 900;
          font-style: normal;
          font-display: swap;
          src: url('/fonts/CalibreTest-Black.otf') format('opentype'),
            url('/fonts/calibre-test-black.woff') format('woff');
        }
      `}</style>

      <ThemeContextProvider>
        <MenuContextProvider>
          <CursorContextProvider>
            <ThemedApp>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Header />
                  <Menu />
                  <Component {...pageProps} />
                </>
              )}
              <Cursor />
            </ThemedApp>
          </CursorContextProvider>
        </MenuContextProvider>
      </ThemeContextProvider>
    </>
  );
};

export default App;
