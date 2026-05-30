"use client";

import React, { useState, useEffect } from "react";
import { useDeepWork } from "@/context/DeepWorkContext";
import { Play, Pause, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DeepWorkOverlay() {
  const { isActive, toggleDeepWork } = useDeepWork();
  const [time, setTime] = useState(new Date());
  
  // Stopwatch state
  const [seconds, setSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stopwatch logic
  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const formatStopwatch = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center animate-in fade-in duration-1000 select-none overflow-hidden">
      
      {/* Immersive Background: Transparent + High Blur */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-[60px] pointer-events-none" />
      
      {/* Subtle Focus Glow */}
      <div className="absolute inset-0 bg-radial-gradient(from_center,_white/[0.03]_0%,_transparent_70%) pointer-events-none" />

      {/* Minimalist Exit Button */}
      <button 
        onClick={toggleDeepWork}
        className="absolute top-10 right-10 p-3 rounded-full text-white/10 hover:text-white/30 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-16">
        
        {/* Large Central Clock */}
        <div className="space-y-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/10">Deep Focus</p>
          <h1 className="text-[12vw] md:text-[220px] font-black tracking-tighter text-white leading-none tabular-nums drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </h1>
        </div>

        {/* Minimalist Stopwatch */}
        <div className="flex flex-col items-center space-y-10">
          <div className="flex flex-col items-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Active Focus Time</p>
            <div className="text-5xl font-black text-white/40 tabular-nums font-mono tracking-tight">
              {formatStopwatch(seconds)}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsTimerActive(!isTimerActive)}
              className={cn(
                "h-16 w-16 rounded-[24px] flex items-center justify-center transition-all shadow-2xl",
                isTimerActive ? "bg-white text-black scale-110" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
              )}
            >
              {isTimerActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
            <button 
              onClick={() => { setSeconds(0); setIsTimerActive(false); }}
              className="h-16 w-16 rounded-[24px] bg-white/[0.02] border border-white/[0.05] text-white/10 hover:text-white transition-all flex items-center justify-center"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer (Dimmed) */}
      <div className="absolute bottom-12 text-[9px] font-black uppercase tracking-[1em] text-white/[0.02]">
        Mantoric Protocol
      </div>
    </div>
  );
}
