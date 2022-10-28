import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from '../../lib/serialize';

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import components from '../../components/MdComponents';

interface Props {
  params: ParsedUrlQuery | undefined;
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
  frontMatter: { [key: string]: string }
}


const defaultValue = `---
title: "Title"
description: "Description"
date: "2022-09-10T16:20-04:00"
---
  
The beginning of a new blog post.`;

export default function BlogPost() {
  const [value, setValue] = React.useState<string|null>(null);
  const [frontMatter, setFrontMatter] = React.useState<any>(null);
  const [source, setSource] = React.useState<MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>> | null>(null);
  const [downloadURL, setDownloadURL] = React.useState<any>(null);

  const [fileName, setFileName] = React.useState<string>("blogpost.md");

  React.useEffect(() => {
    if (!value) return;

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

    // save to local storage
    if (typeof window !== 'undefined') window.localStorage.setItem("blog-editor-value", value);
  }, [value]);

  React.useEffect(() => {
    // window.onbeforeunload = () => "Wait! You may have unsaved changes.";
    
    if (typeof window !== 'undefined') {
      setValue(window.localStorage.getItem("blog-editor-value") || defaultValue);
    }
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
              <Link href="/markdown" passHref>
                <a className="text-blue-500 hover:underline underline-offset-1" target="_blank" rel="noopener noreferrer">
                  Markdown reference
                </a>
              </Link>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex rounded-md overflow-hidden">
              <input
                className="px-2 w-24 text-xs bg-neutral-200 border-neutral-400"
                value={fileName}
                onChange={e => setFileName(e.target.value)}
              />
              <a
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-2 py-1"
                download={fileName}
                href={downloadURL}
              >
                Download
              </a>
            </div>

            <a className="text-xs text-blue-500 hover:text-red-500 hover:underline underline-offset-1 cursor-pointer" target="_blank" rel="noopener noreferrer" onClick={() => {
              setValue(defaultValue);
              window.location.reload();
            }}>
              Reset editor
            </a>
          </div>
        </div>

        <Editor
          theme="vs-dark"
          defaultLanguage="markdown"
          defaultValue={typeof window !== 'undefined' && window.localStorage.getItem('blog-editor-value') || defaultValue}
          options={{
            acceptSuggestionOnEnter: "off",
            cursorBlinking: "phase",
            cursorSmoothCaretAnimation: true,
            wordWrap: "on",
            tabSize: 2,
            // minimap: { enabled: false }
          }}
          onChange={(newValue, event) => newValue && setValue(newValue)}
          // loading=
          onMount={(editor, monaco) => {
            // editorRef.current = editor
            // if (typeof window !== 'undefined') setValue(window.localStorage.getItem('blog-editor-value') || defaultValue);
          }}
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
