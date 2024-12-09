import "@/styles/globals.css";
import Cursor from "@/components/Cursor";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Cursor />
      <Component {...pageProps} />
    </>
  );
}
