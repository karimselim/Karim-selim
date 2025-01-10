import React from 'react';
import { motion } from 'framer-motion';
import AppBar from '../../components/AppBar';
import useMediaQuery from '../../hooks/useMediaQuery';

const variants = {
  hidden: ({ isMobileView, isTabletView }) => ({
    y: isMobileView ? -60 : isTabletView ? -81 : -131,
  }),
  show: { y: 0 },
};

const Footer = () => {
  const isTabletView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.tablet}px)`
  );
  const isMobileView = useMediaQuery(
    ({ breakpoints }) => `(max-width:${breakpoints.sizes.mobile}px)`
  );

  const viewProps = { isMobileView, isTabletView };

  return (
    <motion.div
      style={{
        position: 'absolute',
        height: isMobileView ? '60px' : isTabletView ? '81px' : '131px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variants={variants}
      initial="hidden"
      animate="show"
      custom={viewProps}
    >
      <AppBar
        key={`${isTabletView}-${isMobileView}`}
        direction="up"
        renderAs="footer"
        variants={variants}
        initial={false}
        custom={viewProps}
        transition={{
          duration: 0.7,
          ease: [0.666, 0, 0.237, 1],
        }}
      />
    </motion.div>
  );
};

export default React.memo(Footer);
