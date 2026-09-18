import React from 'react';

export function HeroSection() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-[#FCFAF8] py-24 md:py-[120px] px-12">

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-[1000px] flex flex-col space-y-4">
        
        {/* Main Heading */}
        <p className="text-[1.6rem] font-regular leading-[1.1] tracking-tight text-black max-w-[400px] md:max-w-[850px]">
          Time we should be devoting <br className="hidden md:block" />
          to what really matters:{" "}
          <span className="text-[#98C191]">
            the<br className="hidden md:block" /> patient and clinical practice
          </span>
        </p>
        
        {/* Subtitle */}
        <p className="text-[0.8rem] text-gray-600 leading-[1.2] font-regular tracking-tight max-w-[380px]">
          Our mission is to shift the dietitian's focus back to the patient by reducing the administrative burden through the digitization of the Nutrition Care Process.
        </p>
        
      </div>
      
    </section>
  );
}