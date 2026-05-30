"use client";

import React, { useState, useEffect } from "react";
import { 
  Newspaper, 
  RefreshCw, 
  Settings2, 
  Clock,
  Check,
  ChevronDown,
  Maximize2,
  X,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string; // Detailed magazine text
  source: string;
  readTime: string;
  category: string;
}

const DUMMY_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "The Power of Incremental Progress",
    summary: "How small daily wins compound into massive long-term success. Experts share the science behind the 1% rule.",
    content: "The mathematical reality of daily compounding is one of the most powerful tools in a gentleman's arsenal. If you improve by just 1% each day, you will be 37 times better by the end of a single year. Conversely, if you decline by 1% each day, you will drift down almost to zero. Micro-habits form the neurological foundation of high-performance behavior. When you wake up, cold-shower, or complete your Pomodoro sessions, you are not just checking boxes—you are hardwiring discipline. The Stoic perspective on this is clear: Marcus Aurelius reminded himself that a life is built character block by character block. No external force can stop you from laying down one perfect block today.",
    source: "Mindset Daily",
    readTime: "3 min",
    category: "Mindset"
  },
  {
    id: "2",
    title: "The Sovereign Path of Semen Retention",
    summary: "Exploring the physiological and psychological empowerment of seminal energy conservation.",
    content: "Semen retention, or the conscious conservation of masculine life force, is a ancient practice validated by modern endocrinology. By retaining seminal fluid, the body reabsorbs critical zinc, magnesium, and proteins, translating directly into heightened physical vitality, dense muscle synthesis, and sharp cognitive focus. Psychologically, avoiding artificial stimuli allows the brain's dopamine receptors to recover their natural baseline sensitivity. This reset transforms passive observers into active conquerors, fueling ambition and increasing biological presence. In the Stoic tradition, sexual temperance and emotional sovereignty are the bedrock of absolute self-mastery.",
    source: "Discipline Quarterly",
    readTime: "5 min",
    category: "Discipline"
  },
  {
    id: "3",
    title: "Stoic Resilience in Modern Chaos",
    summary: "Reclaiming emotional sovereignty using the dichotomy of control.",
    content: "The modern world is structured to hijack your attention and fragment your focus. Epictetus taught that the root of all mental suffering lies in confusing what is within our control with what is not. Your reputation, the market, the actions of others—these are external. Your judgments, your focus, your immediate efforts—these are yours alone. By establishing a morning routine of silent reflection and a nightly audit of your actions, you build a fortress within your mind that no chaotic event can breach. True sovereignty is the ability to remain unmoved in a storm.",
    source: "Philosophy & Focus",
    readTime: "4 min",
    category: "Mindset"
  },
  {
    id: "4",
    title: "The Science of Deep Cognitive Work",
    summary: "Breakthroughs in neuroplasticity reveal how undistracted focus blocks rewire brain efficiency.",
    content: "Deep work is not a luxury; it is a critical competitive advantage. Neuroscientists have discovered that when an individual concentrates intensely on a single task without distraction, a substance called myelin is wrapped around the neural pathways involved. Myelin acts as an electrical insulator, allowing signals to travel faster and more efficiently. When you fragment your focus with phone notifications or social media feeds, you interrupt this myelination process. Cultivating 90-minute blocks of pure sensory isolation is the fastest path to high-level intellectual mastery.",
    source: "Neuroscience Today",
    readTime: "6 min",
    category: "Technology"
  }
];

const CATEGORIES = ["Mindset", "Discipline", "Technology"];

