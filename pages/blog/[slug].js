import React from 'react';
import Head from 'next/head';

// import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import { getBlogSlugs, getBlogData } from "../../lib/blog";

import Navbar from '../../components/Navbar';

export default function BlogPost({ params, source, frontMatter }) {
  // let components;
  // try {
  //   components = require(`../content/blog/components`).default;
  // } catch (err) {}

  return <>
    <Head>
      <title>{`${frontMatter.title} – ORACLE of Blair`}</title>
      <meta property="og:title" content={`${frontMatter.title} – ORACLE of Blair`} key="ogtitle"/>
      <meta name="description" content={frontMatter.description}/>
      <meta property="og:description" content={frontMatter.description} key="ogdesc"/>
    </Head>

    <Navbar/>

    <div className="container max-w-3xl">
      <div className="pt-12 pb-8">
        <div className="flex justify-center">
          <p className="px-1.5 text-sm text-center font-medium uppercase bg-amber-100 rounded-md">
            ORACLE Blog
          </p>
        </div>

        <h1 className="text-4xl text-center font-extrabold font-serif mt-2">{frontMatter.title}</h1>
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

export async function getStaticPaths() {
  const paths = getBlogSlugs();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { data, content } = await getBlogData(params.slug);
  const mdxSource = await serialize(content, { scope: data });
  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: data
    }
  };
}