import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
  const [downloadURL, setDownloadURL] = React.useState<any>(null);

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

    // update download url
    const data = new Blob([value], { type: 'text/plain' });
    setDownloadURL(window.URL.createObjectURL(data));
  }, [value]);

  React.useEffect(() => {
    window.onbeforeunload = () => "Wait! You may have unsaved changes.";
  }, []);

  return <>
    <Head>
      <title>{`Blog Editor – ORACLE of Blair`}</title>
      <meta property="og:title" content={`Blog Editor – ORACLE of Blair`} key="ogtitle"/>
    </Head>

    <div className="h-screen container max-w-6xl grid grid-cols-2">
      <div className="flex flex-col bg-neutral-100">
        <div className="flex justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold">
              Blog Markdown Editor
            </h2>
            <p className="text-sm">
              <span className="font-medium">Warning:</span> Changes are NOT saved!!
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <a
              className="bg-blue-600 text-white rounded-md text-sm font-medium px-3 py-1"
              download="blogpost.md"
              href={downloadURL}
            >
              Download
            </a>

            <Link href="/markdown" passHref>
              <a className="text-xs text-blue-500 hover:underline underline-offset-1" target="_blank" rel="noopener noreferrer">
                Markdown reference
              </a>
            </Link>
          </div>
        </div>
        <textarea
          className="p-4 w-full h-full bg-neutral-800 text-white resize-none"
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
