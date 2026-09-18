'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

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
  disableHover?: boolean;
  textClassName?: string; 
}

export default function A_CustomSelect({ 
  value, 
  options, 
  onChange, 
  className, 
  disableHover = false,
  textClassName 
}: CustomSelectProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuCoords, setMenuCoords] = useState<{ top: number, left: number, width: number } | null>(null);

  const selectedOption = options.find((opt) => opt.id === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      // 🚨 FIX 1: Do not close if the click is inside the portaled dropdown menu!
      if (
        containerRef.current && 
        !containerRef.current.contains(target) &&
        !target.closest('.custom-select-portal')
      ) {
        setIsOpen(false);
      }
    }
    
    function handleScroll(e: Event) {
      if ((e.target as Element).closest?.('.custom-select-portal')) return;
      setIsOpen(false);
    }

    if (isOpen) {
       document.addEventListener("mousedown", handleClickOutside);
       window.addEventListener('scroll', handleScroll, true); 
    }
    
    return () => {
       document.removeEventListener("mousedown", handleClickOutside);
       window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMenuCoords({
            top: rect.bottom + 4, 
            left: rect.left,
            width: rect.width 
        });
    }
    setIsOpen(!isOpen);
  };

  const hoverClass = disableHover ? '' : 'hover:bg-gray-100';

  return (
    <div className={`relative ${className || ''}`} ref={containerRef}>
      
      {/* 1. THE TRIGGER BUTTON */}
      <button
        type="button" 
        onClick={handleOpen}
        className={`
          flex items-center justify-between w-full h-full min-h-[32px] px-3 py-1 
          rounded-[inherit] outline-none transition-all
          ${hoverClass}
          ${isOpen ? 'border-transparent' : 'border-transparent'}
        `}
      >
        <span className={`appearance-none truncate focus:outline-none cursor-pointer transition-colors ${textClassName || 'text-gray-600 text-[0.7rem] font-light '}`}>
          {selectedOption?.label || ""}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`} 
        />
      </button>

      {/* 2. THE DROPDOWN MENU (PORTALED TO BODY) */}
      {isOpen && menuCoords && typeof document !== 'undefined' && createPortal(
        <div 
          className="custom-select-portal pointer-events-auto fixed bg-white rounded-[6px] shadow-lg border border-gray-100 z-[99999] overflow-hidden origin-top"
          style={{ 
              top: `${menuCoords.top}px`, 
              left: `${menuCoords.left}px`,
              width: `${menuCoords.width}px` 
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="p-1 overflow-y-auto max-h-48 custom-scrollbar">
            {options
              .filter(option => option.id !== '') 
              .map((option) => {
                const isActive = option.id === value;
              
              return (
                <div
                  key={option.id}
                  onPointerDown={(e) => {
                      e.stopPropagation(); 
                      e.preventDefault();  
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                  className={`
                    group flex items-center justify-between px-2 py-1.5 rounded-[4px] cursor-pointer transition-colors
                    ${isActive ? 'bg-alos-green-light' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className="flex flex-col">
                    <span className={`text-[0.7rem] ${isActive ? 'font-medium text-alos-green' : 'text-gray-600 group-hover:text-gray-900'}`}>
                      {option.label}
                    </span>
                    {option.subLabel && (
                      <span className={`text-[0.65rem] ${isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                        {option.subLabel}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <Check size={12} className="text-alos-green ml-3 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>,
        document.body 
      )}
    </div>
  );
}