import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [pastModelsIsOpen, setPastModelsIsOpen] = React.useState(false);

  return <>
    <nav className="shadow-sm">
      <div className="p-4 container max-w-6xl flex flex-col md:flex-row items-center md:items-start justify-between gap-1 md:gap-4 relative">
        <ul className="flex flex-row gap-4 items-center text-lg font-medium">
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/senate" passHref>
              <a>Senate</a>
            </Link>
          </li>
          <li>
            <Link href="/governors" passHref>
              <a>Governors</a>
            </Link>
          </li>
        </ul>

        {/* <h1 className="text-2xl font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          ORACLE of Blair
        </h1> */}

        <div className="order-first md:order-none">
          <Link href="/" passHref>
            <a>
              <img
                src='/logo.svg'
                alt='ORACLE of Blair logo'
                className='h-8 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 my-4 md:my-0'
              />
            </a>
          </Link>
        </div>

        <ul className="flex flex-row gap-4 items-center text-lg font-medium">
          <Link href="/methodology" passHref>
            <a>Methodology</a>
          </Link>
          <Link href="/blog" passHref>
            <a>Blog</a>
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setPastModelsIsOpen(true)}
            onMouseLeave={() => setPastModelsIsOpen(false)}
          >
            <a className="cursor-pointer transition ease-in-out duration-300">
              Past Models
            </a>
            <motion.div
              className="absolute right-0 w-24"
              initial="exit"
              animate={pastModelsIsOpen ? "enter" : "exit"}
              variants={{
                enter: {
                  opacity: 1,
                  rotateX: 0,
                  y: 12,
                  display: 'block',
                  transition: {
                    duration: 0.2
                  }
                },
                exit: {
                  opacity: 0,
                  rotateX: -15,
                  y: 8,
                  transition: {
                    duration: 0.2
                  },
                  transitionEnd: {
                    display: 'none',
                  }
                }
              }}
            >
              <div className="py-1 flex flex-col bg-white/90 shadow-sm rounded-xl">
                <Link href="https://2020.polistat.mbhs.edu" target="_blank" rel="noopener noreferrer" passHref>
                  <a className="px-4 py-1 transition ease-in-out duration-300">
                    2020
                  </a>
                </Link>
                <Link href="https://2018.polistat.mbhs.edu" target="_blank" rel="noopener noreferrer" passHref>
                  <a className="px-4 py-1 transition ease-in-out duration-300">
                    2018
                  </a>
                </Link>
              </div>
            </motion.div>
          </div>
          {/* <ul className="flex flex-row gap-2 items-center">
            <li>🐦</li>
            <li>📷</li>
          </ul> */}
        </ul>
      </div>
    </nav>
  </>;
}
