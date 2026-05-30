"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Sparkles,
  TrendingUp,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Types ---
type Category = "Discipline" | "Health" | "Mindset" | "Finance" | "Other";

interface WeeklyTask {
  id: string;
  text: string;
  time?: string;
  category: Category;
  completed: boolean;
  dayIndex: number; // 0 (Mon) - 6 (Sun)
}

interface WeeklyData {
  tasks: WeeklyTask[];
  weekOffset: number; // 0 for current week, -1 for last week, etc.
}

const CATEGORIES: Category[] = ["Discipline", "Health", "Mindset", "Finance", "Other"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CATEGORY_COLORS: Record<Category, string> = {
  Discipline: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Health: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  Mindset: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  Finance: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  Other: "text-slate-500 bg-slate-500/10 border-slate-500/20",
};

export function WeeklyProgram() {
  const [tasks, setTasks] = useState<WeeklyTask[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState<Category>("Discipline");

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("mantoric_weekly_program");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse weekly program", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mantoric_weekly_program", JSON.stringify(tasks));
      
      // Sync with Home page "This Week" preview
      const today = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
      const todayTasks = tasks.filter(t => t.dayIndex === today);
      localStorage.setItem("mantoric_home_today_preview", JSON.stringify(todayTasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: WeeklyTask = {
      id: Math.random().toString(36).substring(2, 9),
      text: newTaskText.trim(),
      time: newTaskTime || undefined,
      category: newTaskCategory,
      completed: false,
      dayIndex: selectedDay,
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskText("");
    setNewTaskTime("");
    setIsModalOpen(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Find best day
    const dayStats = DAYS.map((_, i) => {
      const dayTasks = tasks.filter(t => t.dayIndex === i);
      const dayCompleted = dayTasks.filter(t => t.completed).length;
      return { day: DAYS[i], rate: dayTasks.length > 0 ? (dayCompleted / dayTasks.length) : 0 };
    });
    
    const bestDay = dayStats.reduce((prev, current) => (prev.rate > current.rate) ? prev : current, dayStats[0]);

    return { rate, bestDay: bestDay.rate > 0 ? bestDay.day : "None yet" };
  }, [tasks]);

  if (!isLoaded) return null;

  return (
    <div className="space-y-6">
      {/* Header & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-black/40 border-white/5 p-6 rounded-[32px] flex flex-col justify-center space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <span className="text-3xl font-black">%{stats.rate}</span>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Weekly Progress</span>
        </Card>

        <Card className="md:col-span-1 bg-black/40 border-white/5 p-6 rounded-[32px] flex flex-col justify-center space-y-2">
          <div className="flex items-center gap-2 text-[#22D3EE]">
            <Sparkles className="w-5 h-5" />
            <span className="text-xl font-black truncate">{stats.bestDay}</span>
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Most Productive Day</span>
        </Card>

        <Card className="md:col-span-1 bg-primary/10 border-primary/20 p-6 rounded-[32px] flex flex-col justify-center space-y-2">
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary text-black font-black h-12 rounded-2xl shadow-lg shadow-primary/10 uppercase tracking-widest text-xs"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </Card>
      </div>

      {/* Weekly Grid */}
      <Card className="bg-[#121212] border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-7 border-b border-white/5">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={cn(
                "p-4 text-center transition-all border-r border-white/5 last:border-0",
                selectedDay === i ? "bg-white/[0.03] text-primary" : "text-slate-500 hover:bg-white/[0.01]"
              )}
            >
              <span className="text-[10px] font-black uppercase tracking-widest block mb-1">{day.substring(0, 3)}</span>
              <div className={cn(
                "w-8 h-8 rounded-xl mx-auto flex items-center justify-center text-sm font-black",
                selectedDay === i ? "bg-primary text-black" : "bg-white/5"
              )}>
                {i + 1}
              </div>
            </button>
          ))}
        </div>

        <div className="p-8 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white tracking-tight">{DAYS[selectedDay]} Schedule</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Today's strategic goals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.filter(t => t.dayIndex === selectedDay).length === 0 ? (
              <div className="col-span-2 py-20 text-center opacity-20 flex flex-col items-center gap-4">
                <Calendar className="w-16 h-16 stroke-[1]" />
                <p className="text-sm font-black tracking-[0.2em] uppercase">No tasks defined for today</p>
              </div>
            ) : (
              tasks.filter(t => t.dayIndex === selectedDay).map(task => (
                <div 
                  key={task.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-[24px] border transition-all group",
                    task.completed 
                      ? "bg-emerald-500/5 border-emerald-500/20" 
                      : "bg-white/[0.02] border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0",
                        task.completed 
                          ? "bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20" 
                          : "border-white/10 text-transparent hover:border-emerald-500/40"
                      )}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-bold truncate tracking-tight",
                          task.completed ? "text-slate-500 line-through" : "text-white"
                        )}>
                          {task.text}
                        </span>
                        {task.time && (
                          <div className="flex items-center gap-1 text-[9px] font-black text-slate-500 uppercase">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </div>
                        )}
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest mt-0.5 px-2 py-0.5 rounded-md w-fit",
                        CATEGORY_COLORS[task.category]
                      )}>
                        {task.category}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-700 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <Card className="relative w-full max-w-lg bg-[#161616] border-white/10 p-8 rounded-[40px] shadow-[0_40px_120px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-white tracking-tight">Plan Task</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">New goal for {DAYS[selectedDay]}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-2xl h-12 w-12 hover:bg-white/5 text-white/20 hover:text-white">
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <form onSubmit={addTask} className="space-y-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Task Description</Label>
                <Input 
                  value={newTaskText} 
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="e.g. Weekly Strategy Report" 
                  className="bg-black/40 border-white/[0.08] rounded-2xl h-14 px-6 text-white placeholder:text-slate-600 focus:border-primary/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Category</Label>
                  <Select value={newTaskCategory} onValueChange={(val: Category) => setNewTaskCategory(val)}>
                    <SelectTrigger className="bg-black/40 border-white/[0.08] rounded-2xl h-14 px-6">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-white/10 text-white rounded-2xl">
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Time (Optional)</Label>
                  <Input 
                    type="time"
                    value={newTaskTime} 
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="bg-black/40 border-white/[0.08] rounded-2xl h-14 px-6 text-white transition-all"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-black h-16 rounded-2xl shadow-2xl shadow-primary/20 text-sm uppercase tracking-widest">
                Add to Schedule
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
