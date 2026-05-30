"use client";

import React, { useEffect, useState } from "react";
import { Shield } from "lucide-react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground select-none animate-in fade-in duration-300">
      
      {/* Cinematic Ambient Background Blur */}
      <div className="absolute w-[260px] h-[260px] bg-primary/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.015] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Animated Stoic Crest Ring */}
        <div className="relative flex items-center justify-center w-20 h-20">
          <div className="absolute inset-0 rounded-full border border-primary/10" />
          <div className="absolute inset-1 rounded-full border-t border-r border-primary/60 animate-spin [animation-duration:1.2s]" />
          <Shield className="w-6 h-6 text-primary animate-pulse" />
        </div>

        {/* Cinematic Header Text */}
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-xs font-bold tracking-[0.45em] text-foreground uppercase select-none pl-1">
            FORGING<span className="text-primary">{dots}</span>
          </h3>
          <span className="text-[9px] font-bold tracking-[0.3em] text-muted-foreground/50 uppercase">
            MANTORIC DIGITAL CLUB
          </span>
        </div>

        {/* Minimalist Micro Progress Bar */}
        <div className="w-36 h-[2px] bg-secondary/80 border border-border/30 rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 bottom-0 left-0 bg-primary rounded-full transition-all duration-1000 ease-out" 
            style={{ 
              animation: "loading-progress 1.5s infinite ease-in-out" 
            }} 
          />
        </div>

      </div>

      {/* Embedded Animation Styles */}
      <style jsx global>{`
        @keyframes loading-progress {
          0% {
            left: -40%;
            width: 40%;
          }
          50% {
            width: 50%;
          }
          100% {
            left: 110%;
            width: 25%;
          }
        }
      `}</style>
    </div>
  );
}
