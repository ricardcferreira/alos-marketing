"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CalButton from "@/components/lp/CalButton";

export default function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xLeft = useTransform(scrollYProgress, [0, 0.8], ["0vw", "-28vw"]);
  const xRight = useTransform(scrollYProgress, [0, 0.8], ["0vw", "28vw"]);
  
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.8], ["40px", "0px"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-cream-light">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8">

        {/* --- TEXTO CENTRAL --- */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-[72px] font-serif text-primary-dark tracking-tight leading-[1.05]">
            <span className="italic">Lorem ipsum.</span>Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-primary-dark/80 leading-relaxed max-w-2xl mb-6 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
          
          <CalButton 
            calLink="https://cal.com/aloshealth/conversa-inicial" 
            variant="primary"
          >
            Conversa Inicial
          </CalButton>
        </motion.div>

        {/* --- METADE ESQUERDA DO LOGO --- */}
        <motion.div 
          style={{ x: xLeft }}
          className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[300px] w-[150px] md:h-[500px] md:w-[250px] lg:h-[700px] lg:w-[350px] z-0 pointer-events-none"
        >
          <Image 
            src="/landscape/logo-l.png" 
            alt="Alos Logo Left" 
            fill 
            className="object-contain object-right"
            priority
          />
        </motion.div>

        {/* --- METADE DIREITA DO LOGO --- */}
        <motion.div 
          style={{ x: xRight }}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 h-[300px] w-[150px] md:h-[500px] md:w-[250px] lg:h-[700px] lg:w-[350px] z-0 pointer-events-none"
        >
          <Image 
            src="/landscape/logo-r.png" 
            alt="Alos Logo Right" 
            fill 
            className="object-contain object-left"
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}