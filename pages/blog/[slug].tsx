import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from '../../lib/serialize';
import { getBlogSlugs, getBlogData } from "../../lib/blog";

interface Props {
  params: ParsedUrlQuery | undefined;
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
  frontMatter: { [key: string]: string }
}

export default function BlogPost({ source, frontMatter }: Props) {
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

    <div className="container max-w-3xl">
      <header className="pt-12 pb-8 px-8">
        <div className="flex justify-center">
          <p className="px-1.5 text-sm text-center font-medium uppercase bg-amber-100 rounded-md">
            Blog
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
      </header>

      <main className="pt-4 pb-8 px-8">
        <MDXRemote {...source} /*components={components}*//>
      </main>
    </div>
  </>;
}

export async function getStaticPaths() {
  const paths = await getBlogSlugs();
  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{props: Props}> => {
  const paths = await getBlogSlugs();
  if (!paths.find((a:any) => a.params.slug===params?.slug))
    return {
      // @ts-expect-error
      notFound: true,
    };

  const { data, content } = await getBlogData((params?.slug as unknown) as string);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: data
    },
    // @ts-expect-error
    revalidate: 3600 // 1 hour
  };
}