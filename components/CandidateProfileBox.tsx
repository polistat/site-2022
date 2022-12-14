import React from 'react';

export default function CandidateProfileGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="candidate-profile">
      {children}
    </div>
  );
}
