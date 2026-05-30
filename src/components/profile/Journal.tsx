"use client";

import React from "react";
import { 
  Lock, 
  BookOpen, 
  Calendar as CalendarIcon, 
  MessageSquare,
  ShieldQuestion
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ProfileJournal() {
  const entries = [
    { 
      date: "2026-05-24", 
      title: "Morning Clarity", 
      preview: "Today's meditation brought a sense of detachment from trivial distractions...",
      category: "Mindset"
    },
    { 
      date: "2026-05-22", 
      title: "Discipline Protocol", 
      preview: "Completed the first 7 days of the new deep work cycle without failure...",
      category: "Discipline"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-white tracking-tight">The Inner Sanctum</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Private reflections & Stoic logs</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {entries.map((entry, i) => (
          <Card key={i} className="bg-black/40 border-white/5 p-6 rounded-[24px] group hover:border-white/10 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{entry.title}</h5>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{entry.date}</span>
                    <span className="text-slate-700 text-[10px]">•</span>
                    <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">{entry.category}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 text-slate-600">
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {entry.preview}
            </p>
          </Card>
        ))}

        {/* Locked Entry Mockup */}
        <Card className="bg-black/40 border-white/5 p-6 rounded-[24px] border-dashed flex flex-col items-center justify-center text-center space-y-4 py-12">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-600">
            <ShieldQuestion className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-400">Archived Reflections</p>
            <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">Unlock with your Master Key</p>
          </div>
          <Button variant="outline" className="rounded-xl border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest h-9 px-6 hover:bg-white/10">
            Access Archives
          </Button>
        </Card>
      </div>
    </div>
  );
}
