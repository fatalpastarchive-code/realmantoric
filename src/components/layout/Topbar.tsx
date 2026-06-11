"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Zap, 
  Search, 
  Bell, 
  Menu,
  X,
  Target,
  Lock,
  ShieldAlert,
  Calendar,
  BookOpen,
  Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/layout/ProfileDropdown";
import { Logo } from "@/components/layout/Logo";

const NAV_ITEMS = [
  { label: "Social", href: "/social/feed", icon: Users },
  { label: "Home", href: "/home", icon: Home },
  { label: "Work", href: "/work", icon: Zap },
];

export function Topbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If on work pages, we can render the workspace quick links inside the mobile menu
  const isWorkArea = pathname.startsWith("/work");
  const workWorkspaceItems = [
    { label: "Sanctum Work", href: "/work", icon: Target },
    { label: "Private Workspace", href: "/work/private", icon: Lock },
    { label: "The Vault", href: "/work/vault", icon: BookOpen },
    { label: "Arsenal Store", href: "/work/arsenal", icon: ShieldAlert },
    { label: "Deep Sessions", href: "/work/deep-sessions", icon: Zap },
    { label: "Weekly Review", href: "/work/weekly-review", icon: Calendar },
  ];

  const THEMES = ["default", "emerald", "steel", "void"];
  const cycleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme") || "default";
    const currentIndex = THEMES.indexOf(current);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("mantoric-theme", nextTheme);
    // Dispatch custom event so ProfileDropdown syncs if needed
    window.dispatchEvent(new Event("theme-changed"));
  };

  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 max-w-[1550px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/home" className="flex items-center z-50 transition-none">
          <Logo />
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="absolute left-1/2 hidden md:flex -translate-x-1/2 items-center gap-1 rounded-2xl bg-secondary/30 p-1 border border-border/50">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop & Action Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/30 border border-border/50 focus-within:border-primary/30">
            <Search className="h-4 w-4 text-muted-foreground focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-muted-foreground w-24 focus:w-32"
            />
          </div>

          <div className="flex items-center gap-2">
            
            {/* Quick Theme Switcher */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={cycleTheme}
              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5"
            >
              <Palette className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>
            
            <div className="h-6 w-[1px] bg-border mx-1 hidden md:block" />
            
            {/* Integrated Profile & Dynamic Theme Switcher Dropdown */}
            <div className="hidden md:block">
              <ProfileDropdown />
            </div>
            
            {/* Responsive Hamburger Toggle Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden h-10 w-10 rounded-xl text-muted-foreground hover:text-white z-50"
            >
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

      </div>

      {/* --- Responsive Collapsible Mobile Menu Drawer --- */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden flex flex-col p-6 pt-28 space-y-8 overflow-y-auto">
          
          {/* Main Navigation Modules */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em]">Main Modules</span>
              <ProfileDropdown />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border text-center",
                      isActive 
                        ? "bg-primary/10 border-primary/30 text-primary" 
                        : "bg-white/[0.02] border-white/5 text-slate-400"
                    )}
                  >
                    <item.icon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-bold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Nested Work Workspace Sidebar (Collapsible into Menu) */}
          {isWorkArea && (
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.25em] px-3">Work Workspace</span>
              <nav className="space-y-1.5">
                {workWorkspaceItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all",
                        isActive 
                          ? "bg-primary/10 text-primary border-primary/10" 
                          : "bg-white/[0.01] border-transparent text-slate-400 hover:text-white"
                      )}
                    >
                      <item.icon className="w-4.5 h-4.5" />
                      <span className="text-sm font-bold">{item.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

        </div>
      )}

      </header>

      {/* --- Mobile Bottom Navigation --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-[72px] bg-[#0A0A0A]/90 backdrop-blur-2xl border-t border-white/5 px-2 pb-safe shadow-[0_-20px_40px_rgba(0,0,0,0.4)]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-full gap-1 transition-all",
                isActive ? "text-primary" : "text-muted-foreground hover:text-slate-300"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-300",
                isActive ? "bg-primary/15" : "bg-transparent"
              )}>
                <item.icon className={cn("h-5 w-5", isActive ? "fill-primary/20" : "")} />
              </div>
              <span className={cn("text-[9px] font-bold tracking-wider", isActive ? "text-primary" : "hidden")}>
                {item.label}
              </span>
            </Link>
          );
        })}
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-full gap-1 transition-all",
            isMobileOpen ? "text-primary" : "text-muted-foreground hover:text-slate-300"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-xl transition-all duration-300",
            isMobileOpen ? "bg-primary/15" : "bg-transparent"
          )}>
            {isMobileOpen ? <X className="h-5 w-5 fill-primary/20" /> : <Menu className="h-5 w-5" />}
          </div>
          <span className={cn("text-[9px] font-bold tracking-wider", isMobileOpen ? "text-primary" : "hidden")}>
            Menu
          </span>
        </button>
      </nav>
    </>
  );
}