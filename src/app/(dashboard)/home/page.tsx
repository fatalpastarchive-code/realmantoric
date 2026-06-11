"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layout,
  Languages,
  MessageSquare,
  Activity,
  Target,
  Calendar,
  Flame,
  Moon,
  Sun,
  Bot
} from "lucide-react";
import { DailyBriefWidget } from "@/components/widgets/DailyBriefWidget";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOODS = [
  { id: "stoic", label: "Stoic", emoji: "⚡" },
  { id: "focused", label: "Focused", emoji: "🎯" },
  { id: "tired", label: "Tired", emoji: "🌙" },
  { id: "inspired", label: "Inspired", emoji: "✨" },
];

const QUICK_STATS = [
  { label: "Focus Streak", value: "12 Days", icon: Flame, color: "text-[#34D399]", accent: "from-[#10B981]/10" },
  { label: "Completion", value: "85%", icon: Activity, color: "text-[#22D3EE]", accent: "from-[#22D3EE]/10" },
  { label: "Daily Goal", value: "4 / 5", icon: Target, color: "text-slate-300", accent: "from-white/5" },
  { label: "Mood", value: "Stoic", icon: Sparkles, color: "text-[#34D399]", accent: "from-[#10B981]/10" },
];

const COMMUNITIES = [
  { name: "Mental Models", members: "1.2k", icon: "◈" },
  { name: "Art of Productivity",  members: "842",  icon: "◆" },
  { name: "Financial Freedom", members: "2.1k", icon: "◇" },
];

