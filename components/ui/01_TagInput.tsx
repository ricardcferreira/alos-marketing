'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MoreHorizontal, CheckCircle2 } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  code?: string; 
}

interface TagInputProps {
  id?: string;
  value: string[]; 
  onChange: (value: string[]) => void;
  options?: Option[]; 
  placeholder?: string;
  allowCustomTags?: boolean;
  onCreateOption?: (label: string) => void;
  onRenameOption?: (id: string, newLabel: string) => void;
  onDeleteOption?: (id: string) => void;
  isReadOnly?: boolean;
  alwaysShowAllOptions?: boolean;
}

export default function A_TagInput({ 
  id, 
  value = [], 
  onChange, 
  options = [], 
  placeholder,
  allowCustomTags = true,
  onCreateOption,
  onRenameOption,
  onDeleteOption,
  isReadOnly = false,
  alwaysShowAllOptions = false
}: TagInputProps) {
  
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const [isMounted, setIsMounted] = useState(false);
  const [actionMenuCoords, setActionMenuCoords] = useState<{ top: number, right: number } | null>(null);
  const [suggestionsCoords, setSuggestionsCoords] = useState<{ top: number, left: number, width: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = id ? `tag-input-${id}` : 'tag-input-random';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDisplayLabel = (tagId: string) => {
    const matchedOption = options.find(opt => opt.id === tagId);
    if (matchedOption) return matchedOption.label;
    if (tagId.startsWith('custom_')) return 'Deleted Option';
    return tagId; 
  };

  const COMMON_PATHOLOGY_IDS = ['5A11', 'BA00', '5A00', '5B56', '5C50.71']; 

  const filteredOptions = inputValue.trim() === ''
    ? alwaysShowAllOptions 
        ? options 
        : options.filter(opt => 
            // 1. Show the hardcoded common pathologies
            COMMON_PATHOLOGY_IDS.includes(opt.id) || 
            // 2. Show the Clinician's custom generated tags
            opt.id.startsWith('custom_') || 
            // 3. Show legacy strings (they contain underscores or spaces, ICD-11 codes do not)
            opt.id.includes('_') || 
            opt.id.includes(' ')
          )
    : options.filter(opt => {
        const searchTarget = inputValue.toLowerCase();
        // @ts-ignore
        const matchesCode = opt.code?.toLowerCase().includes(searchTarget);
        const matchesLabel = opt.label.toLowerCase().includes(searchTarget);
        return matchesLabel || matchesCode;
      });

  const toggleTag = (tagId: string) => {
    if (isReadOnly) return;
    if (value.includes(tagId)) {
      onChange(value.filter(tag => tag !== tagId));
    } else {
      onChange([...value, tagId]);
      setInputValue('');
    }
  };

  const handleCreateNew = (text: string) => {
    if (isReadOnly) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    if (onCreateOption) {
      onCreateOption(trimmed);
    } else {
      if (!value.includes(trimmed)) onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const handleRenameSubmit = (optId: string) => {
    if (isReadOnly) return;
    if (editValue.trim() && onRenameOption) {
      onRenameOption(optId, editValue.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isReadOnly) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue) {
        const exactMatch = options.find(o => o.label.toLowerCase() === inputValue.trim().toLowerCase());
        if (exactMatch) {
          toggleTag(exactMatch.id);
        } else if (allowCustomTags) {
          handleCreateNew(inputValue); 
        }
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange(value.filter((_, i) => i !== value.length - 1));
    }
  };

  const handleFocus = () => {
      if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setSuggestionsCoords({
              top: rect.bottom + 4,
              left: rect.left,
              width: rect.width
          });
      }
      setShowSuggestions(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (target.closest('.tag-action-portal') || target.closest('.tag-suggestions-portal')) {
        return; 
      }

      if (containerRef.current && !containerRef.current.contains(target)) {
        setShowSuggestions(false);
        setActiveMenuId(null);
        setEditingId(null);
        setActionMenuCoords(null);
      }
    };
    
    const handleScroll = (e: Event) => {
      const target = e.target as Element;
      if (target.closest?.('.tag-action-portal') || target.closest?.('.tag-suggestions-portal')) return;
      setActiveMenuId(null);
      setActionMenuCoords(null);
      setShowSuggestions(false); 
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div className="relative w-full h-[36px] overflow-hidden" ref={containerRef}>
      <div 
        className={`flex flex-nowrap overflow-x-auto hide-scrollbar items-center gap-x-2 w-full h-full pl-2 pr-2 ${
          isReadOnly ? 'cursor-default' : 'cursor-pointer'
        }`}
        onClick={() => {
          if (!isReadOnly) document.getElementById(inputId)?.focus();
        }}
      >
        {value.map((tagId, i) => (
          <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] text-[0.65rem] bg-gray-100 border-gray-200 text-gray-500 border gap-1.5 z-10 flex-shrink-0">
            {getDisplayLabel(tagId)}
            {!isReadOnly && (
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleTag(tagId); }}
                className="hover:bg-gray-300 rounded-[2px] p-0.5 transition-colors"
              >
                <X size={10} />
              </button>
            )}
          </span>
        ))}

        {!isReadOnly && (
          <input
            id={inputId}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleFocus(); 
            }}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[80px] outline-none text-gray-600 text-[0.85rem] font-light bg-transparent cursor-pointer z-10"
          />
        )}
      </div>

      {/* SUGGESTIONS DROPDOWN (PORTALED TO BODY) */}
      {!isReadOnly && showSuggestions && (inputValue || filteredOptions.length > 0) && isMounted && suggestionsCoords && createPortal(
        <div 
          className="tag-suggestions-portal pointer-events-auto fixed bg-white border border-gray-100 rounded-[6px] shadow-lg max-h-60 overflow-y-auto z-[99999] origin-top custom-scrollbar"
          style={{
              top: `${suggestionsCoords.top}px`,
              left: `${suggestionsCoords.left}px`,
              minWidth: `${suggestionsCoords.width}px`,
              width: 'max-content',
              maxWidth: '350px' 
          }}
          onPointerDown={(e) => e.stopPropagation()} 
          onWheel={(e) => e.stopPropagation()}   
          onTouchMove={(e) => e.stopPropagation()}  
        >
            <div className='text-xs font-sm bg-white p-2 pb-1 text-gray-400 tracking-tighter sticky top-0 z-10 border-b border-gray-100'>
               {allowCustomTags ? 'Select an option or create one' : 'Select an option'}
            </div>
            
          <div className="p-1">
            {filteredOptions.map((opt) => {

              return (
                <div key={opt.id} className="relative group/option flex items-center justify-between rounded-[4px] hover:bg-gray-50 transition-colors">
                  
                  {editingId === opt.id ? (
                    <div className="flex items-center w-full px-2 py-1 gap-1.5 overflow-hidden">
                      <input 
                        autoFocus
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit(opt.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 min-w-[120px] text-xs border border-blue-300 rounded-[3px] px-1.5 py-0.5 outline-none focus:border-alos-green-light"
                      />
                      <button onMouseDown={(e) => { e.preventDefault(); handleRenameSubmit(opt.id); }} className="text-gray-400 hover:text-blue-400 p-0.5">
                        <CheckCircle2 size={10} />
                      </button>
                      <button onMouseDown={(e) => { e.preventDefault(); setEditingId(null); }} className="text-gray-400 hover:text-blue-400 p-0.5">
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleTag(opt.id);
                        }}
                        className={`flex-1 text-left px-2 py-1.5 text-xs flex items-center justify-between`}
                      >
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-[5px] text-[0.65rem] bg-gray-100 border-gray-200 text-gray-500 border transition-colors`}>
                          {opt.label}
                        </span>
                      </button>

                      {(onRenameOption || onDeleteOption) && (
                        <div className="relative px-2">
                          <button
                            type="button"
                            onPointerDown={(e) => { 
                              e.preventDefault();
                              e.stopPropagation(); 
                              if (activeMenuId === opt.id) {
                                setActiveMenuId(null);
                                setActionMenuCoords(null);
                              } else {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveMenuId(opt.id);
                                setActionMenuCoords({
                                  top: rect.bottom + 4,
                                  right: window.innerWidth - rect.right
                                });
                              }
                            }}
                            className="p-1 rounded-[4px] text-gray-400 hover:text-gray-700 hover:bg-gray-200 opacity-0 group-hover/option:opacity-100 transition-all"
                          >
                            <MoreHorizontal size={12} />
                          </button>

                          {isMounted && activeMenuId === opt.id && actionMenuCoords && createPortal(
                            <div 
                              className="tag-action-portal pointer-events-auto fixed bg-white border border-gray-100 rounded-[5px] shadow-lg py-1 px-1 z-[99999] w-28"
                              style={{ 
                                top: `${actionMenuCoords.top}px`, 
                                right: `${actionMenuCoords.right}px` 
                              }}
                              onPointerDown={(e) => e.stopPropagation()}
                            >
                              {onRenameOption && opt.id.startsWith('custom_') && (
                                <button
                                  type="button"
                                  onPointerDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setEditValue(opt.label);
                                    setEditingId(opt.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[0.65rem] text-gray-700 hover:bg-gray-50 rounded-[5px]"
                                >
                                  Rename
                                </button>
                              )}
                              {onDeleteOption && (
                                <button
                                  type="button"
                                  onPointerDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDeleteOption(opt.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[0.65rem] text-gray-700 hover:bg-gray-50 rounded-[5px]"
                                >
                                  {opt.id.startsWith('custom_') ? 'Delete Option' : 'Delete Default'}
                                </button>
                              )}
                            </div>,
                            document.body
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}

            {allowCustomTags && inputValue && !filteredOptions.some(o => o.label.toLowerCase() === inputValue.toLowerCase()) && (
              <div className="mt-1 pt-1 border-t border-gray-100">
                <button
                  type="button"
                  onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCreateNew(inputValue);
                  }}
                  className="w-full text-left px-2 py-1.5 text-[0.65rem] rounded-[4px] text-gray-700 hover:bg-gray-50 font-normal flex items-center gap-1"
                >
                  Create               
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] bg-gray-100 text-gray-600 border border-gray-200">
                    "{inputValue}" 
                  </span>
                </button>
              </div>
            )}
            
            {filteredOptions.length === 0 && !inputValue && (
              <div className="px-3 py-2 text-xs text-gray-400 italic">No options found.</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}