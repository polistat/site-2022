import '../styles/globals.css';

import Head from 'next/head';

import MDXProvider from "../components/MDXProvider";
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
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
