import { useEffect, useRef } from 'react';
import hoverEffect from 'hover-effect';
import PropTypes from 'prop-types';
import { HoverMorphContainer } from './styles';

const HoverMorphEffect = ({
  image1,
  image2,
  displacementImage,
  width = 360,
  height = 288,
  intensity = 0.5,
}) => {
  const hoverRef = useRef(null);

  useEffect(() => {
    if (!hoverRef.current) return;

    // Far below the hero: create the WebGL scene only when this block is within
    // about one screen of the viewport, so it never competes with the hero.
    let effect;
    let observer;
    const create = () => {
      if (effect || !hoverRef.current) return;
      effect = new hoverEffect({
        parent: hoverRef.current,
        intensity,
        image1,
        image2,
        displacementImage,
        imagesRatio: width / height,
      });
    };
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          if (entries.some(e => e.isIntersecting)) {
            observer.disconnect();
            create();
          }
        },
        { rootMargin: '100% 100% 100% 100%' }
      );
      observer.observe(hoverRef.current);
    } else {
      create();
    }

    return () => {
      if (observer) observer.disconnect();
      // Clean up the canvas when unmounting
      effect && effect.canvas && effect.canvas.remove();
    };
  }, [image1, image2, displacementImage, intensity, width, height]);

  return (
    <HoverMorphContainer ref={hoverRef} className="hover-morph-container" />
  );
};

HoverMorphEffect.propTypes = {
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  displacementImage: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  intensity: PropTypes.number,
};

export default HoverMorphEffect;
