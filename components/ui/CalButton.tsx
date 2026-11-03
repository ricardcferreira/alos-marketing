"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils"; 

interface CalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  calLink?: string; 
  variant?: "primary" | "secondary";
  section?: string;
}

export default function CalButton({ 
  calLink = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ21NqlIge_xnC-TYbsLfhDjkXBzTBbvFRcoHETji4KsTPeNLcWLi-YCxDbRGs4bvLBmiqicD8_C?gv=true", 
  variant = "primary",
  section,
  className, 
  children,
  onClick,
  ...props 
}: CalButtonProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent SSR hydration errors by ensuring portals only render on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (section && typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "clique_conversa_inicial", {
        seccao_origem: section,
      });
    }

    setIsModalOpen(true);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center font-medium rounded-xl px-3 py-2 text-xs md:text-xs lg:text-sm transition-colors border",
          variant === "primary" && "bg-alos-green-light text-alos-green hover:bg-alos-green border-alos-green hover:text-white",
          variant === "secondary" && "bg-alos-yellow text-alos-brown hover:bg-alos-brown border-transparent hover:text-white",
          className
        )}
        {...props}
      >
        {children}
      </button>

      {/* Render the modal in a React Portal attached to the document body */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#212D37]/30 p-4 md:p-8">
          
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative z-10 w-full max-w-5xl p-4 h-[85vh] bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-xl flex flex-col">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-10 block sm:hidden md:top-6 md:right-12 z-20 flex items-center justify-center w-10 h-10 bg-cream-light hover:bg-cream rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <iframe 
              src={calLink} 
              className="w-full h-full border-none"
              title="Agendar Conversa Inicial"
              allowFullScreen
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}