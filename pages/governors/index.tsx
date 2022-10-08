import Head from 'next/head';

import GovernorMap from '../../components/GovernorMap';
import { getCandidates, getIncumbents, getAveragedPolls } from '../../lib/results';

export default function SenatePage({ latestDate, candidates, averagedPolls, incumbents }: { latestDate:any, candidates:any, averagedPolls:any, incumbents:any }) {
  return <>
    <Head>
      <title>2022 Governors Forecast – ORACLE of Blair</title>
      {/* <meta name="description" content="" /> */}
    </Head>

    <main className="p-4 flex flex-col gap-8">
      <section className="px-4 pt-8 pb-4 container max-w-4xl flex flex-col gap-4 bg-neutral-50 border-2 shadow-md rounded-2xl">
        <div className="flex flex-col gap-1.5 items-center">
          <h1 className="px-1.5 text-xl text-center font-medium uppercase bg-amber-100 rounded-md">
            The Governors
          </h1>
          <p className="text-4xl text-center font-serif">
            A blurb about the <span className="font-extrabold">Governor elections</span>
          </p>
        </div>

        <GovernorMap
          candidates={candidates}
          averagedPolls={averagedPolls}
          incumbents={incumbents}
        />
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
