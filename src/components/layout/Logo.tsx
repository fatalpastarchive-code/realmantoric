import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>


      {/* Brand Typography */}
      {showText && (
        <span className="text-xl font-black tracking-tight text-white font-display">
          Mantoric
        </span>
      )}
    </div>
  );
}
