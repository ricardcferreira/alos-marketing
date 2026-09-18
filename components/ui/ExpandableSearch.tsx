'use client';

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

interface ExpandableSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  expandedWidth?: string; // Allows customization of how wide it gets (e.g., "w-40" or "w-[160px]")
}

export default function ExpandableSearch({
  value,
  onChange,
  placeholder = "Type to search...",
  className = "",
  expandedWidth = "w-[160px]"
}: ExpandableSearchProps) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus logic
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div 
      className={`
        relative flex items-center transition-all duration-300 ease-in-out rounded-lg 
        ${isExpanded || value ? `${expandedWidth} border border-transparent` : "w-8 bg-transparent border border-transparent cursor-pointer"}
        ${className}
      `}
      onClick={() => setIsExpanded(true)} 
    >
      
      {/* THE ICON */}
      <div className="absolute left-2 z-10 text-gray-400 p-1 hover:bg-gray-100 rounded-[5px] flex items-center justify-center">
        <Search size={14} />
      </div>

      {/* THE INPUT */}
      <input 
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => {
          // Only close if empty
          if (!value) setIsExpanded(false);
        }}
        className={`
          w-full py-1.5 pl-8 pr-8 bg-transparent text-xs outline-none rounded-lg
          placeholder:text-gray-400 text-gray-700
          ${isExpanded || value ? "opacity-100 visible" : "opacity-0 invisible cursor-pointer"}
        `}
      />

      {/* CLEAR BUTTON (X) */}
      {value && (
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent re-triggering open
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-2 text-gray-400 hover:bg-gray-200 p-0.5 rounded-[5px] transition-colors"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}