export function DailyBriefWidget() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Mindset", "Discipline", "Technology"]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(DUMMY_NEWS);
  
  // Expand Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setNews([...DUMMY_NEWS].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 800);
  };

  const filteredNews = news.filter(item => selectedCategories.includes(item.category) || selectedCategories.length === 0);

  return (
    <>
      {/* --- Main Dashboard Featured Widget Panel --- */}
      <section className="soft-card bg-gradient-to-br from-blue-500/[0.03] via-black to-black border-blue-500/10 p-6 md:p-8 space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-[0.02] scale-[3] text-blue-500 pointer-events-none">
          <Newspaper className="w-12 h-12" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Newspaper className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base md:text-lg tracking-tight">Daily Council Intelligence</h3>
              <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Sovereign Briefings</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              className={cn(
                "p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all shrink-0",
                isRefreshing && "animate-spin text-blue-400"
              )}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "p-2 rounded-xl transition-all shrink-0",
                showSettings ? "bg-blue-500/10 text-blue-400" : "text-slate-500 hover:text-white hover:bg-white/5"
              )}
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                setSelectedArticle(filteredNews[0] || null);
                setIsModalOpen(true);
              }}
              className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all shrink-0"
              title="Expand Intelligence Panel"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Settings Block */}
        {showSettings && (
          <div className="bg-slate-950/90 border border-blue-500/10 rounded-2xl p-4 space-y-4 animate-in slide-in-from-top-2">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Select Core Pillars</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border",
                    selectedCategories.includes(cat) 
                      ? "bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.1)]" 
                      : "bg-white/5 border-transparent text-slate-450 hover:text-white"
                  )}
                >
                  {cat}
                  {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Horizontal Scroll Layout on PC / Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredNews.length > 0 ? (
            filteredNews.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                onClick={() => {
                  setSelectedArticle(item);
                  setIsModalOpen(true);
                }}
                className="flex flex-col p-5 rounded-2xl bg-black/40 border border-border/80 hover:border-blue-500/20 hover:bg-white/[0.02] transition-all cursor-pointer group/item relative h-56 justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase tracking-wider border border-blue-500/10">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-200 group-hover/item:text-white transition-colors leading-snug text-sm md:text-base line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-450 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-blue-400 uppercase tracking-widest pt-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <span>Read Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 text-center space-y-3 border border-dashed border-border rounded-2xl bg-black/20">
              <Newspaper className="w-8 h-8 text-slate-700" />
              <p className="text-xs text-slate-500">Select at least one pillar category above.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-border/40 flex justify-between items-center text-xs text-slate-500">
          <span>Updates daily at sunrise</span>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedArticle(filteredNews[0] || null);
              setIsModalOpen(true);
            }}
            className="h-10 text-xs font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-500/5 transition-all group px-4 rounded-xl"
          >
            Expand Intelligence Vault
            <ChevronDown className="ml-2 w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </section>

      {/* --- Expandable backdrop-blur Magazine Modal requested by USER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-2xl overflow-y-auto flex items-start md:items-center justify-center p-0 md:p-6 select-none animate-fade-in">
          
          {/* Inner Panel */}
          <div className="w-full min-h-screen md:min-h-0 md:max-w-5xl md:my-8 bg-gradient-to-br from-blue-500/[0.04] to-black border-none md:border md:border-blue-500/20 p-6 md:p-10 relative flex flex-col gap-8">
            
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Header Title */}
            <div className="space-y-2 shrink-0 border-b border-white/5 pb-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest border border-blue-500/15">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                COUNCIL INTELLIGENCE VAULT
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Expandable Intelligence Briefing</h2>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Compounded masculine knowledge base & daily strategic insights</p>
            </div>

            {/* Double Column Magazine Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
              
              {/* Left Column: Horizontal / Vertical Nav scrollable brief list */}
              <div className="lg:col-span-5 space-y-4 max-h-[450px] overflow-y-auto pr-2 no-scrollbar border-r border-white/5">
                <span className="text-[9px] font-bold text-slate-550 uppercase tracking-widest block px-1">Daily Briefings Stream</span>
                
                {filteredNews.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2.5",
                      selectedArticle?.id === item.id 
                        ? "bg-blue-500/10 border-blue-500/40 text-white" 
                        : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider">
                      <span className="text-blue-400">{item.category}</span>
                      <span className="text-slate-550">{item.readTime}</span>
                    </div>
                    <h4 className="font-bold text-sm leading-snug truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Column: Full Read Content of Selected Article */}
              <div className="lg:col-span-7 flex flex-col justify-between max-h-[450px] overflow-y-auto pr-2 no-scrollbar text-left space-y-6">
                {selectedArticle ? (
                  <>
                    <div className="space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/10">
                          {selectedArticle.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {selectedArticle.readTime} read time
                        </span>
                        <span className="text-xs text-slate-500">— {selectedArticle.source}</span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                        {selectedArticle.title}
                      </h3>

                      {/* Full Magazine Text */}
                      <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                        {selectedArticle.content}
                      </p>
                    </div>

                    {/* Stoic Assurance Card */}
                    <div className="p-4.5 rounded-2xl bg-blue-500/[0.02] border border-blue-500/10 flex items-start gap-3.5 mt-4">
                      <ShieldCheck className="w-5.5 h-5.5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">Sovereignty Checked</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                          This insight is structured to satisfy core Stoic principles. Apply this strategy during your next focus block.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-12">
                    <BookOpen className="w-12 h-12 mb-3 text-slate-700 animate-bounce" />
                    <p className="text-sm">Select an article on the stream to read.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between shrink-0">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">End of Intelligence Feed</span>
              <Button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold uppercase tracking-widest text-xs rounded-xl"
              >
                Return to Sanctuary
              </Button>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
