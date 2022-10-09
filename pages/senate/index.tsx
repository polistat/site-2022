import Head from 'next/head';

import SenateMap from '../../components/SenateMap';
import SenateDistribution from '../../components/SenateDistribution';
import { getCandidates, getIncumbents, getAveragedPolls, getOverallSenate } from '../../lib/results';

export default function SenatePage({ latestDate, candidates, incumbents, averagedPolls, overallSenate }: { latestDate:any, candidates:any, incumbents:any, averagedPolls:any, overallSenate:any }) {
  return <>
    <Head>
      <title>2022 Senate Forecast – ORACLE of Blair</title>
      <meta name="description" content="ORACLE's forecast for the 2022 senate elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta itemProp="description" content="ORACLE's forecast for the 2022 senate elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta property="og:title" content="2022 Senate Forecast – ORACLE of Blair"/>
      <meta property="og:description" content="ORACLE's forecast for the 2022 senate elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta name="twitter:title" content="2022 Senate Forecast – ORACLE of Blair"/>
      <meta name="twitter:description" content="ORACLE's forecast for the 2022 senate elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
    </Head>

    <main className="p-4 flex flex-col gap-8">
      <section className="p-8 container max-w-4xl flex flex-col gap-4 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="px-1.5 text-xl text-center font-medium uppercase bg-amber-100 rounded-md">
            The Senate
          </h1>
          <p className="text-4xl text-center font-serif">
            A blurb about the <span className="font-extrabold">Senate elections</span>
          </p>
        </div>

        <div className="-ml-10">
          <SenateMap
            candidates={candidates}
            averagedPolls={averagedPolls}
            incumbents={incumbents}
          />
        </div>
      </section>

      <section className="p-8 container max-w-3xl border-2 shadow-sm rounded-2xl">
        <h2 className="text-2xl font-bold">
          Seat distribution
        </h2>
        <p className="mt-2">
          A range of scenarios of the seats that each party will win in our model's 10,000 simulations.
        </p>

        <div className="rounded-lg overflow-hidden mt-8">
          <SenateDistribution
            overallSenate={overallSenate}
          />
        </div>
      </section>
    </main>

    <footer>
    </footer>
  </>;
}

export async function getStaticProps() {
  const candidates = await getCandidates();
  const incumbents = await getIncumbents();
  const { averagedPolls, latestDate } = await getAveragedPolls();
  const { overallSenate, latestDate:latestDate2 } = await getOverallSenate();

  return {
    props: {
      latestDate,
      candidates,
      incumbents,
      averagedPolls,
      overallSenate
    },
    revalidate: 3600 // 1 hour
  };
}
