import React from 'react';
import BannerSection from '../components/Home/Banner';
import Footer from '../components/Home/Footer';
import TextReveal from '../components/TextReveal/TextReveal';
import Experience from '../components/HorizontalSections/Experience';

const Home = () => {
  return (
    <>
      <BannerSection />
      <TextReveal />
      <Experience />
      <Footer />
    </>
  );
};

export default React.memo(Home);
