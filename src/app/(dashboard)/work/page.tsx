"use client";

import React, { useState, useEffect, useRef } from "react";
import { WorkSidebar } from "@/components/layout/WorkSidebar";
import { 
  Zap,
  CheckCircle2,
  Plus,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  Brain,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  BookOpen,
  FolderHeart,
  Activity,
  Settings,
  Calendar,
  Layers,
  Sparkles,
  Search,
  BookMarked,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { savePomodoroSession } from "@/app/actions/pomodoro";
import Link from "next/link";

// Types for Widget Grid System
interface Widget {
  id: string;
  title: string;
  visible: boolean;
  size: "full" | "half";
}

export default function WorkPage() {
  // Widget Order & Visibility State (Notion Simulation)
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: "mantoric_ai", title: "Mantoric AI Coach", visible: true, size: "full" },
    { id: "life_dashboard", title: "Life Dashboard", visible: true, size: "full" },
    { id: "knowledge_base", title: "Knowledge Base", visible: true, size: "half" },
    { id: "journal", title: "Advanced Journal", visible: true, size: "half" }
  ]);
  const [showConfig, setShowConfig] = useState(false);

  // Widget Reordering Functions
  const moveWidget = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= widgets.length) return;
    
    const updated = [...widgets];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setWidgets(updated);
  };

  const toggleWidgetVisibility = (id: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, visible: !w.visible } : w));
  };



  // State 4: Knowledge Base (Second Brain)
  const [notes, setNotes] = useState([
    { id: "n1", title: "Stoic Metaphor of the Archer", category: "Philosophy", excerpt: "An archer does everything to hit the target, but the actual hit is not fully in their control...", date: "24.05.2026" },
    { id: "n2", title: "Domain-Driven Design Principles", category: "Software", excerpt: "Aggregates form boundaries around entities that state modify together. Keep them small.", date: "22.05.2026" }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteCategory, setNewNoteCategory] = useState("General");
  const [newNoteExcerpt, setNewNoteExcerpt] = useState("");

  // State 5: Advanced Journal
  const [journalMood, setJournalMood] = useState("Focused");
  const [journalText, setJournalText] = useState("");
  const [journalEntries, setJournalEntries] = useState([
    { id: "j1", text: "The morning breeze cleared my mind. Today I will focus on coding and philosophical readings. I have shut down all distractions.", mood: "Focused", time: "08:30" }
  ]);



  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    setNotes(prev => [
      {
        id: `n_${Date.now()}`,
        title: newNoteTitle.trim(),
        category: newNoteCategory,
        excerpt: newNoteExcerpt.trim() || "Empty note content...",
        date: "Today"
      },
      ...prev
    ]);
    setNewNoteTitle("");
    setNewNoteExcerpt("");
  };

  const handleJournalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;
    setJournalEntries(prev => [
      {
        id: `j_${Date.now()}`,
        text: journalText.trim(),
        mood: journalMood,
        time: "Now"
      },
      ...prev
    ]);
    setJournalText("");
  };



  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Workspace Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Fixed Workspace Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          {/* Center/Main Column: Notion-style Personal OS Dashboard (10 Cols on XL) */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-6 pb-20">
            
            {/* Notion Style Premium Header banner */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[120px]">
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.02] scale-[2.5] pointer-events-none text-primary">
                <Layers className="w-24 h-24 stroke-[1.5]" />
              </div>

              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-wider select-none">
                  <Layers className="w-3.5 h-3.5" />
                  Personal Operating System
                </div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-none mt-1">
                  Sanctum OS
                </h1>
                <p className="text-slate-400 text-sm font-medium">
                  The second home for your mind. Manage your projects, learning process, and daily discipline from a single hub.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Notion All-in-One OS v1.0
                </span>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowConfig(!showConfig)}
                    variant="ghost" 
                    className="h-8.5 px-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-none flex items-center gap-1.5 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </Button>

                  <Link 
                    href="/work/deep-sessions"
                    className="h-8.5 px-4 rounded-xl bg-white text-black font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Focus</span>
                  </Link>
                </div>
              </div>
            </header>

            {/* Widget Config Drawer */}
            {showConfig && (
              <div className="soft-card bg-gradient-to-b from-[#151515] to-[#121212] border-white/10 p-5 rounded-2xl space-y-4 animate-in slide-in-from-top-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">Dashboard Widget Settings</h3>
                  <span className="text-[10px] text-slate-500 font-semibold">Click to toggle visibility</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {widgets.map((widget) => (
                    <button
                      key={widget.id}
                      onClick={() => toggleWidgetVisibility(widget.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-none",
                        widget.visible 
                          ? "bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]" 
                          : "bg-black/40 border-white/5 text-slate-500 hover:text-slate-300"
                      )}
                    >
                      {widget.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{widget.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notion Widget Grid Stream */}
            <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
              
              {widgets
                .filter(w => w.visible)
                .map((widget, index) => {
                  
                  // Common Header controls for Widget reordering
                  const renderWidgetHeader = (icon: any, accentColor: string = "text-[#34D399]") => (
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-xl bg-white/5 border border-white/5", accentColor)}>
                          {React.createElement(icon, { className: "w-5 h-5" })}
                        </div>
                        <h3 className="font-extrabold text-white text-base tracking-tight">{widget.title}</h3>
                      </div>
                      
                      {/* Notion Widget Controls */}
                      <div className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => moveWidget(index, "up")}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-30 transition-none cursor-pointer"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => moveWidget(index, "down")}
                          disabled={index === widgets.length - 1}
                          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-30 transition-none cursor-pointer"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleWidgetVisibility(widget.id)}
                          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-red-400 transition-none cursor-pointer"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );

                  // Widget Content Cases
                  switch (widget.id) {
                    
                    // 1. Life Dashboard (Full Width widget containing Pomodoro)
                    case "life_dashboard":
                      return (
                        <div key={widget.id} className="col-span-2 md:col-span-12 soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-6 rounded-2xl shadow-xl space-y-6">
                          {renderWidgetHeader(Sparkles, "text-[#34D399]")}
                          
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            
                            <div className="lg:col-span-12 space-y-5">
                              <div className="p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Sanctum Quote</span>
                                <p className="text-slate-200 text-sm italic font-medium leading-relaxed">
                                  "The obstacle is the way. Every difficulty you face is a live training session designed to develop your muscles of discipline and wisdom."
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">System Status</span>
                                  <span className="text-xl font-extrabold text-[#34D399]">All Systems Nominal</span>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Affirmation</span>
                                  <span className="text-xs font-bold text-slate-300 block truncate leading-relaxed">My mind is calm, my resolve is clear.</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      );

                    // 2. Mantoric AI Coach (Full Width widget)
                    case "mantoric_ai":
                      return (
                        <div key={widget.id} className="col-span-2 md:col-span-12 soft-card relative overflow-hidden bg-gradient-to-br from-[#10B981]/10 via-[#121212] to-[#121212] border-[#10B981]/20 p-6 rounded-2xl shadow-xl space-y-6">
                          <div className="absolute top-0 right-0 p-6 opacity-[0.03] scale-[3] pointer-events-none">
                            <Bot className="w-16 h-16 text-[#10B981]" />
                          </div>
                          {renderWidgetHeader(Bot, "text-[#10B981]")}
                          
                          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-8 space-y-4">
                              <h4 className="text-xl font-black text-white tracking-tight">Your Personal Mastery Coach</h4>
                              <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
                                Mantoric AI is designed to observe your habits, analyze your work sessions, and guide you towards peak performance using stoic principles and data-driven insights.
                              </p>
                            </div>
                            <div className="md:col-span-4 flex justify-end">
                              <Link 
                                href="/work/mantoric-ai"
                                className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] text-black font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-[#10B981]/20 flex items-center justify-center gap-2 transition-transform hover:scale-105"
                              >
                                <Bot className="w-4 h-4" />
                                Start Session
                              </Link>
                            </div>
                          </div>
                        </div>
                      );

                    // 4. Knowledge Base (Half Width widget)
                    case "knowledge_base":
                      return (
                        <div key={widget.id} className="col-span-1 md:col-span-6 soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-6 rounded-2xl shadow-xl space-y-5">
                          {renderWidgetHeader(BookMarked, "text-[#34D399]")}
                          
                          <form onSubmit={handleAddNote} className="space-y-2.5">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Title..."
                                value={newNoteTitle}
                                onChange={(e) => setNewNoteTitle(e.target.value)}
                                className="flex-1 bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/30 transition-none"
                              />
                              <select 
                                value={newNoteCategory}
                                onChange={(e) => setNewNoteCategory(e.target.value)}
                                className="bg-black/40 border border-white/5 rounded-xl px-2 text-[10px] font-bold text-slate-400 outline-none"
                              >
                                <option value="Philosophy">Philosophy</option>
                                <option value="Software">Software</option>
                                <option value="General">General</option>
                              </select>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Summary or short description..."
                                value={newNoteExcerpt}
                                onChange={(e) => setNewNoteExcerpt(e.target.value)}
                                className="flex-1 bg-black/40 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/30 transition-none"
                              />
                              <Button type="submit" className="h-9 px-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-white cursor-pointer shrink-0 transition-none">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </form>

                          <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                            {notes.map((note) => (
                              <div key={note.id} className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-[9px] font-bold text-[#34D399] uppercase tracking-wider">{note.category}</span>
                                  <span className="text-[8px] text-slate-500">{note.date}</span>
                                </div>
                                <h4 className="text-xs font-bold text-white">{note.title}</h4>
                                <p className="text-[10px] text-slate-400 leading-normal line-clamp-2">{note.excerpt}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );

                    // 5. Advanced Journal (Half Width widget)
                    case "journal":
                      return (
                        <div key={widget.id} className="col-span-1 md:col-span-6 soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-6 rounded-2xl shadow-xl space-y-5">
                          {renderWidgetHeader(BookOpen, "text-[#22D3EE]")}
                          
                          <form onSubmit={handleJournalSubmit} className="space-y-3">
                            <textarea
                              placeholder="Write your daily reflections honestly here..."
                              value={journalText}
                              onChange={(e) => setJournalText(e.target.value)}
                              className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/30 min-h-[70px] resize-none transition-none"
                            />
                            <div className="flex justify-between items-center">
                              <div className="flex gap-1.5">
                                {["Focused", "Reflection", "Stoic"].map((mood) => (
                                  <button
                                    key={mood}
                                    type="button"
                                    onClick={() => setJournalMood(mood)}
                                    className={cn(
                                      "px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-none",
                                      journalMood === mood 
                                        ? "bg-white/10 text-white border border-white/15" 
                                        : "text-slate-500 hover:text-slate-300"
                                    )}
                                  >
                                    {mood === "Focused" ? "Focus" : mood === "Reflection" ? "Reflection" : "Stoic"}
                                  </button>
                                ))}
                              </div>
                              <Button type="submit" disabled={!journalText.trim()} className="h-8 px-4 rounded-lg bg-gradient-to-r from-[#10B981] to-[#34D399] text-black font-extrabold text-[10px] uppercase transition-none cursor-pointer">
                                Save
                              </Button>
                            </div>
                          </form>

                          <div className="space-y-3.5 max-h-[160px] overflow-y-auto pr-1 no-scrollbar">
                            {journalEntries.map((entry) => (
                              <div key={entry.id} className="p-3 rounded-xl bg-black/20 border border-white/5 space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-[8px] font-bold text-slate-500">{entry.time}</span>
                                  <span className="text-[8px] font-bold text-[#22D3EE] uppercase tracking-widest">{entry.mood}</span>
                                </div>
                                <p className="text-[11px] text-slate-300 leading-relaxed">{entry.text}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}

            </div>

          </main>

        </div>

      </div>
    </div>
  );
}
