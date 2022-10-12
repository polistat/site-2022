import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

// import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from '../../lib/serialize';
import { getGovernorsSlugs, getGovernorsData } from "../../lib/states";
import { getCandidates, getTimeline, getAveragedPolls, getLatestPolls } from '../../lib/results';

import mapconfig from '../../mapconfig.json';

import components from '../../components/MdComponents';
import ChancesTimeline from '../../components/ChancesTimeline';

interface Props {
  params: ParsedUrlQuery | undefined;
  source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, string>> | null;
  frontMatter: { [key: string]: string } | null;
  stateName: string;
  candidates: any;
  averagedPolls: any;
  latestDate: string;
  latestPolls: any;
  racesTimeline: any;
}

export default function GovernorsStatePage({ params, source, frontMatter, stateName, candidates, averagedPolls, latestDate, latestPolls, racesTimeline }: Props) {
  // @ts-expect-error
  const noRace = !candidates.governor[params?.slug];

  return <>
    <Head>
      <title>{`${stateName} – Governors – ORACLE of Blair`}</title>
      <meta property="og:title" content={`${stateName} – Governors – ORACLE of Blair`} key="ogtitle"/>
    </Head>

    <main className="p-4 flex flex-col gap-8">
      <section className="px-8 py-8 container max-w-3xl flex flex-col gap-12 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col md:flex-row gap-16 justify-between items-center">
          <div className="flex flex-col gap-1.5 items-start">
            <h1 className="text-4xl font-bold">
              {stateName}
            </h1>
            {!noRace ?
              <p className="px-1.5 text-xl font-medium uppercase bg-amber-100 rounded-md">
                Governors race
              </p>
            :
              <p className="px-1.5 text-xl font-medium uppercase bg-neutral-200 rounded-md">
                No Governors race
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
                      {(parseFloat(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).BPI)).toFixed(2)}
                    </td>
                    <th className="px-2 uppercase text-left text-xs text-neutral-400 leading-4">
                      BPI
                    </th>
                  </tr>
                  <tr>
                    <td className="text-lg font-semibold">
                      {isNaN(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).weighted_polls) ? 'N/A'
                      : (parseFloat(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).weighted_polls)).toFixed(2)}
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
            <thead className="text-left uppercase text-neutral-400 leading-4">
              <tr>
                <th className="pr-2 py-3 font-medium">Candidate</th>
                <th className="px-2 py-3 font-medium">Predicted Vote %</th>
                <th className="pl-2 py-3 font-medium">Win Prob.</th>
              </tr>
            </thead>
            <tbody className="text-2xl font-normal">
              <tr>
                <td className="pr-4 pb-1">
                  {/*
                  // @ts-expect-error*/}
                  {candidates.governor[params.slug].filter((a:any) => { return a.party==='democrat' || a.party==='independent' })[0].name}
                </td>
                <td className="px-4 pb-1">
                  {(Number(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).lean)).toFixed(1)}%
                </td>
                <td
                  // @ts-expect-error
                  className={`pl-4 pb-1 font-bold ${candidates.governor[params.slug].find(a => { return a.party==='independent' }) ? 'text-amber-500' : 'text-blue-500'}`}
                >
                  {Number(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).dem_wins).toFixed(0)}%
                </td>
              </tr>

              <tr>
                <td className="pr-4 pb-1">
                  {/*
                  // @ts-expect-error*/}
                  {candidates.governor[params.slug].find(a => { return a.party==='republican' }).name}
                </td>
                <td className="px-4 pb-1">
                  {(100-Number(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).lean)).toFixed(1)}%
                </td>
                <td
                  className={`pl-4 pb-1 font-bold text-red-500`}
                >
                  {(100-Number(averagedPolls.find((a:any) => { return a.state_po===params?.slug && a.office==='Governor' }).dem_wins)).toFixed(0)}%
                </td>
              </tr>
            </tbody>
          </table>
        }
      </section>
      
      {!noRace && <>
        {source &&
          <section className="px-8 pb-4 container max-w-3xl border-2 shadow-sm rounded-2xl">
            <MDXRemote {...source} components={components}/>
          </section>
        }

        <section className="p-8 container max-w-3xl border-2 shadow-sm rounded-2xl">
          <h2 className="text-2xl font-bold">
            Chance of winning over time
          </h2>
          <p className="mt-2">
            We run our model twice a day. Explore how our prediction has changed over the course of the race.
          </p>

          <div className="mt-4">
            <ChancesTimeline
              dates={racesTimeline.dates}
              // @ts-expect-error
              timeline={racesTimeline.governor[params.slug].map(n => Number(n)/100)}
              labels={{
              // @ts-expect-error
                democrat: candidates.governor[params.slug].find((a:any) => { return a.party==='democrat' })?.name.split(' ').at(-1),
                // @ts-expect-error
                independent: candidates.governor[params.slug].find((a:any) => { return a.party==='independent' })?.name.split(' ').at(-1),
              // @ts-expect-error
                republican: candidates.governor[params.slug].find((a:any) => { return a.party==='republican' })?.name.split(' ').at(-1),
              }}
            />
          </div>
        </section>

        <section className="p-8 container max-w-3xl border-2 shadow-sm rounded-2xl">
          <h2 className="text-2xl font-bold">
            Recent polls
          </h2>
          <p className="text-sm mt-1">
            Polls consist of polls ranked C- and above gathered by <Link href="https://projects.fivethirtyeight.com/polls/" passHref><a className="text-blue-500 hover:underline underline-offset-1 decoration-blue-500" target="_blank" rel="noopener noreferrer">FiveThirtyEight</a></Link>.
          </p>

          {latestPolls.length === 0 ?
            <p className="text-sm text-neutral-400 mt-4">
              No polls to display.
            </p>
          :
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {latestPolls
              .sort((a:any,b:any) => new Date(b[0]?.end_date).valueOf() - new Date(a[0]?.end_date).valueOf())
              .map((a:any) => a.poll_id)
              .filter((v:any,i:any,a:any) => a.indexOf(v) === i) // remove duplicates
              .slice(0,16)
              .map((pollId:any) => {
                const poll = latestPolls.filter((a:any) => a.poll_id==pollId);
                return <li className="px-3 py-2 bg-neutral-100 rounded-lg" key={pollId}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Link href={poll[0].url} passHref>
                        <a className="hover:underline underline-offset-1" target="_blank" rel="noopener noreferrer">
                          <p className="font-medium leading-5">{poll[0].pollster}</p>
                        </a>
                      </Link>
                    </div>

                    <div className="flex gap-1.5">
                      <p className="text-sm font-medium uppercase">{poll[0].population}</p>
                      <p className="text-sm text-neutral-400 font-medium">{new Date(poll[0].end_date).toLocaleDateString('en-US', { month:'numeric', day:'numeric', year:'2-digit' })}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <p className="font-thin">
                        {/*
                        // @ts-expect-error */ }
                        {candidates.governor[params.slug].find((a:any)=>a.party==='democrat') ? poll.find((a:any) => a.party==='DEM')?.answer : poll.find((a:any) => a.party==='IND')?.answer}
                      </p>
                      {/*
                      // @ts-expect-error */ }
                      {candidates.governor[params.slug].find((a:any)=>a.party==='democrat') ?
                        <p className={`text-blue-500 font-normal`}>
                          {poll.find((a:any) => a.party==='DEM')?.pct}%
                        </p>
                      :
                        <p className={`text-amber-500`}>
                          {poll.find((a:any) => a.party==='IND')?.pct}%
                        </p>
                      }
                    </div>
                    <div className="flex gap-2">
                      <p className="font-thin">
                        {poll.find((a:any) => a.party==='REP')?.answer}
                      </p>
                      <p className="text-red-500 font-normal">
                        {poll.find((a:any) => a.party==='REP')?.pct}%
                      </p>
                    </div>
                  </div>
                </li>
              })}
            </ul>
          }
        </section>
      </>}
    </main>
  </>;
}

