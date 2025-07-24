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

    const effect = new hoverEffect({
      parent: hoverRef.current,
      intensity,
      image1,
      image2,
      displacementImage,
      imagesRatio: width / height,
    });

    return () => {
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