const VOCAB = [
  { word: "Tranquility", meaning: "Quiet state of the soul · Zihinsel dinginlik", status: "Learned" },
  { word: "Fortitude",   meaning: "Strength to endure adversity · Metanet",      status: "Review"  },
  { word: "Acumen",      meaning: "Good judgment & quick decisions · Sezgi",     status: "New"     },
];

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflectionText, setReflectionText] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [weeklyTasks, setWeeklyTasks] = useState<any[]>([]);

  useEffect(() => {
    const syncTasks = () => {
      const saved = localStorage.getItem("mantoric_home_today_preview");
      if (saved) {
        try {
          setWeeklyTasks(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse home today preview", e);
        }
      }
    };

    syncTasks();
    const interval = setInterval(syncTasks, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Hero Banner ─────────────────────────────────────────────── */}
        <header className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-[#121212] shadow-2xl">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-[#10B981]/5 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#22D3EE]/[0.03] to-transparent pointer-events-none" />
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none">
            <BookOpen className="w-40 h-40 text-primary stroke-[1]" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left: Greeting & Insight */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-[#10B981]/15 to-[#22D3EE]/15 border border-[#10B981]/25 text-[#34D399] text-[10px] font-bold uppercase tracking-wider select-none">
                  <Sun className="w-3.5 h-3.5" />
                  Center · Daily Sanctuary
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#22D3EE] bg-clip-text text-transparent leading-none">
                  Home
                </h1>
                <p className="text-slate-400 text-sm font-medium max-w-xl leading-relaxed">
                  A calm mind sanctuary for learning, self-reflection, and sincere friendships.
                </p>
                <blockquote className="border-l-2 border-[#10B981]/40 pl-4 text-slate-300 text-sm italic font-medium leading-relaxed max-w-lg">
                  "True nobility is not being superior to others; it is being superior to your former self."
                </blockquote>
              </div>

              {/* Right: Online Members + Mood Picker */}
              <div className="lg:col-span-5 space-y-4">

                {/* Online count */}
                <div className="flex items-center gap-4 bg-black/40 px-5 py-3.5 rounded-2xl border border-white/5 w-fit">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-[#121212] bg-slate-800 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=home${i}`} alt="Avatar" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Online Now</span>
                    <span className="text-sm font-extrabold text-[#34D399]">15 Friends</span>
                  </div>
                </div>

                {/* Mood Picker */}
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Your mood today?</span>
                  <div className="flex flex-wrap gap-2">
                    {MOODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMood(m.id)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-none cursor-pointer",
                          selectedMood === m.id
                            ? "bg-[#10B981]/15 border-[#10B981]/40 text-[#34D399]"
                            : "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10"
                        )}
                      >
                        <span>{m.emoji}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </header>

        {/* ── Main 3-Column Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left Rail: Quick Stats ── (col-span-2) */}
          <aside className="lg:col-span-2 space-y-3">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 px-1">Report</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {QUICK_STATS.map((stat, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-4 rounded-2xl bg-gradient-to-br border border-white/5 to-transparent space-y-2.5 bg-[#121212]",
                    stat.accent
                  )}
                >
                  <stat.icon className={cn("w-4.5 h-4.5", stat.color)} />
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                    <p className="text-lg font-extrabold text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* ── Center Main Feed ── (col-span-8) */}
          <main className="lg:col-span-8 space-y-6">

            {/* Daily Brief — Full Width (2-column inside) */}
            <section>
              <DailyBriefWidget />
            </section>

            {/* Row: Daily Insight + Quick Reflection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Daily Insight Card */}
              <section className="soft-card relative overflow-hidden bg-gradient-to-br from-[#10B981]/5 via-[#121212] to-[#121212] border-[#10B981]/15 p-6 flex flex-col justify-between min-h-[300px] rounded-2xl shadow-xl">
                <div className="absolute top-0 right-0 p-6 opacity-[0.04] scale-[3.5] pointer-events-none">
                  <Zap className="w-12 h-12 text-[#10B981]" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#10B981] to-[#34D399] text-black shadow-lg shadow-[#10B981]/20">
                      <Zap className="w-4.5 h-4.5 fill-current" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white tracking-tight">Daily Inspiration</h3>
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Stoic Wisdom</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-base font-bold text-slate-100 leading-snug italic">
                      "Take small but consistent steps today. Getting 1% better every day means 37x growth by the end of the year."
                    </p>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      Build a disciplined morning routine. Turn away anything that distracts the mind. Your future self will thank you for every step you take today.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 relative z-10">
                  <Button className="h-9 px-5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-lg shadow-[#10B981]/15 border-none cursor-pointer transition-none">
                    Take Action
                  </Button>
                  <Button variant="ghost" className="h-9 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-[10px] uppercase tracking-wider cursor-pointer transition-none">
                    Thoughts
                  </Button>
                </div>
              </section>

              {/* Quick Reflection Journal */}
              <section className="soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-6 flex flex-col justify-between min-h-[300px] rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <Moon className="w-4.5 h-4.5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white tracking-tight">Daily Reflection</h3>
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">Reflection Journal</span>
                  </div>
                </div>

                <form onSubmit={handleSaveReflection} className="flex-1 flex flex-col gap-3">
                  <textarea
                    placeholder="What's on your mind today? Write honestly..."
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    className="flex-1 w-full bg-black/40 border border-white/5 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/30 resize-none transition-none font-medium min-h-[120px]"
                  />
                  <Button
                    type="submit"
                    disabled={!reflectionText.trim()}
                    className={cn(
                      "w-full h-9 rounded-xl font-extrabold text-[10px] uppercase tracking-wider transition-none cursor-pointer",
                      reflectionSaved
                        ? "bg-[#10B981]/30 text-[#34D399] border border-[#10B981]/40"
                        : "bg-gradient-to-r from-[#10B981] to-[#34D399] text-black shadow-md shadow-[#10B981]/15 disabled:opacity-40"
                    )}
                  >
                    {reflectionSaved ? "✓ Saved" : "Save"}
                  </Button>
                </form>
              </section>

            </div>



          </main>

          {/* ── Right Rail: Communities ── (col-span-2) */}
          <aside className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 items-start">

            {/* Explore Communities */}
            <div className="soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Compass className="w-4 h-4 text-[#34D399]" />
                <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Explore Communities</h3>
              </div>
              <div className="space-y-2.5">
                {COMMUNITIES.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-none group cursor-pointer border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[#34D399] text-sm font-black shrink-0">{c.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors truncate">{c.name}</p>
                        <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">{c.members} members</p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#34D399] transition-colors shrink-0" />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-8 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white border-t border-white/5 pt-2 cursor-pointer transition-none">
                See All
              </Button>
            </div>

            {/* Mantoric AI Coach CTA */}
            <div className="soft-card bg-gradient-to-b from-[#10B981]/10 to-transparent border-[#10B981]/20 p-5 rounded-2xl shadow-xl space-y-4 text-center relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-10">
                <Bot className="w-24 h-24 text-[#10B981]" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center mx-auto border border-[#10B981]/30 relative z-10">
                <Bot className="w-5 h-5 text-[#34D399]" />
              </div>
              <div className="space-y-1 relative z-10">
                <h4 className="text-sm font-extrabold text-white">Mantoric AI Coach</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Your personal Stoic and performance coach is ready.</p>
              </div>
              <Button
                onClick={() => { window.location.href = "/work/mantoric-ai"; }}
                className="w-full h-9 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-black font-extrabold text-[10px] uppercase tracking-wider transition-none shadow-md shadow-[#10B981]/15 cursor-pointer relative z-10"
              >
                Start Session
              </Button>
            </div>

            {/* Weekly Calendar Preview */}
            <div className="soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-5 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Calendar className="w-4 h-4 text-[#22D3EE]" />
                <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">This Week</h3>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["M","T","W","T","F","S","S"].map((day, i) => {
                  const today = new Date().getDay();
                  const isToday = i === (today === 0 ? 6 : today - 1);
                  return (
                    <div key={i} className="space-y-1">
                      <span className="text-[8px] font-bold text-slate-500 block">{day}</span>
                      <div className={cn(
                        "w-6 h-6 rounded-lg mx-auto flex items-center justify-center text-[9px] font-bold",
                        isToday
                          ? "bg-[#10B981]/20 border border-[#10B981]/40 text-[#34D399]"
                          : i < (today === 0 ? 6 : today - 1)
                            ? "bg-white/5 text-slate-400"
                            : "text-slate-600"
                      )}>
                        {i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-2 pt-1">
                {weeklyTasks.length === 0 ? (
                  <div className="py-4 text-center opacity-20 border border-dashed border-white/10 rounded-xl">
                    <p className="text-[9px] font-black uppercase tracking-widest">No Scheduled Tasks</p>
                  </div>
                ) : (
                  weeklyTasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-lg bg-black/30 border border-white/5 group">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0",
                        task.completed ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white/10"
                      )} />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={cn(
                          "text-[10px] font-semibold truncate transition-all",
                          task.completed ? "text-slate-500 line-through" : "text-slate-300"
                        )}>
                          {task.text}
                        </span>
                        {task.time && (
                          <span className="text-[8px] font-bold text-[#22D3EE]/60">{task.time}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {weeklyTasks.length > 3 && (
                  <p className="text-[8px] font-bold text-slate-500 text-center uppercase tracking-widest pt-1">
                    + {weeklyTasks.length - 3} Other Tasks
                  </p>
                )}
              </div>
            </div>

            {/* CTA: Go to Work */}
            <div className="soft-card bg-gradient-to-b from-[#10B981]/8 to-transparent border-[#10B981]/20 p-5 rounded-2xl shadow-xl space-y-4 text-center">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center mx-auto border border-[#10B981]/30">
                <Zap className="w-5 h-5 text-[#34D399]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-white">Ready to Focus?</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Enter the Sanctum Work area and start diving deep.</p>
              </div>
              <Button
                onClick={() => { window.location.href = "/work"; }}
                className="w-full h-9 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-black font-extrabold text-[10px] uppercase tracking-wider transition-none shadow-md shadow-[#10B981]/15 cursor-pointer"
              >
                Enter Sanctum →
              </Button>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
