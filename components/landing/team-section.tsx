import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  imageUrl: string; 
}

const team: TeamMember[] = [
  {
    name: "Dr. Francisco Ribeiro",
    title: "Co-Founder & Clinical Lead",
    bio: "Francisco is a registered nutritionist with extensive hands-on experience across hospitals, multidisciplinary clinics, and sports institutions. Driven by evidence-based practice and currently completing his Master’s in Clinical Nutrition at FMUL, he ensures that Alos Health is built on rigorous scientific foundations and perfectly tailored to the real-world, everyday needs of healthcare professionals.",
    imageUrl: "/founder-francisco.png"
  },
  {
    name: "Ricardo Ferreira",
    title: "Co-Founder & Lead Data Architect",
    bio: "Ricardo brings a results-oriented approach to digital strategy within HealthTech. With deep hands-on experience in building impactful brand identities and fostering community connections, he focuses on translating Alos Health' complex technological and clinical value into scalable solutions that truly resonate with the modern healthcare market.",
    imageUrl: "/founder-ricardo.png"
  }
];

export function TeamSection() {
  return (
    <section className="bg-white flex flex-col items-center py-16 md:py-20">
      <div className="w-full max-w-[1000px] px-6 md:px-8">

        {/* --- HEADER LAYER --- */}
        <div className="max-w-[540px] mb-8">
          <p className="text-[1.6rem] font-regular leading-[1.3] tracking-tight text-black">
            Founded by <span className="text-[#98C191]">Dr. Francisco Ribeiro</span>, and <span className="text-[#98C191]">Ricardo Ferreira</span>, Alos Health combines deep clinical understanding with strategic digital innovation in modern healthcare.
          </p>
        </div>

        {/* --- CONTENT LAYER --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6">
          {team.map((member) => (
            <div key={member.name} className="flex flex-col">

              <div className="w-full aspect-square rounded-[12px] bg-[#FAFAFA] flex items-center justify-center overflow-hidden relative border border-gray-100">
                <img 
                  src={member.imageUrl} 
                  alt={`Photo of ${member.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Member Details */}
              <div className="mt-6 flex flex-col">
                <span className="text-[17px] font-medium text-[#111111] tracking-tight">
                  {member.name}
                </span>
                <span className="text-[17px] font-medium text-[#111111] tracking-tight">
                  {member.title}
                </span>
                <p className="mt-5 text-[14px] text-[#868D85] font-light leading-[1.4] pr-4">
                  {member.bio}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}