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
import HorrorToggle from '../components/Horror/HorrorToggle';
import Atmosphere from '../components/Horror/Atmosphere';

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
        ? ['/videos/hero-ide.mp4']
        : [
            '/videos/hero-ide.mp4',
            '/videos/home.mp4',
            '/videos/coffee.mp4',
            '/videos/tut.mp4',
          ];
      const controller = new AbortController();
      // One at a time, hero first, so the hero video gets the whole connection
      // and the main thread is not busy while the intro ends.
      (async () => {
        for (const url of assets) {
          if (controller.signal.aborted) return;
          try {
            const res = await fetch(url, { signal: controller.signal });
            await res.arrayBuffer();
          } catch (e) {
            if (controller.signal.aborted) return;
          }
        }
      })();
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

  // Page titles and descriptions come from pageProps.seo so they are in the
  // server HTML even while the intro loader is showing.
  const seo = {
    title: 'Karim Selim - QA Automation Engineer',
    description:
      'Karim Selim, QA automation engineer with a frontend background. 300+ bugs reported and 390+ test cases across two products. Playwright and API testing.',
    url: 'https://karim-selim.vercel.app/',
    ...(pageProps && pageProps.seo),
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
        <meta
          property="og:image"
          content="https://karim-selim.vercel.app/imgs/hero-poster.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="canonical" href={seo.url} />
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
                <>
                  <Loader />
                  {/* Warm the title web font while the loader plays so the hero
                      does not wait for it afterwards */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      opacity: 0,
                      pointerEvents: 'none',
                      fontFamily: 'presicav, sans-serif',
                    }}
                  >
                    kARIM
                  </span>
                </>
              ) : (
                <>
                  <Header />
                  <Menu />
                  <Component {...pageProps} />
                  <Atmosphere />
                  <HorrorToggle />
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
