"use client";

import React, { useState } from "react";
import { 
  Calendar,
  ArrowRight,
  Sparkles,
  Hourglass,
  CheckCircle2,
  Lock,
  Layers,
  Wrench,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkSidebar } from "@/components/layout/WorkSidebar";

export default function WeeklyReviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [showRequestSuccess, setShowRequestSuccess] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowRequestSuccess(true);
      setRequestText("");
      setTimeout(() => setShowRequestSuccess(false), 4000);
    }, 1200);
  };

  const triggerEarlyAccess = () => {
    setRequestText("Requesting Early Access to Weekly Review AI-powered reflection module. Blueprint secured: ");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-sage/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Responsive Grid System: Sidebar on Left, Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Dedicated Work Sidebar Navigation - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          {/* Right Column: Main Store Space (9 Cols) */}
          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">Weekly Review</h1>
                <p className="text-muted-foreground text-sm font-medium">AI-powered weekly reflection and performance analysis.</p>
              </div>
            </header>

            {/* Main Interactive Screen with Glassmorphic In-Development Shield */}
            <div className="relative rounded-[32px] border border-border/80 bg-black/45 p-8 md:p-12 min-h-[400px] flex flex-col justify-between overflow-hidden group">
              
              {/* Glassmorphic In-Development Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-black/80 backdrop-blur-[6px] border border-white/5 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.2)] animate-pulse">
                  <Hourglass className="w-6 h-6 animate-spin [animation-duration:4s]" />
                </div>
                
                <div className="space-y-2 max-w-lg">
                  <span className="text-xs font-black text-blue-450 uppercase tracking-[0.25em] block">
                    Audit Engine In Development
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">AI Weekly Review Coming Soon</h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-semibold px-4">
                    Our team is compiling a cognitive performance auditing engine. Be the first to try when compiled.
                  </p>
                </div>

                <Button 
                  onClick={triggerEarlyAccess}
                  className="px-8 h-12 bg-blue-500 hover:bg-blue-600 text-white font-extrabold uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                >
                  Request Early Access
                </Button>
              </div>

              {/* FAKED UNDERLYING LAYOUT (Visually gorgeous but blurred and inactive) */}
              <div className="space-y-6 filter blur-[2px] opacity-20 select-none pointer-events-none w-full">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Weekly Audit #{i}</span>
                      <p className="text-lg font-black text-white">Score: 92% Sovereignty</p>
                    </div>
                  ))}
                </div>
                <div className="h-44 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center">
                  <span className="text-slate-500 font-mono text-xs">AI Auditing Narrative & Feedback Block</span>
                </div>
              </div>

            </div>

            {/* --- Highly Prominent Glassmorphic Request Custom Tool Card --- */}
            <div className="relative rounded-[32px] overflow-hidden border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.03] via-slate-950/40 to-black/90 backdrop-blur-2xl p-8 md:p-10 group shadow-[0_0_60px_rgba(0,0,0,0.85)]">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                
                {/* Text Block */}
                <div className="space-y-3.5 max-w-xl text-left">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-450 border border-emerald-500/20">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold text-emerald-450 uppercase tracking-widest">Co-Forge the Platform</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none">
                    Request Similar Feature
                  </h2>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-semibold">
                    Have an idea for a feature that would help you forge stronger? Our team is building the arsenal. Submit your request and we’ll consider it for future development.
                  </p>
                </div>

                {/* Form & Button Block */}
                <div className="w-full lg:w-88 space-y-3 shrink-0">
                  {showRequestSuccess ? (
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-in zoom-in-95">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-white">Directive Submitted</p>
                      <p className="text-[10px] text-slate-450 leading-normal">Our engineering team has received your custom feature blueprint.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestSubmit} className="space-y-3">
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          placeholder="Describe your ideal weekly audit feature..."
                          value={requestText}
                          onChange={(e) => setRequestText(e.target.value)}
                          required
                          className="w-full h-12 bg-black/60 border border-white/5 focus:border-emerald-500/35 rounded-xl pl-4 pr-10 text-xs text-white placeholder:text-slate-650 outline-none transition-all font-semibold"
                        />
                        <Send className="w-4 h-4 text-slate-600 absolute right-3 pointer-events-none" />
                      </div>
                      <Button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-background font-extrabold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                      >
                        {isSubmitting ? "Transmitting..." : "Submit Custom Blueprint"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </form>
                  )}
                </div>

              </div>
            </div>

          </main>

        </div>

      </div>
    </div>
  );
}
