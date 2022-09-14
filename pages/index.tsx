import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from '../components/Navbar';
import Map from '../components/Map';

export default function Home() {
  const [headerSlide, setHeaderSlide] = React.useState(0);

  return <>
    <Head>
      <title>Home – ORACLE of Blair</title>
      {/* <meta name="description" content="" /> */}
    </Head>

    <Navbar/>

    <header className="bg-neutral-50">
      <div className="px-8 pt-12 pb-8 container max-w-5xl flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="text-4xl text-center font-bold font-serif">
            2022 Election Forecast
          </h1>
          <p className="text-xl text-center font-thin uppercase">
            Senate &amp; Governors 
          </p>
          
          <div className="flex gap-2 items-center justify-center mt-1">
            <motion.div
              className="h-2 w-2 rounded-full bg-green-400"
              animate={{ opacity: [0,1,0] }}
              transition={{ duration: 2, repeat: Infinity, }}
            />
            <p className="text-sm text-center text-neutral-400 uppercase font-bold">
              Updated MM/DD/YYYY
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-12 md:gap-4">
          <div className="p-0.5 md:max-w-xs self-start relative bg-white rounded-xl overflow-hidden shadow-sm">
            <ul className="flex border-b text-sm font-medium">
              <li
                className={`pt-2.5 pb-2 px-5 flex-grow cursor-pointer rounded-t-xl ${headerSlide===0 ? 'bg-neutral-100' : null}`}
                onClick={() => setHeaderSlide(0)}
              >
                🏛️ Senate
              </li>
              <li
                className={`pt-2.5 pb-2 px-5 flex-grow cursor-pointer rounded-t-xl ${headerSlide===1 ? 'bg-neutral-100' : null}`}
                onClick={() => setHeaderSlide(1)}
              >
                💼 Governors
              </li>
            </ul>

            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={headerSlide}
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
              {headerSlide === 0 ? <>
                <h2 className="text-2xl font-bold">
                  The Senate
                </h2>
                <p className="text-sm mt-2">
                  Description of model. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non velit pharetra, rhoncus mi commodo, auctor est. Mauris ac rutrum.
                </p>

                <Link href="/senate" passHref>
                  <a>
                    <button className="px-3 py-1.5 text-sm uppercase font-bold border-2 border-neutral-200 hover:bg-neutral-50 rounded-lg mt-6">
                      See the Senate forecast
                    </button>
                  </a>
                </Link>
              </> : headerSlide === 1 ? <>
                <h2 className="text-2xl font-bold">
                  The Governors
                </h2>
                <p className="text-sm mt-2">
                  Description of model. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci quam, tincidunt vitae sapien ut, rhoncus tempus urna. Duis mattis.
                </p>
                
                <Link href="/governors" passHref>
                  <a>
                    <button className="px-3 py-1.5 text-sm uppercase font-bold border-2 border-neutral-200 hover:bg-neutral-50 rounded-lg mt-6">
                      See the Governor forecast
                    </button>
                  </a>
                </Link>
              </> : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative w-full flex-1 self-start">
            <Map/>

            <div className="absolute bottom-4 right-4 flex border-2 border-neutral-200 rounded-xl overflow-hidden">
              <button className="px-3 py-1.5 hover:bg-neutral-100/75 active:bg-neutral-100/75 text-sm active:font-bold rounded-r-xl -mr-1">
                Map view
                </button>
              <button className="px-3 py-1.5 hover:bg-neutral-100/75 active:bg-neutral-100/75 text-sm active:font-bold rounded-l-xl -ml-1">
                List view
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <main className="px-8 py-12 container max-w-2xl flex flex-col gap-16">
      <section className="p-8 border-2 border-neutral-200 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold">
          The latest
        </h2>

        <hr className="mt-2 mb-4"/>

        <div className="">
          <h3 className="font-medium">
            Analyzing the Effects of a Proportional Elector System
          </h3>
          <p className="text-sm text-neutral-400 italic">
            Oct. 27, 2020, 10:09 p.m.
          </p>
          <p className="text-sm mt-1">
            An analysis of how allocating electors proportionally by popular vote within the states would change the election.
          </p>
        </div>

        <hr className="my-4"/>

        <div className="">
          <h3 className="font-medium">
            Good Polls and Bad Polls
          </h3>
          <p className="text-sm text-neutral-400 italic">
            Oct. 28, 2020, 1:47 p.m.
          </p>
          <p className="text-sm mt-1">
            If we only used “A” rated polls, or “A” and “B” rated polls, does it impact the results of our model?
          </p>
        </div>

        <hr className="my-4"/>

        <div className="">
          <h3 className="font-medium">
            2016 vs. 2020 Models
          </h3>
          <p className="text-sm text-neutral-400 italic">
            Oct. 28, 2020, 10:11 p.m.
          </p>
          <p className="text-sm mt-1">
            To what degree do the 2016 and 2020 student models differ in battleground states?
          </p>
        </div>

        <hr className="my-4"/>
        
        <Link href="/blog" passHref>
          <a>
            <button className="px-3 py-1.5 text-sm uppercase font-bold border-2 border-neutral-200 hover:bg-neutral-50 rounded-lg">
              Keep reading the blog
            </button>
          </a>
        </Link>
      </section>

      <section className="p-8 border-2 border-neutral-200 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold">
          Methodology
        </h2>
        <p className="mt-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum orci tortor, faucibus sed varius in, pulvinar non nulla. Pellentesque vel porttitor erat. Phasellus eget congue nulla. Aenean in rhoncus urna. Vestibulum dictum arcu ut lobortis aliquet. Morbi vel rhoncus orci.
        </p>
        
        <Link href="/methodology" passHref>
          <a>
            <button className="px-3 py-1.5 text-sm uppercase font-bold border-2 border-neutral-200 hover:bg-neutral-50 rounded-lg mt-4">
              Our methodology
            </button>
          </a>
        </Link>
      </section>

      {/* <section className="p-8 border-2 border-neutral-200 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold">
          About us
        </h2>
        <p className="mt-1">
          ORACLE of Blair is a project by seniors at Montgomery Blair High School in Silver Spring, Maryland.
          It was created during the Fall 2022 Political Statistics course taught by Mr. David Stein.
          Questions for the students about the model can be sent to mbhs.polistat@gmail.com, while Mr. Stein can be reached directly through the Blair website.
        </p>

        <h3 className="text-lg font-bold mt-3">
          Please note
        </h3>
        <p className="">
          Any views or opinions expressed on this site are those of the students in Montgomery Blair High School's 2022 Political Statistics class and do not necessarily reflect the official position of Montgomery Blair High School.
        </p>
      </section> */}
    </main>

    <footer>
    </footer>
  </>;
}
