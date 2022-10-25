import '../styles/globals.css';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { MathJaxContext } from 'better-react-mathjax';

import MDXProvider from "../components/MDXProvider";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.png" />
      <meta itemProp="image" content="https://polistat.mbhs.edu/school.png"/>
      <meta itemProp="name" content="ORACLE of Blair"/>
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://polistat.mbhs.edu/" />
      <meta property="og:title" content="2022 Election Forecast" />
      <meta property="og:description" content="The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections." />
      <meta property="og:image" content="https://polistat.mbhs.edu/school.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://polistat.mbhs.edu/" />
      <meta property="twitter:title" content="2022 Election Forecast" />
      <meta property="twitter:description" content="The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections." />
      <meta property="twitter:image" content="https://polistat.mbhs.edu/school.png" />
      <script defer data-domain="polistat.mbhs.edu" src="https://plausible.mbhs.edu/js/plausible.js"></script>
    </Head>

    <Navbar/>

    <div className="min-h-screen">
      <MathJaxContext config={{
        loader: { load: ["input/asciimath"] },
        asciimath: {
          displaystyle: true,
          delimiters: [
            ["$", "$"],
            ["`", "`"]
          ]
        }
      }}>
        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      </MathJaxContext>
    </div>

    <Footer/>
  </>;
}

export default MyApp
