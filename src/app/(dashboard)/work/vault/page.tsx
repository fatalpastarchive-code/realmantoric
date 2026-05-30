"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Headphones, 
  Play, 
  Pause,
  ArrowRight,
  Bookmark,
  Activity,
  Layers,
  Star,
  Volume2,
  SkipForward,
  SkipBack,
  SlidersHorizontal,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkSidebar } from "@/components/layout/WorkSidebar";

const ARTICLES = [
  {
    id: 1,
    title: "The Discipline of Perception",
    author: "Marcus Aurelius",
    category: "Philosophy",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Deep Work Protocol",
    author: "Cal Newport",
    category: "Productivity",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Asymmetric Returns in Life",
    author: "Naval Ravikant",
    category: "Wealth",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  }
];

const PODCASTS = [
  {
    id: 1,
    title: "The Observer's Mind",
    host: "Ziya",
    duration: "45:20",
    cover: "https://images.unsplash.com/photo-1550684848-FAC1C5B4E853?q=80&w=2670&auto=format&fit=crop",
    excerpt: "Exploring the fundamental principles of stoic detachment and cognitive reframing to achieve absolute focus.",
    tags: ["Mindset", "Philosophy"],
    color: "from-blue-500/20 to-indigo-500/5",
    accent: "text-blue-400",
    progress: 35
  },
  {
    id: 2,
    title: "Architects of Flow State",
    host: "Dr. Andrew Huberman",
    duration: "1:22:10",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    excerpt: "Neurobiological mechanisms underlying the flow state, dopamine baselines, and maintaining deep work blocks.",
    tags: ["Neuroscience", "Productivity"],
    color: "from-[#10B981]/20 to-teal-500/5",
    accent: "text-[#34D399]",
    progress: 0
  },
  {
    id: 3,
    title: "Navigating the Noise",
    host: "Naval",
    duration: "30:45",
    cover: "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?q=80&w=2669&auto=format&fit=crop",
    excerpt: "How to filter signal from noise in a hyper-connected world and optimize your reading habits.",
    tags: ["Wealth", "Clarity"],
    color: "from-purple-500/20 to-fuchsia-500/5",
    accent: "text-purple-400",
    progress: 82
  }
];

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<"read" | "listen">("read");
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    if (playingId === id) setPlayingId(null);
    else setPlayingId(id);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground selection:bg-[#10B981]/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dedicated Work Sidebar Navigation - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          {/* Right Column: Main Vault Space */}
          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            
            {/* Elegant Header Area */}
            <header className="relative w-full rounded-[32px] overflow-hidden border border-white/5 bg-[#121212] p-8 md:p-12 flex flex-col justify-between shadow-2xl group">
              {/* Premium Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/[0.03] via-transparent to-[#22D3EE]/[0.02] pointer-events-none group-hover:from-[#10B981]/[0.05] transition-all duration-700" />
              <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 opacity-50 group-hover:opacity-70 transition-all duration-1000" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.15)] select-none">
                    <BookOpen className="w-3.5 h-3.5" />
                    Library / Mahzen
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                    The Vault
                  </h1>
                  <p className="text-slate-400 text-[15px] font-semibold leading-relaxed max-w-xl">
                    A curated center for the mind. Hand-picked articles and tactical podcasts designed to nourish your intellect and deepen your focus.
                  </p>
                </div>

                {/* Sleek Segmented Control for Tabs */}
                <div className="relative z-10 flex items-center p-1.5 rounded-2xl bg-black/40 border border-white/5 shadow-inner backdrop-blur-md">
                  <button
                    onClick={() => setActiveTab("read")}
                    className={cn(
                      "px-6 py-2.5 rounded-xl flex items-center gap-2.5 transition-all text-xs font-black uppercase tracking-wider relative",
                      activeTab === "read" 
                        ? "text-black shadow-lg" 
                        : "text-slate-500 hover:text-white"
                    )}
                  >
                    {activeTab === "read" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Read
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("listen")}
                    className={cn(
                      "px-6 py-2.5 rounded-xl flex items-center gap-2.5 transition-all text-xs font-black uppercase tracking-wider relative",
                      activeTab === "listen" 
                        ? "text-black shadow-lg" 
                        : "text-slate-500 hover:text-white"
                    )}
                  >
                    {activeTab === "listen" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Headphones className="w-4 h-4" />
                      Listen
                    </span>
                  </button>
                </div>
              </div>
            </header>

            {/* Dynamic Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              {activeTab === "read" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ARTICLES.map((article) => (
                    <article key={article.id} className="group cursor-pointer">
                      <div className="relative w-full aspect-[3/4.5] rounded-[28px] overflow-hidden border border-white/5 bg-[#121212] shadow-xl hover:shadow-2xl hover:shadow-[#10B981]/5 hover:border-white/15 transition-all duration-500 flex flex-col">
                        
                        {/* Image Section */}
                        <div className="relative h-[65%] w-full overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                          <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#10B981]/20 group-hover:border-[#10B981]/40 transition-all">
                            <Bookmark className="w-3.5 h-3.5 text-white/70 group-hover:text-[#34D399]" />
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="relative flex-1 p-6 flex flex-col justify-between -mt-6 z-10">
                          <div className="space-y-3">
                            <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                              {article.category}
                            </span>
                            <h3 className="text-xl font-black text-white leading-snug tracking-tight group-hover:text-[#34D399] transition-colors">
                              {article.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-white/10 border border-white/5 flex items-center justify-center">
                                <Star className="w-3 h-3 text-white/50" />
                              </div>
                              <span className="text-[11px] font-bold text-slate-400">{article.author}</span>
                            </div>
                            <span className="text-[9px] font-black text-[#10B981] uppercase tracking-widest bg-[#10B981]/10 px-2 py-1 rounded-md">
                              {article.readTime}
                            </span>
                          </div>
                        </div>

                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Global Library Controls */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Episodes</span>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      Filter
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {PODCASTS.map((podcast) => {
                      const isPlaying = playingId === podcast.id;
                      return (
                        <div 
                          key={podcast.id}
                          className={cn(
                            "group relative flex flex-col sm:flex-row items-center gap-6 p-4 rounded-[24px] transition-all duration-500 overflow-hidden cursor-pointer border",
                            isPlaying 
                              ? "bg-[#161616] border-[#10B981]/30 shadow-[0_10px_40px_rgba(16,185,129,0.1)]" 
                              : "bg-[#121212] border-white/5 hover:border-white/15 hover:bg-[#151515]"
                          )}
                          onClick={() => togglePlay(podcast.id)}
                        >
                          {/* Dynamic Gradient Background Overlay */}
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-1000 pointer-events-none",
                            podcast.color,
                            isPlaying ? "opacity-15" : "group-hover:opacity-5"
                          )} />

                          {/* Cover Art */}
                          <div className="relative w-full sm:w-32 h-32 rounded-[18px] overflow-hidden shrink-0 shadow-lg border border-white/10 group-hover:shadow-xl transition-all">
                            <img src={podcast.cover} alt={podcast.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            {/* Play Button Overlay */}
                            <div className={cn(
                              "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300",
                              isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}>
                              <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                                isPlaying 
                                  ? "bg-gradient-to-br from-[#10B981] to-[#34D399] text-black scale-95 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                                  : "bg-white/20 text-white backdrop-blur-md border border-white/30 scale-100"
                              )}>
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                              </div>
                            </div>
                            {isPlaying && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div className="h-full bg-[#10B981] shadow-[0_0_10px_#10B981]" style={{ width: '45%' }} />
                              </div>
                            )}
                          </div>

                          {/* Podcast Info */}
                          <div className="flex-1 min-w-0 space-y-3 py-2 z-10 w-full">
                            <div className="flex items-center justify-between w-full">
                              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 px-2.5 py-1 rounded-md border border-white/5", podcast.accent)}>
                                {podcast.host}
                              </span>
                              <div className="flex items-center gap-3 text-slate-500">
                                {podcast.progress > 0 && !isPlaying && (
                                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{podcast.progress}% Played</span>
                                )}
                                <span className="flex items-center gap-1.5 text-[10px] font-bold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                  <Clock className="w-3 h-3" />
                                  {podcast.duration}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="text-xl font-black text-white tracking-tight truncate group-hover:text-[#34D399] transition-colors">
                                {podcast.title}
                              </h3>
                              <p className="text-[13px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                                {podcast.excerpt}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              {podcast.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Interactive Sound Wave Animation */}
                          {isPlaying && (
                            <div className="hidden lg:flex items-center gap-1 h-12 ml-4 opacity-80 shrink-0 z-10 pr-4">
                              {[...Array(6)].map((_, i) => (
                                <div 
                                  key={i} 
                                  className={cn("w-1.5 rounded-full", podcast.accent.replace('text-', 'bg-'))}
                                  style={{ 
                                    height: `${Math.max(30, Math.random() * 100)}%`,
                                    animation: `pulse ${0.4 + Math.random()}s infinite alternate ease-in-out` 
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Persistent Mini Player (Only visible when something is playing) */}
                  {playingId && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 animate-in slide-in-from-bottom-12 fade-in duration-500">
                      <div className="bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex items-center justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[#10B981]/10">
                        {(() => {
                          const activePod = PODCASTS.find(p => p.id === playingId);
                          if (!activePod) return null;
                          return (
                            <>
                              <div className="flex items-center gap-4 min-w-0 flex-1">
                                <img src={activePod.cover} alt={activePod.title} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                                <div className="min-w-0 pr-4">
                                  <h4 className="text-sm font-black text-white truncate">{activePod.title}</h4>
                                  <span className={cn("text-[9px] font-bold uppercase tracking-widest", activePod.accent)}>{activePod.host}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-center gap-4 flex-1">
                                <button className="text-slate-400 hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
                                <button 
                                  onClick={() => togglePlay(activePod.id)}
                                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                >
                                  <Pause className="w-4 h-4 fill-current" />
                                </button>
                                <button className="text-slate-400 hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
                              </div>

                              <div className="flex items-center justify-end gap-3 flex-1">
                                <Volume2 className="w-4 h-4 text-slate-400" />
                                <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                  <div className="w-2/3 h-full bg-[#10B981]" />
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
