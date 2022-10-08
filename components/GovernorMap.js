import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import mapconfig from '../mapconfig.json';

export default function GovernorMap({ candidates, averagedPolls, incumbents }) {
  const [cursorPosition, setCursorPosition] = React.useState({ top: 0, left: 0 });
  const [selectedState, setSelectedState] = React.useState(null);

  const onMouseMove = e => {
    setCursorPosition({ top: e.clientY+30, left: e.clientX })
  };

  return <>
    <svg
      viewBox="40 0 1000 589"
      strokeLinejoin="round"
      onMouseMove={onMouseMove}
    >
      {/* STATES -- separated so strokes don't overlap */}
      {/* base */}
      {Object.entries(mapconfig).map(([stateId, state]) =>
        <path
          id={stateId}
          dataname={state.name}
          dataid={stateId}
          d={state.path}
          // className="fill-neutral-200 stroke-2 stroke-white"
          className={`${
            averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }) ?
            (averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }).lean>50 ? 'fill-blue-50'
              : averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }).lean<50 ? 'fill-red-50'
              : 'fill-white'
            ) : 'fill-neutral-100'
          } stroke-2 stroke-neutral-300`}
          key={`state${stateId}`}
        />
      )}
      
      {/* on hover */}
      {Object.entries(mapconfig).map(([stateId, state]) =>
        <Link href={`/governors/${stateId}`} passHref>
          <a>
            <path
              id={stateId}
              dataname={state.name}
              dataid={stateId}
              d={state.path}
              className={`${selectedState===stateId ? 'opacity-100' : 'opacity-0'} cursor-pointer fill-transparent stroke-[3px] stroke-neutral-600`}
              key={`state${stateId}hover`}
              onMouseEnter={() => setSelectedState(stateId)}
              onMouseLeave={() => setSelectedState(null)}
            />
        </a>
      </Link>
      )}

      {Object.entries(mapconfig).map(([stateId, state]) => <>
        <Link href={`/governors/${stateId}`} passHref>
          <a>
            <rect
              x={state.textX-16}
              y={state.textY-15}
              className={`
                w-[32px] h-[30px] cursor-pointer
                ${averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }) ? (
                  averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }).lean>50 ? 'stroke-2 stroke-white fill-blue-300'
                  : averagedPolls.find(a => { return a.state_po===stateId && a.office==='Governor' }).lean<50 ? 'stroke-2 stroke-white fill-red-300'
                  : 'stroke-2 stroke-white fill-neutral-300'
                )
                : (
                  incumbents.governor[stateId][0].party==='republican' ? 'stroke-2 stroke-red-400 fill-neutral-100'
                  : incumbents.governor[stateId][0].party==='democrat' ? 'stroke-2 stroke-blue-400 fill-neutral-100'
                  : 'stroke-2 fill-neutral-100 stroke-neutral-300'
                )}
              `}
              onMouseEnter={() => setSelectedState(stateId)}
              onMouseLeave={() => setSelectedState(null)}
              onClick={() => Router.push(`/governors/${stateId}`)}
              key={`state${stateId}rect`}
            />
            <text
              className={`font-medium text-lg fill-neutral-600 select-none cursor-pointer`}
              x={state.textX-13}
              y={state.textY+6}
              key={`state${stateId}label`}
              onMouseEnter={() => setSelectedState(stateId)}
              onMouseLeave={() => setSelectedState(null)}
              onClick={() => Router.push(`/governors/${stateId}`)}
            >
              {stateId}
            </text>
            {/* <rect
              x={state.textX}
              y={state.textY}
              className="w-[1px] h-[1px] stroke-2 stroke-red-400 fill-transparent"
            /> */}
        </a>
      </Link>
      </>)}

      {/* <path // Not included bc isn't a state
        id="DC"
        data-name="District of Columbia"
        data-id="DC"
        d="m 878.17597,229.14834 0.48532,0.38825 0.19412,0.0971 0.19413,-0.0971 0.19413,0.0971 0.67944,0.38825 0.19413,0.29119 0,0.67944 0.19412,0.38825 1.26182,-2.32951 -1.35888,-0.77651 -1.65007,0.0971 -0.38826,0.7765 z"
        className="stroke-2 stroke-white fill-neutral-200" /> */}
        
      {/* LEGEND */}
      <rect
        x={760}
        y={36}
        className='w-[24px] h-[24px] cursor-pointer stroke-2 stroke-white fill-neutral-300'
      />
      <rect
        x={790}
        y={36}
        className='w-[24px] h-[24px] cursor-pointer stroke-2 stroke-neutral-300 fill-neutral-50'
      />
      <path
        className="stroke-neutral-500 fill-transparent stroke-1"
        d="M720 70 A 30 30 0 0 0 760 75 M760 75 765 80 767 68 755 70Z"
      />
      <path
        className="stroke-neutral-500 fill-transparent stroke-1"
        d="M850 70 A 30 30 0 0 1 810 75 M810 75 815 70 803 68 805 80Z"
      />
      <text
        className="font-thin italic text-md fill-neutral-500 select-none"
        x={715}
        y={25}
      >
        <tspan dx="-3em" dy="1.1em">Seat up for</tspan>
        <tspan dx="-4.2em" dy="1.1em">election</tspan>
      </text>
      <text
        className="font-thin italic text-md fill-neutral-500 select-none"
        x={875}
        y={25}
      >
        <tspan dx="-3em" dy="1.1em">Not up for</tspan>
        <tspan dx="-4.2em" dy="1.1em">election</tspan>
      </text>
    </svg>
    
    {selectedState &&
      <div
        className="fixed -translate-x-1/2 p-2 flex flex-col gap-4 bg-theme-surface text-theme-onSurface rounded-lg border-2 border-neutral-300 shadow-sm z-20"
        style={{ ...cursorPosition }}
      >
        {averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }) && <div>
          <p className="font-bold">
            {mapconfig[selectedState].name}
          </p>

          <table className="table-auto">
            <thead className="text-left uppercase text-[0.6rem] text-neutral-400 leading-3">
              <tr>
                <th className="pr-2 py-1">Candidate</th>
                <th className="px-2 py-1">Pred. Vote %</th>
                <th className="pl-2 py-1">Win Prob.</th>
              </tr>
            </thead>
            <tbody className="text-sm font-thin">
              <tr>
                <td className="pr-2 pb-0.5">
                  {candidates.governor[selectedState].find(a => { return a.party==='democrat' }).name}
                </td>
                <td className="px-2 pb-0.5">
                  {parseFloat(parseFloat(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }).lean).toFixed(1))}%
                </td>
                {/* <td className="px-2 pb-0.5">{candidate.votePercent<1 ? "<1" : candidate.votePercent>99 ? ">99" : candidate.votePercent}%</td> */}
                <td
                  className={`pl-2 pb-0.5 font-bold text-blue-500`}
                >
                  {parseFloat(parseFloat(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }).dem_wins).toFixed(0))}%
                  {/* {candidate.winPercent<1 ? "<1" : candidate.winPercent>99 ? ">99" : candidate.winPercent}% */}
                </td>
              </tr>

              <tr>
                <td className="pr-2 pb-0.5">
                  {candidates.governor[selectedState].find(a => { return a.party==='republican' }).name}
                </td>
                <td className="px-2 pb-0.5">
                  {parseFloat(parseFloat(100-averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }).lean).toFixed(1))}%
                </td>
                {/* <td className="px-2 pb-0.5">{candidate.votePercent<1 ? "<1" : candidate.votePercent>99 ? ">99" : candidate.votePercent}%</td> */}
                <td
                  className={`pl-2 pb-0.5 font-bold text-red-500`}
                >
                  {parseFloat(parseFloat(100-averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }).dem_wins).toFixed(0))}%
                  {/* {candidate.winPercent<1 ? "<1" : candidate.winPercent>99 ? ">99" : candidate.winPercent}% */}
                </td>
              </tr>

              {/* averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }) */}
            </tbody>
          </table>
        </div>}

        {!averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Governor' }) && <div>
          <p className="font-bold">
            {mapconfig[selectedState].name}
          </p>
          <p className="text-sm text-neutral-400">
            No races
          </p>
        </div>}
      </div>
    }
  </>;
}
