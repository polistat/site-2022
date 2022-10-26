import React from 'react';

export default function ChancesTimeline({ dates, timeline, labels }: { dates: string[], timeline: number[], labels?: any }) {
  const demTimeline = timeline;
  const repTimeline = timeline.map((a) => 1-a);

  const [selectedIndex, setSelectedIndex] = React.useState<number|null>(null);

  React.useEffect(() => {
    if (selectedIndex===null) setSelectedIndex(timeline.length-1)
  }, [selectedIndex, timeline]);

  return <>
    <svg
      viewBox="2 0 1000 600"
      strokeLinejoin="round"
    >
      {/* y axis */}
      {Array.from(Array(11).keys()).map((n:number) => <>
        <path
          className="stroke-black/50 stroke-1"
          d={`M 60 ${50+50*n} 1000 ${50+50*n}`}
          strokeDasharray="4,8"
          key={`gridlineY${n}`}
        />
        <text
          x={34-(100-n*10).toString().length*8}
          y={50+7+50*n}
          className="text-xl font-thin fill-black"
          key={`axisLabel${n}`}
        >
          {100-n*10}
        </text>
      </>)}

      {/* lines */}
      <path
        className={`fill-transparent ${labels?.democrat==='Murkowski' ? 'stroke-red-500' : labels?.independent ? 'stroke-amber-500' : 'stroke-blue-500' } stroke-[4px]`}
        d={`M 60 ${550-demTimeline[0]*500} ${demTimeline.slice(1).map((a,i) => `L ${60+(i+1)*940/(demTimeline.length-1)} ${550-a*500}`).join(' ')}`}
      />
      <path
        className="fill-transparent stroke-red-500 stroke-[4px]"
        d={`M 60 ${550-repTimeline[0]*500} ${repTimeline.slice(1).map((a,i) => `L ${60+(i+1)*940/(repTimeline.length-1)} ${550-a*500}`).join(' ')}`}
      />

      {/* slider */}
      {selectedIndex!==null && <>
        <path
          className="fill-transparent stroke-neutral-400/50 stroke-[4px]"
          d={`M ${60+(selectedIndex)*940/(demTimeline.length-1)} 30 L ${60+(selectedIndex)*940/(demTimeline.length-1)} 570`}
        />
        <text
          x={Math.max(60+(selectedIndex)*940/(demTimeline.length-1)-90-(labels?.democrat || labels?.independent || 'DEM').length*14, 58)}
          // y={550-demTimeline[selectedIndex]*500+(demTimeline[selectedIndex]>0.9 ? 30 : demTimeline[selectedIndex]<0.2 ? -20 : 30)}
          y={550-demTimeline[selectedIndex]*500+(Math.abs(demTimeline[selectedIndex]-repTimeline[selectedIndex])>0.2 ? (demTimeline[selectedIndex]>=0.5?40:-30) : (demTimeline[selectedIndex]>=0.5?-30:40))}
          className={`text-2xl font-semibold ${labels?.democrat==='Murkowski' ? 'fill-red-500' : labels?.independent ? 'fill-amber-500' : 'fill-blue-500' }`}
        >
          {labels?.democrat || labels?.independent || 'DEM'} {(demTimeline[selectedIndex]*100).toFixed(1)}%
        </text>
        <text
          x={Math.max(60+(selectedIndex)*940/(repTimeline.length-1)-90-(labels?.republican || 'REP').length*14, 58)}
          // y={550-repTimeline[selectedIndex]*500+(repTimeline[selectedIndex]>0.9 ? 30 : repTimeline[selectedIndex]<0.2 ? -20 : -20)}
          y={550-repTimeline[selectedIndex]*500+(Math.abs(demTimeline[selectedIndex]-repTimeline[selectedIndex])>0.2 ? (repTimeline[selectedIndex]>=0.5?40:-30) : (repTimeline[selectedIndex]>=0.5?-30:40))}
          className="text-2xl font-semibold fill-red-500"
        >
          {labels?.republican || 'REP'} {(repTimeline[selectedIndex]*100).toFixed(1)}%
        </text>

        <text
          x={Math.min(60+(selectedIndex)*940/(repTimeline.length-1)-54, 892)}
          y={595}
          className="text-lg font-semibold fill-neutral-400"
        >
          {new Date(dates[selectedIndex]).toLocaleDateString('en-US', { month:'numeric',day:'numeric',year:'numeric'})}
        </text>
      </>}

      {/* hover */}
      {Array.from(Array(timeline.length).keys()).map(n => <>
        <rect
          x={60+(n-0.5)*940/(timeline.length-1)}
          y={0}
          width={940/(timeline.length-1)}
          height={600}
          className='fill-transparent'
          onMouseEnter={() => setSelectedIndex(n)}
          // onMouseLeave={() => setSelectedIndex(null)}
          key={`hover${n}`}
        />
      </>)}
    </svg>
  </>;
}
