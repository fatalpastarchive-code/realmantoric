"use client";

import React from "react";
import { Bell, Info, Zap, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "System Message",
    desc: "Your deep work session was successfully recorded.",
    icon: Zap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    time: "2m ago"
  },
  {
    id: "2",
    title: "Clan Alert",
    desc: "ShadowForge clan ranks #01 globally.",
    icon: Shield,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    time: "45m ago"
  },
  {
    id: "3",
    title: "New Intelligence",
    desc: "Daily curated insights added to the library.",
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    time: "2h ago"
  }
];

export function NotificationDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all outline-none"
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-96 mt-4 p-4 bg-[#161616] border-white/[0.08] rounded-[36px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="flex items-center justify-between px-4 py-4 mb-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">Intelligence Feed</h3>
          <button className="text-[9px] font-black uppercase tracking-widest text-emerald-500/60 hover:text-emerald-500 transition-colors">
            Mark all as read
          </button>
        </div>

        <div className="space-y-2">
          {NOTIFICATIONS.map((notif) => (
            <DropdownMenuItem 
              key={notif.id}
              className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 focus:bg-white/[0.03] focus:text-white border border-transparent focus:border-white/5 group cursor-pointer outline-none"
            >
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner", notif.bg)}>
                <notif.icon className={cn("w-5 h-5", notif.color)} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-black uppercase tracking-widest text-white/80 group-focus:text-white">{notif.title}</p>
                  <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">{notif.time}</span>
                </div>
                <p className="text-xs text-white/30 leading-relaxed group-focus:text-white/60">{notif.desc}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.04] px-2">
          <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-white/[0.03] transition-all group">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">See All Notifications</span>
            <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/30" />
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
