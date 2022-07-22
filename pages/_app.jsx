import Head from "next/head";
import "../styles/style.scss";
import "../styles/helper.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Yomnak NextJS Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
