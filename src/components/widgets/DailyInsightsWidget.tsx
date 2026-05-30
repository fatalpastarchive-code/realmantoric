import React, { useState } from "react";
import { BookOpen, ExternalLink, Hash, X, Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSIGHTS = [
  {
    category: "Stoicism",
    title: "The Art of Negative Visualization",
    summary: "How ancient Stoics used premeditatio malorum to build unshakable mental resilience.",
    source: "Daily Stoic",
    readTime: "4m",
    icon: Sparkles
  },
  {
    category: "Mindset",
    title: "Neuroplasticity in High Performers",
    summary: "Recent research shows how specific cognitive load increases neural density in CEOs.",
    source: "Nature Neuroscience",
    readTime: "6m",
    icon: Hash
  },
  {
    category: "Finance",
    title: "Asymmetric Risk in Digital Assets",
    summary: "Understanding the balance between extreme volatility and unprecedented growth potential.",
    source: "The Block",
    readTime: "5m",
    icon: ExternalLink
  },
  {
    category: "Discipline",
    title: "The 4-Hour Focus Protocol",
    summary: "Implementing strict deep work boundaries to double your daily output.",
    source: "Cal Newport",
    readTime: "3m",
    icon: BookOpen
  }
];

export function DailyInsightsWidget() {
  const [selectedInsight, setSelectedInsight] = useState<typeof INSIGHTS[0] | null>(null);

  return (
    <>
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-[40px] p-8 md:p-10 space-y-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Intelligence Feed</h3>
            <h2 className="text-2xl font-black text-white tracking-tight">Daily Curated <span className="text-white/40">Insights</span></h2>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
            <BookOpen className="w-5 h-5 text-white/40" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSIGHTS.map((item, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedInsight(item)}
              className="group relative p-6 rounded-3xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Hash className="w-3 h-3 text-white/20" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.category}</span>
                </div>
                <span className="text-[9px] font-bold text-white/20">{item.readTime} read</span>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400/80 transition-colors">{item.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed mb-6 font-medium line-clamp-2">
                {item.summary}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.03]">
                <span className="text-[10px] font-bold text-white/20 italic">{item.source}</span>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Read More <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full h-14 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white hover:bg-white/5 transition-all">
          Explore the Intelligence Vault
        </Button>
      </div>

      {/* Detail Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-500">
          <div 
            className="absolute inset-0 bg-[#050505]/60 backdrop-blur-xl cursor-crosshair" 
            onClick={() => setSelectedInsight(null)}
          />
          <div className="relative w-full max-w-2xl bg-[#0c0c0c]/80 border border-white/10 rounded-[48px] p-12 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-500 backdrop-blur-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <selectedInsight.icon className="w-5 h-5 text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60">{selectedInsight.category}</span>
                </div>
                <button 
                  onClick={() => setSelectedInsight(null)}
                  className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                  {selectedInsight.title}
                </h2>
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Source: {selectedInsight.source}</span>
                  <div className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{selectedInsight.readTime} read</span>
                </div>
              </div>

              <div className="space-y-6 text-white/60 text-lg leading-relaxed font-medium italic border-l-2 border-emerald-500/20 pl-8 py-2">
                <p>{selectedInsight.summary}</p>
                <p className="not-italic text-white/40">
                  Full article content would be synthesized here. This curated insight is designed to provide maximum strategic value with minimal cognitive load.
                </p>
              </div>

              <div className="pt-8">
                <Button className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">
                  Full Strategic Briefing <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