export async function getStaticPaths() {
  const paths = await getGovernorsSlugs();
  return {
    paths,
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{props: Props}> => {
  const candidates = await getCandidates();

  // @ts-expect-error
  if (!candidates.governor[params?.slug] && !mapconfig[params?.slug])
    return {
      // @ts-expect-error
      notFound: true,
    };
    
  const { averagedPolls, latestDate } = await getAveragedPolls();
  
  // @ts-expect-error
  const { timeline: timelineTimestamp, races: { dates:timelineDates, governor: { [params.slug]:raceTimeline} } } = await getTimeline();

  // @ts-expect-error
  const stateName = mapconfig[params?.slug].name;

  const { data, content } = await getGovernorsData((params?.slug as unknown) as string)
    .catch(err => {
      return { data:null, content:null };
    });
  const mdxSource = content&&data ? await serialize(content, { scope: data }) : null;

  const { latestPolls, latestDate:latestDate2 } = await getLatestPolls('governor', stateName);

  return {
    props: {
      params,
      source: mdxSource,
      frontMatter: data,
      stateName,
      candidates,
      averagedPolls,
      latestDate,
      latestPolls,
      // @ts-expect-error
      racesTimeline: { dates:timelineDates, governor: { [params.slug]:raceTimeline } },
    },
    // @ts-expect-error
    revalidate: 3600 // 1 hour
  };
}
