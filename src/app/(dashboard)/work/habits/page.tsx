"use client";

import React from "react";
import { HabitTracker } from "@/components/work/HabitTracker";
import { WorkSidebar } from "@/components/layout/WorkSidebar";
import { 
  Flame, 
  Sparkles, 
  Activity,
  Calendar,
  Zap,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Fixed Workspace Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          {/* Center/Main Column: Habit Tracker Dashboard */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-6 pb-20">
            
            {/* Header banner */}
            <header className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[180px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-[#10B981]/5 pointer-events-none" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] scale-[2.5] pointer-events-none text-primary">
                <Flame className="w-24 h-24 stroke-[1.5]" />
              </div>

              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-[#10B981]/15 to-[#22D3EE]/15 border border-[#10B981]/25 text-[#34D399] text-[10px] font-bold uppercase tracking-wider select-none">
                  <Activity className="w-3.5 h-3.5" />
                  Personal Consistency Engine
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none mt-1">
                  Habit Sanctum
                </h1>
                <p className="text-slate-400 text-sm font-medium">
                  Discipline is the key to freedom. Track your daily habits, maintain your momentum, and focus on getting 1% better every day.
                </p>
              </div>

              {/* Action Toolbar Info */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Consistency Framework v1.0
                </span>
                
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Completed
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-white/5 border border-white/10" />
                    Pending
                  </div>
                </div>
              </div>
            </header>

            {/* Habit Tracker Component */}
            <HabitTracker />

          </main>
        </div>
      </div>
    </div>
  );
}
