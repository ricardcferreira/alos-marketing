"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CalButton from "@/components/ui/CalButton";

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
          <h2 className="text-3xl md:text-4xl lg:text-6xl max-w-[85%] font-serif text-primary-dark tracking-tight leading-tight md:leading-[1.1]">
            <span className="italic">Lorem ipsum.</span> <br />
            Ut enim ad minim
            <br />
            consectetur adipiscing elit
          </h2>
          <p className="text-xs md:text-sm md:leading-[1.4] mb-6 text-primary-dark max-w-[80%] md:max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <CalButton
            calLink="https://cal.com/aloshealth/conversa-inicial"
            variant="primary"
          >
            Conversa Inicial
          </CalButton>
        </motion.div>

        {/* --- LEFT HALF OF THE LOGO --- */}
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

        {/* --- RIGHT HALF OF THE LOGO --- */}
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