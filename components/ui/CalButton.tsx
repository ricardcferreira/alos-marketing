"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils"; 

interface CalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  calLink: string;
  variant?: "primary" | "secondary"; 
}

export default function CalButton({ 
  calLink, 
  variant = "primary",
  className, 
  children, 
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

  return (
    <button
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view"}'
      className={cn(
        // Classes Base Estruturais (comuns a todas as variantes)
        "inline-flex cursor-pointer items-center justify-center font-medium rounded-lg px-3 py-2 text-xs md:text-xs lg:text-sm transition-colors border",
        
        // Classes de Variante (apenas cores)
        variant === "primary" && 
          "bg-alos-green-light text-alos-green hover:bg-alos-green border-alos-green hover:text-white",
        
        variant === "secondary" && 
          "bg-alos-yellow text-alos-brown hover:bg-alos-brown border-transparent hover:text-white",
        
        // Classes injetadas via props (ex: margens)
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}