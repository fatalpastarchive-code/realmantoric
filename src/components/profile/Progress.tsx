"use client";

import React from "react";
import { 
  Calendar,
  Activity,
  Zap,
  Flame,
  BarChart3
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProfileProgress() {
  // Simple heatmap mockup (12x7 for last 12 weeks)
  const heatmapData = Array.from({ length: 84 }, (_, i) => Math.floor(Math.random() * 5));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-white tracking-tight">Consistency Forge</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Visualizing your discipline over time</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Activity Heatmap */}
        <Card className="bg-black/40 border-white/5 p-8 rounded-[32px] space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary" />
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Activity Forge</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-slate-600 uppercase">Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(v => (
                  <div key={v} className={cn(
                    "w-2.5 h-2.5 rounded-sm",
                    v === 0 ? "bg-white/5" : 
                    v === 1 ? "bg-primary/20" :
                    v === 2 ? "bg-primary/40" :
                    v === 3 ? "bg-primary/70" : "bg-primary"
                  )} />
                ))}
              </div>
              <span className="text-[9px] font-bold text-slate-600 uppercase">More</span>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {heatmapData.map((val, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-3.5 h-3.5 md:w-4.5 md:h-4.5 rounded-sm transition-all hover:scale-125 hover:z-10 cursor-pointer",
                  val === 0 ? "bg-white/5" : 
                  val === 1 ? "bg-primary/20" :
                  val === 2 ? "bg-primary/40" :
                  val === 3 ? "bg-primary/70" : "bg-primary"
                )}
              />
            ))}
          </div>
        </Card>

        {/* Comparison Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/40 border-white/5 p-8 rounded-[32px] space-y-6">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Performance Delta</h4>
            </div>
            <div className="space-y-6">
              {[
                { label: "vs Last Week", value: "+12.4%", icon: TrendingUp, positive: true },
                { label: "vs Average", value: "+4.2%", icon: BarChart3, positive: true },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500">
                      <m.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-white">{m.label}</span>
                  </div>
                  <span className={cn("text-lg font-black", m.positive ? "text-emerald-500" : "text-red-500")}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-black/40 border-white/5 p-8 rounded-[32px] space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Momentum Energy</h4>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[40, 65, 30, 85, 95, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group cursor-pointer">
                  <div 
                    className="w-full bg-primary/20 rounded-t-lg transition-all group-hover:bg-primary/40" 
                    style={{ height: `${h}%` }} 
                  />
                  <span className="text-[8px] font-black text-slate-600 uppercase text-center block">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
