'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// GENERIC INTERFACE
export interface SelectOption {
  id: string;
  label: string;
  subLabel?: string | number;
}

interface CustomSelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

export default function CustomSelect({ value, options, onChange, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the full object for the currently selected ID
  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ''}`} ref={containerRef}>
      
      {/* 1. THE TRIGGER BUTTON */}
      <button
        type="button" 
        onClick={(e) => {
           e.stopPropagation(); // Safety: Prevent trigger click from bubbling
           setIsOpen(!isOpen);
        }}
        className={`
          flex items-center justify-between w-full py-2 pl-3 pr-2 rounded-[5px] hover:bg-cream-light focus:outline-none cursor-pointer transition-colors
          ${isOpen ? '' : ''}
        `}
      >
        <span className="text-xs truncate mr-1.5 mt-[1px]">
          {selectedOption?.label || "Select..."}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* 2. THE DROPDOWN MENU (POPOVER) */}
      {isOpen && (
        <div className="absolute min-w-[150px] left-0 top-full bg-white rounded-[5px] shadow-sm border border-gray-100 z-50 overflow-hidden origin-top-right">
          <div className="p-1 overflow-y-auto max-h-48">
            {options
              .filter(option => option.id !== '') 
              .map((option) => {
                const isActive = option.id === value;
              
              return (
                <div
                  key={option.id}
                  onClick={(e) => {
                      e.stopPropagation(); // Stop the event from reaching the Modal
                      e.preventDefault();  // Prevent any weird default browser behavior
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                  className={`
                    group flex items-center justify-between px-2 py-1 rounded-[5px] cursor-pointer transition-colors
                    ${isActive ? 'bg-cream-light' : 'hover:bg-cream-light'}
                  `}
                >
                  <div className="flex flex-col">
                    <span className={`text-[0.7rem] ${isActive ? 'font-sm text-[0.7rem] text-gray-700' : 'font-sm text-[0.7rem] text-gray-700 group-hover:text-gray-900'}`}>
                      {option.label}
                    </span>
                    {option.subLabel && (
                      <span className={`text-[0.7rem] ${isActive ? 'text-gray-400' : 'text-gray-400 group-hover:text-gray-500'}`}>
                        {option.subLabel}
                      </span>
                    )}
                    
                  </div>

                  {isActive && (
                    <Check size={12} className="text-gray-400 ml-2 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}