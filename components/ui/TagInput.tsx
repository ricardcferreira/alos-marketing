'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, MoreHorizontal, CheckCircle2 } from 'lucide-react';

interface Option {
  id: string;
  label: string;
}

interface TagInputProps {
  id?: string;
  value: string[]; 
  onChange: (value: string[]) => void;
  options?: Option[]; 
  placeholder?: string;
  allowCustomTags?: boolean;
  listTitle?: string;
  emptyMessage?: string | React.ReactNode;
  readOnly?: boolean;
  
  // Custom actions
  onCreateOption?: (label: string) => void;
  onRenameOption?: (id: string, newLabel: string) => void;
  onDeleteOption?: (id: string) => void;
}

export default function TagInput({ 
  id, 
  value = [], 
  onChange, 
  options = [], 
  placeholder,
  allowCustomTags = true,
  listTitle,
  emptyMessage,
  readOnly = false,
  onCreateOption,
  onRenameOption,
  onDeleteOption
}: TagInputProps) {
  
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Menu & Edit State
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Portal State
  const [isMounted, setIsMounted] = useState(false);
  const [menuCoords, setMenuCoords] = useState<{ top: number, right: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = id ? `tag-input-${id}` : 'tag-input-random';

  // Ensure Portal only renders on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getDisplayLabel = (tagId: string) => {
    const matchedOption = options.find(opt => opt.id === tagId);
    if (matchedOption) return matchedOption.label;
    if (tagId.startsWith('custom_')) return 'Deleted Option';
    return tagId; 
  };

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(inputValue.toLowerCase()) ||
    opt.id.toLowerCase().includes(inputValue.toLowerCase())
  );

  const toggleTag = (tagId: string) => {
    if (readOnly) return; // Guard clause
    if (value.includes(tagId)) {
      onChange(value.filter(tag => tag !== tagId));
    } else {
      onChange([...value, tagId]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleCreateNew = (text: string) => {
    if (readOnly) return;
    const trimmed = text.trim();
    if (!trimmed) return;

    if (onCreateOption) {
      onCreateOption(trimmed);
    } else {
      if (!value.includes(trimmed)) onChange([...value, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRenameSubmit = (optId: string) => {
    if (editValue.trim() && onRenameOption) {
      onRenameOption(optId, editValue.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue) {
        const exactMatch = options.find(o => 
          o.label.toLowerCase() === inputValue.trim().toLowerCase() ||
          o.id.toLowerCase() === inputValue.trim().toLowerCase()
        );
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // PORTAL IMMUNITY
      if (target.closest('.tag-action-portal')) return; 

      if (containerRef.current && !containerRef.current.contains(target)) {
        setShowSuggestions(false);
        setActiveMenuId(null);
        setEditingId(null);
        setMenuCoords(null);
      }
    };
    
    const handleScroll = (e: Event) => {
      if ((e.target as Element).closest?.('.tag-action-portal')) return;
      setActiveMenuId(null);
      setMenuCoords(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      
      {/* 1. INPUT AREA & SELECTED TAGS */}
      <div 
        className={`flex flex-wrap items-center gap-x-2 gap-y-2 w-full min-h-[38px] p-2 transition-colors ${
          showSuggestions ? 'bg-gray-50' : 'bg-transparent'
        } ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => {
          if (!readOnly) document.getElementById(inputId)?.focus();
        }}
      >
        {value.map((tagId, i) => (
          <span key={i} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs font-regular rounded-[5px] border border-gray-200">
            {getDisplayLabel(tagId)}
            {!readOnly && (
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleTag(tagId); }}
                className="hover:bg-gray-300 rounded-[2px] p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </span>
        ))}

        {!readOnly && (
          <input
            id={inputId}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none text-xs text-gray-700 placeholder:text-gray-400 bg-transparent cursor-pointer ml-1"
          />
        )}
      </div>

      {/* 2. SUGGESTIONS DROPDOWN (ONLY SHOW IF NOT READ-ONLY) */}
      {!readOnly && showSuggestions && (inputValue || filteredOptions.length > 0) && (
        <div className="absolute z-50 w-full p-1 bg-white border border-gray-100 rounded-b-[5px] max-h-60 overflow-y-auto shadow-lg">
            
          <div className='text-xs font-medium p-2 text-gray-400'>
             {listTitle || (allowCustomTags ? 'Select an option or create one' : 'Select an option')}
          </div>
            
          <div className="space-y-0.5">
            {filteredOptions.map((opt) => {
              const isCustom = opt.id.startsWith('custom_');

              return (
                <div key={opt.id} className="relative group flex items-center justify-between rounded-[5px] hover:bg-gray-50 transition-colors">
                  
                  {/* EDIT MODE */}
                  {editingId === opt.id ? (
                    <div className="flex items-center w-full px-2 py-1 gap-2">
                      <input 
                        autoFocus
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRenameSubmit(opt.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        className="flex-1 text-xs border border-blue-300 rounded-[3px] px-1.5 py-0.5 outline-none focus:border-alos-green-light"
                      />
                      <button onMouseDown={(e) => { e.preventDefault(); handleRenameSubmit(opt.id); }} className="text-gray-400 hover:text-blue-500 p-0.5 transition-colors">
                        <CheckCircle2 size={12} />
                      </button>
                      <button onMouseDown={(e) => { e.preventDefault(); setEditingId(null); }} className="text-gray-400 hover:text-red-400 p-0.5 transition-colors">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    /* NORMAL LIST MODE */
                    <>
                      <button
                        type="button"
                        onClick={() => toggleTag(opt.id)}
                        className={`flex-1 text-left px-2 py-1.5 text-xs flex items-center justify-between`}
                      >
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] text-[0.65rem] font-regular bg-gray-100 text-gray-500 border border-gray-200">
                          {opt.label}
                        </span>
                      </button>

                      {/* 🚨 THE 3 DOTS: ONLY SHOW IF IT IS A CUSTOM TAG */}
                      {isCustom && (onRenameOption || onDeleteOption) && (
                        <div className="relative px-2">
                          <button
                            type="button"
                            onMouseDown={(e) => { 
                              e.preventDefault();
                              e.stopPropagation(); 
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (activeMenuId === opt.id) {
                                setActiveMenuId(null);
                                setMenuCoords(null);
                              } else {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setActiveMenuId(opt.id);
                                setMenuCoords({
                                  top: rect.bottom + 4,
                                  right: window.innerWidth - rect.right
                                });
                              }
                            }}
                            className="p-1 rounded-[4px] text-gray-400 hover:text-gray-700 hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <MoreHorizontal size={12} />
                          </button>

                          {/* THE PORTAL */}
                          {isMounted && activeMenuId === opt.id && menuCoords && createPortal(
                            <div 
                              className="tag-action-portal fixed bg-white border border-gray-100 shadow-xl rounded-[5px] py-1 px-1 z-[99999] w-28"
                              style={{ 
                                top: `${menuCoords.top}px`, 
                                right: `${menuCoords.right}px`,
                                pointerEvents: 'auto' 
                              }}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              {onRenameOption && (
                                <button
                                  type="button"
                                  onClick={(e) => {
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
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDeleteOption(opt.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[0.65rem] text-red-600 hover:bg-red-50 rounded-[5px]"
                                >
                                  Delete Option
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
          </div>

          {/* 3. CREATE NEW BUTTON */}
          {allowCustomTags && inputValue && !filteredOptions.some(o => o.label.toLowerCase() === inputValue.toLowerCase()) && (
            <div className="mt-1 pt-1 border-t border-gray-100">
              <button
                type="button"
                onClick={() => handleCreateNew(inputValue)}
                className="w-full text-left px-2 py-1.5 text-[0.65rem] rounded-[5px] text-gray-700 hover:bg-gray-50 font-normal flex items-center gap-1"
              >
                Create               
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-[5px] bg-gray-100 text-gray-600 border border-gray-200">
                  "{inputValue}" 
                </span>
              </button>
            </div>
          )}
          
          {/* 4. FALLBACKS */}
          {!allowCustomTags && filteredOptions.length === 0 && inputValue && (
             <div className="px-3 py-2 text-xs text-gray-400">
               {emptyMessage || 'No drugs found. Use the "Add Drugs" button below.'}
             </div>
          )}
          
        </div>
      )}
    </div>
  );
}