import '../styles/globals.css';

import Head from 'next/head';
import { AppProps } from 'next/app';

import MDXProvider from "../components/MDXProvider";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
    </Head>

    <Navbar/>

    <div className="min-h-screen">
      <MDXProvider>
        <Component {...pageProps} />
      </MDXProvider>
    </div>

    <Footer/>
  </>;
}

export default MyApp
