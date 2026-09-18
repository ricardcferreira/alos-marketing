'use client'

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import A_CustomSelect, { SelectOption } from '@/components/ui/CustomSelect'; 

interface GlobalPatientSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionTitle: string;
  actionRouteSuffix: string; // e.g., '/assessment/dietary/new'
  allPatients: any[];
}

const CATEGORY_OPTIONS: SelectOption[] = [
  { id: 'All', label: 'All' },
  { id: 'Outpatient', label: 'Outpatient' },
  { id: 'Inpatient', label: 'Inpatient' },
  { id: 'Residential Care', label: 'Residential Care' },
  { id: 'Primary Care', label: 'Primary Care' },
];

export default function GlobalPatientSelectorModal({
  isOpen,
  onClose,
  actionTitle,
  actionRouteSuffix,
  allPatients
}: GlobalPatientSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  const filteredPatients = allPatients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || patient.context === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectPatient = (patientId: string) => {
    // Navigate directly to the action route for this specific patient
    router.push(`/dashboard/patient/${patientId}${actionRouteSuffix}`);
    onClose();
  };

  const modalOverlay = (
    <div 
      onMouseDown={(e) => e.stopPropagation()} 
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-gray-900/10"
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Header / Search Bar */}
        <div className="flex items-center gap-4 p-4 flex-shrink-0 relative">
          <div className="flex items-center gap-3 w-1/3 text-left">
            <button 
              onClick={onClose}
              className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-[5px] transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <span className="text-[13px] text-gray-800">
              <span className="font-regular">{actionTitle}</span>
            </span>
          </div>
          
          <div className="w-1/3 flex justify-center">
            <div className="relative w-full max-w-sm">
              <Search className="w-3 h-3 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none transition-all placeholder-gray-400"
                autoFocus
              />
            </div>
          </div>
          <div className="w-1/3"></div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-12 md:px-32 pb-12">
          
          {/* Filters */}
          <div className="pt-6 pb-4">
            <div className="w-32">
              <A_CustomSelect 
                value={activeCategory}
                options={CATEGORY_OPTIONS}
                onChange={setActiveCategory}
                className="text-primary-dark border border-gray-200 rounded-[5px]"
              />
            </div>
          </div>

          {/* Patient Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => handleSelectPatient(patient.id)}
                className="group flex flex-col justify-between p-6 bg-[#F8F9FA] hover:bg-[#F1F3F5] border border-transparent hover:border-gray-200 rounded-xl transition-all text-left h-[140px] relative overflow-hidden"
              >
                <div>
                  <span className="text-base font-medium text-gray-900 truncate block">
                    {patient.firstName} {patient.lastName}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {patient.context || 'No context specified'}
                  </span>
                </div>
              </button>
            ))}

            {filteredPatients.length === 0 && (
              <div className="col-span-full py-12 text-center flex flex-col items-center justify-center">
                <p className="text-gray-500 font-medium mb-1">No patients found.</p>
                <p className="text-gray-400 text-xs">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return isOpen && mounted ? createPortal(modalOverlay, document.body) : null;
}