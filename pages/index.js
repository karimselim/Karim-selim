import React, { useState, useEffect } from 'react';
import BannerSection from '../components/Home/Banner';
import Footer from '../components/Home/Footer';
import { Loader } from '../components/Loader';
// import gsap from 'gsap';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7800);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <BannerSection />
      <Footer />
    </>
  );
};

export default React.memo(Home);
