import Head from 'next/head';
import { motion } from 'framer-motion';

import GovernorMap from '../../components/GovernorMap';
import GovernorDistribution from '../../components/GovernorDistribution';
import { getCandidates, getIncumbents, getAveragedPolls } from '../../lib/results';

export default function SenatePage({ latestDate, candidates, averagedPolls, incumbents }: { latestDate:any, candidates:any, averagedPolls:any, incumbents:any }) {
  return <>
    <Head>
      <title>2022 Governors Forecast – ORACLE of Blair</title>
      <meta name="description" content="ORACLE's forecast for the 2022 gubernatorial elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta itemProp="description" content="ORACLE's forecast for the 2022 gubernatorial elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta property="og:title" content="2022 Governors Forecast – ORACLE of Blair"/>
      <meta property="og:description" content="ORACLE's forecast for the 2022 gubernatorial elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
      <meta name="twitter:title" content="2022 Governors Forecast – ORACLE of Blair"/>
      <meta name="twitter:description" content="ORACLE's forecast for the 2022 gubernatorial elections. The ORACLE (Overall Results of an Analytical Consideration of the Looming Elections) of Blair is a senior class project at Montgomery Blair High School with the goal of modeling the 2022 senate and gubernatorial elections."/>
    </Head>

    <main className="p-4 flex flex-col gap-8">
      <section className="p-8 container max-w-4xl flex flex-col gap-4 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="px-1.5 text-xl text-center font-medium uppercase bg-amber-100 rounded-md">
            The Governors
          </h1>
          <p className="text-4xl text-center font-serif">
            The 2022 <span className="font-extrabold">Governor elections</span>
          </p>
        </div>
          
        <div className="flex gap-2 items-center justify-center">
          <motion.div
            className="h-2 w-2 rounded-full bg-green-400"
            animate={{ opacity: [0,1,0] }}
            transition={{ duration: 2, repeat: Infinity, }}
          />
          <p className="text-sm text-center text-neutral-400 uppercase font-bold">
            Updated {!isNaN(new Date(latestDate).valueOf()) ? new Date(`${latestDate}T00:00:00.000-05:00`).toLocaleDateString('en-US') : latestDate}
          </p>
        </div>

        <div className="-ml-10">
          <GovernorMap
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
          A spread of all governor positions based on likelihood of winning based on our model.
        </p>

        <div className="rounded-lg overflow-hidden mt-6">
          <GovernorDistribution
            incumbents={incumbents}
            averagedPolls={averagedPolls}
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

  return {
    props: {
      latestDate,
      candidates,
      averagedPolls,
      incumbents
    },
    revalidate: 3600 // 1 hour
  };
}
