"use client";

import React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  Zap, 
  CreditCard, 
  Smartphone,
  ChevronRight,
  LogOut,
  Palette,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const sections = [
    {
      title: "Account",
      items: [
        { name: "Profile Info", desc: "Name, avatar, and identity", icon: User },
        { name: "Security", desc: "Password and authentication", icon: Shield },
      ]
    },
    {
      title: "Preferences",
      items: [
        { name: "Notifications", desc: "Alerts and updates", icon: Bell },
        { name: "Focus Mode", desc: "Deep work settings", icon: Zap },
        { name: "Appearance", desc: "Theme and colors", icon: Palette },
      ]
    },
    {
      title: "Subscription",
      items: [
        { name: "Billing", desc: "Plan management", icon: CreditCard },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Settings</h1>
          <p className="text-slate-400 font-medium">Manage your account and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-2">{section.title}</h3>
                <div className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <button 
                      key={i}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:bg-white/5 hover:border-white/10 transition-all text-left group cursor-pointer"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#121212] border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#10B981] group-hover:border-[#10B981]/30 transition-all shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium truncate">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-8">
            <div className="soft-card bg-[#121212] border border-white/5 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-4 max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 text-slate-400">
                  <Eye className="w-8 h-8 opacity-50" />
                </div>
                <h2 className="text-xl font-black text-white">Select a Setting</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Choose a category from the left menu to view and update your configurations.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
