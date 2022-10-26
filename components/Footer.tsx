import React from 'react';
import Link from 'next/link';

import { FiInstagram, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return <>
    <footer className="bg-neutral-50">
      <div className="px-8 pt-8 pb-12 container max-w-6xl flex flex-col sm:flex-row justify-between gap-12">
        <div className="flex flex-col md:flex-row gap-10 items-center sm:justify-start">
          <img
            src='/logo2.svg'
            alt='ORACLE of Blair logo'
            className="max-w-[7rem]"
          />

          <div className="flex flex-col gap-2">
            <Link href="https://instagram.com/oracleofblair" passHref>
              <a target="_blank" rel="noreferrer noopener">
                <div className="flex items-center gap-2">
                  <FiInstagram size="1.4em"/>
                  <span className="text-sm">@oracleofblair</span>
                </div>
              </a>
            </Link>

            <Link href="https://twitter.com/ORACLE_of_Blair" passHref>
              <a target="_blank" rel="noreferrer noopener">
                <div className="flex items-center gap-2">
                  <FiTwitter size="1.4em"/>
                  <span className="text-sm">@ORACLE_of_Blair</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="max-w-2xl flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div>
            <h2 className="font-bold">
              About us
            </h2>
            <p className="text-xs mt-0.5">
              ORACLE of Blair is a project by seniors at Montgomery Blair High School in Silver Spring, Maryland.
              It was created during the Fall 2022 Political Statistics course taught by Mr. David Stein.
              Questions for the students about the model can be sent to <a href="mailto:mbhs.polistat@gmail.com" className=" text-blue-500 hover:underline">mbhs.polistat@gmail.com</a>, while Mr. Stein can be reached directly through the Blair website.
            </p>
          </div>

          <div>
            <h2 className="font-bold">
              Please note
            </h2>
            <p className="text-xs mt-0.5">
              Any views or opinions expressed on this site are those of the students in Montgomery Blair High School&apos;s 2022 Political Statistics class and do not necessarily reflect the official position of Montgomery Blair High School.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </>;
}
