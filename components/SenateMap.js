import React from 'react';
import Router from 'next/router';

import mapconfig from '../mapconfig.json';

export default function SenateMap({ candidates, averagedPolls, incumbents }) {
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
            averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }) ? (
              averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }).lean>50  ? (candidates.senate[stateId].find(a => { return a.party==='independent' }) ? 'fill-amber-50' : 'fill-blue-50')
              : averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }).lean<50 ? 'fill-red-50'
              : 'fill-white'
            ) : (
              'fill-neutral-100'
            )
          } stroke-2 stroke-neutral-300`}
          key={`state${stateId}`}
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
          key={`state${stateId}hover`}
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
        />
      )}

      {Object.entries(mapconfig).map(([stateId, state]) => <>
        <rect
          x={state.textX-19}
          y={state.textY-15}
          className={`w-[18px] h-[30px] cursor-pointer ${
            averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }) ? (
              averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }).lean>50 ? (candidates.senate[stateId].find(a => { return a.party==='independent' }) ? 'stroke-2 stroke-white fill-amber-300' : 'stroke-2 stroke-white fill-blue-300')
              : averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }).lean<50 ? 'stroke-2 stroke-white fill-red-300':
              'stroke-2 stroke-white fill-neutral-300'
            ) : (
              incumbents.senate[stateId][0].party==='republican' ? 'stroke-[1.5] stroke-red-400 fill-neutral-100'
              : incumbents.senate[stateId][0].party==='democrat' ? 'stroke-[1.5] stroke-blue-400 fill-neutral-100':
              'stroke-[1.5] stroke-white fill-netural-300'
            )
          }`}
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
          key={`state${stateId}rect`}
        />
        <rect
          x={state.textX+1}
          y={state.textY-15}
          className={`w-[18px] h-[30px] cursor-pointer ${
            averagedPolls.find(a => { return a.state_po===`${stateId}2` && a.office==='Senate' }) ? (
              averagedPolls.find(a => { return a.state_po===`${stateId}2` && a.office==='Senate' }).lean>50 ? (candidates.senate[stateId].find(a => { return a.party==='independent' }) ? 'stroke-2 stroke-white fill-amber-300' : 'stroke-2 stroke-white fill-blue-300')
              : averagedPolls.find(a => { return a.state_po===`${stateId}2` && a.office==='Senate' }).lean<50 ? 'stroke-2 stroke-white fill-red-300':
              'stroke-2 stroke-white fill-netural-300'
            ) : (
              averagedPolls.find(a => { return a.state_po===stateId && a.office==='Senate' }) ? (
                incumbents.senate[stateId][0].party==='republican' ? 'stroke-[1.5] stroke-red-400 fill-neutral-100'
                : incumbents.senate[stateId][0].party==='democrat' ? 'stroke-[1.5] stroke-blue-400 fill-neutral-100':
                'stroke-[1.5] stroke-white fill-netural-300'
              ) : (
                incumbents.senate[stateId][1].party==='republican' ? 'stroke-[1.5] stroke-red-400 fill-neutral-100'
                : incumbents.senate[stateId][1].party==='democrat' ? 'stroke-[1.5] stroke-blue-400 fill-neutral-100':
                'stroke-[1.5] stroke-white fill-netural-300'
              )
            )
          }`}
          onMouseEnter={() => setSelectedState(stateId)}
          onMouseLeave={() => setSelectedState(null)}
          onClick={() => Router.push(`/senate/${stateId}`)}
          key={`state${stateId}rect2`}
        />
        <text
          className={`font-medium text-lg fill-neutral-600 select-none cursor-pointer`}
          x={state.textX-13}
          y={state.textY+6}
          key={`state${stateId}text`}
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
        {averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Senate' }) && <div>
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
                  {candidates.senate[selectedState].filter(a => { return a.party==='democrat' || a.party==='independent' })[0].name}
                </td>
                <td className="px-2 pb-0.5">
                  {(Number(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Senate' }).lean)/100).toFixed(1)}%
                </td>
                <td
                  className={`pl-2 pb-0.5 font-bold ${candidates.senate[selectedState].find(a => { return a.party==='independent' }) ? 'text-amber-500' : 'text-blue-500'}`}
                >
                  {Number(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Senate' }).dem_wins).toFixed(0)}%
                </td>
              </tr>

              <tr>
                <td className="pr-2 pb-0.5">
                  {candidates.senate[selectedState].find(a => { return a.party==='republican' }).name}
                </td>
                <td className="px-2 pb-0.5">
                  {(100-Number(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Senate' }).lean)/100).toFixed(1)}%
                </td>
                <td
                  className={`pl-2 pb-0.5 font-bold text-red-500`}
                >
                  {(100-Number(averagedPolls.find(a => { return a.state_po===selectedState && a.office==='Senate' }).dem_wins)).toFixed(0)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>}

        {averagedPolls.find(a => { return a.state_po===`${selectedState}2` && a.office==='Senate' }) && <div>
          <p className="font-bold">
            {mapconfig[selectedState].name} Special
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
                  {candidates.senate[`${selectedState}2`].filter(a => { return a.party==='democrat' || a.party==='independent' })[0].name}
                </td>
                <td className="px-2 pb-0.5">
                  {(Number(averagedPolls.find(a => { return a.state_po===`${selectedState}2` && a.office==='Senate' }).lean)/100).toFixed(1)}%
                </td>
                <td
                  className={`pl-2 pb-0.5 font-bold ${candidates.senate[`${selectedState}2`].find(a => { return a.party==='independent' }) ? 'text-amber-500' : 'text-blue-500'}`}
                >
                  {Number(averagedPolls.find(a => { return a.state_po===`${selectedState}2` && a.office==='Senate' }).dem_wins).toFixed(0)}%
                </td>
              </tr>

              <tr>
                <td className="pr-2 pb-0.5">
                  {candidates.senate[`${selectedState}2`].find(a => { return a.party==='republican' }).name}
                </td>
                <td className="px-2 pb-0.5">
                  {(100-Number(averagedPolls.find(a => { return a.state_po===`${selectedState}2` && a.office==='Senate' }).lean)/100).toFixed(1)}%
                </td>
                <td
                  className={`pl-2 pb-0.5 font-bold text-red-500`}
                >
                  {(100-Number(averagedPolls.find(a => { return a.state_po===`${selectedState}2` && a.office==='Senate' }).dem_wins)).toFixed(0)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>}
        
        {averagedPolls.filter(a => { return (a.state_po===selectedState||a.state_po===`${selectedState}2`) && a.office==='Senate' }).length === 0 && <div>
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
