import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Head from "next/head";
import LandingPage from "./LandingPage";

export default function Home() {
  // State to control the loader visibility
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Karim | Phoenix Nation</title>
      </Head>
      {loading ? <Loader /> : <LandingPage />}
      {/* <LandingPage /> */}
    </>
  );
}
