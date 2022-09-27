import React from 'react';
import Router from 'next/router';

import mapconfig from '../mapconfig.json';
import senateData from '../content/senateData.json';

export default function SenateMap() {
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
          className={`${selectedState===stateId ? 'fill-theme-surface' : 'fill-transparent'} stroke-2 stroke-neutral-300`}
          key={stateId}
        />
      )}
      
      {/* on hover */}
      {Object.entries(mapconfig).map(([stateId, state]) =>
        <path
          id={stateId}
          dataname={state.name}
          dataid={stateId}
          d={state.path}
          className={`${selectedState===stateId ? 'opacity-100' : 'opacity-0'} cursor-pointer fill-transparent stroke-[3px] stroke-neutral-600`}
          key={stateId}
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
        />
      )}

      {Object.entries(mapconfig).map(([stateId, state]) => <>
        <rect
          x={state.textX-16}
          y={state.textY-15}
          className="w-[15px] h-[30px] cursor-pointer stroke-2 stroke-red-400 fill-white"
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
          key={stateId}
        />
        <rect
          x={state.textX+1}
          y={state.textY-15}
          className="w-[15px] h-[30px] cursor-pointer stroke-0 stroke-neutral-600 fill-red-300"
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
          key={stateId}
        />
        <text
          className={`font-medium text-lg fill-neutral-600 select-none cursor-pointer`}
          x={state.textX-13}
          y={state.textY+6}
          key={stateId}
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
        >
          {stateId}
        </text>
        {/* <rect
          x={state.textX}
          y={state.textY}
          className="w-[1px] h-[1px] stroke-2 stroke-red-400 fill-transparent"
        /> */}
      </>)}

      {/* <path // Not included bc isn't a state
        id="DC"
        data-name="District of Columbia"
        data-id="DC"
        d="m 878.17597,229.14834 0.48532,0.38825 0.19412,0.0971 0.19413,-0.0971 0.19413,0.0971 0.67944,0.38825 0.19413,0.29119 0,0.67944 0.19412,0.38825 1.26182,-2.32951 -1.35888,-0.77651 -1.65007,0.0971 -0.38826,0.7765 z"
        className="stroke-2 stroke-white fill-neutral-200" /> */}
    </svg>
    
    {selectedState &&
      <div
        className="fixed -translate-x-1/2 p-2 flex flex-col gap-4 bg-theme-surface text-theme-onSurface rounded-lg border-2 border-neutral-300 shadow-sm z-20"
        style={{ ...cursorPosition }}
      >
        {senateData[selectedState].races.regular && <div>
          <p className="font-bold">
            {senateData[selectedState].name}
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
              {senateData[selectedState].races.regular.candidates.sort((a,b) => (a.winPercent>b.winPercent) ? -1 : (a.winPercent<b.winPercent) ? 1 : 0).map(candidate =>
                <tr key={candidate.name}>
                  <td className="pr-2 pb-0.5">{candidate.name}</td>
                  <td className="px-2 pb-0.5">{candidate.votePercent<1 ? "<1" : candidate.votePercent>99 ? ">99" : candidate.votePercent}%</td>
                  <td
                    className={`pl-2 pb-0.5 font-bold ${candidate.party==='democrat'?'text-blue-500':candidate.party==='republican'?'text-red-500':null}`}
                  >
                    {candidate.winPercent<1 ? "<1" : candidate.winPercent>99 ? ">99" : candidate.winPercent}%
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>}

        {senateData[selectedState].races.special && <div>
          <p className="font-bold">
            {senateData[selectedState].name} Special
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
              {senateData[selectedState].races.special.candidates.sort((a,b) => (a.winPercent>b.winPercent) ? -1 : (a.winPercent<b.winPercent) ? 1 : 0).map(candidate =>
                <tr key={candidate.name}>
                  <td className="pr-2 pb-0.5">{candidate.name}</td>
                  <td className="px-2 pb-0.5">{candidate.votePercent<1 ? "<1" : candidate.votePercent>99 ? ">99" : candidate.votePercent}%</td>
                  <td
                    className={`pl-2 pb-0.5 font-bold ${candidate.party==='democrat'?'text-blue-500':candidate.party==='republican'?'text-red-500':null}`}
                  >
                    {candidate.winPercent<1 ? "<1" : candidate.winPercent>99 ? ">99" : candidate.winPercent}%
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>}

        {Object.keys(senateData[selectedState].races).length === 0 && <div>
          <p className="font-bold">
            {senateData[selectedState].name}
          </p>
          <p className="text-sm text-neutral-400">
            No races
          </p>
        </div>}
      </div>
    }
  </>;
}
