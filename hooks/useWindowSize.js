import React from 'react';

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    let frame = null;
    const apply = () => {
      frame = null;
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize(prev => {
        // Mobile address bar show/hide only changes the height a little: skip it
        // so the hero does not re-layout on every scroll.
        if (
          prev.width === width &&
          prev.height !== undefined &&
          Math.abs(prev.height - height) < 150 &&
          window.matchMedia('(pointer: coarse)').matches
        ) {
          return prev;
        }
        return { width, height };
      });
    };
    // At most one state update per animation frame
    const handleResize = () => {
      if (frame === null) frame = requestAnimationFrame(apply);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    apply();

    // Remove event listener on cleanup
    // return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default useWindowSize;
