"use client";

import React from "react";
import { 
  CheckCircle2, 
  XCircle, 
  User, 
  Clock, 
  ShieldCheck,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { approveApplication, denyApplication } from "@/lib/actions/applications";

const MOCK_APPLICATIONS = [
  {
    id: "user_2pX...",
    username: "User_8292",
    age: "28",
    klan: "ShadowForge",
    date: "2024-05-09",
    motivation: "I have been practicing deep work for over two years. I want to push my cognitive limits and be part of a community that focuses on truth and excellence. Stoicism is at the core of my life, and I am seeking a sanctuary to sharpen my discipline...",
    status: "pending"
  },
  {
    id: "user_2pY...",
    username: "User_1102",
    age: "34",
    klan: "IronForge",
    date: "2024-05-08",
    motivation: "Discipline is my middle name. I want to build a lasting legacy. As iron sharpens iron, community sharpens the will. I am here to take my physical and mental resilience to the next level.",
    status: "pending"
  }
];

export default function AdminApplicationsPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-40">
      <div className="container mx-auto px-8 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-[0.3em]">
              <ShieldCheck className="w-4 h-4" /> High Council Access
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white">
              Vetting <span className="text-white/20">Chamber.</span>
            </h1>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[32px] text-right min-w-[200px]">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Beta Capacity</span>
            <div className="text-3xl font-black text-white mt-1">12 / 40</div>
            <div className="h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-white w-[30%]" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
          <input 
            type="text" 
            placeholder="Search by ID or Klan..." 
            className="w-full h-16 bg-white/[0.02] border border-white/5 rounded-2xl pl-16 pr-8 text-white font-medium focus:outline-none focus:border-white/20 transition-all"
          />
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {MOCK_APPLICATIONS.map((app) => (
            <div key={app.id} className="group relative bg-white/[0.02] border border-white/[0.05] rounded-[40px] p-10 transition-all hover:bg-white/[0.03] hover:border-white/10">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* User Info Sidebar */}
                <div className="w-full lg:w-72 space-y-8 shrink-0 lg:border-r lg:border-white/[0.03] lg:pr-12">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 shadow-2xl">
                      <User className="w-6 h-6 text-white/40" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-white tracking-tight">{app.username}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{app.id}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase">Age</span>
                      <div className="text-sm font-bold text-white/60">{app.age}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase">Clan</span>
                      <div className="text-sm font-bold text-emerald-500/80">{app.klan}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest pt-4">
                    <Clock className="w-4 h-4" /> {app.date}
                  </div>
                </div>

                {/* Motivation Content */}
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Motivation Statement</div>
                    <p className="text-xl text-white/70 leading-relaxed font-medium italic serif">
                      "{app.motivation}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-6">
                    <Button 
                      onClick={() => approveApplication(app.id, app.klan)}
                      className="h-14 px-10 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Approve Access
                    </Button>
                    <Button 
                      onClick={() => denyApplication(app.id, "Inadequate depth in motivation.")}
                      variant="ghost" 
                      className="h-14 px-8 rounded-2xl bg-red-500/5 text-red-500/40 border border-red-500/10 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 hover:text-red-500 transition-all"
                    >
                      <XCircle className="w-4 h-4 mr-2" /> Deny Entry
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
