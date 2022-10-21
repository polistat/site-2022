import React from 'react';
import Head from 'next/head';

import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from '../lib/serialize';
import { getMethodologyData } from "../lib/blog";

import components from '../components/MdComponents';
import { InferGetStaticPropsType } from 'next';

export default function MethodologyPage({ source, frontMatter }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>
    <Head>
      <title>{`${frontMatter.title} – ORACLE of Blair`}</title>
      <meta property="og:title" content={`${frontMatter.title} – ORACLE of Blair`} key="ogtitle"/>
      <meta name="description" content={frontMatter.description}/>
      <meta property="og:description" content={frontMatter.description} key="ogdesc"/>
    </Head>

    <div className="container max-w-3xl">
      <header className="pt-12 pb-8 px-8">
        <h1 className="text-4xl text-center font-extrabold font-serif">{frontMatter.title}</h1>
        <p className="mt-2 text-lg text-center">{frontMatter.description}</p>
      </header>

      <main className="pt-4 pb-8 px-8">
        <MDXRemote {...source} components={components} lazy/>
      </main>
    </div>
  </>;
}

export const getStaticProps = async () => {
  const fileContent = await getMethodologyData();
  const { data, content } = matter(fileContent);
  const mdxSource = await serialize(content, data);
  return {
    props: {
      source: mdxSource,
      frontMatter: data
    },
    revalidate: 3600 // 1 hour
  };
}