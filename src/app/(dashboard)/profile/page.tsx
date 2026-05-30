"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Edit3,
  Users,
  Award,
  Zap,
  LayoutGrid,
  LineChart,
  BookOpen,
  Settings as SettingsIcon,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileOverview } from "@/components/profile/Overview";
import { ProfileProgress } from "@/components/profile/Progress";
import { ProfileJournal } from "@/components/profile/Journal";
import { ProfileSettings } from "@/components/profile/Settings";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

type Tab = "Overview" | "Progress" | "Journal" | "Settings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const tabs = [
    { id: "Overview", icon: LayoutGrid },
    { id: "Progress", icon: LineChart },
    { id: "Journal", icon: BookOpen },
    { id: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <DashboardSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 xl:col-span-10 space-y-8">
            
            {/* Profile Header */}
            <Card className="bg-[#121212] border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
              {/* Cover Pattern */}
              <div className="h-48 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} 
                />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
              </div>

              <div className="px-8 pb-8 -mt-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                    {/* Avatar Mockup */}
                    <div className="w-32 h-32 rounded-[32px] bg-[#161616] border-4 border-[#121212] flex items-center justify-center text-primary shadow-2xl relative group">
                      <Shield className="w-16 h-16" />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black shadow-lg">
                        <Zap className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    <div className="text-center md:text-left space-y-2">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                        <h1 className="text-3xl font-black text-white tracking-tight">Aurelius_Forge</h1>
                        <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          Iron Legion
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <Award className="w-3 h-3" />
                          Tier II
                        </div>
                      </div>
                      <p className="text-sm font-medium text-slate-400 max-w-lg">
                        "The impediment to action advances action. What stands in the way becomes the way." — Disciplining the mind, forging the spirit.
                      </p>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5" />
                          Joined May 2026
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5" />
                          42 Forge Days
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" />
                          The Citadel
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-white/5 hover:bg-white/10 text-white rounded-2xl h-12 px-6 gap-2 border border-white/5 transition-all group">
                    <Edit3 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Edit Profile</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Navigation Tabs */}
            <div className="flex bg-black/40 p-1.5 rounded-[24px] border border-white/5 w-fit">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "flex items-center gap-2.5 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                    activeTab === tab.id 
                      ? "bg-white/10 text-white shadow-xl" 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary" : "text-slate-600")} />
                  {tab.id}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === "Overview" && <ProfileOverview />}
              {activeTab === "Progress" && <ProfileProgress />}
              {activeTab === "Journal" && <ProfileJournal />}
              {activeTab === "Settings" && <ProfileSettings />}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
