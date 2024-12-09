import Loader from "@/components/Loader";
import Head from "next/head";

console.log("karim selim");

export default function Home() {
  return (
    <>
      <Head>
        <title>Phoenix Nation</title>
      </Head>
      <Loader />
    </>
  );
}
