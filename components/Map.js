import React from 'react';

import mapconfig from '../mapconfig.json';

export default function Map() {
  return <>
    <svg
      viewBox="40 0 1000 589"
      strokeLinejoin="round"
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
          className="fill-transparent stroke-2 stroke-neutral-300"
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
          className="opacity-0 hover:opacity-100 fill-white stroke-[3px] stroke-neutral-600"
          key={stateId}
        />
      )}

      {/* <path // Not included bc isn't a state
        id="DC"
        data-name="District of Columbia"
        data-id="DC"
        d="m 878.17597,229.14834 0.48532,0.38825 0.19412,0.0971 0.19413,-0.0971 0.19413,0.0971 0.67944,0.38825 0.19413,0.29119 0,0.67944 0.19412,0.38825 1.26182,-2.32951 -1.35888,-0.77651 -1.65007,0.0971 -0.38826,0.7765 z"
        className="stroke-2 stroke-white fill-neutral-200" /> */}
    </svg>
  </>;
}
