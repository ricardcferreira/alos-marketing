import React from 'react';

export function ResearchSection() {
  return (
    <section className="w-full bg-white flex flex-col items-center py-16 md:py-20">
      <div className="w-full max-w-[1000px] px-6 md:px-8">
        
        {/* --- SECTION HEADER --- */}
        <p className="text-[1rem] font-medium text-black tracking-tighter mb-12 md:mb-16">
          Research in Digital Health
        </p>

        {/* --- CLICKABLE PUBLICATION BLOCK --- */}
        <a 
          href="https://study.areunuts.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group block"
        >
          {/* 
            Grid Layout: 1 column on mobile, 4 columns on desktop 
            The bottom border acts as the separator line from your mockup
          */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 border-b border-gray-200 pb-6 duration-200 transition-colors hover:opacity-70">
            
            {/* Left Column: Meta Information */}
            <div className="col-span-1 flex flex-col">
              <p className="text-[0.9rem] font-medium text-black tracking-tight">
                Publication
              </p>
              <span className="text-[0.75rem] font-light text-gray-600 mt-1">
                Jul 23, 2026
              </span>
            </div>

            {/* Right Column: Title & Description */}
            <div className="col-span-1 md:col-span-3 flex flex-col">
              <p className="text-[1rem] font-medium text-black leading-snug tracking-tighter">
                The Digital Paradigm in Clinical Nutrition: Challenges, Bureaucracy, and Innovation
              </p>
              
              <p className="text-[0.8rem] text-gray-600 font-light leading-[1.3] max-w-[750px]">
                This study aims to understand the real challenges faced by dietitians in clinical practice and to map the relationship between technology, administrative time, and perceptions of professional value. Shaping the future of management and clinical decision-support tools will allow dietitians to refocus their full attention on the patient.
              </p>
            </div>

          </div>
        </a>

      </div>
    </section>
  );
}