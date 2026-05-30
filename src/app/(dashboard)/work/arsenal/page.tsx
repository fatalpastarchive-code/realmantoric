"use client";

import React, { useState } from "react";
import { 
  Layers, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Target,
  ShieldCheck,
  CreditCard,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WorkSidebar } from "@/components/layout/WorkSidebar";

const TRANSACTIONS = [
  { id: 1, type: "income", description: "Freelance Client", amount: 1250, date: "May 28" },
  { id: 2, type: "expense", description: "Software Subscriptions", amount: 120, date: "May 29" },
  { id: 3, type: "expense", description: "Server Costs", amount: 45, date: "May 30" }
];

export default function ArsenalPage() {
  const [stakeGoal, setStakeGoal] = useState("");
  const [stakeAmount, setStakeAmount] = useState(50);
  const [isStaked, setIsStaked] = useState(false);

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stakeGoal) return;
    setIsStaked(true);
  };

  const totalIncome = TRANSACTIONS.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = TRANSACTIONS.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            {/* Header */}
            <header className="relative w-full rounded-[32px] overflow-hidden border border-white/5 bg-[#121212] p-8 md:p-12 flex flex-col justify-between shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-emerald-500/5 pointer-events-none" />
              
              <div className="relative z-10 space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider select-none">
                  <Layers className="w-3.5 h-3.5" />
                  Unlocked Arsenal
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none mt-2">
                  The Arsenal
                </h1>
                <p className="text-slate-400 text-base font-medium mt-4">
                  Your life management toolset. Unlocked and ready for deployment.
                </p>
              </div>
            </header>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Capital / Ledger */}
              <div className="soft-card bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 space-y-8 flex flex-col hover:border-white/20 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">Capital / Ledger</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Financial Planning</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-2xl w-12 h-12 border border-white/5 hover:bg-white/5">
                    <Plus className="w-6 h-6 text-slate-400" />
                  </Button>
                </div>

                <div className="p-8 rounded-[24px] bg-[#121212] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Net Monthly Balance</p>
                    <p className="text-5xl font-black text-white tracking-tight">${netBalance.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold bg-emerald-500/10 px-4 py-2 rounded-xl">
                      <ArrowUpRight className="w-4 h-4" /> +${totalIncome.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-3 text-red-400 text-sm font-bold bg-red-500/10 px-4 py-2 rounded-xl">
                      <ArrowDownRight className="w-4 h-4" /> -${totalExpense.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        <th className="pb-4 pl-2">Description</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4 text-right pr-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSACTIONS.map((tx) => (
                        <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-5 pl-2 text-sm font-bold text-white">{tx.description}</td>
                          <td className="py-5 text-xs font-bold text-slate-500">{tx.date}</td>
                          <td className={cn(
                            "py-5 pr-2 text-base font-black text-right tracking-tight",
                            tx.type === "income" ? "text-emerald-400" : "text-white"
                          )}>
                            {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* The Stake */}
              <div className="soft-card bg-gradient-to-br from-[#121212] to-black border border-indigo-500/20 rounded-[32px] p-8 space-y-8 flex flex-col relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-700" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">The Stake</h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Challenge Yourself</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center">
                  {isStaked ? (
                    <div className="text-center space-y-6 animate-in zoom-in-95 duration-500 bg-indigo-500/5 border border-indigo-500/20 rounded-[24px] p-10">
                      <ShieldCheck className="w-20 h-20 text-indigo-400 mx-auto" />
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white tracking-tight">Stake Locked</h3>
                        <p className="text-slate-400 text-base font-semibold">Your ${stakeAmount} is secured via Stripe.</p>
                      </div>
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mt-8">
                        <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-2">Mission</p>
                        <p className="text-xl font-black text-white leading-tight">{stakeGoal}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleStake} className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Set Your Objective
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. Bu ay şu projeyi bitireceğim" 
                          required
                          value={stakeGoal}
                          onChange={(e) => setStakeGoal(e.target.value)}
                          className="w-full h-16 bg-black/40 border border-white/10 focus:border-indigo-500/50 rounded-2xl px-6 text-base font-bold text-white placeholder:text-slate-600 outline-none transition-all shadow-inner"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          Select Stake Amount
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {[25, 50, 100].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => setStakeAmount(amt)}
                              className={cn(
                                "py-4 rounded-2xl border text-base font-black transition-all",
                                stakeAmount === amt 
                                  ? "bg-indigo-500 text-white border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.3)]" 
                                  : "bg-black/40 border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
                              )}
                            >
                              ${amt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button 
                          type="submit" 
                          className="w-full h-16 rounded-2xl bg-white hover:bg-slate-200 text-black font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3"
                        >
                          <CreditCard className="w-5 h-5" />
                          Lock ${stakeAmount} via Stripe
                        </Button>
                        <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-4">
                          Money is refunded upon verified completion.
                        </p>
                      </div>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
