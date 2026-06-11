"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Zap, Coffee, ShieldAlert, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PomodoroTimerWidget() {
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
      setIsFullScreen(false);
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
    setIsFullScreen(true);
  };

  const startBreak = () => {
    setMode("break");
    setTimeLeft(5 * 60);
    setIsActive(true);
    setIsFullScreen(true);
  };

  const toggleTimer = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (newState) {
      setIsFullScreen(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsFullScreen(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
      isFullScreen 
        ? "fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl justify-center space-y-16 p-8" 
        : "relative space-y-10"
    )}>
      
      {/* Fullscreen Minimize Button */}
      {isFullScreen && (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsFullScreen(false)}
          className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all z-50"
        >
          <Minimize2 className="w-5 h-5" />
        </Button>
      )}

      {/* Mode Switcher */}
      <div className={cn(
        "flex gap-3 p-2 bg-white/[0.02] rounded-2xl border border-white/[0.06] shadow-inner transition-all",
        isFullScreen ? "scale-125" : "scale-100"
      )}>
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
      <div className="relative group flex items-center justify-center">
        <div className={cn(
          "absolute bg-emerald-500/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-1000",
          isFullScreen ? "-inset-20" : "-inset-8"
        )} />
        <div className={cn(
          "font-black tracking-tighter text-white tabular-nums relative drop-shadow-2xl transition-all duration-700 ease-out",
          isFullScreen ? "text-[120px] md:text-[250px] leading-none" : "text-8xl"
        )}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className={cn(
        "flex items-center gap-4 transition-all duration-700",
        isFullScreen ? "w-[400px]" : "w-full"
      )}>
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
        
        {!isFullScreen && (
          <Button 
            variant="ghost" 
            onClick={() => setIsFullScreen(true)}
            className="w-16 h-16 rounded-[22px] bg-white/[0.02] border border-white/[0.08] text-white/10 hover:text-white hover:bg-white/5 transition-all"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Motivation Tag */}
      <div className={cn(
        "flex items-center gap-3 font-black uppercase tracking-[0.4em] transition-all duration-700",
        isFullScreen ? "text-[11px] text-white/30" : "text-[9px] text-white/10"
      )}>
        <ShieldAlert className={cn(isFullScreen ? "w-4 h-4" : "w-3 h-3")} />
        {mode === "focus" ? "Stay focused, brother." : "Recharge for the next forge."}
      </div>
    </div>
  );
}
