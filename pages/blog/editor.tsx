import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from '../../lib/serialize';

import components from '../../components/MdComponents';

interface Props {
  params: ParsedUrlQuery | undefined;
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
  frontMatter: { [key: string]: string }
}

export default function BlogPost() {

  const [value, setValue] = React.useState(`---
title: "Title"
description: "Description"
date: "2022-09-10T16:20-04:00"
---
  
The beginning of a new blog post.`);
  const [frontMatter, setFrontMatter] = React.useState<any>(null);
  const [source, setSource] = React.useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>> | null>(null);

  React.useEffect(() => {
    const updateSource = async (d:any, c:any) => {
      const newSource = await serialize(c, { scope: d });
      setSource(newSource);
    }
    try {
      const { data, content } = matter(value);

      const newDate = (new Date(Date.parse(data.date))).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      const newData = { ...data, date: newDate };

      setFrontMatter(newData);
      updateSource(newData,content);
    } catch(err) {
      console.log(err);
    }
  }, [value])

  return <>
    <Head>
      <title>{`Blog Editor – ORACLE of Blair`}</title>
      <meta property="og:title" content={`Blog Editor – ORACLE of Blair`} key="ogtitle"/>
    </Head>

    <div className="h-screen container max-w-6xl grid grid-cols-2">
      <div className="border-r-[4px]">
        <textarea
          className="p-4 w-full h-full border-2 bg-neutral-800 text-white"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="">
        <header className="pt-12 pb-8 px-8">
          <div className="flex justify-center">
            <p className="px-1.5 text-sm text-center font-medium uppercase bg-amber-100 rounded-md">
              Blog
            </p>
          </div>

          <h1 className="text-4xl text-center font-extrabold font-serif mt-2">{frontMatter?.title || "Invalid Title"}</h1>
          <p className="mt-2 text-lg text-center">{frontMatter?.description || "Invalid Description"}</p>

          <div className="mt-2 flex gap-2 items-center justify-center">
            <span className="text-sm text-neutral-400 italic">{frontMatter?.date || "Invalid Date"}</span>
          </div>
        </header>

        <main className="pt-4 pb-8 px-8">
          {source && <MDXRemote {...source} components={components}/>}
        </main>
      </div>
    </div>
  </>;
}
