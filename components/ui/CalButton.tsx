"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils"; 

interface CalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  calLink: string;
  variant?: "primary" | "secondary";
  section?: string;
}

export default function CalButton({ 
  calLink, 
  variant = "primary",
  section,
  className, 
  children,
  onClick,
  ...props 
}: CalButtonProps) {
  
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } }, 
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call the global gtag function directly 
    if (section && typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "clique_conversa_inicial", {
        seccao_origem: section,
      });
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
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
  );
}