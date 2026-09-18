'use client'

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface TabItem {
  id: string;
  label: string;
}

interface EditableTabsProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabAdd?: () => void;
  onTabRename?: (id: string, newName: string) => void;
  onTabDelete?: (id: string) => void;
  onTabDuplicate?: (id: string) => void; // E.g., for Monitoring
  isReadOnly?: boolean;
  showAddButton?: boolean;
  // This allows us to inject custom UI (like the Dietary % target) into the popover!
  renderPopoverExtra?: (tabId: string) => React.ReactNode; 
}

export function EditableTabs({
  tabs, activeTabId, onTabSelect, onTabAdd, onTabRename, onTabDelete, onTabDuplicate, isReadOnly = false, showAddButton = true, renderPopoverExtra
}: EditableTabsProps) {
  
  // Local state for the rename input inside the popover
  const [editName, setEditName] = useState("");

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <Popover key={tab.id} onOpenChange={(isOpen) => {
            if (isOpen) setEditName(tab.label); // Reset input to current name when opened
          }}>
            <PopoverTrigger asChild>
              <button
                onClick={() => onTabSelect(tab.id)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  isActive 
                    ? "bg-alos-green-light text-alos-green font-sm border border-alos-green-light" 
                    : "bg-transparent text-gray-500 hover:bg-cream-light border bg-white border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            </PopoverTrigger>

            {/* THE SETTINGS POPOVER (Only renders if active & editable) */}
            {isActive && !isReadOnly && (
              <PopoverContent className="w-auto p-4 rounded-[5px] bg-white shadow-sm border border-gray-100" align="start">
                <div className="flex flex-col gap-3">
                  
                  {/* Standard Rename Input */}
                  {onTabRename && (
                    <input 
                      autoFocus
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => onTabRename(tab.id, editName)}
                      onKeyDown={(e) => e.key === 'Enter' && onTabRename(tab.id, editName)}
                      placeholder="Tab name"
                    />
                  )}

                  {/* Injectable Custom UI (e.g. Dietary Targets) */}
                  {renderPopoverExtra && renderPopoverExtra(tab.id)}

                  <div className="flex flex-col gap-1 mt-1 border-t border-gray-100 pt-2">
                    {/* Duplicate Action (For Monitoring) */}
                    {onTabDuplicate && (
                      <button 
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 p-2 -mx-2 rounded-md transition-colors"
                        onClick={() => onTabDuplicate(tab.id)}
                      >
                        Duplicate View
                      </button>
                    )}

                    {/* Standard Delete Action */}
                    {onTabDelete && (
                      <button 
                        className="flex items-center text-xs text-gray-500 hover:bg-gray-100 p-2 -mx-2 rounded-[5px] transition-colors"
                        onClick={() => onTabDelete(tab.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
      })}
      
      {/* ADD NEW TAB BUTTON */}
      {!isReadOnly && showAddButton && onTabAdd && (
        <button 
          onClick={onTabAdd}
          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-1"
          title="Add new"
        >
          <Plus className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}