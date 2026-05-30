"use client";

import React, { useState, useEffect, useRef } from "react";
import { WorkSidebar } from "@/components/layout/WorkSidebar";
import { 
  Lock, 
  Zap,
  CheckCircle2,
  Trash2,
  Shield,
  Wind,
  X,
  Heart,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrivateTodo {
  id: string;
  text: string;
  completed: boolean;
}

// Box Breathing phases: inhale 4s, hold 4s, exhale 4s, hold 4s
const BREATH_PHASES = [
  { label: "Inhale", duration: 4, scale: 1.4, color: "#60A5FA" },
  { label: "Hold", duration: 4, scale: 1.4, color: "#818CF8" },
  { label: "Exhale", duration: 4, scale: 0.7, color: "#34D399" },
  { label: "Hold", duration: 4, scale: 0.7, color: "#818CF8" },
];

const PANIC_QUOTES = [
  { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
  { text: "The first and greatest victory is to conquer yourself.", author: "Plato" },
  { text: "Endure and persist; this pain will turn to your good by and by.", author: "Ovid" },
  { text: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
  { text: "He who conquers himself is the mightiest warrior.", author: "Confucius" },
];

export default function PrivateWorkspacePage() {
  // Tracker States
  const [isRunning, setIsRunning] = useState(false);
  const [startDate, setStartDate] = useState<number | null>(null);
  const [failedDates, setFailedDates] = useState<string[]>([]);
  
  const [streak, setStreak] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Panic / Struggle Modal
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [breathPhaseIndex, setBreathPhaseIndex] = useState(0);
  const [breathProgress, setBreathProgress] = useState(0);
  const [panicQuote] = useState(() => PANIC_QUOTES[Math.floor(Math.random() * PANIC_QUOTES.length)]);
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathTickRef = useRef(0);

  // Daily Quote pool
  const quotes = [
    { text: "No man is free who is not master of himself.", author: "Epictetus" },
    { text: "The first and best victory is to conquer self.", author: "Plato" },
    { text: "He who conquers his desires is braver than he who conquers his enemies.", author: "Aristotle" },
    { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
    { text: "Rule your mind or it will rule you.", author: "Horace" },
    { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
    { text: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.", author: "Marcus Aurelius" }
  ];
  const [activeQuote, setActiveQuote] = useState(quotes[0]);

  // Checklist
  const [privateTodos, setPrivateTodos] = useState<PrivateTodo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    // Load Quotes
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 8.64e7);
    setActiveQuote(quotes[dayOfYear % quotes.length]);

    // Load Tracker State
    const savedTracker = localStorage.getItem("mantoric-tracker-state");
    if (savedTracker) {
      const parsed = JSON.parse(savedTracker);
      setIsRunning(parsed.isRunning || false);
      setStartDate(parsed.startDate || null);
      setFailedDates(parsed.failedDates || []);
    }

    // Load Todos
    const savedTodos = localStorage.getItem("mantoric-private-todos");
    if (savedTodos) {
      setPrivateTodos(JSON.parse(savedTodos));
    } else {
      const defaults = [
        { id: "1", text: "Cold shower protocol (3 mins)", completed: false },
        { id: "2", text: "Daily physical training (45 mins)", completed: true },
        { id: "3", text: "15 minutes of silent meditation", completed: false },
      ];
      setPrivateTodos(defaults);
      localStorage.setItem("mantoric-private-todos", JSON.stringify(defaults));
    }
  }, []);

  // Timer Tick Logic
  useEffect(() => {
    if (!isRunning || !startDate) {
      setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setStreak(0);
      return;
    }

    const ticker = setInterval(() => {
      const diff = Date.now() - startDate;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days: d, hours: h, minutes: m, seconds: s });
      setStreak(d);
    }, 1000);

    return () => clearInterval(ticker);
  }, [isRunning, startDate]);

  // Box Breathing Logic — runs when panic modal is open
  useEffect(() => {
    if (!showPanicModal) {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
      setBreathPhaseIndex(0);
      setBreathProgress(0);
      breathTickRef.current = 0;
      return;
    }

    const TICK_MS = 100;
    breathIntervalRef.current = setInterval(() => {
      breathTickRef.current += TICK_MS;
      const phase = BREATH_PHASES[breathPhaseIndex];
      const phaseDurationMs = phase.duration * 1000;
      const progress = Math.min(1, breathTickRef.current / phaseDurationMs);
      setBreathProgress(progress);

      if (breathTickRef.current >= phaseDurationMs) {
        breathTickRef.current = 0;
        setBreathPhaseIndex(prev => (prev + 1) % BREATH_PHASES.length);
      }
    }, TICK_MS);

    return () => {
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [showPanicModal, breathPhaseIndex]);

  const saveTrackerState = (newState: any) => {
    localStorage.setItem("mantoric-tracker-state", JSON.stringify(newState));
  };

  const handleStartClean = () => {
    const newStartDate = Date.now();
    setIsRunning(true);
    setStartDate(newStartDate);
    saveTrackerState({ isRunning: true, startDate: newStartDate, failedDates });
  };

  const handleRestartFight = () => {
    const today = new Date().toISOString().split('T')[0];
    const newFailedDates = Array.from(new Set([...failedDates, today]));
    
    setIsRunning(false);
    setStartDate(null);
    setFailedDates(newFailedDates);
    setStreak(0);
    setTimeElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    saveTrackerState({ isRunning: false, startDate: null, failedDates: newFailedDates });
  };

  const handleSaveTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    const updated = [
      ...privateTodos,
      { id: Date.now().toString(), text: newTodoText.trim(), completed: false }
    ];
    setPrivateTodos(updated);
    localStorage.setItem("mantoric-private-todos", JSON.stringify(updated));
    setNewTodoText("");
  };

  const toggleTodo = (id: string) => {
    const updated = privateTodos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setPrivateTodos(updated);
    localStorage.setItem("mantoric-private-todos", JSON.stringify(updated));
  };

  const deleteTodo = (id: string) => {
    const updated = privateTodos.filter(t => t.id !== id);
    setPrivateTodos(updated);
    localStorage.setItem("mantoric-private-todos", JSON.stringify(updated));
  };

  const getDisciplineStage = (days: number) => {
    if (!isRunning) return { stage: "Dormant", desc: "Awaiting your command to start the discipline." };
    if (days < 7) return { stage: "Initiate", desc: "Chemical balancing. Your body is resetting dopamine receptor sensitivity." };
    if (days < 30) return { stage: "Vanguard", desc: "Developing mental stamina. Shielding your attention from impulse triggers." };
    if (days < 90) return { stage: "Sentinel", desc: "High clarity state. Domination of physical impulses. Masculine energy is conserved." };
    return { stage: "Sovereign", desc: "Absolute mastery. Pure focus, supreme clarity and magnetic biological presence." };
  };

  const currentStage = getDisciplineStage(streak);

  const renderCalendarHeatmap = () => {
    const totalDays = 30;
    const items = [];
    const today = new Date();
    
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const isFailed = failedDates.includes(dateStr);
      const startD = startDate ? new Date(startDate).setHours(0,0,0,0) : null;
      const currentD = d.setHours(0,0,0,0);
      
      const isClean = startD !== null && currentD >= startD && !isFailed && currentD <= today.setHours(0,0,0,0);
      
      items.push(
        <div 
          key={i}
          className={cn(
            "aspect-square rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold transition-all relative group cursor-help",
            isFailed 
              ? "bg-red-500/10 border border-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.1)]" 
              : isClean 
                ? "bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.1)] hover:border-blue-500/40" 
                : "bg-white/5 border border-white/5 text-slate-650"
          )}
          title={isFailed ? `Failed on ${dateStr}` : isClean ? `Clean on ${dateStr}` : dateStr}
        >
          {totalDays - i}
          {isClean && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-400" />}
          {isFailed && <span className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />}
        </div>
      );
    }
    return items;
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Workspace Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Fixed Workspace Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          {/* Center Column: Private OS Inner Discipline (6 Cols on XL, 5 Cols on LG) */}
          <main className="lg:col-span-5 xl:col-span-6 space-y-8 pb-20">
            
            {/* Header: Private Workspace */}
            <header className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-[#121212] p-6 sm:p-8 flex flex-col justify-between min-h-[160px] md:min-h-[180px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-blue-500/5 pointer-events-none" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] scale-[2.5] pointer-events-none text-blue-500">
                <Lock className="w-24 h-24 stroke-[1.5]" />
              </div>

              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500/15 to-blue-400/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-wider select-none">
                  <Lock className="w-3.5 h-3.5" />
                  SECURED PRIVATE VAULT
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none mt-1">
                  Private Sanctum
                </h1>
                <p className="text-slate-400 text-sm font-medium">
                  Personal metrics, chemical balancing, and private reflections.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Secure Enclave v1.0
                </span>
                
                <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-wider shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  ENCRYPTED
                </div>
              </div>
            </header>

            {/* Premium Semen Retention Card */}
            <section className="soft-card bg-gradient-to-br from-blue-500/[0.03] via-black to-black border-blue-500/15 p-6 md:p-8 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] scale-[3] text-blue-500 pointer-events-none">
                <Shield className="w-12 h-12" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Zap className="w-5 h-5 fill-blue-500/10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm md:text-base">Inner Discipline</h3>
                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 leading-none">Semen Retention / Conservation</p>
                  </div>
                </div>
              </div>

              {/* Large Streak Display Counter */}
              <div className="py-6 border-y border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-3xl md:text-4xl font-black text-blue-400 tracking-tight leading-none font-mono">
                    {streak} Days Clean
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-slate-400 mt-2 font-mono">
                    <span>Elapsed:</span>
                    <span className="text-slate-200 font-bold whitespace-nowrap">
                      {timeElapsed.days}d {timeElapsed.hours}h {timeElapsed.minutes}m {timeElapsed.seconds}s
                    </span>
                  </div>
                </div>

                {!isRunning ? (
                  <button
                    onClick={handleStartClean}
                    className="w-full sm:w-auto px-6 h-12 bg-blue-500/10 border border-blue-500/25 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl transition-all shadow-[0_0_15px_rgba(59,130,246,0.06)] shrink-0"
                  >
                    I'm Clean
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 shrink-0">
                    <button
                      onClick={() => setShowPanicModal(true)}
                      className="w-full sm:w-auto px-6 h-12 bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20 text-blue-400 hover:text-blue-200 font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4" />
                      I'm Struggling
                    </button>
                    <button
                      onClick={handleRestartFight}
                      className="w-full sm:w-auto px-4 h-12 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 text-red-400/80 hover:text-red-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl transition-all flex items-center justify-center"
                    >
                      Restart
                    </button>
                  </div>
                )}
              </div>

              {/* Daily Stoic Quote */}
              <div className="p-4 rounded-2xl bg-blue-500/[0.01] border border-blue-500/5 space-y-2">
                <p className="text-xs italic text-slate-300 leading-relaxed font-semibold">
                  "{activeQuote.text}"
                </p>
                <span className="text-[9px] font-bold text-blue-400/80 block text-right">— {activeQuote.author}</span>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200">Current Stage: {currentStage.stage}</span>
                  <span className="text-slate-500">{streak}/90 Days Goal</span>
                </div>
                <div className="h-2.5 w-full bg-black/50 border border-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (streak / 90) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{currentStage.desc}</p>
              </div>

              {/* Heatmap Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Streak Grid</span>
                  <span className="text-[9px] text-blue-400 font-black uppercase tracking-wider bg-blue-500/5 px-2 py-0.5 rounded-md border border-blue-500/10">Heatmap</span>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 p-4 rounded-2xl bg-black/45 border border-border">
                  {renderCalendarHeatmap()}
                </div>
              </div>

            </section>
          </main>

          {/* Right Column: Private Checklist (4 Cols on LG/XL) */}
          <div className="col-span-1 lg:col-span-4 space-y-8">
            
            {/* Checklist */}
            <div className="soft-card space-y-6 p-6 rounded-2xl bg-[#0D0D0D] border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4.5 h-4.5 text-blue-400 shrink-0" />
                  <h3 className="font-bold text-white text-base leading-none">Sanctum Habits</h3>
                </div>
              </div>

              <form onSubmit={handleSaveTodo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add secret habit..."
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  className="flex-1 bg-secondary/30 border border-border/50 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30 transition-colors"
                />
                <Button type="submit" size="sm" className="bg-white text-background hover:bg-slate-200 text-xs font-bold px-3">
                  +
                </Button>
              </form>

              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
                {privateTodos.map((todo) => (
                  <div 
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-black/30 border border-border hover:border-blue-500/20 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all shrink-0",
                        todo.completed 
                          ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                          : "border-slate-800"
                      )}>
                        {todo.completed && <CheckCircle2 className="w-3 h-3 text-blue-400" />}
                      </div>
                      <p className={cn(
                        "text-xs font-bold truncate transition-all leading-none",
                        todo.completed ? "text-slate-650 line-through" : "text-slate-300"
                      )}>
                        {todo.text}
                      </p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-500 transition-all shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stoic Encouragement / Daily Reminder */}
            <div className="soft-card bg-secondary/15 border-border/50 p-6 space-y-4 rounded-2xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block">Daily Reminder</span>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold italic">
                "No man is free who is not master of himself. True freedom is the ability to command your own mind and desires."
              </p>
              <span className="text-[9px] font-bold text-blue-400 block text-right">— Epictetus</span>
            </div>

          </div>

        </div>

      </div>

      {/* Panic Modal (Struggle Mode) */}
      {showPanicModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />
          
          <div className="relative w-full max-w-5xl bg-[#0D0D0D]/90 border border-blue-500/20 rounded-[2rem] shadow-[0_0_100px_rgba(59,130,246,0.15)] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-y-auto max-h-[90vh]">
            
            <button 
              onClick={() => setShowPanicModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:bg-white/5 hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Column: Text & Action */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
                  <Wind className="w-4 h-4" />
                  Emergency Protocol
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Pause. Breathe.<br className="hidden lg:block"/> Re-align.
                </h2>
                <p className="text-sm sm:text-base text-slate-400 font-medium max-w-md mx-auto lg:mx-0">
                  You are stronger than this temporary impulse. Center yourself before you make a decision.
                </p>
              </div>

              {/* Stoic Panic Quote */}
              <div className="max-w-md mx-auto lg:mx-0 space-y-3 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <p className="text-base font-medium text-slate-200 italic leading-relaxed">
                  "{panicQuote.text}"
                </p>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                  — {panicQuote.author}
                </span>
              </div>

              {/* Action */}
              <Button 
                onClick={() => setShowPanicModal(false)}
                className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all hover:scale-105"
              >
                I Am Stronger. Re-enter Sanctum
              </Button>
            </div>

            {/* Right Column: Visuals & Audio */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full max-w-md mx-auto mt-4 lg:mt-0">
              {/* Breathing Animation */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full border-4 opacity-20 transition-all duration-1000 ease-in-out"
                  style={{ 
                    borderColor: BREATH_PHASES[breathPhaseIndex].color,
                    transform: `scale(${BREATH_PHASES[breathPhaseIndex].scale})`
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-full border border-dashed opacity-40 transition-all duration-1000 ease-in-out"
                  style={{ 
                    borderColor: BREATH_PHASES[breathPhaseIndex].color,
                    transform: `scale(${BREATH_PHASES[breathPhaseIndex].scale * 0.8})`
                  }}
                />
                <div 
                  className="w-32 h-32 rounded-full bg-background flex flex-col items-center justify-center relative z-10 border border-white/10 shadow-2xl transition-colors duration-1000"
                  style={{
                    boxShadow: `0 0 50px ${BREATH_PHASES[breathPhaseIndex].color}20`
                  }}
                >
                  <span className="text-xl font-black text-white tracking-widest uppercase">
                    {BREATH_PHASES[breathPhaseIndex].label}
                  </span>
                  <div className="w-16 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all ease-linear"
                      style={{ 
                        width: `${breathProgress * 100}%`,
                        backgroundColor: BREATH_PHASES[breathPhaseIndex].color 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Embed */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black relative">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1" 
                  title="Calming Ambient Music" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
