import React from "react";
import { cn } from "@/lib/utils";

/**
 * Enhanced StatCard with subtle gradient and success indicators
 */
export function StatCard({ 
  label, 
  value, 
  subValue, 
  trend, 
  className 
}: { 
  label: string; 
  value: string; 
  subValue?: string; 
  trend?: "up" | "down"; 
  className?: string;
}) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04]",
      className
    )}>
      <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{value}</span>
          {trend && (
            <span className={cn(
              "text-[10px] font-bold",
              trend === "up" ? "text-emerald-400" : "text-red-400"
            )}>
              {trend === "up" ? "↑" : "↓"}
            </span>
          )}
        </div>
        {subValue && <span className="text-[10px] font-medium text-white/20">{subValue}</span>}
      </div>
      {/* Decorative accent */}
      <div className="absolute -right-4 -bottom-4 h-12 w-12 rounded-full bg-emerald-500/5 blur-xl" />
    </div>
  );
}

/**
 * AI Briefing Card with glassmorphism and subtle emerald glow
 */
export function BriefingCard({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[32px] border border-emerald-500/10 bg-gradient-to-br from-emerald-500/[0.02] to-transparent p-8 shadow-2xl",
      className
    )}>
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <div className="h-20 w-20 rounded-full bg-emerald-500 blur-3xl" />
      </div>
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/80">AI Daily Strategic Briefing</span>
        </div>
        <p className="text-lg md:text-xl font-medium leading-relaxed text-white/80 italic tracking-tight">
          "{content}"
        </p>
      </div>
    </div>
  );
}
