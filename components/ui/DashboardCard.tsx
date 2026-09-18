'use client'

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight, LayoutGrid, Filter, Check, ChevronDown } from "lucide-react";

// Updated Interface
export interface DashboardItem {
  id: string;
  category: string;
  label: string;
  description: string;
  href: string;
  previewTitle: string;
  previewMetric: string;
  previewSubtitle: string;
  previewDate: string;
  statusColor: "red" | "green" | "blue" | "gray" | "orange";
}

interface Props {
  patientId: string;
  title: string;
  items: DashboardItem[];
}

export default function MasterDashboardCard({ patientId, title, items }: Props) {
  // 1. STATE MANAGEMENT
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id || "");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filterRef = useRef<HTMLDivElement>(null);

  // 2. CLOSE DROPDOWN ON CLICK OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. COMPUTE UNIQUE CATEGORIES
  // Get unique categories from items + add "All"
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  // 4. FILTER THE ITEMS
  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(i => i.category === activeFilter);

  // Find the active item details (even if hidden by filter, safe to keep rendering)
  const currentItem = items.find(i => i.id === selectedId) || items[0];

  if (!currentItem) return null;

  return (
    <div className="w-full space-y-6">
      
      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 ml-4">
           <h2 className="text-xs font-semibold text-gray-900 tracking-tighter">
             {title}
           </h2>
        </div>

        {/* --- CONTROLS BAR: FILTER + TABS --- */}
        <div className="flex gap-3">
            
            {/* A. THE FILTER DROPDOWN */}
            <div className="relative shrink-0" ref={filterRef}>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`
                        flex items-center gap-2 px-2 py-1 rounded-full text-xs font-sm transition-all border
                        ${activeFilter !== 'All' 
                            ? "bg-blue-50 text-blue-600 border-blue-100" 
                            : "text-gray-700 border-gray-200 hover:bg-gray-200"}
                    `}
                >
                    {activeFilter === 'All' ? 'Use Case' : activeFilter}
                    <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}/>
                </button>

                {/* Dropdown Menu */}
                {isFilterOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveFilter(cat);
                                    setIsFilterOpen(false);
                                    // Optional: Select first item of new category automatically?
                                    // const firstInCat = items.find(i => cat === 'All' || i.category === cat);
                                    // if(firstInCat) setSelectedId(firstInCat.id);
                                }}
                                className={`
                                    w-full flex items-center justify-between px-2 py-1 rounded-sm text-xs font-sm transition-colors
                                    ${activeFilter === cat 
                                        ? "bg-blue-50 text-gray-500" 
                                        : "text-gray-500 hover:bg-gray-50"}
                                `}
                            >
                                {cat}
                                {activeFilter === cat && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* C. THE TABS LIST (Scrollable) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2 w-full">
            {filteredItems.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`
                    relative flex items-center gap-2 px-2 py-1 rounded-full text-xs font-sm transition-all whitespace-nowrap border shrink-0
                    ${isSelected 
                        ? "bg-blue-50 border-blue-200 text-gray-900" 
                        : "bg-blue-50 border-blue-50 text-gray-900 hover:bg-blue-100"}
                    `}
                >
                    {item.label}
                </button>
                )
            })}
            {filteredItems.length === 0 && (
                <span className="text-sm text-gray-400 italic px-2">No items found in this category.</span>
            )}
            </div>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-[200px] flex flex-col justify-center relative overflow-hidden">
        {/* Background Blob */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {currentItem.previewTitle}
          </h2>
          
          <div className="flex items-center gap-4">            
          {currentItem.previewDate !== "-" && (
          <span className="text-xs font-medium mb-8 text-gray-400">
          Updated {currentItem.previewDate}
          </span>
          )}
          </div>

          <div className="flex items-center gap-6">
          {/* Bottom: The "Enter" Button */}
          <div>
            <Link 
              href={patientId ? `/dashboard/patient/${patientId}/${currentItem.href}` : '#'}
              className="group w-fit flex mt-2 relative lg:right-[5%] right-[3%] items-center rounded-md px-2 py-1 text-xs font-medium 
                   text-blue-500 transition-colors hover:bg-blue-100"
            >
              Go to {currentItem.label} 
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}