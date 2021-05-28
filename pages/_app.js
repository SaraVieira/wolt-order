import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-20 mb-10">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
