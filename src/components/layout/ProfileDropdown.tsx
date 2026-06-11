"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User, Settings, LogOut, Palette, ChevronDown, Check } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const THEMES = [
  { id: "default", name: "Onyx", primary: "#FFFFFF", desc: "Pure B&W" },
  { id: "emerald", name: "Emerald", primary: "#10B981", desc: "Green Accent" },
  { id: "steel", name: "Steel", primary: "#60A5FA", desc: "Blue Accent" },
  { id: "void", name: "Void", primary: "#F4F4F5", desc: "Zero Color" },
];

export function ProfileDropdown() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("default");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mantoric-theme") || "default";
    setActiveTheme(savedTheme);
    
    const handleThemeChange = () => {
      setActiveTheme(localStorage.getItem("mantoric-theme") || "default");
    };
    window.addEventListener("theme-changed", handleThemeChange);
    return () => window.removeEventListener("theme-changed", handleThemeChange);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changeTheme = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem("mantoric-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  if (!isLoaded) {
    return (
      <div className="w-8 h-8 rounded-full bg-secondary/30 animate-pulse border border-border/30" />
    );
  }

  const avatarUrl = user?.imageUrl || null;
  const fullName = user?.fullName || "Honorable Friend";
  const email = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-secondary/30 border border-transparent hover:border-border/30 transition-all cursor-pointer group focus:outline-none"
      >
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={fullName} 
            className="w-8 h-8 rounded-full border border-primary/20 object-cover shadow-sm group-hover:border-primary/50 transition-colors"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-all">
            <User className="w-4 h-4" />
          </div>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors hidden sm:block" />
      </button>

      {/* Dropdown Container */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-popover border border-border/50 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-[100] overflow-hidden">
          
          {/* User Info Header */}
          <div className="p-4.5 bg-secondary/25 border-b border-border/30 flex items-center gap-3">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className="w-10 h-10 rounded-full border border-primary/20 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border/30 flex items-center justify-center text-muted-foreground">
                <User className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground truncate leading-snug">{fullName}</h4>
              <p className="text-[10px] text-muted-foreground truncate leading-none mt-0.5">{email}</p>
            </div>
          </div>

          {/* Theme Switcher Sub-section */}
          <div className="px-4.5 py-3.5 border-b border-border/30 bg-secondary/5">
            <div className="flex items-center gap-2 mb-2.5">
              <Palette className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Theme Selection</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {THEMES.map((theme) => {
                const isActive = activeTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => changeTheme(theme.id)}
                    className={cn(
                      "flex flex-col items-start p-2 rounded-xl border text-left transition-all duration-300 cursor-pointer select-none relative group/btn",
                      isActive
                        ? "bg-primary/10 border-primary/40 text-primary shadow-sm shadow-primary/5"
                        : "bg-secondary/20 border-border/20 text-muted-foreground hover:bg-secondary/40 hover:border-border/40 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-white/10 shrink-0 transition-transform group-hover/btn:scale-110" 
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span className="text-[10px] font-bold truncate leading-none">{theme.name}</span>
                      {isActive && <Check className="w-3 h-3 text-primary ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Options */}
          <div className="p-1.5 space-y-0.5 border-b border-border/30">
            <Link 
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200"
            >
              <User className="w-4 h-4 text-muted-foreground" />
              <span>My Profile</span>
            </Link>
            <Link 
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Sign Out Trigger */}
          <div className="p-1.5">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 cursor-pointer select-none text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
