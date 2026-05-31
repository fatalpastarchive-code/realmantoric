"use client";

import React from "react";
import { 
  Users, 
  Activity, 
  MessageSquare, 
  Plus, 
  ChevronRight,
  Globe,
  Radio,
  BookOpen,
  Heart,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SocialSidebar() {
  const categories = [
    { label: "All Feed", icon: Globe, active: true },
    { label: "Popular", icon: Activity, active: false },
    { label: "Following", icon: Users, active: false },
    { label: "Q&A", icon: MessageSquare, active: false },
  ];

  const communities = [
    { id: "learning", name: "Language Learning", members: "12k" },
    { id: "habits", name: "Habit Tracking", members: "8k" },
    { id: "books", name: "Book Club", members: "5.4k" },
    { id: "experience", name: "Shared Experience", members: "15k" },
  ];

  return (
    <aside className="space-y-8 animate-fade-in">
      
      {/* Navigation */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-4">Navigate</h3>
        <nav className="space-y-1">
          {categories.map((item, i) => (
            <div key={i} className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all group",
              item.active ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}>
              <item.icon className={cn("w-4 h-4", item.active ? "text-accent" : "text-muted-foreground")} />
              <span className="text-sm font-semibold">{item.label}</span>
              {item.active && <div className="ml-auto w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />}
            </div>
          ))}
        </nav>
      </div>

      {/* Communities */}
      <div className="soft-card space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Communities</h3>
          <Users className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          {communities.map((sub, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div>
                <p className="text-sm font-bold text-white group-hover:text-accent transition-colors">t/{sub.name}</p>
                <p className="text-[10px] text-muted-foreground">{sub.members} members</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-all" />
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full h-11 rounded-xl bg-white/5 border border-border text-[11px] font-bold text-white hover:bg-accent hover:text-black transition-all">
          See All
        </Button>
      </div>

      {/* Create Community Call to Action */}
      <div className="soft-card bg-accent/5 border-accent/10 space-y-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
          <Plus className="w-6 h-6 text-accent" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Create Your Community</h4>
          <p className="text-[11px] text-muted-foreground px-2">Create a dedicated space for your interests and share your experiences.</p>
        </div>
        <Button className="w-full h-11 rounded-xl bg-accent text-black font-bold text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all">
          Create Community
        </Button>
      </div>

    </aside>
  );
}
