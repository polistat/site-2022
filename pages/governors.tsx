import Head from 'next/head';

import Navbar from '../components/Navbar';
import Map from '../components/Map';

export default function SenatePage() {
  return <>
    <Head>
      <title>2022 Governors Forecast – ORACLE of Blair</title>
      {/* <meta name="description" content="" /> */}
    </Head>

    <Navbar/>

    <main className="py-8 flex flex-col gap-8">
      <section className="p-8 container max-w-3xl flex flex-col gap-4 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="px-1.5 text-xl text-center font-medium uppercase bg-amber-100 rounded-md">
            The Governors
          </h1>
          <p className="text-4xl text-center font-serif">
            Americans will likely be led by mostly <span className="font-extrabold">Democratic governors</span>
          </p>
        </div>

        <Map/>
      </section>
    </main>

    <footer>
    </footer>
  </>;
}
