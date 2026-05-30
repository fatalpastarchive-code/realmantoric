"use client";

import React from "react";
import { GripVertical, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WidgetWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
}

export function WidgetWrapper({ title, children, className, onRemove }: WidgetWrapperProps) {
  return (
    <div className={cn(
      "group relative flex flex-col bg-white/[0.02] border border-white/[0.05] rounded-[28px] overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
      className
    )}>
      {/* Drag Handle & Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-white/10 group-hover:text-white/40 cursor-grab transition-colors" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white/60 transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={onRemove}
            className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}
