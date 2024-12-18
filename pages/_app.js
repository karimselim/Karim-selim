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

  // Show loader first, then start loading resources
  useEffect(() => {
    // Show loader for at least 1 second
    const initialTimer = setTimeout(() => {
      // Now start loading resources after 1 second of the loader being shown
      const preloadResources = async () => {
        // Simulate a delay (e.g., loading images, scripts, etc.)
        await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate 4 seconds of resource loading
        setIsLoaded(true); // Once resources are loaded, set isLoaded to true
      };

      preloadResources(); // Begin preloading resources

      // After 7.8 seconds, hide the loader and show the page content
      setTimeout(() => {
        setLoading(false);
      }, 7800); // 7.8 seconds total for the loader
    }, 1000); // Initial delay for loader (1 second to make sure the loader is visible)

    // Cleanup on component unmount
    return () => clearTimeout(initialTimer);
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
                <Loader /> // Show the loader immediately
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
