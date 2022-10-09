import React from 'react';

export default function SenateDistribution({ overallSenate }: { overallSenate: any }) {
  const totalSimulations = overallSenate.reduce((sum:number, a:any) => sum+Number(a.occurrences), 0);
  const average = overallSenate.reduce((sum:number, a:any) => sum+Number(a.demSeats)*Number(a.occurrences), 0) / totalSimulations;
  const startSeats = Math.round(average)-14;
  const endSeats = Math.round(average)+14;
  const maxOccurrences = Math.max(...overallSenate.filter((a:any) => Number(a.demSeats)>=startSeats && Number(a.demSeats)<=endSeats).map((a:any) => Number(a.occurrences))); // in displayed range

  const [selectedBin, setSelectedBin] = React.useState<number|null>(null);

  return <>
    <svg
      viewBox="0 50 1000 600"
    >
      {/* backdrop */}
      <rect
        x={0}
        y={50}
        width={7+34*13}
        height={400}
        className="fill-red-200/50"
      />
      <text
        x={30}
        y={110}
      >
        <tspan
          className="text-2xl font-normal fill-red-800/75"
        >
          Republicans win in
        </tspan>
        <tspan
          className="text-3xl font-medium fill-red-800/75"
          dx="-7em" dy="1em"
        >
          {(100-average).toFixed(1)}% of our simulations
        </tspan>
      </text>
      <rect
        x={7+34*13}
        y={50}
        width={1000-(7+34*13)}
        height={400}
        className="fill-blue-200/50"
      />
      <text
        x={770}
        y={110}
      >
        <tspan
          className="text-2xl font-normal fill-blue-800/75"
          
        >
          Democrats win in
        </tspan>
        <tspan
          className="text-3xl font-medium fill-blue-800/75"
          dx="-11.6em" dy="1em"
        >
          {average.toFixed(1)}% of our simulations
        </tspan>
      </text>

      {/* majority label */}
      <path
        className={`${selectedBin ? 'stroke-black/10' : 'stroke-black'} stroke-2`}
        d={`M ${7+34*13} 125 ${7+34*13} 450`}
      />
      <text
        x={7+34*13-45}
        y={115}
        className={`text-lg ${selectedBin ? 'fill-black/10' : 'fill-black'} font-thin uppercase`}
      >
        Majority
      </text>

      {/* bars */}
      {Array.from(Array(29).keys()).map(a => <>
        <rect
          x={7+34*a}
          y={450-Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))}
          width={34}
          height={Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))}
          className={`stroke-2 stroke-white ${
            (!selectedBin || selectedBin === startSeats+a) ?
              (startSeats+a>=50 ? 'fill-blue-400' : 'fill-red-400')
            :
              'fill-transparent'
          }`}
        />
      </>)}

      {/* text */}
      {Array.from(Array(29).keys()).map(a => <>
        {startSeats+a === selectedBin && <>
          <rect
            x={7+34*a-40}
            y={450-Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))-27}
            className='w-[116px] h-[21px] fill-white/75'
          />
          <text
            x={(7+34*a-35)<0 ? 0 : (7+34*a-35)>892 ? 892 : 7+34*a-35}
            y={450-Math.round(300*(overallSenate[startSeats+a].occurrences/maxOccurrences))-10}
            className="text-lg fill-black font-medium"
          >
            {(overallSenate.find((b:any) => Number(b.demSeats)===startSeats+a).occurrences / totalSimulations*100).toFixed(1)}% chance
          </text>
        </>}

        {!selectedBin && ((startSeats+a)%2===0 || (startSeats+a)===50) && <>
          <text
            x={7+34*a+7}
            y={450+22}
            className={`${startSeats+a===50 ? 'fill-neutral-400' : startSeats+a>50 ? 'fill-blue-500' : 'fill-red-500'} font-medium`}
          >
            {startSeats+a>=50 ? startSeats+a : 100-(startSeats+a)}
          </text>
        </>}

        {startSeats+a === selectedBin && <>
          <text
            x={(7+34*a-27)<0 ? 0 : (7+34*a-27)>912 ? 912 : 7+34*a-27}
            y={450+22}
            className={`text-md ${startSeats+a>=50 ? 'fill-blue-500 font-medium' : 'fill-neutral-400 font-thin'} uppercase`}
          >
            {startSeats+a} D seats
          </text>
          <text
            x={(7+34*a-27)<0 ? 0 : (7+34*a-27)>912 ? 912 : 7+34*a-27}
            y={450+40}
            className={`text-md ${startSeats+a>=50 ? 'fill-neutral-400 font-thin' : 'fill-red-500 font-medium'} uppercase`}
          >
            {100-(startSeats+a)} R seats
          </text>
        </>}
      </>)}
      
      {/* hover */}
      {Array.from(Array(29).keys()).map(a => <>
        <rect
          x={7+34*a}
          y={150}
          className='w-[34px] h-[300px] fill-transparent'
          onMouseEnter={() => setSelectedBin(startSeats+a)}
          onMouseLeave={() => setSelectedBin(null)}
        />
      </>)}

      {/* baseline */}
      <path
        className="stroke-black stroke-2"
        d="M 0 450 1000 450"
      />
      
      {/* legend */}
      <circle
        cx={315}
        cy={525}
        r={11}
        className="fill-red-400 stroke-2 stroke-white"
      />
      <text
        x={335}
        y={531}
        className="text-xl font-thin fill-black"
      >
        Republicans win
      </text>
      <circle
        cx={525}
        cy={525}
        r={11}
        className="fill-blue-400 stroke-2 stroke-white"
      />
      <text
        x={545}
        y={531}
        className="text-xl font-thin fill-black"
      >
        Democrats win
      </text>

      {/* description */}
      <text
        x="50%"
        y={580}
        className="text-lg font-thin fill-black"
      >
        <tspan dx="-25em">When the two parties hold 50 seats each, control of the Senate is determined by the party of the vice president. </tspan>
        <tspan dx="-46.5em" dy="1.2em">In the 2022 election, Democrats will control the Senate if each party ends up holding 50 seats.</tspan>
      </text>
    </svg>
  </>;
}
