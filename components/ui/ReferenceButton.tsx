'use client';

import React, { useState } from 'react';
import { BookOpen, AlertTriangle, Activity, ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'; 
import { getFormulaById } from '@/lib/body_composition/02_registry/formula-registry';
import { PARAMETER_REGISTRY } from '@/lib/body_composition/02_registry/parameter-registry';
import { BQ_PARAMETER_REGISTRY } from '@/lib/bq_parameters/bq-parameter-registry';
import { ReferenceFrameworkModal } from '@/components/resources/templates/ReferenceFrameworkModal';

// Define the shape of the Direct Metadata
export interface ReferenceMetadata {
  label: string;
  year: string | number;
  context: string;
  validation: {
    age?: string;
    ethnicity?: string;
    status?: string;
  };
  variables?: { name: string; note?: string }[];
  clinicalSignificance?: {
    causes?: string;
    signs?: string;
    treatment?: string;
  };
  // Helps UI know which label to use
  isBq?: boolean; 
}

interface ReferenceBookButtonProps {
  formulaId?: string | null; 
  subModel?: string;
  fallbackLabel?: string;    
  isFallback?: boolean;
  metadata?: ReferenceMetadata;
  parameterId?: string;
  standardId?: string;
  patientAge?: number;
  patientAgeInMonths?: number;
  patientGender?: string;
  patientEthnicity?: string;
  timeFrame?: string;
  patientClassification?: string;
  patientStatus?: string;
  patientValue?: number;
  amputationData?: string[]; 
  patientHeight?: number;
}

export const ReferenceBookButton = ({ 
  formulaId, 
  subModel,
  fallbackLabel, 
  isFallback = false,
  metadata,
  parameterId,
  standardId,
  patientAge,
  patientAgeInMonths,
  patientGender,
  patientEthnicity,
  timeFrame,
  patientClassification,
  patientStatus,
  patientValue,
  amputationData,
  patientHeight
}: ReferenceBookButtonProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 1. DATA RESOLUTION LOGIC
  let data: ReferenceMetadata | null = null;
  let searchId = formulaId || standardId;

  if (metadata) {
    if (metadata.validation) {
      data = metadata as ReferenceMetadata;
    } else if ((metadata as any).id) {
      searchId = (metadata as any).id;
    }
  }

  if (!data && searchId) {
    let foundData: any = undefined;
    let isBqSource = false; // <-- Tracker

    // A. Search Anthro
    for (const param of Object.values(PARAMETER_REGISTRY)) {
      if (param.standards) {
        foundData = param.standards.find((std: any) => std.id === searchId);
        if (foundData) break;
      }
    }

    // B. Search BQ
    if (!foundData) {
      for (const param of BQ_PARAMETER_REGISTRY) {
        if (param.standards) {
          foundData = param.standards.find((std: any) => std.id === searchId);
          if (foundData) {
            isBqSource = true; // <-- Flag it!
            break;
          }
        }
      }
    }

    // C. Search Formulas
    if (!foundData) {
       foundData = getFormulaById(searchId);
    }

    if (foundData) {
        data = {
            label: foundData.label || foundData.name || fallbackLabel || searchId,
            year: foundData.year || "",
            context: foundData.context || foundData.description || "No context provided.",
            validation: {
                age: foundData.validation?.age,
                ethnicity: foundData.validation?.ethnicity,
                status: foundData.validation?.status
            },
            variables: foundData.variables,
            clinicalSignificance: foundData.clinicalSignificance,
            isBq: isBqSource
        };
    }
  }

  if (!data) return null; 

  const Icon = isFallback ? AlertTriangle : BookOpen;
  const buttonStyles = isFallback
    ? "bg-gray-100 text-red-400 hover:text-red-900"
    : "bg-gray-100 text-gray-400 hover:text-gray-900";

  const isValid = (val?: string) => val && val !== 'N/A' && val.trim() !== '';

  // DYNAMIC LABEL CHECK+
  // Ensure we definitively identify BQ parameters even if passed directly via metadata
  const existsInBqRegistry = BQ_PARAMETER_REGISTRY.some(param =>
    param.standards?.some((std: any) => std.id === searchId)
  );

  const isBqStandard = data.isBq || !!data.clinicalSignificance || existsInBqRegistry;
  const hasModalContent = ((parameterId && standardId) || formulaId) && !isBqStandard;

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button 
              type="button"
              className={`px-1 py-1 rounded-full align-middle transition-colors ${buttonStyles}`}
            >
              <Icon size={10} />
            </button>
          </TooltipTrigger>
          
          <TooltipContent 
            side="bottom" 
            align="center"
            sideOffset={10}
            className="w-max-[340px] p-2 rounded-sm overflow-hidden bg-white border border-gray-100 shadow-sm text-bottom z-50"
          >
             
             {/* SECTION 1: HEADER (Context) */}
             <div className="p-2 rounded-sm space-y-1">
               <div className="flex justify-between items-baseline mb-1">
                  <p className="text-[13px] font-medium">{data.label} {data.year ? `(${data.year})` : ''}</p>
               </div>
               <p className="text-xs max-w-[260px] text-gray-700">
                 {data.context}
               </p>
             </div>

             <div className='h-[0.1rem] rounded-full mt-2 mb-2 bg-gray-100'> </div>

             <div className="p-2 space-y-4">
                 
                 {/* SECTION 2: VALIDATION (Grid Layout) */}
                 {(isValid(data.validation.age) || isValid(data.validation.ethnicity) || isValid(data.validation.status)) && (
                   <div className="space-y-2">
                       <div className="grid grid-cols-[80px_1fr] gap-y-1 gap-x-0 text-xs">
                           
                           {isValid(data.validation.age) && (
                             <>
                               <span className="text-gray-400">Age:</span>
                               <span className="text-gray-700">{data.validation.age}</span>
                             </>
                           )}
                           
                           {isValid(data.validation.ethnicity) && (
                             <>
                               <span className="text-gray-400">Population:</span>
                               <span className="text-gray-700 leading-snug max-w-[160px]">{data.validation.ethnicity}</span>
                             </>
                           )}
                           
                           {isValid(data.validation.status) && (
                             <>
                               {/* NEW: Dynamic Labeling based on source */}
                               <span className="text-gray-400">{isBqStandard ? 'Status:' : 'Sample Size:'}</span>
                               <span className="text-gray-700 leading-snug">{data.validation.status}</span>
                             </>
                           )}

                           {/* CLINICAL EVIDENCE (BQ GUIDELINES) */}
                            {data.clinicalSignificance && (
                              <div className="space-y-2">
                                  <div className="grid grid-cols-[80px_1fr] gap-y-1 gap-x-0 text-xs">
                                      
                                      {isValid(data.clinicalSignificance.causes) && (
                                        <>
                                          <span className="text-gray-400">High Risk:</span>
                                          <span className="text-gray-700">{data.clinicalSignificance.causes}</span>
                                        </>
                                      )}
                                      
                                      {isValid(data.clinicalSignificance.signs) && (
                                        <>
                                          <span className="text-gray-400">Signs:</span>
                                          <span className="text-gray-700 leading-snug min-w-[160px]">{data.clinicalSignificance.signs}</span>
                                        </>
                                      )}

                                      {isValid(data.clinicalSignificance.treatment) && (
                                        <>
                                          <span className="text-gray-400">Protocol:</span>
                                          <span className="text-gray-700 leading-snug">{data.clinicalSignificance.treatment}</span>
                                        </>
                                      )}
                                  </div>
                              </div>
                            )}
                       </div>
                   </div>
                 )}

                 {/* REFERENCE GUIDE BUTTON */}
                 {hasModalContent && (
                   <div className="flex justify-center items-center mt-2">
                    {isFallback && (
                       <div className=" text-red-900 text-xs font-medium py-0.5 px-2 bg-red-200 rounded-full">
                         Fallback
                       </div>
                    )}
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="ml-auto flex items-center justify-center p-1 rounded-sm hover:bg-alos-green-light bg-alos-green-light text-alos-green transition-colors group"
                        title="Open Reference Framework"
                      >
                        <ArrowUpRight size={14} className="group-hover:scale-110 transition-transform" />
                      </button>
                   </div>
                 )}
             </div>

          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* THE MODAL CONTENT */}
      {hasModalContent && (
        <ReferenceFrameworkModal 
          parameterId={parameterId} 
          standardId={standardId}
          formulaId={formulaId}
          subModel={subModel}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          patientAge={patientAge}
          patientAgeInMonths={patientAgeInMonths}
          patientGender={patientGender}
          patientEthnicity={patientEthnicity}
          timeFrame={timeFrame}
          patientClassification={patientClassification}
          patientStatus={patientStatus}
          patientValue={patientValue}
          patientHeight={patientHeight}
          amputationData={amputationData}
        />
      )}
    </>
  );
};