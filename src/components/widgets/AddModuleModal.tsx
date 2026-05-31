"use client";

import React from "react";
import { 
  X, 
  CheckSquare, 
  Timer, 
  Calendar, 
  Brain, 
  Sparkles, 
  BarChart,
  Bookmark,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface WidgetType {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: "productivity" | "intel" | "planning";
}

const AVAILABLE_WIDGETS: WidgetType[] = [
  { id: "todo", name: "Directive List", description: "Strategic task management and deployment.", icon: CheckSquare, category: "productivity" },
  { id: "pomodoro", name: "Flow Protocol", description: "Interval focus timer for absolute concentration.", icon: Timer, category: "productivity" },
  { id: "habit", name: "Habit Tracker", description: "Track your consistency and discipline.", icon: Target, category: "planning" },
  { id: "calendar", name: "Time Log", description: "Schedule your high-impact operations.", icon: Calendar, category: "planning" },
  { id: "ai_briefing", name: "AI Tactical Briefing", description: "Intelligent summary of your current directives.", icon: Brain, category: "intel" },
  { id: "analytics", name: "Forge Insights", description: "Visual analysis of your performance.", icon: BarChart, category: "intel" },
  { id: "journal", name: "Iron Journal", description: "Daily reflections and stoic observations.", icon: Bookmark, category: "intel" },
  { id: "milestone", name: "Milestone Tracker", description: "Track your journey toward mastery.", icon: Sparkles, category: "planning" },
];

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (widgetId: string) => void;
  activeWidgets: string[];
}

export function AddModuleModal({ isOpen, onClose, onAdd, activeWidgets }: AddModuleModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-3xl"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#161616] border border-white/[0.08] rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/[0.04]">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Deploy Module</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Expand your tactical sanctum</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-12 w-12 rounded-2xl text-white/20 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-10 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVAILABLE_WIDGETS.map((widget) => {
              const isActive = activeWidgets.includes(widget.id);
              const Icon = widget.icon;
              
              return (
                <button
                  key={widget.id}
                  disabled={isActive}
                  onClick={() => onAdd(widget.id)}
                  className={cn(
                    "flex items-start gap-6 p-6 rounded-[32px] border text-left transition-all duration-500 group",
                    isActive 
                      ? "bg-white/[0.02] border-white/[0.04] opacity-50 cursor-not-allowed" 
                      : "bg-[#0A0A0A] border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.02] hover:shadow-2xl"
                  )}
                >
                  <div className={cn(
                    "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500",
                    isActive 
                      ? "bg-white/5 text-white/10" 
                      : "bg-white/[0.03] border border-white/5 text-white/20 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 group-hover:text-emerald-500 shadow-sm"
                  )}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{widget.name}</h3>
                      {isActive && <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Active</span>}
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">{widget.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 py-8 bg-[#0A0A0A]/50 border-t border-white/[0.04] flex justify-end">
          <Button 
            onClick={onClose}
            className="h-12 px-8 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
          >
            Return to Sanctum
          </Button>
        </div>

      </div>
    </div>
  );
}
