"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useDeepWork } from "@/context/DeepWorkContext";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  const { isActive: isDeepWork } = useDeepWork();

  return (
    <div className={cn(
      "min-h-[calc(100vh-80px)] transition-all duration-1000",
      isDeepWork ? "bg-[#020202]" : "bg-[#050505]"
    )}>
      {/* Content Area - Now Full Width */}
      <div className="custom-scrollbar relative z-10 scroll-smooth">
        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
