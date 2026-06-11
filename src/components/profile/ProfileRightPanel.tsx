"use client";

import React, { useState } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  Target, 
  TrendingUp, 
  Activity,
  Calendar,
  Sword
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ProfileRightPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div 
        onClick={() => setIsCollapsed(false)}
        className="soft-card p-4 flex flex-col items-center gap-6 cursor-pointer hover:bg-secondary/50 h-full min-h-[600px] border-l-2 border-l-primary/50"
      >
        <button className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="writing-vertical-lr text-xs font-black uppercase tracking-widest text-muted-foreground -rotate-180">
          Agent Status
        </div>
      </div>
    );
  }

  return (
    <div className="soft-card h-full min-h-[600px] flex flex-col gap-8 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" />
          Agent Status
        </h3>
        <button 
          onClick={() => setIsCollapsed(true)}
          className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-secondary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col gap-1">
          <Flame className="w-4 h-4 text-orange-500 mb-1" />
          <span className="text-2xl font-black tabular-nums">42</span>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Day Streak</span>
        </div>
        <div className="p-4 rounded-2xl bg-secondary/30 border border-border flex flex-col gap-1">
          <Target className="w-4 h-4 text-blue-500 mb-1" />
          <span className="text-2xl font-black tabular-nums">85%</span>
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Focus Rate</span>
        </div>
      </div>

      {/* Current Objectives */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Objectives</h4>
          <span className="text-[10px] text-primary font-bold">2/3</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl border border-border bg-background flex items-center gap-3 group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Sword className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Complete OS Core</p>
              <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                <div className="w-[80%] h-full bg-primary" />
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-xl border border-border bg-background flex items-center gap-3 group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-foreground truncate">Deep Work 50h</p>
              <div className="w-full h-1 bg-secondary rounded-full mt-2 overflow-hidden">
                <div className="w-[45%] h-full bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Mini-Feed */}
      <div className="flex-1 space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Activity</h4>
        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-[11px] before:w-[1px] before:bg-border">
          
          <div className="flex gap-4 relative py-3">
            <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold">Completed Deep Session</p>
              <p className="text-[10px] text-muted-foreground font-medium">120 mins • The Vault</p>
            </div>
          </div>

          <div className="flex gap-4 relative py-3">
            <div className="w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground">Logged 3 Expenses</p>
              <p className="text-[10px] text-muted-foreground/60 font-medium">Pocket Treasury</p>
            </div>
          </div>

          <div className="flex gap-4 relative py-3">
            <div className="w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 shrink-0 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground">Started New Objective</p>
              <p className="text-[10px] text-muted-foreground/60 font-medium">Complete OS Core</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
