"use client";

import React from "react";
import { 
  Trophy, 
  Flame, 
  Zap, 
  Shield, 
  Clock, 
  Activity,
  Award
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface OverviewProps {
  isPublic?: boolean;
}

export function ProfileOverview({ isPublic = false }: OverviewProps) {
  const stats = [
    { label: "Elite Points", value: "2,450", icon: Trophy, color: "text-amber-500" },
    { label: "Total Streak", value: "42 Days", icon: Flame, color: "text-orange-500" },
    { label: "Forge Score", value: "880", icon: Zap, color: "text-primary" },
    { label: "Clan Rank", value: "#12", icon: Shield, color: "text-blue-500" },
  ];

  const milestones = [
    { label: "Monk Mode", date: "2 weeks ago", icon: Clock },
    { label: "Consistency King", date: "1 month ago", icon: Award },
    { label: "Early Riser", date: "3 days ago", icon: Activity },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-black/40 border-white/5 p-6 rounded-[24px] flex flex-col items-center justify-center text-center group hover:border-white/10 transition-all">
            <div className={cn("p-3 rounded-xl bg-white/5 mb-3 group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">{stat.value}</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{stat.label}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak Details */}
        <Card className="bg-[#121212] border-white/5 p-8 rounded-[32px] space-y-6">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Discipline Breakdown</h4>
          <div className="space-y-4">
            {[
              { label: "NoFap Retention", value: "12 Days", progress: 40, color: "bg-orange-500" },
              { label: "Habit Completion", value: "92%", progress: 92, color: "bg-emerald-500" },
              { label: "Deep Work Yield", value: "4.5h/day", progress: 75, color: "bg-blue-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className="text-xs font-black text-slate-400">{item.value}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full", item.color)} 
                    style={{ width: `${item.progress}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-[#121212] border-white/5 p-8 rounded-[32px] space-y-6">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Recent Milestones</h4>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] group hover:border-white/10 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <m.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{m.label}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
