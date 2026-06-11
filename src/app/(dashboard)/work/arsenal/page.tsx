"use client";

import React from "react";
import { 
  Layers, 
  ShieldCheck,
  Lock,
  Zap,
  Target,
  BookOpen,
  Wallet,
  Flame
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WorkSidebar } from "@/components/layout/WorkSidebar";

const ARSENAL_MODULES = [
  {
    id: "private-workspace",
    name: "Private Workspace",
    description: "Your encrypted environment for deep focus tasks.",
    icon: Lock,
    status: "unlocked",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "the-vault",
    name: "The Vault",
    description: "Knowledge management, articles, and book summaries.",
    icon: BookOpen,
    status: "unlocked",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description: "Quantify your discipline and biological momentum.",
    icon: Flame,
    status: "unlocked",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    id: "pocket",
    name: "Pocket Treasury",
    description: "Capital flow tracking and financial discipline.",
    icon: Wallet,
    status: "unlocked",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: "deep-sessions",
    name: "Deep Sessions",
    description: "Pomodoro-based extreme focus timer.",
    icon: Zap,
    status: "unlocked",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  },
  {
    id: "the-stake",
    name: "The Stake",
    description: "Put your money on the line to hit your objectives.",
    icon: Target,
    status: "locked",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  }
];

export default function ArsenalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">System Toolset</h1>
                <p className="text-muted-foreground text-sm font-medium">Browse, manage, and deploy tools to enhance your personal operating system. More modules will be available as you level up your discipline.</p>
              </div>
            </header>

            {/* Grid Store */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {ARSENAL_MODULES.map((module) => (
                <div 
                  key={module.id}
                  className="soft-card bg-[#121212] border border-white/5 rounded-[32px] p-8 flex flex-col relative group transition-all duration-500 hover:border-white/10"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", module.bg, module.border, module.color)}>
                      <module.icon className="w-6 h-6" />
                    </div>
                    {module.status === "unlocked" ? (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" /> Deployed
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-slate-500 border border-white/5 text-[9px] font-black uppercase tracking-widest">
                        <Lock className="w-3 h-3" /> Locked
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 flex-1">
                    <h3 className="text-xl font-black text-white tracking-tight">{module.name}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  <div className="pt-8">
                    <Button 
                      disabled={module.status === "locked"}
                      className={cn(
                        "w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs transition-all",
                        module.status === "unlocked" 
                          ? "bg-white/5 hover:bg-white/10 text-white border border-white/5" 
                          : "bg-transparent text-slate-600 border border-white/5 cursor-not-allowed"
                      )}
                    >
                      {module.status === "unlocked" ? "Access Module" : "Requires Rank"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
