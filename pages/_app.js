import '../styles/globals.css';

import Head from 'next/head';

import MDXProvider from "../components/MDXProvider";

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <MDXProvider>
      <Component {...pageProps} />
    </MDXProvider>
  </>;
}

export default MyApp
