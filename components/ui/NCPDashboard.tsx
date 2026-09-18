'use client'

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { computePESTags } from '@/lib/diagnosis/engine';

// --- TYPES (Unchanged) ---
interface StepData {
  id: string;
  label: string;
  description: string;
  href: string; 
  previewTitle: string;
  previewMetric: string;
  previewSubtitle?: string;
  previewTags?: string[];
  previewDate: string;
  statusColor: string;
}

interface DashboardData {
  patient: any; 
  screening?: { score: number; risk: string; date: string; statusColor: string; isRisk: boolean; rawRecord: any; } | null;
  assessment?: { type: string; label: string; date: string; rawRecord: any; } | null;
  diagnosis?: { problem: string; date: string; status: string; domain?: string | null; } | null;
  monitoring?: { date: string; isActive: boolean; views: string[]; widgetCount: number; } | null;
}

interface NCPDashboardProps {
  data: DashboardData;
}

export default function NCPDashboard({ data }: NCPDashboardProps) {
  const params = useParams();
  const patientId = params.id as string;
  const [selectedStepId, setSelectedStepId] = useState<string>("screening");

  // 1. SCREENING READ PATH
  const screeningTags = useMemo(() => {
    if (!data.screening || !data.screening.rawRecord) return [];
    
    const raw = data.screening.rawRecord;
    let tags = raw.computedTags?.suggestedScreenings || null;

    if (!tags) {
      console.warn(`[PES Engine] Missing computed tags for Dashboard Screening ID: ${raw.id}. Falling back to live computation.`);
      const mockContext = {
        demographics: { dob: data.patient?.dateOfBirth, gender: data.patient?.gender },
        screening: { latest: raw }
      };
      const computed = computePESTags(mockContext as any, [], [], new Date(raw.createdAt));
      tags = computed.suggestedScreenings;
    }

    const hiddenBadges: string[] = raw.hiddenBadges || raw.answers?.hidden_badges || []; 
    
    return (tags || [])
      .filter((s: any) => !hiddenBadges.includes(s.contextReason))
      .map((s: any) => s.contextReason);
      
  }, [data.screening, data.patient]);

  // 2. ASSESSMENT READ PATH
  const assessmentTags = useMemo(() => {
    if (!data.assessment || !data.assessment.rawRecord) return [];
    
    const raw = data.assessment.rawRecord;
    const type = data.assessment.type;
    
    let symptoms = raw.computedTags?.suggestedSymptoms || null;
    let problems = raw.computedTags?.suggestedProblems || null;

    if (!symptoms || !problems) {
      console.warn(`[PES Engine] Missing computed tags for Dashboard Assessment (${type}) ID: ${raw.id}. Falling back to live computation.`);
      
      let mockContext: any = {};

      if (type === 'body_comp') {
        mockContext = {
          demographics: { gender: data.patient?.gender, dob: data.patient?.dateOfBirth },
          anthropometry: { weight: raw.weight, height: raw.height, bmi: raw.bmi, ...(raw.measurements || {}) },
          assessment: { latest: { measurements: raw.measurements || {} } }
        };
      } else if (type === 'subjective') {
        mockContext = {
          demographics: { gender: data.patient?.gender, dob: data.patient?.dateOfBirth },
          subjectiveExam: { latest: raw }
        };
      } else if (type === 'dietary') {
        const { medication, ...safeHistory } = data.patient?.medicalHistory || {};
        mockContext = {
          demographics: { gender: data.patient?.gender, dob: data.patient?.dateOfBirth, medicalHistory: safeHistory },
          dietary: { latest: raw }
        };
      } else if (type === 'bq_parameters') {
        const { medication, ...safeHistory } = data.patient?.medicalHistory || {};
        mockContext = {
          demographics: { gender: data.patient?.gender, dob: data.patient?.dateOfBirth, medicalHistory: safeHistory },
          bq: { latest: raw }
        };
      } else if (type === 'questionnaire') {
        mockContext = {
          questionnaire: { latest: raw } 
        };
      } else if (type === 'drug-nutrient') {
        mockContext = {
          demographics: {
            gender: data.patient?.gender,
            dob: data.patient?.dateOfBirth,
            medicalHistory: { medication: raw.medications || [] } 
          }
        };
      }

      const computed = computePESTags(mockContext, [], [], new Date(raw.date || raw.createdAt || new Date()));
      symptoms = computed.suggestedSymptoms;
      problems = computed.suggestedProblems;
    }
    
    const hiddenBadges = raw?.measurements?.ui_preferences?.hidden_badges ||  
                         raw?.measurements?.hidden_badges ||                  
                         raw?.settings?.ui_preferences?.hidden_badges ||      
                         raw?.findings?.ui_preferences?.hidden_badges ||      
                         [];
    
    const validTags = [...(symptoms || []), ...(problems || [])]
      .filter((s: any) => s.code !== '129689002') 
      .filter((s: any) => !hiddenBadges.includes(s.contextReason));
      
    const tagsToDisplay: string[] = [];

    validTags.forEach((s: any) => {
      if (type === 'questionnaire') {
        if (raw.surveyId === 'sarc-f') {
          tagsToDisplay.push(s.contextReason);
          tagsToDisplay.push(s.term);
        } else {
          tagsToDisplay.push(s.term);
        }
      } else {
        tagsToDisplay.push(s.contextReason); 
      }
    });

    return tagsToDisplay;
  }, [data.assessment, data.patient]);

  // DATA CONFIGURATION
  const STEPS: StepData[] = [
    { 
      id: "screening", 
      label: "Nutritional Risk Identification", 
      description: "Identify risk factors, use appropriate tools & methods", 
      href: "screening",
      previewTitle: "",
      previewMetric: "",
      previewSubtitle: data.screening ? data.screening.risk : "Patient not screened yet",
      previewTags: data.screening ? screeningTags : undefined,
      previewDate: data.screening ? data.screening.date : "",
      statusColor: "gray",
    },
    { 
      id: "assessment", 
      label: "Nutritional Assessment & Re-Assessment", 
      description: "Collect & analyze relevant data", 
      href: "assessment",
      previewTitle: "",
      previewMetric: "", 
      previewTags: data.assessment ? assessmentTags : undefined,
      previewSubtitle: data.assessment ? data.assessment.label : "No Assessment Found",
      previewDate: data.assessment ? data.assessment.date : "",
      statusColor: data.assessment ? "gray" : "gray"
    },
    { 
      id: "diagnosis", 
      label: "Nutritional Diagnosis", 
      description: "Identify specific nutritional problems (PES Statement)", 
      href: "diagnosis",
      previewTitle: "",
      previewMetric: "", 
      previewSubtitle: data.diagnosis ? data.diagnosis.problem : "No problem identified",
      previewTags: data.diagnosis ? [data.diagnosis.status, data.diagnosis.domain].filter(Boolean) as string[] : undefined, 
      previewDate: data.diagnosis ? data.diagnosis.date : "",
      statusColor: "gray",
    },
    { 
      id: "intervention", 
      label: "Nutritional Intervention", 
      description: "Determine intervention and prescription, formulate goals and implement actions", 
      href: "intervention",
      previewTitle: "",
      previewMetric: "Not set",
      previewSubtitle: "Coming soon",
      previewDate: "",
      statusColor: "gray"
    },
    { 
      id: "monitoring", 
      label: "Monitoring & Evaluation", 
      description: "Select or identify quality indicators, monitor & evaluate resolution of diagnosis", 
      href: "monitoring",
      previewTitle: "",
      previewMetric: "",
      previewSubtitle: data.monitoring?.isActive ? `${data.monitoring.widgetCount} Active tracking widgets` : "No widgets active",
      previewTags: data.monitoring?.isActive ? data.monitoring.views : undefined, 
      previewDate: data.monitoring ? data.monitoring.date : "",
      statusColor: "gray",
    },
  ]

  const currentData = STEPS.find(s => s.id === selectedStepId) || STEPS[0];

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center ml-4 mb-4 mt-10">
      <p className="text-gray-700 tracking-tighter">
        Nutrition Care Process
      </p>
      </div>

      <div className="bg-white hover:shadow-[inset_0_0_4px_rgba(191,191,191,0.2),0px_1px_2px_rgba(0,0,0,0.05)] border-gray-100 border rounded-[5px] shadow-sm flex flex-col lg:flex-row overflow-hidden min-h-[220px]">
        
        {/* --- LEFT COMPARTMENT: DYNAMIC PREVIEW --- */}
        <div className="flex-1 p-8 flex flex-col justify-center relative bg-gradient-to-br from-white">
          <div className="space-y-6">
             <div>         
              <div className="flex flex-col gap-4 mb-2">
               <p className={`text-lg text-gray-700
                ${currentData.statusColor === 'red' ? 'text-red-600' : ''}
                ${currentData.statusColor === 'green' ? 'text-green-600' : ''}
                ${currentData.statusColor === 'orange' ? 'text-orange-600' : ''}
                ${currentData.statusColor === 'blue' ? 'text-blue-500' : ''}
                ${currentData.statusColor === 'gray' ? 'text-gray-400' : ''}
               `}>
                {currentData.previewSubtitle}
               </p>

               {currentData.previewTags && currentData.previewTags.length > 0 && (
                 <div className="flex flex-wrap gap-2 mb-2">
                   {currentData.previewTags.map((tag, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-[0.65rem] bg-alos-green-light text-alos-green">
                        {tag}
                      </span>
                   ))}
                 </div>
               )}
             </div>

               <div className="flex items-baseline">
                 <span className={`text-xs font-light tracking-tight text-gray-400`}>
                   {currentData.previewMetric}
                 </span>
               </div>
               </div>

             <div className="text-xs font-medium text-gray-400">
                {currentData.previewDate && `Last Update: ${currentData.previewDate}`}
             </div>
          </div>

          <div>
            <Link 
              href={patientId ? `/dashboard/patient/${patientId}/${currentData.href}` : '#'}
              className="group w-fit flex mt-12 relative lg:right-[2%] right-[3%] items-center rounded-[5px] px-2 py-1 text-xs font-medium text-primary-dark transition-colors border border-gray-200 hover:bg-cream-light"
            >
              Go to {currentData.label} 
            </Link>
          </div>
        </div>

        {/* --- RIGHT COMPARTMENT: INTERACTIVE SELECTOR --- */}
        <div className="w-full lg:w-[55%] p-10 border-l border-gray-100 flex flex-col justify-center">
          <div className="flex flex-col"> 
            {STEPS.map((step, index) => {
              const isSelected = selectedStepId === step.id;
              const isLast = index === STEPS.length - 1; 
              
              return (
                <button 
                  key={step.id}
                  onClick={() => setSelectedStepId(step.id)}
                  className={`
                    group flex items-center justify-between w-full text-left relative outline-none py-2 transition-all duration-200
                    ${!isLast ? 'border-b border-transparent' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div 
                      className={`
                        w-1 rounded-full shrink-0
                        ${isSelected ? "bg-alos-green-light h-8" : "bg-cream-light h-8"} 
                      `}
                    />
                    <div className=" w-full space-y-0">
                    <p 
                      className={`
                        text-xs font-semibold tracking-tight transition-colors truncate duration-200
                        ${isSelected ? "text-gray-900" : "text-gray-400"}
                      `}
                    >
                      {step.label}
                    </p>
                    <p 
                      className={`
                        text-xs tracking-tight truncate text-start transition-colors duration-200
                        ${isSelected ? "text-gray-700" : "text-gray-400"}
                      `}
                    >
                      {step.description}
                    </p>
                  </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}