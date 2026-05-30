"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Zap, Coffee, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PomodoroTimerWidget() {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Persistence in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mantoric-pomodoro");
    if (saved) {
      const { savedTime, savedMode, timestamp } = JSON.parse(saved);
      // Optional: Check if time passed since last save and subtract (not implementing for now for simplicity)
      setMode(savedMode);
      setTimeLeft(savedTime);
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      localStorage.setItem("mantoric-pomodoro", JSON.stringify({
        savedTime: timeLeft,
        savedMode: mode,
        timestamp: Date.now()
      }));
    }
  }, [timeLeft, mode, isActive]);

  const tick = useCallback(() => {
    if (timeLeft > 0) {
      setTimeLeft(t => t - 1);
    } else {
      setIsActive(false);
      // Play sound or notification could go here
    }
  }, [timeLeft]);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, tick]);

  const startFocus = () => {
    setMode("focus");
    setTimeLeft(25 * 60);
    setIsActive(true);
  };

  const startBreak = () => {
    setMode("break");
    setTimeLeft(5 * 60);
    setIsActive(true);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-10">
      
      {/* Mode Switcher */}
      <div className="flex gap-3 p-2 bg-white/[0.02] rounded-2xl border border-white/[0.06] shadow-inner">
        <button 
          onClick={startFocus}
          className={cn(
            "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
            mode === "focus" 
              ? "bg-white text-black shadow-2xl" 
              : "text-white/20 hover:text-white/50 hover:bg-white/[0.03]"
          )}
        >
          <Zap className={cn("w-3.5 h-3.5", mode === "focus" ? "fill-black" : "text-white/10")} />
          Focus
        </button>
        <button 
          onClick={startBreak}
          className={cn(
            "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
            mode === "break" 
              ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
              : "text-white/20 hover:text-white/50 hover:bg-white/[0.03]"
          )}
        >
          <Coffee className={cn("w-3.5 h-3.5", mode === "break" ? "fill-white" : "text-white/10")} />
          Break
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="relative group">
        <div className="absolute -inset-8 bg-emerald-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="text-8xl font-black tracking-tighter text-white tabular-nums relative drop-shadow-2xl">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 w-full">
        <Button 
          onClick={toggleTimer}
          className={cn(
            "flex-1 h-16 rounded-[22px] font-black uppercase tracking-[0.3em] text-[11px] transition-all duration-500 shadow-2xl border-none",
            isActive 
              ? "bg-[#161616] text-white border border-white/5 hover:bg-white/5" 
              : "bg-white text-black hover:bg-emerald-500 hover:text-white"
          )}
        >
          {isActive ? <Pause className="w-5 h-5 mr-3" /> : <Play className="w-5 h-5 mr-3" />}
          {isActive ? "Suspend" : "Initiate"}
        </Button>
        <Button 
          variant="ghost" 
          onClick={resetTimer}
          className="w-16 h-16 rounded-[22px] bg-white/[0.02] border border-white/[0.08] text-white/10 hover:text-white hover:bg-white/5 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* Motivation Tag */}
      <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
        <ShieldAlert className="w-3 h-3" />
        {mode === "focus" ? "Stay focused, brother." : "Recharge for the next forge."}
      </div>
    </div>
  );
}
