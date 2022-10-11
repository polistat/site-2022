import React from 'react';

export default function GovernorDistribution({ incumbents, averagedPolls }: { incumbents: any, averagedPolls: any }) {
  const dist = [
    Object.keys(incumbents.governor).filter((a:any) => incumbents.governor[a][0].party === 'democrat'),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.7 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.6 && a.lean/100<=0.7 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.55 && a.lean/100<=0.6 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.45 && a.lean/100<=0.55 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.4 && a.lean/100<=0.45 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100>0.3 && a.lean/100<=0.4 }).map((a:any) => a.state_po),
    averagedPolls.filter((a:any) => { return a.office==='Governor' && a.lean/100<=0.3 }).map((a:any) => a.state_po),
    Object.keys(incumbents.governor).filter((a:any) => incumbents.governor[a][0].party === 'republican'),
  ];

  const distStyles = [
    'stroke-[3px] stroke-blue-400 fill-neutral-50',
    'stroke-2 stroke-neutral-50 fill-blue-400',
    'stroke-2 stroke-neutral-50 fill-blue-300',
    'stroke-2 stroke-neutral-50 fill-blue-200',
    'stroke-2 stroke-neutral-50 fill-neutral-300',
    'stroke-2 stroke-neutral-50 fill-red-200',
    'stroke-2 stroke-neutral-50 fill-red-300',
    'stroke-2 stroke-neutral-50 fill-red-400',
    'stroke-[3px] stroke-red-400 fill-neutral-50',
  ];

  // const distLabels = ["","Solid D","Likely D","Lean D","Toss-up","Lean R","Likely R","Solid R",""];
  const distLabels = ["",">70%","60-70%","55-60%","50-55%","55-60%","60-70%",">70%",""];
  
  const [selectedBin, setSelectedBin] = React.useState<number|null>(null);

  return <>
    <svg
      strokeLinejoin="round"
      viewBox="0 0 1000 202"
    >

      {dist.map((a,i) => <>
        {/* backdrop */}
        <rect
          x={5+110*i}
          y={0}
          width={110}
          height={180}
          className={`${selectedBin===i ?
            (i>=5 ? 'fill-red-50/50' : i<=3 ? 'fill-blue-50/50' : 'fill-neutral-100/50')
          : 'fill-transparent'}`}
        />

        {/* baseline */}
        <path
          className="stroke-black stroke-2"
          d={`M ${5+10+110*i} 170 ${5-10+110*(i+1)} 170`}
        />

        {/* races */}
        {Array.from(Array(Math.floor(a.length/3)).keys()).map(b => <>
          <rect
            x={5+12+110*i+31*0}
            y={160-24-b*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
          <rect
            x={5+12+110*i+31*1}
            y={160-24-b*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
          <rect
            x={5+12+110*i+31*2}
            y={160-24-b*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
        </>)}
        {a.length%3 === 2 ? <>
          <rect
            x={5+12+110*i+15}
            y={160-24-(Math.floor(a.length/3))*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
          <rect
            x={5+12+110*i+46}
            y={160-24-(Math.floor(a.length/3))*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
        </> : a.length%3 === 1 ? <>
          <rect
            x={5+12+110*i+31*1}
            y={160-24-(Math.floor(a.length/3))*34}
            className={`w-[24px] h-[24px] ${distStyles[i]}`}
          />
        </> : null}
        
        {/* labels */}
        {selectedBin===i && <>
          <text
            x={5+10+110*i+Math.floor((85-10*distLabels[i].length)/2)}
            y={200}
            className={`text-lg font-medium uppercase ${i>=5 ? 'fill-red-500' : i<=3 ? 'fill-blue-500' : 'fill-neutral-500'}`}
          >
            {distLabels[i]}
          </text>
        </>}

        {/* hover */}
        <rect
          x={5+110*i}
          y={0}
          width={110}
          height={170}
          className={`fill-transparent`}
          onMouseEnter={() => setSelectedBin(i)}
          onMouseLeave={() => setSelectedBin(null)}
        />
      </>)}
    </svg>
  </>;
}
