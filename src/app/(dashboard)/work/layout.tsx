"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-80px)] transition-all duration-1000 bg-[#050505]">
      {/* Content Area - Now Full Width */}
      <div className="custom-scrollbar relative z-10 scroll-smooth">
        <div className="min-h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
