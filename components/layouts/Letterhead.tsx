import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  date?: string;
  // author?: {
  //   name: string;
    // avatar: string;
    // url: string;
  // };
  includeMeta?: boolean;
}


export default function Letterhead(props: Props) {
  const {
    title,
    description,
    date,
    // author,
    includeMeta = true,
    ...rest
  }: Props = props;
  
  return (
    <>
      {includeMeta &&
        <Head>
          <title>{`${title} – ORACLE of Blair`}</title>
          <meta property="og:title" content={`${title} – ORACLE of Blair`} key="ogtitle"/>
          <meta name="description" content={description}/>
          <meta property="og:description" content={description} key="ogdesc"/>
        </Head>
      }

      <div className="container max-w-3xl">
        <div className="pt-12 pb-8 px-8 text-center">
          <h1 className="text-4xl font-extrabold font-serif">{title}</h1>
          <p className="mt-2 text-lg">{description}</p>

          <div className="mt-2 flex gap-2 items-center justify-center">
            {/* {author &&
              <a href={author.url}>
                <span className="py-1 pr-3 pl-2 flex items-center gap-2 bg-slate-200 rounded-2xl">
                  <img src={author.avatar} width={24} height={24} className="rounded-full"/>
                  {author.name}
                </span>
              </a>
            } */}
            {date &&
              <span className="text-sm text-neutral-400 italic">{date}</span>
            }
          </div>
        </div>

        <div className="pt-4 pb-8 px-8" {...rest}/>
      </div>
    </>
  );
}