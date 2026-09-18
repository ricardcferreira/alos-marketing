'use client'

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getNCPStyle } from "@/lib/diagnosis/ncpColorSystem";
import { getProcedureCategory } from "@/lib/diagnosis/cpn-registry";

export interface ClinicalProcedure {
  id: string;
  date: string; 
  snomedCode: string;
  termEN: string; 
  contextInfo?: string; 
  surveyId?: string; 
}

interface PatientProceduresDashboardProps {
  procedures: ClinicalProcedure[];
}

export default function PatientProceduresDashboard({ procedures }: PatientProceduresDashboardProps) {
  
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  // 1. New State for Interactive Calendar Selection
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 2. Map procedures by date string for the calendar lookups
  const proceduresByDate = useMemo(() => {
    const map: Record<string, ClinicalProcedure[]> = {};
    procedures.forEach(proc => {
      const d = new Date(proc.date);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(proc);
    });
    return map;
  }, [procedures]);

  // 3. Dynamic Feed Logic: Either Specific Day OR Most Recent Active Days
  const displayedFeed = useMemo(() => {
    const groups: Record<string, { dateObj: Date, items: ClinicalProcedure[] }> = {};

    if (selectedDate) {
      // MODE A: Specific Date Selected
      const procs = proceduresByDate[selectedDate] || [];
      if (procs.length > 0) {
        const d = new Date(`${selectedDate}T12:00:00Z`);
        const dayLabel = `${d.toLocaleString('en-US', { weekday: 'short' })} ${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })}`;
        groups[dayLabel] = { dateObj: d, items: procs };
      }
    } else {
      // MODE B: Default Most Recent Globally (Top 3 recent active days)
      const uniqueSortedDates = Object.keys(proceduresByDate)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .slice(0, 2); // Limit to the 2 most recent days that have data

      uniqueSortedDates.forEach(dateKey => {
        const procs = proceduresByDate[dateKey];
        const d = new Date(`${dateKey}T12:00:00Z`);
        const dayLabel = `${d.toLocaleString('en-US', { weekday: 'short' })} ${d.getDate()} ${d.toLocaleString('en-US', { month: 'short' })}`;
        groups[dayLabel] = { dateObj: d, items: procs };
      });
    }

    // Convert to sorted array (Newest days first)
    return Object.entries(groups)
      .map(([label, group]) => ({
        label,
        items: group.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), // Newest items top
        timestamp: group.dateObj.getTime()
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

  }, [proceduresByDate, selectedDate]);


  // Calendar Math
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); 
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => daysInPrevMonth - firstDayOfMonth + i + 1);
  const totalCells = blanks.length + days.length;
  const trailingBlanks = Array.from({ length: Math.ceil(totalCells / 7) * 7 - totalCells }, (_, i) => i + 1);

  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center ml-4 mb-4 mt-10">
        <p className="text-gray-700 tracking-tighter">
          Procedures
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[10px] shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[300px]">
        
        {/* --- LEFT PANEL: CALENDAR --- */}
        <div className="md:w-[45%] lg:w-[40%] p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
          
          <div className="flex items-center justify-between mb-2 px-2">
            <p className="text-[1.05rem] font-semibold text-gray-900">
              {monthName} <span className="text-gray-400 pl-1 font-normal">{year}</span>
            </p>
            <div className="flex gap-2">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-gray-400 font-sm pb-2 text-[0.8rem]">{day}</div>
            ))}
            {blanks.map(b => (
              <div key={`blank-${b}`} className="flex items-center justify-center text-gray-300 text-[0.8rem]">{b}</div>
            ))}

            {/* Actual Days */}
            {days.map(day => {
              const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasData = proceduresByDate[dateString] !== undefined;
              const isSelected = selectedDate === dateString;

              const today = new Date();
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

              // Interactive Styles
              let highlightClass = "text-gray-900 hover:bg-alos-green-light cursor-pointer rounded-[5px]"; 
              
              if (isSelected) {
                  highlightClass = "bg-alos-green rounded-[5px] text-white font-sm cursor-pointer"; 
              } else if (isToday) {
                  highlightClass = "bg-alos-green-light rounded-[5px] font-sm cursor-pointer hover:bg-alos-green hover:text-white"; 
              } else if (hasData) {
                  highlightClass = "bg-alos-green-light rounded-[5px] font-sm cursor-pointer hover:bg-alos-green hover:text-white";
              }

              return (
                  <div key={day} className="flex items-center justify-center relative">
                    <button 
                      onClick={() => setSelectedDate(isSelected ? null : dateString)}
                      className={`w-8 h-8 flex items-center justify-center text-[0.85rem] transition-all ${highlightClass}`}
                    >
                        {day}
                    </button>
                  </div>
              );
            })}
            {trailingBlanks.map(b => (
              <div key={`trail-${b}`} className="flex items-center justify-center text-gray-400 text-[0.8rem]">{b}</div>
            ))}
          </div>
        </div>

        {/* --- RIGHT PANEL: PROCEDURES FEED --- */}
        <div className="w-full md:w-[55%] lg:w-[60%] p-8 md:p-10 bg-white flex flex-col">
          
          {/* Dynamic Feed Header */}
          <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-50">
             <span className="text-xs font-medium text-gray-500">
               {selectedDate ? "Selected Date" : "Recent Procedures"}
             </span>
             {selectedDate && (
               <button 
                 onClick={() => setSelectedDate(null)}
                 className="flex items-center gap-1 text-[10px] font-semibold text-primary-dark border border-gray-200 hover:bg-cream-light px-2 py-1 rounded-[5px] transition-colors"
               >
                 <X size={12} /> Clear Selection
               </button>
             )}
          </div>

          <div className="max-h-[250px] overflow-y-auto pr-4 custom-scrollbar">
            {displayedFeed.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <p className="text-sm font-light tracking-tight">
                  {selectedDate ? "No procedures on this date." : "No procedures found."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {displayedFeed.map((group) => (
                  <div key={group.label} className="flex flex-col gap-2">
                    <p className="text-[1rem] font-semibold text-gray-900">{group.label}</p>
                    
                    <div className="flex flex-col gap-3 pl-0.5 mt-1">
                      {group.items.map((proc, idx) => {
                        const styleMeta = getNCPStyle(proc.snomedCode);
                        
                        const categoryTitle = proc.surveyId 
                             ? proc.surveyId.toUpperCase() 
                             : getProcedureCategory(proc.snomedCode);
                        const subtitle = proc.termEN;

                        return (
                          <div key={`${proc.id}-${idx}`} className="flex items-start gap-2">
                            <div className={`w-1 h-7 rounded-full ${styleMeta.bgClass} flex-shrink-0 mt-0.5`} />
                            <div className="flex flex-col gap-0 tracking-tight">
                              <p className="text-xs font-medium transition-colors truncate duration-200">
                                  {categoryTitle}
                              </p>
                              <span className="text-xs font-light truncate text-start transition-colors duration-200 text-gray-600">
                                  {subtitle}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}