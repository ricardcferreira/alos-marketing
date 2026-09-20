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
        "inline-flex items-center justify-center font-medium rounded-full transition-colors",
        variant === "primary" 
          ? "inline-flex cursor-pointer items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown hover:text-white transition-colors font-medium rounded-sm px-3 py-2 text-xs"
          : "inline-flex cursor-pointer items-center justify-center bg-alos-yellow text-alos-brown hover:bg-alos-brown hover:text-white transition-colors font-medium rounded-sm px-3 py-2 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}