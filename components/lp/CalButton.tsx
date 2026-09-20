"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils"; // Assuming you have the standard shadcn util

interface CalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  calLink: string; // e.g., "seu-nome/conversa-inicial"
}

export default function CalButton({ calLink, className, children, ...props }: CalButtonProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } }, // You can change this hex color
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
        "inline-flex items-center justify-center bg-alos-yellow text-alos-brown hover:bg-[#E5D265] transition-colors font-medium rounded-full",
        className
      )}
      {...props}
    >
      {children || "Conversa Inicial"}
    </button>
  );
}