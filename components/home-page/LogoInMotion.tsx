"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CalButton from "@/components/ui/CalButton";

export default function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const distance = isMobile ? "20vw" : "22vw";
  const negativeDistance = isMobile ? "-20vw" : "-22vw";

  const xLeft = useTransform(scrollYProgress, [0, 0.8], ["0vw", negativeDistance]);
  const xRight = useTransform(scrollYProgress, [0, 0.8], ["0vw", distance]);
  
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.8], ["40px", "0px"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] w-full bg-cream-light">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8">

        {/* --- TEXTO CENTRAL --- */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          // Adicionado px-4 em mobile para evitar que o texto toque nas metades do logo
          className="relative z-10 flex flex-col items-center text-center space-y-2 max-w-4xl px-4 md:px-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            <span className="italic">Lorem ipsum.</span> <br></br>Ut enim ad minim<br></br>consectetur adipiscing elit
          </h2>
          <p className="text-xs md:text-sm md:leading-[1.4] mb-6 text-primary-dark max-w-[80%] md:max-w-[70%] md:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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