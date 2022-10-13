import React from 'react';

export default function SenateDistributionPreview({ overallSenate }: { overallSenate: any }) {
  const totalSimulations = overallSenate.reduce((sum:number, a:any) => sum+Number(a.occurrences), 0);
  const average = overallSenate.reduce((sum:number, a:any) => sum+Number(a.demSeats)*Number(a.occurrences), 0) / totalSimulations;
  const startSeats = Math.round(average)-14;
  const endSeats = Math.round(average)+14;
  const maxOccurrences = Math.max(...overallSenate.filter((a:any) => Number(a.demSeats)>=startSeats && Number(a.demSeats)<=endSeats).map((a:any) => Number(a.occurrences))); // in displayed range

  const demWinChance = overallSenate.filter((a:any) => Number(a.demSeats)>=50).reduce((sum:number, a:any) => sum+Number(a.occurrences), 0) / totalSimulations;

  return <>
    <svg
      strokeLinejoin="round"
      viewBox="0 120 1000 200"
    >
      {/* backdrop */}
      <rect
        x={0}
        y={100}
        width={7+34*(50-startSeats)}
        height={400}
        className="fill-red-200/100"
      />
      <rect
        x={7+34*(50-startSeats)}
        y={50}
        width={1000-(7+34*(50-startSeats))}
        height={400}
        className="fill-blue-200/100"
      />
      
      {/* bars */}
      {Array.from(Array(29).keys()).map(a => <>
        <rect
          x={7+34*a}
          y={450-Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))}
          width={34}
          height={Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))}
          className={`stroke-[8px] stroke-white ${
            'fill-transparent'
          } opacity-50`}
          key={`bars${a}`}
        />
      </>)}

      {/* labels */}
      <text
        x={30}
        y={200}
        className="text-5xl font-normal fill-red-800/75"
      >
        R Majority
      </text>
      <text
        x={30}
        y={295}
        className="text-8xl font-medium fill-red-800/75"
      >
        {(100-demWinChance*100).toFixed(1)}%
      </text>
      <text
        x={750}
        y={200}
        className="text-5xl font-normal fill-blue-800/75"
      >
        D Majority
      </text>
      <text
        x={700}
        y={295}
        className="text-8xl font-medium fill-blue-800/75"
      >
        {(demWinChance*100).toFixed(1)}%
      </text>
    </svg>
  </>;
}
