"use client";

import React, { useState, useEffect, useRef } from "react";
import { WorkSidebar } from "@/components/layout/WorkSidebar";
import { 
  Bot,
  Send,
  Sparkles,
  Zap,
  Target,
  ShieldAlert,
  Layers,
  Clock,
  MessageSquare,
  BarChart3,
  BrainCircuit,
  Activity,
  TrendingUp,
  ChevronRight,
  BatteryCharging
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MantoricAIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Greetings. I am Mantoric AI, your personal Stoic coach and performance guide. The mind is a powerful tool when properly disciplined. How can I assist your focus or resolve today?"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I hear you. Remember, we cannot control the external events, but we can control our reaction to them. Focus on the immediate task at hand and execute it with excellence."
        }
      ]);
    }, 1000);
  };

  const quickActions = [
    { label: "Deep Focus Session", icon: Zap },
    { label: "Analyze Yesterday", icon: Target },
    { label: "Stoic Reflection", icon: Sparkles },
    { label: "Clear Mental Fog", icon: ShieldAlert },
  ];

  const pastSessions = [
    { title: "Overcoming Procrastination", date: "Today, 09:00 AM", category: "Mindset" },
    { title: "Weekly Planning & Strategy", date: "Yesterday", category: "Strategy" },
    { title: "Post-Work Decompression", date: "May 24", category: "Reflection" },
    { title: "Deep Work Preparation", date: "May 22", category: "Focus" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-foreground relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Workspace Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Fixed Workspace Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar activePath="/work/mantoric-ai" />
          </aside>

          {/* Center/Main Column: Mantoric AI Hub */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-6 pb-20">
            
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">AI Coaching Hub</h1>
                <p className="text-muted-foreground text-sm font-medium">Your relentless mentor. Navigate through challenges, analyze your performance, and maintain discipline.</p>
              </div>
            </header>

            {/* Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
              
              {/* Left Panel: Past Chats & History */}
              <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 h-full">
                <div className="soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 rounded-2xl shadow-xl p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Session History</h3>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
                    {pastSessions.map((session, i) => (
                      <div 
                        key={i} 
                        className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-bold text-[#34D399] uppercase tracking-wider">{session.category}</span>
                          <span className="text-[8px] text-slate-500 font-semibold">{session.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-300 group-hover:text-white truncate pr-2">{session.title}</h4>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#34D399] opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full mt-4 h-8 text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white border-t border-white/5 pt-2 cursor-pointer transition-none">
                    View All History
                  </Button>
                </div>
              </div>

              {/* Center Panel: Active Chat Interface */}
              <div className="lg:col-span-6 flex flex-col soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 rounded-2xl shadow-xl overflow-hidden h-full relative">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-white/5 bg-black/20 flex justify-between items-center z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-[#34D399]" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#121212]"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">M.A.I Session</h3>
                      <p className="text-[9px] text-[#34D399] uppercase tracking-widest font-bold">Secure connection</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="h-8 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    New Chat
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar relative z-10">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className={cn(
                        "max-w-[85%] flex gap-4",
                        msg.role === "user" ? "flex-row-reverse" : "flex-row"
                      )}>
                        {/* Avatar */}
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                          msg.role === "assistant" 
                            ? "bg-[#10B981]/10 border-[#10B981]/30" 
                            : "bg-white/5 border-white/10"
                        )}>
                          {msg.role === "assistant" ? <Bot className="w-4 h-4 text-[#34D399]" /> : <div className="w-4 h-4 rounded-full bg-white/20" />}
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={cn(
                          "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                          msg.role === "user" 
                            ? "bg-white/5 text-slate-200 border border-white/5 rounded-tr-sm" 
                            : "bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 text-slate-300 border border-[#10B981]/20 rounded-tl-sm"
                        )}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-black/40 z-10 relative">
                  <form onSubmit={handleSend} className="relative flex items-center">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask for guidance, analysis, or protocols..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/40 transition-all font-medium"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim()}
                      className="absolute right-2.5 p-2 rounded-lg bg-gradient-to-r from-[#10B981] to-[#34D399] hover:opacity-90 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-md shadow-[#10B981]/20"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Panel: Personal Analysis & Quick Actions */}
              <div className="lg:col-span-3 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar">
                
                {/* Personal Analysis Card */}
                <div className="soft-card bg-gradient-to-br from-[#121212] to-[#0D0D0D] border-white/10 p-5 rounded-2xl shadow-xl space-y-5">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <BarChart3 className="w-4 h-4 text-[#34D399]" />
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Coach Analysis</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Focus Quality</span>
                        <span className="text-xs font-black text-[#34D399]">92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] w-[92%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stoic Resilience</span>
                        <span className="text-xs font-black text-[#22D3EE]">85%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#22D3EE] w-[85%] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20">
                      <TrendingUp className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-[#34D399] uppercase tracking-wider mb-1">M.A.I Insight</p>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                          Your deep work sessions have improved by 14% this week. Maintain current routines, avoid context-switching.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Protocols */}
                <div className="soft-card bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-5 rounded-2xl shadow-xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <BatteryCharging className="w-4 h-4 text-[#10B981]" />
                    <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">Quick Protocols</h3>
                  </div>
                  <div className="space-y-2">
                    {quickActions.map((action, i) => (
                      <button 
                        key={i}
                        onClick={() => setInput(`Run protocol: ${action.label}`)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-[#10B981]/10 hover:border-[#10B981]/20 text-left transition-colors group cursor-pointer"
                      >
                        <action.icon className="w-4 h-4 text-slate-500 group-hover:text-[#34D399] transition-colors" />
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
