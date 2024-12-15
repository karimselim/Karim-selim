import React from 'react';
import BannerSection from '../components/Home/Banner';
import Footer from '../components/Home/Footer';
import TextReveal from '../components/TextReveal/TextReveal';

const Home = () => {
  return (
    <>
      <BannerSection />
      <TextReveal />
      <Footer />
    </>
  );
};

export default React.memo(Home);
