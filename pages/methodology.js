import React from 'react';
import Head from 'next/head';

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'

import Navbar from '../components/Navbar';

export default function MethodologyPage({ source, frontMatter }) {
  // let components;
  // try {
  //   components = require(`../content/blog/components`).default;
  // } catch (err) {}

  return <>
    <Head>
      <title>{frontMatter.title} – ORACLE of Blair</title>
      <meta property="og:title" content={`${frontMatter.title} – ORACLE of Blair`} key="ogtitle"/>
      <meta name="description" content={frontMatter.description}/>
      <meta property="og:description" content={frontMatter.description} key="ogdesc"/>
    </Head>

    <Navbar/>

    <div className="container max-w-3xl">
      <div className="pt-12 pb-8">
        <h1 className="text-4xl text-center font-extrabold font-serif">{frontMatter.title}</h1>
        <p className="mt-2 text-lg text-center">{frontMatter.description}</p>

        <div className="mt-2 flex gap-2 items-center justify-center">
          {/* {author &&
            <a href={author.url}>
              <span className="py-1 pr-3 pl-2 flex items-center gap-2 bg-slate-200 rounded-2xl">
                <img src={author.avatar} width={24} height={24} className="rounded-full"/>
                {author.name}
              </span>
            </a>
          } */}
          {frontMatter.date &&
            <span className="text-sm text-neutral-400 italic">{frontMatter.date}</span>
          }
        </div>
      </div>

      <div className="pt-4 pb-8 px-4">
        <MDXRemote {...source} /*components={components}*//>
      </div>
    </div>
  </>;
}

export async function getStaticProps() {
  const fileContent = fs.readFileSync(path.join(process.cwd(), "content", "methodology.mdx"), "utf-8");
  const { data, content } = matter(fileContent);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  };
}