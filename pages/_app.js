import "../styles/index.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Get some food</title>
      </Head>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-20 mb-10">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
