import React from 'react';

export default function CandidateProfileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-2" children={children}/>
  );
}
