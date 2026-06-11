"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Zap,
  Activity,
  Flame,
  Clock,
  CalendarDays,
  Target,
  Play,
  Pause,
  RotateCcw,
  Coffee
} from "lucide-react";
import { WorkSidebar } from "@/components/layout/WorkSidebar";
import { cn } from "@/lib/utils";

// Types
interface PomodoroSession {
  timestamp: number;
  dateStr: string; // YYYY-MM-DD
  minutes: number;
}

export default function DeepSessionsPage() {
  // Timer State
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // History State
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("mantoric-pomodoro-history");
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveSession = (minutes: number) => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];
    const newSession = { timestamp: Date.now(), dateStr, minutes };
    const updated = [...sessions, newSession];
    setSessions(updated);
    localStorage.setItem("mantoric-pomodoro-history", JSON.stringify(updated));
  };

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(t => t - 1);
    } else {
      setIsActive(false);
      setIsFullScreen(false);
      // Completed!
      if (mode === "focus") {
        saveSession(25);
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("focus");
        setTimeLeft(25 * 60);
      }
    }
  }, [timeLeft, mode, sessions]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, tick]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive && mode === "focus") {
      setIsFullScreen(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const setTimerMode = (newMode: "focus" | "break") => {
    setMode(newMode);
    setTimeLeft(newMode === "focus" ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Compute Stats
  const stats = useMemo(() => {
    const totalMinutes = sessions.reduce((acc, s) => acc + s.minutes, 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const uniqueDays = new Set(sessions.map(s => s.dateStr)).size;
    const dailyAvgMinutes = uniqueDays > 0 ? Math.floor(totalMinutes / uniqueDays) : 0;

    return {
      totalFocus: `${hours}h ${mins}m`,
      totalSessions: sessions.length,
      currentStreak: uniqueDays, // Simplified streak logic
      dailyAverage: `${Math.floor(dailyAvgMinutes / 60)}h ${dailyAvgMinutes % 60}m`
    };
  }, [sessions]);

  // Compute Weekly Graph Data
  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const result = [];
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayName = days[d.getDay()];
      
      const dayMinutes = sessions
        .filter(s => s.dateStr === dateStr)
        .reduce((acc, s) => acc + s.minutes, 0);

      result.push({ day: dayName, minutes: dayMinutes });
    }

    const maxMins = Math.max(...result.map(r => r.minutes), 120); // baseline 120
    
    return result.map(r => ({
      ...r,
      height: `${Math.max((r.minutes / maxMins) * 100, 5)}%`
    }));

  }, [sessions]);

  // Full Screen Render
  if (isFullScreen) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background animate-in fade-in duration-700">
        <button 
          onClick={() => setIsFullScreen(false)}
          className="absolute top-10 right-10 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
        >
          Exit Focus
        </button>

        <div className="flex gap-4 p-2 bg-secondary/30 rounded-2xl border mb-16">
          <button 
            onClick={() => setTimerMode("focus")}
            className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", mode === "focus" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <Zap className="w-4 h-4" /> Focus
          </button>
          <button 
            onClick={() => setTimerMode("break")}
            className={cn("flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", mode === "break" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}
          >
            <Coffee className="w-4 h-4" /> Break
          </button>
        </div>

        <div className="text-[25vw] md:text-[250px] font-black tracking-tighter tabular-nums leading-none drop-shadow-2xl">
          {formatTime(timeLeft)}
        </div>

        <div className="mt-20 flex gap-6">
          <button 
            onClick={toggleTimer}
            className={cn(
              "h-20 px-12 rounded-2xl font-black uppercase tracking-widest text-sm transition-all border",
              isActive ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:scale-105"
            )}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button 
            onClick={resetTimer}
            className="h-20 w-20 rounded-2xl bg-secondary/30 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all border"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </div>
    );
  }

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">Deep Sessions</h1>
                <p className="text-muted-foreground text-sm font-medium">Hyper-focus timer and detailed statistical tracking of your deep work capacity.</p>
              </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column: Pomodoro Timer */}
              <div className="xl:col-span-5">
                <div className="soft-card h-full flex flex-col items-center justify-center py-16 space-y-12">
                  
                  <div className="flex gap-2 p-1.5 bg-secondary/30 rounded-2xl border">
                    <button 
                      onClick={() => setTimerMode("focus")}
                      className={cn("flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", mode === "focus" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      <Zap className="w-3.5 h-3.5" /> Focus
                    </button>
                    <button 
                      onClick={() => setTimerMode("break")}
                      className={cn("flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all", mode === "break" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      <Coffee className="w-3.5 h-3.5" /> Break
                    </button>
                  </div>

                  <div className="text-7xl lg:text-8xl font-black tracking-tighter tabular-nums">
                    {formatTime(timeLeft)}
                  </div>

                  <div className="flex gap-4 w-full max-w-[280px]">
                    <button 
                      onClick={toggleTimer}
                      className={cn(
                        "flex-1 h-14 rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all border",
                        isActive ? "bg-secondary text-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
                      )}
                    >
                      {isActive ? "Pause" : "Start Session"}
                    </button>
                    <button 
                      onClick={resetTimer}
                      className="h-14 w-14 rounded-2xl bg-secondary/30 hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center justify-center transition-all border"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Column: Statistics and Graphs */}
              <div className="xl:col-span-7 space-y-8">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="soft-card p-5 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Total Focus</span>
                    </div>
                    <p className="text-2xl font-black">{stats.totalFocus}</p>
                  </div>
                  <div className="soft-card p-5 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Sessions</span>
                    </div>
                    <p className="text-2xl font-black">{stats.totalSessions}</p>
                  </div>
                  <div className="soft-card p-5 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Flame className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Streak</span>
                    </div>
                    <p className="text-2xl font-black">{stats.currentStreak} Days</p>
                  </div>
                  <div className="soft-card p-5 space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Activity className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Daily Avg</span>
                    </div>
                    <p className="text-2xl font-black">{stats.dailyAverage}</p>
                  </div>
                </div>

                {/* Graph Card */}
                <div className="soft-card space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-lg border">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold tracking-tight">7-Day Focus Distribution</h3>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-2 pt-6">
                    {weeklyData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                        <div className="w-full max-w-[40px] bg-secondary/30 rounded-t-lg relative flex items-end h-full">
                          <div 
                            className="w-full bg-primary rounded-t-lg transition-all flex flex-col items-center pt-2 group-hover:opacity-80" 
                            style={{ height: data.height }} 
                          >
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-primary-foreground">
                              {data.minutes}m
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest h-4">
                          {data.day}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
