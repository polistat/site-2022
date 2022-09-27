import Head from 'next/head';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import { getSenateSlugs, getSenateData } from "../../lib/states";

interface Props {
  params: ParsedUrlQuery | undefined;
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>>;
  frontMatter: { [key: string]: string }
}

export default function SenateStatePage({ params, source, frontMatter }: Props) {
  const {
    name,
  } = frontMatter;
  const noRace = false;

  return <>
    <Head>
      <title>{`${name} – Senate – ORACLE of Blair`}</title>
      {/* <meta name="description" content="" /> */}
    </Head>

    <main className="p-4 flex flex-col gap-8">
      <section className="px-8 py-8 container max-w-3xl flex flex-col gap-12 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col md:flex-row gap-16 justify-between items-center">
          <div className="flex flex-col gap-1.5 items-start">
            <h1 className="text-4xl font-bold">
              {name}
            </h1>
            {!noRace ?
              <p className="px-1.5 text-xl font-medium uppercase bg-amber-100 rounded-md">
                Senate race
              </p>
            :
              <p className="px-1.5 text-xl font-medium uppercase bg-neutral-200 rounded-md">
                No Senate races
              </p>
            }
          </div>
          
          <div className={`${!noRace ? '-mr-4' : null} flex gap-8 justify-center`}>
            <img src={`/states/${params?.slug}.svg`} className="w-36"/>

            {!noRace &&
              <table className="table-auto self-center">
                <tbody>
                  <tr>
                    <td className="text-lg font-semibold">
                      00.00
                    </td>
                    <th className="px-2 uppercase text-left text-xs text-neutral-400 leading-4">
                      BPI
                    </th>
                  </tr>
                  <tr>
                    <td className="text-lg font-semibold">
                      00.00
                    </td>
                    <th className="px-2 uppercase text-left text-xs text-neutral-400 leading-4">
                      Poll avg.
                    </th>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>
        
        {!noRace &&
          <table className="table-auto">
            <thead className="text-left text-sm md:text-md uppercase text-neutral-400 leading-4">
              <tr>
                <th className="pr-4 py-3 font-medium">Candidate</th>
                <th className="px-4 py-3 font-medium">Predicted Vote %</th>
                <th className="pl-4 py-3 font-medium">Win Prob.</th>
              </tr>
            </thead>
            <tbody className="text-xl md:text-2xl font-normal">
              <tr>
                <td className="pr-4 pb-1">Candidate 1</td>
                <td className="px-4 pb-1">00%</td>
                <td
                  className={`pl-4 pb-1 font-bold text-red-500`}
                >
                  00%
                </td>
              </tr>
              <tr>
                <td className="pr-4 pb-1">Candidate 1</td>
                <td className="px-4 pb-1">00%</td>
                <td
                  className={`pl-4 pb-1 font-bold text-red-500`}
                >
                  00%
                </td>
              </tr>
            </tbody>
          </table>
        }
        {/* <table className="table-auto">
          <thead className="text-left uppercase text-neutral-400 leading-3">
            <tr>
              <th className="pr-4 py-3 font-medium">Incumbents</th>
              <th className="px-4 py-3 font-medium">Next election</th>
            </tr>
          </thead>
          <tbody className="text-2xl font-normal">
            <tr>
              <td className="pr-4 pb-1">Senator 1</td>
              <td className="px-4 pb-1">20XX</td>
            </tr>
            <tr>
              <td className="pr-4 pb-1">Senator 2</td>
              <td className="px-4 pb-1">20XX</td>
            </tr>
          </tbody>
        </table> */}
      </section>
      
      {!noRace && <>
        <section className="px-8 pb-4 container max-w-3xl border-2 shadow-sm rounded-2xl">
          <MDXRemote {...source} /*components={components}*//>
        </section>

        <section className="p-8 container max-w-3xl border-2 shadow-sm rounded-2xl">
          <h2 className="text-2xl font-bold">
            Chance of winning over time
          </h2>
          <p className="mt-2">
            We run our model twice a day. Explore how our prediction has changed over the course of the race.
          </p>
          <div className="h-72 bg-neutral-100 rounded-3xl mt-6"/>
        </section>

        <section className="container max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border-2 shadow-sm rounded-2xl">
            <h2 className="text-2xl md:text-xl font-bold">
              Past election history
            </h2>
            <div className="h-96 bg-neutral-100 rounded-xl mt-4"/>
          </div>

          <div className="p-8 border-2 shadow-sm rounded-2xl">
            <h2 className="text-2xl md:text-xl font-bold">
              Recent polls
            </h2>
            <div className="h-96 bg-neutral-100 rounded-xl mt-4"/>
          </div>
        </section>
      </>}
    </main>
  </>;
}

export async function getStaticPaths() {
  const paths = getSenateSlugs();
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{props: Props}> => {
  const { data, content } = await getSenateData((params?.slug as unknown) as string);
  const mdxSource = await serialize(content, { scope: data });
  // TODO: fetch prediction data
  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: data
    }
  };
}
