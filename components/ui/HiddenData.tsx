'use client'

import { useState } from 'react';

export default function HiddenData({ text }: { text: string }) {
  const [isRevealed, setIsRevealed] = useState(false);

  // 1. If there's no data, just show the static placeholder (not clickable)
  if (!text || text === '-') {
    return <span className="text-xs font-regular text-[#aeaeae] truncate">{'-'}</span>;
  }

  // 2. REVEALED STATE: Clickable to hide it again
  if (isRevealed) {
    return (
      <button 
        onClick={() => setIsRevealed(false)}
        className="text-xs font-regular text-[#aeaeae] hover:text-gray-400 truncate animate-in fade-in cursor-pointer transition-colors select-none text-right"
        title="Click to hide"
      >
        {text}
      </button>
    );
  }

  // 3. HIDDEN STATE: Blurred out, clickable to reveal
  return (
    <button 
      onClick={() => setIsRevealed(true)}
      className="text-xs font-regular text-transparent bg-gray-200/50 hover:bg-gray-200 rounded px-2 select-none relative overflow-hidden flex items-center justify-center cursor-pointer transition-colors"
      style={{ filter: "blur(4px)" }}
      title="Click to reveal"
    >
      {text}
    </button>
  );
}