"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CalButton from "@/components/ui/CalButton";
import Link from "next/link";

export default function ScrollRevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "center 0.45"],
  });

  const maxDistance = isMobile ? "25vw" : "22vw";
  const negMaxDistance = isMobile ? "-25vw" : "-22vw";

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0vw", negMaxDistance]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0vw", maxDistance]);
  const textOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 1], ["30px", "0px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-cream-light my-6"
    >
      <div className="relative h-[320px] md:h-[480px] lg:h-[620px] w-full flex items-center justify-center overflow-hidden px-4 md:px-8">

        {/* --- CENTER TEXT --- */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center text-center space-y-2 max-w-4xl px-4 md:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[70%] sm:max-w-[60%] lg:max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            Queremos ouvir os <span className="italic">nutricionistas</span>
          </h2>
          <p className="text-xs md:text-lg md:leading-[1.4] mb-6 text-primary-dark max-w-[60%] sm:max-w-[40%] lg:max-w-[55%] md:max-w-[55%]">
            O estudo-piloto é o passo seguinte: perceber como a Alos poderá integrar o seu dia a dia clínico.
          </p>

          <div className="flex gap-3">
            <CalButton
              calLink="https://cal.com/aloshealth/conversa-inicial"
              variant="primary"
            >
              Conversa Inicial
            </CalButton>
            <Link 
              href="/resources/research/o-paradigma-digital" 
              className="inline-flex items-center justify-center bg-cream-light text-primary-dark hover:bg-cream border-primary-dark/50 border transition-colors font-medium rounded-xl px-6 py-2.5 text-xs sm:text-sm"
            >
              Ler o estudo
            </Link>
          </div>
        </motion.div>

        {/* --- LEFT HALF OF THE LOGO --- */}
        <motion.div
          style={{ x: xLeft }}
          className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[280px] w-[140px] md:h-[460px] md:w-[230px] lg:h-[600px] lg:w-[300px] z-0 pointer-events-none"
        >
          <Image
            src="/illustrations/logo-l.png"
            alt="Alos Logo Left"
            fill
            sizes="(max-width: 768px) 140px, (max-width: 1024px) 230px, 300px"
            className="object-contain object-right"
            priority
          />
        </motion.div>

        {/* --- RIGHT HALF OF THE LOGO --- */}
        <motion.div
          style={{ x: xRight }}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 h-[280px] w-[140px] md:h-[460px] md:w-[230px] lg:h-[600px] lg:w-[300px] z-0 pointer-events-none"
        >
          <Image
            src="/illustrations/logo-r.png"
            alt="Alos Logo Right"
            fill
            sizes="(max-width: 768px) 140px, (max-width: 1024px) 230px, 300px"
            className="object-contain object-left"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}