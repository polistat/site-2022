import React from 'react';

export default function CandidateProfileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-x-16 text-sm">
      {children}
    </div>
  );
}
