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
            
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">Habit Sanctum</h1>
                <p className="text-muted-foreground text-sm font-medium">Discipline is the key to freedom. Track your daily habits, maintain your momentum, and focus on getting 1% better every day.</p>
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
