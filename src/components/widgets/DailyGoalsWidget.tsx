"use client";

import React, { useState, useEffect } from "react";
import { Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string | number;
  text: string;
  status: "completed" | "pending";
}

const DEFAULT_GOALS: Goal[] = [
  { id: 1, text: "Finish Phase 6 Deployment", status: "completed" },
  { id: 2, text: "Deep Work: 4 Hours", status: "pending" },
  { id: 3, text: "Klan Strategy Meeting", status: "pending" },
];

export function DailyGoalsWidget() {
  const [goals, setGoals] = useState<Goal[]>(DEFAULT_GOALS);

  useEffect(() => {
    // Sync with Habit Tracker
    const syncGoals = () => {
      const savedGoals = localStorage.getItem("mantoric_daily_goals");
      if (savedGoals) {
        try {
          const parsed = JSON.parse(savedGoals);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setGoals(parsed);
          } else {
            setGoals(DEFAULT_GOALS);
          }
        } catch (e) {
          console.error("Failed to parse daily goals", e);
        }
      }
    };

    syncGoals();
    // Listen for storage changes (for cross-tab sync or same-tab updates)
    window.addEventListener('storage', syncGoals);
    // Custom event for same-tab updates
    const interval = setInterval(syncGoals, 2000); 

    return () => {
      window.removeEventListener('storage', syncGoals);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-3">
      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 opacity-20 border border-dashed border-white/10 rounded-2xl">
          <Activity className="w-8 h-8 mb-2" />
          <p className="text-[10px] font-black uppercase tracking-widest">No Active Goals</p>
        </div>
      ) : (
        goals.map((goal) => (
          <div key={goal.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] group/goal hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                goal.status === "completed" 
                  ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] scale-110" 
                  : "bg-white/10"
              )} />
              <span className={cn(
                "text-sm font-bold tracking-tight transition-all duration-500",
                goal.status === "completed" ? "text-white/20 line-through italic" : "text-white/70"
              )}>
                {goal.text}
              </span>
            </div>
            <Target className={cn(
              "w-4 h-4 transition-colors duration-500",
              goal.status === "completed" ? "text-emerald-500/40" : "text-white/5 group-hover/goal:text-white/20"
            )} />
          </div>
        ))
      )}
    </div>
  );
}
