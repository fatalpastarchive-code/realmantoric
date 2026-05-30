"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Target, 
  Lock, 
  ShieldAlert, 
  Zap, 
  Calendar,
  ArrowUpRight,
  Sparkles,
  Activity,
  Flame,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activePath?: string;
}

export function WorkSidebar({ activePath }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Sanctum Work", href: "/work", icon: Target },
    { label: "Private Workspace", href: "/work/private", icon: Lock },
    { label: "The Vault", href: "/work/vault", icon: BookOpen },
    { label: "Habit Tracker", href: "/work/habits", icon: Flame }, // Added Habit Tracker
    { label: "Arsenal Store", href: "/work/arsenal", icon: ShieldAlert },
    { label: "Deep Sessions", href: "/work/deep-sessions", icon: Zap },
    { label: "Weekly Review", href: "/work/weekly-review", icon: Calendar },
  ];

  return (
    <aside className="space-y-8 pr-2">
      
      {/* Navigation Section */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 px-4">Workspace</h3>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/work" && item.href !== "#" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group border border-transparent",
                  isActive 
                    ? "bg-primary/10 text-primary border-primary/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03] hover:border-white/[0.02]"
                )}
              >
                <item.icon className={cn("w-4.5 h-4.5 transition-transform group-hover:scale-105", isActive ? "text-primary" : "text-slate-400 group-hover:text-white")} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Member Signature Capsule */}
      <div className="soft-card bg-secondary/10 border-border/40 p-6 space-y-4 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.15em] select-none">
          <Sparkles className="w-3.5 h-3.5" />
          Growth Culture
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
          "Great achievements are not reached in a single day, but through patient steps taken every day."
        </p>
        <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest pt-2 border-t border-border/30">
          <span>Focus Point</span>
          <ArrowUpRight className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </aside>
  );
}