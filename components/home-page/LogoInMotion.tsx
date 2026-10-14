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

  const { scrollYProgress: desktopProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xLeftDesktop = useTransform(desktopProgress, [0, 0.8], ["0vw", "-22vw"]);
  const xRightDesktop = useTransform(desktopProgress, [0, 0.8], ["0vw", "22vw"]);
  const opacityDesktop = useTransform(desktopProgress, [0.1, 0.8], [0, 1]);
  const yDesktop = useTransform(desktopProgress, [0.1, 0.8], ["40px", "0px"]);

  // ---------- MOBILE (no pinning) ----------
  // 0 = section top is at 90% of the viewport height (just entering)
  // 1 = section center is at 55% of the viewport height
  const { scrollYProgress: mobileProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "center 0.55"],
  });

  const distance = isMobile ? "20vw" : "22vw";
  const negativeDistance = isMobile ? "-20vw" : "-22vw";

  const xLeftMobile = useTransform(mobileProgress, [0, 0.8], ["0vw", "-20vw"]);
  const xRightMobile = useTransform(mobileProgress, [0, 0.8], ["0vw", "20vw"]);
  // Text starts hidden and is revealed after the halves begin to open
  const opacityMobile = useTransform(mobileProgress, [0.3, 0.9], [0, 1]);
  const yMobile = useTransform(mobileProgress, [0.3, 0.9], ["40px", "0px"]);

  // Pick the right set of transforms for the current breakpoint
  const xLeft = isMobile ? xLeftMobile : xLeftDesktop;
  const xRight = isMobile ? xRightMobile : xRightDesktop;
  const textOpacity = isMobile ? opacityMobile : opacityDesktop;
  const textY = isMobile ? yMobile : yDesktop;

  return (
    // Only desktop gets the extra scroll length
    <section ref={containerRef} className="relative w-full bg-cream-light md:h-[150vh]">
      {/* Mobile: fixed height that fits the content. Desktop: sticky + full screen */}
      <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden px-4 md:sticky md:top-0 md:h-screen md:px-8">

        {/* --- CENTER TEXT --- */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex flex-col items-center text-center space-y-2 max-w-4xl px-4 md:px-0"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl lg:text-6xl max-w-[70%] sm:max-w-[60%] lg:max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            <span className="italic">Ouvimos os nutricionistas. </span>
            Agora, continuamos a construir ao seu lado.
          </h2>
          <p className="text-xs md:text-lg md:leading-[1.4] mb-6 text-primary-dark max-w-[80%] sm:max-w-[40%] lg:max-w-[80%] md:max-w-2xl">
            O Estudo-Piloto é o passo seguinte: perceber como a Alos poderá integrar o seu dia a dia clínico, para dedicar mais tempo ao que importa, o doente.
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
          className="absolute right-1/2 top-1/2 -translate-y-1/2 h-[300px] w-[150px] md:h-[500px] md:w-[250px] lg:h-[700px] lg:w-[350px] z-0 pointer-events-none"
        >
          <Image
            src="/illustrations/logo-l.png"
            alt="Alos Logo Left"
            fill
            className="object-contain object-right"
            priority
          />
        </motion.div>

        {/* --- RIGHT HALF OF THE LOGO --- */}
        <motion.div
          style={{ x: xRight }}
          className="absolute left-1/2 top-1/2 -translate-y-1/2 h-[300px] w-[150px] md:h-[500px] md:w-[250px] lg:h-[700px] lg:w-[350px] z-0 pointer-events-none"
        >
          <Image
            src="/illustrations/logo-r.png"
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