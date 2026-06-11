"use client";

import React from "react";
import { 
  User, 
  Shield, 
  Bell, 
  EyeOff, 
  Trash2, 
  Zap,
  ChevronRight,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ProfileSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1">
        <h3 className="text-xl font-black text-white tracking-tight">System Configuration</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Manage your sovereign identity</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Identity Settings */}
        <Card className="bg-black/40 border-white/5 p-8 rounded-[32px] space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Identity</h4>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Username (Pseudonym)</Label>
              <div className="flex gap-3">
                <Input defaultValue="Aurelius_Forge" className="bg-white/5 border-white/5 rounded-xl h-12 px-5" />
                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 px-6 text-xs font-bold">Update</Button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between group cursor-pointer hover:bg-blue-500/10 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Current Clan: Iron Legion</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Change cost: 500 Elite Points</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="bg-black/40 border-white/5 p-8 rounded-[32px] space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Preferences</h4>
          </div>

          <div className="space-y-3">
            {[
              { label: "Elite Performance Notifications", icon: Bell, checked: true },
              { label: "Deep Work Reminders", icon: Zap, checked: true },
              { label: "Incognito Forge Mode", icon: EyeOff, checked: false },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03]">
                <div className="flex items-center gap-3">
                  <pref.icon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-white">{pref.label}</span>
                </div>
                <div className={cn(
                  "w-10 h-5 rounded-full relative transition-colors cursor-pointer",
                  pref.checked ? "bg-primary" : "bg-white/10"
                )}>
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all",
                    pref.checked ? "left-5.5" : "left-0.5"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-red-500/5 border-red-500/10 p-8 rounded-[32px] space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h4 className="text-xs font-black text-red-500 uppercase tracking-[0.2em]">Danger Zone</h4>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-white">Erase Identity</p>
              <p className="text-xs font-medium text-slate-500">Permanently delete all forge records and clan associations.</p>
            </div>
            <Button variant="destructive" className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl h-11 px-6 text-xs font-black uppercase tracking-widest">
              Purge Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
