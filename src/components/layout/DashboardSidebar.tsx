"use client";

import React from "react";
import { 
  Sparkles, 
  Heart, 
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function DashboardSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const pathname = usePathname();
  const filterItems = [
    { label: "For You", icon: Sparkles, href: "/social/feed" },
    { label: "Following", icon: Heart, href: "/social/feed" },
    { label: "Trending", icon: TrendingUp, href: "/social/feed" },
  ];

  return (
    <aside className="space-y-8 pr-2">
      
      {/* Filters/Feed Section */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 px-4">Feed Filters</h3>
        <nav className="space-y-1.5">
          {filterItems.map((item) => {
            const isSelected = activeSection === item.label;
            return (
              <div
                key={item.label}
                onClick={() => onSectionChange?.(item.label)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group border border-transparent select-none",
                  isSelected
                    ? "bg-primary/15 text-primary border-primary/20 shadow-sm shadow-primary/5" 
                    : "text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/10"
                )}
              >
                <item.icon className={cn("w-4.5 h-4.5 transition-transform group-hover:scale-105", isSelected ? "text-primary" : "text-slate-500 group-hover:text-primary")} />
                <span className="text-sm font-bold tracking-tight">{item.label}</span>
                {isSelected && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Member Signature Capsule */}
      <div className="soft-card bg-secondary/10 border-border/40 p-6 space-y-4 rounded-3xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-500" />
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-[0.15em] select-none">
          <ShieldAlert className="w-3.5 h-3.5" />
          Community
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
          "A sanctuary of honest and sincere shared experiences, where we grow together."
        </p>
        <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest pt-2 border-t border-border/30">
          <span>Mutual Growth</span>
          <ArrowUpRight className="w-3 h-3 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>

    </aside>
  );
}
