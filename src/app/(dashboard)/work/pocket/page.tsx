"use client";

import React, { useState, useMemo } from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Trash2,
  TrendingUp,
  Activity,
  Calendar,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WorkSidebar } from "@/components/layout/WorkSidebar";

type TransactionType = "income" | "expense";

interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "income", description: "Freelance Project - Web App", amount: 2500, category: "Work", date: "2026-06-01" },
  { id: "2", type: "expense", description: "Software Subscriptions", amount: 140, category: "Software", date: "2026-06-02" },
  { id: "3", type: "expense", description: "Server & Hosting", amount: 65, category: "Infrastructure", date: "2026-06-03" }
];

export default function PocketPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [viewMode, setViewMode] = useState<"Monthly" | "Weekly">("Monthly");
  
  // Form state
  const [newDesc, setNewDesc] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newType, setNewType] = useState<TransactionType>("expense");
  const [newCategory, setNewCategory] = useState("General");
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newAmount) return;

    const tx: Transaction = {
      id: Date.now().toString(),
      type: newType,
      description: newDesc,
      amount: parseFloat(newAmount),
      category: newCategory,
      date: newDate
    };

    setTransactions(prev => [tx, ...prev]);
    setNewDesc("");
    setNewAmount("");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const { totalIncome, totalExpense, netBalance } = useMemo(() => {
    // In a real app, we would filter by viewMode (current week vs current month)
    // For simplicity, we calculate totals over all currently displayed transactions
    const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    };
  }, [transactions, viewMode]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/20 relative">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 sticky top-[5.5rem] self-start">
            <WorkSidebar />
          </aside>

          <main className="col-span-1 lg:col-span-9 xl:col-span-10 space-y-8 pb-20">
            {/* Header */}
            <header className="relative w-full py-4 flex flex-col justify-between min-h-[100px]">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight leading-none">The Pocket</h1>
                <p className="text-muted-foreground text-sm font-medium">Detailed financial oversight. Track every cent, monitor capital flow, and maintain absolute discipline over your treasury.</p>
              </div>
            </header>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="soft-card bg-[#121212] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] group-hover:bg-emerald-500/10 transition-all" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-emerald-400 bg-emerald-500/10 w-fit px-4 py-2 rounded-xl text-sm font-bold">
                    <ArrowUpRight className="w-4 h-4" /> Income
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">${totalIncome.toLocaleString()}</div>
                </div>
              </div>

              <div className="soft-card bg-[#121212] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-[40px] group-hover:bg-red-500/10 transition-all" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-red-400 bg-red-500/10 w-fit px-4 py-2 rounded-xl text-sm font-bold">
                    <ArrowDownRight className="w-4 h-4" /> Expenses
                  </div>
                  <div className="text-4xl font-black text-white tracking-tight">${totalExpense.toLocaleString()}</div>
                </div>
              </div>

              <div className="soft-card bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 rounded-[32px] p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[40px] group-hover:bg-indigo-500/10 transition-all" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-white/50 bg-white/5 w-fit px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest">
                    <TrendingUp className="w-4 h-4" /> Net Capital
                  </div>
                  <div className={cn(
                    "text-5xl font-black tracking-tight",
                    netBalance >= 0 ? "text-emerald-400" : "text-red-400"
                  )}>
                    {netBalance >= 0 ? "+" : ""}${netBalance.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Add Transaction Form */}
              <div className="xl:col-span-1">
                <div className="soft-card bg-[#0A0A0A] border border-white/10 rounded-[32px] p-8 space-y-8">
                  <div className="flex items-center gap-3 text-white border-b border-white/5 pb-4">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-xl font-black tracking-tight">Log Transaction</h3>
                  </div>

                  <form onSubmit={handleAddTransaction} className="space-y-6">
                    <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
                      <button
                        type="button"
                        onClick={() => setNewType("income")}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                          newType === "income" ? "bg-emerald-500/20 text-emerald-400 shadow-lg" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        <ArrowUpRight className="w-4 h-4" /> Income
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewType("expense")}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                          newType === "expense" ? "bg-red-500/20 text-red-400 shadow-lg" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        <ArrowDownRight className="w-4 h-4" /> Expense
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amount ($)</label>
                        <input 
                          type="number" 
                          placeholder="e.g. 150.00"
                          required
                          value={newAmount}
                          onChange={(e) => setNewAmount(e.target.value)}
                          className="w-full h-14 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-2xl px-6 text-lg font-black text-white outline-none transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                        <input 
                          type="text" 
                          placeholder="What was this for?"
                          required
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          className="w-full h-14 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-2xl px-6 text-sm font-bold text-white outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                          <input 
                            type="text" 
                            placeholder="Category"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full h-12 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-sm font-bold text-white outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date</label>
                          <input 
                            type="date" 
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full h-12 bg-black/40 border border-white/10 focus:border-emerald-500/50 rounded-xl px-4 text-sm font-bold text-slate-300 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-2xl bg-white hover:bg-slate-200 text-black font-black uppercase tracking-widest text-xs transition-all shadow-xl">
                      Record Entry
                    </Button>
                  </form>
                </div>
              </div>

              {/* Ledger List */}
              <div className="xl:col-span-2">
                <div className="soft-card bg-[#121212] border border-white/5 rounded-[32px] p-8 h-full flex flex-col">
                  
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-white tracking-tight">Ledger History</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                        <button onClick={() => setViewMode("Monthly")} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", viewMode === "Monthly" ? "bg-white/10 text-white" : "text-slate-500")}>Monthly</button>
                        <button onClick={() => setViewMode("Weekly")} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", viewMode === "Weekly" ? "bg-white/10 text-white" : "text-slate-500")}>Weekly</button>
                      </div>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl border border-white/5 text-slate-400 hover:text-white">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <th className="pb-4 pl-4 w-[40%]">Item</th>
                          <th className="pb-4 w-[20%]">Category</th>
                          <th className="pb-4 w-[20%]">Date</th>
                          <th className="pb-4 text-right pr-4 w-[20%]">Amount</th>
                          <th className="pb-4 w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="py-20 text-center">
                              <div className="flex flex-col items-center gap-4 opacity-30">
                                <Activity className="w-12 h-12" />
                                <span className="text-xs font-black uppercase tracking-widest">No transactions logged</span>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          transactions.map((tx) => (
                            <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                              <td className="py-5 pl-4">
                                <div className="flex items-center gap-4">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                    tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                  )}>
                                    {tx.type === "income" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                  </div>
                                  <span className="text-sm font-bold text-white truncate max-w-[200px]">{tx.description}</span>
                                </div>
                              </td>
                              <td className="py-5">
                                <span className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg text-slate-400">
                                  {tx.category}
                                </span>
                              </td>
                              <td className="py-5">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {tx.date}
                                </div>
                              </td>
                              <td className="py-5 pr-4 text-right">
                                <span className={cn(
                                  "text-lg font-black tracking-tight",
                                  tx.type === "income" ? "text-emerald-400" : "text-white"
                                )}>
                                  {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                              </td>
                              <td className="py-5 text-right">
                                <button 
                                  onClick={() => deleteTransaction(tx.id)}
                                  className="p-2 text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
