"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Sparkles,
  Trophy,
  Activity,
  X,
  Target,
  Dumbbell,
  Book,
  Moon,
  Zap,
  Coffee,
  Heart,
  Coins,
  Smile,
  Brain,
  Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Types ---
type Category = "Discipline" | "Health" | "Mindset" | "Finance" | "Other";

interface Habit {
  id: string;
  name: string;
  category: Category;
  icon: string; // Icon ID or Emoji
  createdAt: number;
}

interface HabitData {
  habits: Habit[];
  // Key: YYYY-MM-DD, Value: Array of habit IDs completed on that day
  records: Record<string, string[]>;
}

// --- Constants ---
const CATEGORY_CONFIG: Record<Category, { color: string; bg: string; border: string; accent: string }> = {
  Discipline: { color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", accent: "#10b981" },
  Health: { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", accent: "#f97316" },
  Mindset: { color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", accent: "#3b82f6" },
  Finance: { color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", accent: "#a855f7" },
  Other: { color: "text-slate-500", bg: "bg-slate-500/10", border: "border-slate-500/20", accent: "#64748b" },
};

const HABIT_ICONS = [
  { id: "Target", icon: Target },
  { id: "Dumbbell", icon: Dumbbell },
  { id: "Book", icon: Book },
  { id: "Moon", icon: Moon },
  { id: "Zap", icon: Zap },
  { id: "Coffee", icon: Coffee },
  { id: "Heart", icon: Heart },
  { id: "Coins", icon: Coins },
  { id: "Smile", icon: Smile },
  { id: "Brain", icon: Brain },
  { id: "Timer", icon: Timer },
];

const MOTIVATIONAL_QUOTES = [
  "Consistency is the true foundation of growth.",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  "The secret of your future is hidden in your daily routine.",
  "Small steps lead to big changes.",
  "Your habits will either make you or break you. Choose wisely.",
  "Success is the sum of small efforts, repeated day in and day out.",
];

// --- Helper Functions ---
const getTodayStr = () => new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local

const formatDate = (date: Date) => date.toLocaleDateString('en-CA');

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

export function HabitTracker() {
  const [data, setData] = useState<HabitData>({ habits: [], records: {} });
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"Monthly" | "Weekly">("Monthly");
  
  // Form State
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState<Category>("Discipline");
  const [newHabitIcon, setNewHabitIcon] = useState("Target");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // View State
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("mantoric_habits");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse habits data", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage & Sync with Daily Goals
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mantoric_habits", JSON.stringify(data));
      
      // Sync logic for Home page Daily Goals
      const today = getTodayStr();
      const completedToday = data.records[today] || [];
      const homeGoals = data.habits.map(h => ({
        id: h.id,
        text: h.name,
        status: completedToday.includes(h.id) ? "completed" : "pending"
      }));
      localStorage.setItem("mantoric_daily_goals", JSON.stringify(homeGoals));
    }
  }, [data, isLoaded]);

  // --- Handlers ---
  const addHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit: Habit = {
      id: `habit_${Date.now()}`,
      name: newHabitName.trim(),
      category: newHabitCategory,
      icon: newHabitIcon,
      createdAt: Date.now(),
    };

    setData(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));

    setNewHabitName("");
    setIsModalOpen(false);
  };

  const deleteHabit = (id: string) => {
    setData(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== id),
      records: Object.entries(prev.records).reduce((acc, [date, completedIds]) => {
        acc[date] = completedIds.filter(cid => cid !== id);
        return acc;
      }, {} as Record<string, string[]>)
    }));
  };

  const toggleHabit = (habitId: string, date: string) => {
    // Restriction: Only today can be modified
    if (date !== getTodayStr()) return;

    setData(prev => {
      const dayRecords = prev.records[date] || [];
      const isCompleted = dayRecords.includes(habitId);
      
      const newDayRecords = isCompleted 
        ? dayRecords.filter(id => id !== habitId)
        : [...dayRecords, habitId];

      return {
        ...prev,
        records: {
          ...prev.records,
          [date]: newDayRecords
        }
      };
    });
  };

  // --- Calculations ---
  const daysToShow = useMemo(() => {
    if (viewMode === "Monthly") {
      const days = [];
      const count = getDaysInMonth(year, month);
      for (let i = 1; i <= count; i++) {
        days.push(formatDate(new Date(year, month, i)));
      }
      return days;
    } else {
      // Weekly view (current week)
      const days = [];
      const curr = new Date(currentDate);
      const first = curr.getDate() - curr.getDay() + 1; // Monday
      for (let i = 0; i < 7; i++) {
        days.push(formatDate(new Date(curr.setDate(first + i))));
      }
      return days;
    }
  }, [year, month, viewMode, currentDate]);

  const stats = useMemo(() => {
    if (data.habits.length === 0) return { completionRate: 0, globalBestStreak: 0, monthCompleted: 0, individualStreaks: {} };

    const today = getTodayStr();
    let monthCompleted = 0;
    
    // Monthly completion
    const monthDays = [];
    const count = getDaysInMonth(year, month);
    for (let i = 1; i <= count; i++) monthDays.push(formatDate(new Date(year, month, i)));
    
    monthDays.forEach(date => {
      monthCompleted += (data.records[date] || []).length;
    });

    const totalPossible = monthDays.length * data.habits.length;
    const completionRate = totalPossible > 0 ? Math.round((monthCompleted / totalPossible) * 100) : 0;

    // Individual & Global Streaks
    const individualStreaks: Record<string, number> = {};
    let globalBestStreak = 0;

    data.habits.forEach(habit => {
      let streak = 0;
      let checkDate = new Date();
      while (true) {
        const dateStr = formatDate(checkDate);
        if ((data.records[dateStr] || []).includes(habit.id)) {
          streak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else if (dateStr === today) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        } else {
          break;
        }
        if (streak > 1000) break;
      }
      individualStreaks[habit.id] = streak;
      if (streak > globalBestStreak) globalBestStreak = streak;
    });

    return { completionRate, globalBestStreak, monthCompleted, individualStreaks };
  }, [data, year, month]);

  const randomQuote = useMemo(() => {
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* --- Add Habit Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <Card className="relative w-full max-w-lg bg-[#161616] border-white/10 p-8 rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white tracking-tight">Deploy Protocol</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Define your discipline</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-2xl h-12 w-12 hover:bg-white/5 text-white/20 hover:text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <form onSubmit={addHabit} className="space-y-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Habit Identification</Label>
                <Input 
                  value={newHabitName} 
                  onChange={(e) => setNewHabitName(e.target.value)}
                  placeholder="e.g. 5AM Cold Start" 
                  className="bg-black/40 border-white/[0.08] rounded-2xl h-14 px-6 text-white placeholder:text-slate-600 focus:border-primary/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Domain</Label>
                  <Select value={newHabitCategory} onValueChange={(val: Category) => setNewHabitCategory(val)}>
                    <SelectTrigger className="bg-black/40 border-white/[0.08] rounded-2xl h-14 px-6">
                      <SelectValue placeholder="Domain" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-white/10 text-white rounded-2xl">
                      {Object.keys(CATEGORY_CONFIG).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Symbol</Label>
                  <div className="flex flex-wrap gap-2 p-2 bg-black/40 border border-white/[0.08] rounded-2xl max-h-[140px] overflow-y-auto no-scrollbar">
                    {HABIT_ICONS.map(({ id, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setNewHabitIcon(id)}
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          newHabitIcon === id ? "bg-primary text-black" : "bg-white/5 text-slate-500 hover:bg-white/10"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 text-sm uppercase tracking-widest">
                Initialize Habit
              </Button>
            </form>
          </Card>
        </div>
      )}

      {/* --- Stats Header --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            Performance Metrics
          </div>
          <h2 className="text-4xl font-black text-white tracking-tight">Protocol Mastery</h2>
          <p className="text-slate-500 text-sm font-bold italic">"{randomQuote}"</p>
        </div>

        <Card className="bg-black/40 border-white/5 p-6 flex flex-col justify-center items-center space-y-2 rounded-[32px] shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 text-primary relative z-10">
            <Flame className="w-7 h-7 fill-current" />
            <span className="text-4xl font-black">{stats.globalBestStreak}</span>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] relative z-10">Peak Momentum</span>
        </Card>

        <Card className="bg-black/40 border-white/5 p-6 flex flex-col justify-center items-center space-y-2 rounded-[32px] shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 text-blue-500 relative z-10">
            <TrendingUp className="w-7 h-7" />
            <span className="text-4xl font-black">%{stats.completionRate}</span>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] relative z-10">Domain Yield</span>
        </Card>
      </div>

      {/* --- Main Board --- */}
      <Card className="bg-[#121212] border-white/5 overflow-hidden shadow-2xl rounded-[40px]">
        {/* Controls */}
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-6">
            <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
              {(["Monthly", "Weekly"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === mode ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-xl border border-white/5 hover:bg-white/5" onClick={() => setCurrentDate(new Date(year, month - 1))}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-sm font-black text-white uppercase tracking-widest min-w-[120px] text-center">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <Button variant="ghost" size="icon" className="rounded-xl border border-white/5 hover:bg-white/5" onClick={() => setCurrentDate(new Date(year, month + 1))}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-black font-black rounded-2xl h-12 px-8 gap-3 shadow-2xl shadow-primary/10 uppercase tracking-widest text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Protocol
          </Button>
        </div>

        {/* Grid */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="sticky left-0 z-10 bg-[#121212] p-6 text-left min-w-[260px] border-r border-white/5 shadow-[10px_0_15px_rgba(0,0,0,0.3)]">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Active Protocols</span>
                </th>
                {daysToShow.map((date, i) => {
                  const d = new Date(date);
                  const isToday = date === getTodayStr();
                  return (
                    <th key={date} className="p-3 min-w-[56px] border-r border-white/5 last:border-0">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{d.toLocaleString('default', { weekday: 'narrow' })}</span>
                        <div className={cn(
                          "text-[11px] font-black h-9 w-9 flex items-center justify-center rounded-xl transition-all",
                          isToday ? "bg-primary text-black shadow-lg shadow-primary/20 scale-110" : "text-slate-500 bg-white/[0.02]"
                        )}>
                          {d.getDate()}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.habits.length === 0 ? (
                <tr>
                  <td colSpan={daysToShow.length + 1} className="p-32 text-center">
                    <div className="flex flex-col items-center gap-6 opacity-10">
                      <Activity className="w-24 h-24 stroke-[1]" />
                      <p className="text-sm font-black tracking-[0.4em] uppercase">No Protocols Deployed</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.habits.map((habit) => {
                  const config = CATEGORY_CONFIG[habit.category];
                  const Icon = HABIT_ICONS.find(i => i.id === habit.icon)?.icon || Target;
                  const streak = stats.individualStreaks[habit.id] || 0;

                  return (
                    <tr key={habit.id} className="border-b border-white/5 group hover:bg-white/[0.01] transition-colors">
                      <td className="sticky left-0 z-10 bg-[#121212] group-hover:bg-[#151515] p-6 border-r border-white/5 transition-colors shadow-[10px_0_15px_rgba(0,0,0,0.3)]">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border", config.bg, config.border, config.color)}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-black text-white truncate tracking-tight">{habit.name}</span>
                              <div className="flex items-center gap-2">
                                <span className={cn("text-[9px] font-black uppercase tracking-widest", config.color)}>{habit.category}</span>
                                <span className="text-slate-700 text-[9px]">•</span>
                                <div className="flex items-center gap-1 text-orange-500/60">
                                  <Flame className="w-3 h-3 fill-current" />
                                  <span className="text-[9px] font-black">{streak}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => deleteHabit(habit.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-700 hover:text-red-500 transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      {daysToShow.map((date) => {
                        const isCompleted = (data.records[date] || []).includes(habit.id);
                        const isToday = date === getTodayStr();
                        return (
                          <td key={date} className="p-2 border-r border-white/5 last:border-0 text-center">
                            <button
                              disabled={!isToday}
                              onClick={() => toggleHabit(habit.id, date)}
                              className={cn(
                                "w-10 h-10 rounded-2xl border transition-all duration-500 flex items-center justify-center mx-auto",
                                isCompleted 
                                  ? "shadow-lg scale-95" 
                                  : "bg-black/40 border-white/[0.03] text-transparent",
                                isCompleted && config.bg.replace('10', '40'),
                                isCompleted && config.border.replace('20', '50'),
                                isCompleted && config.color,
                                !isToday && "cursor-default opacity-60"
                              )}
                              style={isCompleted ? { 
                                backgroundColor: `${config.accent}20`,
                                borderColor: `${config.accent}40`,
                                color: config.accent,
                                boxShadow: `0 0 20px ${config.accent}15`
                              } : {}}
                            >
                              <CheckCircle2 className={cn("w-6 h-6", isCompleted ? "opacity-100" : "opacity-0")} />
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/10 p-8 rounded-[40px] space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-500 border border-emerald-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Iron Sovereignty</h4>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-bold">
            Each protocol executed is a reinforcement of your sovereign will. Perfection is a myth; consistent direction is the only absolute truth in the forge of character.
          </p>
        </Card>

        <Card className="md:col-span-2 bg-[#121212] border-white/5 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 text-slate-600 mb-6">
            <Info className="w-5 h-5" />
            <h4 className="text-sm font-black uppercase tracking-[0.2em]">Operational Directives</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "Deploy protocols that align with your 10-year archetype.",
              "Log executions daily to maintain high-fidelity data.",
              "Streaks are biological momentum. Do not break the chain.",
              "Recovery protocol: If you miss once, never miss twice.",
              "Domains represent the pillars of a balanced sovereign life.",
              "Protocol modification is restricted to the present cycle."
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-4 text-[11px] text-slate-500 font-black tracking-tight leading-snug">
                <div className="w-2 h-2 rounded-full bg-primary/20 mt-1 shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
