import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return <>
    <nav className="shadow-sm">
      <div className="px-4 py-4 container max-w-6xl flex justify-between gap-4 relative">
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

        <Link href="/" passHref>
          <a>
            <img
              src='/logo.svg'
              alt='ORACLE of Blair logo'
              className='h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            />
          </a>
        </Link>

        <ul className="flex flex-row gap-4 items-center text-lg font-medium">
          <li>Blog</li>
          <li>Methodology</li>
          {/* <ul className="flex flex-row gap-2 items-center">
            <li>🐦</li>
            <li>📷</li>
          </ul> */}
        </ul>
      </div>
    </nav>
  </>;
}
