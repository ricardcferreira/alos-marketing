'use client'

import React, { useState, useRef, useEffect } from 'react';
import GlobalPatientSelectorModal from './GlobalPatientSelectorModal';

interface QuickActionsProps {
  patients: any[];
}

export default function QuickActionsGrid({ patients }: QuickActionsProps) {
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalRoute, setModalRoute] = useState('');

  // Dropdown States
  const [isScreeningMenuOpen, setIsScreeningMenuOpen] = useState(false);
  const [isAssessmentMenuOpen, setIsAssessmentMenuOpen] = useState(false);
  
  const screeningMenuRef = useRef<HTMLDivElement>(null);
  const assessmentMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (screeningMenuRef.current && !screeningMenuRef.current.contains(event.target as Node)) {
        setIsScreeningMenuOpen(false);
      }
      if (assessmentMenuRef.current && !assessmentMenuRef.current.contains(event.target as Node)) {
        setIsAssessmentMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = (title: string, routeSuffix: string) => {
    setModalTitle(title);
    setModalRoute(routeSuffix);
    setIsModalOpen(true);
    // Close any open dropdowns
    setIsScreeningMenuOpen(false); 
    setIsAssessmentMenuOpen(false); 
  };

  // --- MENU CONFIGURATIONS ---

  const screeningOptions = [
    { label: 'MUST', route: '/survey/must' },
    { label: 'MNA-SF', route: '/survey/mna-sf' },
    { label: 'STRONG-KIDS', route: '/survey/strong-kids' },
    { label: 'NRS-2002', route: '/survey/nrs-2002' },
    { label: 'SNAQ', route: '/survey/snaq' },
    { label: 'MST', route: '/survey/mst' },
    { label: 'SNAQ 65+', route: '/survey/snaq-65' },
    { label: 'SNAQ-RC', route: '/survey/snaq-rc' },
  ];

  const assessmentOptions = [
    { label: 'Signs & Symptoms', route: '/assessment/subjective-exam/new' },
    { label: 'Drug Nutrient', route: '/assessment/drug-nutrient/new' },
    { label: 'Body Composition', route: '/assessment/body-composition/new' },
    { label: 'Dietary Intake', route: '/assessment/dietary/new' },
    { label: 'Biological Markers', route: '/assessment/bq-parameters/new' },
    { label: 'SARC-F', route: '/assessment/questionnaires/sarc-f' },
    { label: 'SGA', route: '/assessment/questionnaires/sga' },
    { label: 'GLIM Criteria', route: '/assessment/questionnaires/glim' },
  ];

  // --- RENDER HELPERS ---
  
  const renderCardBody = (imageSrc: string, title: string, description: string) => (
    <div className="flex flex-col gap-3">
      <div className="flex space-y-1 pt-1">
        <img src={imageSrc} alt={title} className="w-10 h-10 object-contain drop-shadow-sm" />
        <div className="space-y-2 p-1">
          <span className="font-secondary font-medium text-[16px] text-primary-dark tracking-tighter text-left">{title}</span>
          <p className="font-sans text-[13px] text-gray-500 leading-relaxed pr-2 text-left">{description}</p>
        </div>
      </div>
    </div>
  );

  const cardClasses = "w-[300px] shrink-0 snap-start flex flex-col text-left py-4 px-3 border border-gray-100 hover:shadow-[inset_0_0_4px_rgba(191,191,191,0.2),0px_1px_2px_rgba(0,0,0,0.05)] shadow-sm justify-between transition-all duration-300 rounded-[12px] bg-white cursor-pointer group";

  return (
    <div className="mb-12">
      
      <div className="flex overflow-x-auto gap-4 pb-64 -mb-60 pt-2 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        {/* Screening (with Dropdown) */}
        <div className="relative w-[300px] shrink-0 snap-start" ref={screeningMenuRef}>
          <button 
            onClick={() => {
              setIsScreeningMenuOpen(!isScreeningMenuOpen);
              setIsAssessmentMenuOpen(false); // Mutual exclusion
            }}
            className={`w-full h-full ${cardClasses}`}
          >
            {renderCardBody('/icons/screening.png', 'Screening', 'Identify risk factors, use appropriate tools and methods.')}
          </button>

          {isScreeningMenuOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-100 shadow-sm rounded-[10px] p-2 z-50 flex flex-col gap-1 max-h-[220px] overflow-y-auto custom-scrollbar">
              {screeningOptions.map((opt) => (
                <button 
                  key={opt.label}
                  onClick={() => openModal(`Screening: ${opt.label.split(' ')[0]}`, opt.route)}
                  className="shrink-0 text-left px-3 py-2.5 text-[13px] text-gray-700 font-regular hover:bg-cream-light hover:text-primary-dark rounded-[5px] transition-colors truncate"
                  title={opt.label}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Assessment (with Dropdown) */}
        <div className="relative w-[300px] shrink-0 snap-start" ref={assessmentMenuRef}>
          <button 
            onClick={() => {
              setIsAssessmentMenuOpen(!isAssessmentMenuOpen);
              setIsScreeningMenuOpen(false); // Mutual exclusion
            }}
            className={`w-full h-full ${cardClasses}`}
          >
            {renderCardBody('/icons/assessment.png', 'Assessment', 'Collect and analyze relevant nutritional data.')}
          </button>

          {isAssessmentMenuOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-white border border-gray-100 shadow-sm rounded-[10px] p-2 z-50 flex flex-col gap-1 max-h-[220px] overflow-y-auto custom-scrollbar">
              {assessmentOptions.map((opt) => (
                <button 
                  key={opt.label}
                  onClick={() => openModal(`Assessment: ${opt.label}`, opt.route)}
                  className="shrink-0 text-left px-3 py-2.5 text-[13px] text-gray-700 font-regular hover:bg-cream-light hover:text-primary-dark rounded-[5px] transition-colors truncate"
                  title={opt.label}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Diagnosis */}
        <button 
          onClick={() => openModal('Diagnosis', '/diagnosis/new')}
          className={cardClasses}
        >
          {renderCardBody('/icons/diagnosis.png', 'Diagnosis', 'Identify specific nutritional problems (PES).')}
        </button>

        {/* Intervention */}
        <button 
          onClick={() => openModal('Intervention', '/intervention')}
          className={cardClasses}
        >
          {renderCardBody('/icons/intervention.png', 'Intervention', 'Determine intervention and prescription.')}
        </button>

        {/* Monitoring */}
        <button 
          onClick={() => openModal('Monitoring', '/monitoring')}
          className={cardClasses}
        >
          {renderCardBody('/icons/monitoring.png', 'Monitoring', 'Monitor and evaluate resolution of diagnosis.')}
        </button>

      </div>

      <GlobalPatientSelectorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionTitle={modalTitle}
        actionRouteSuffix={modalRoute}
        allPatients={patients}
      />
    </div>
  );
}