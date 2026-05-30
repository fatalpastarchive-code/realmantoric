"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Plus, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoListWidget() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Persist state
  useEffect(() => {
    const saved = localStorage.getItem("mantoric-todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    } else {
      // Default initial tasks
      setTodos([
        { id: "1", text: "Establish daily focus protocol", completed: false },
        { id: "2", text: "Calibrate tactical dashboard", completed: true },
        { id: "3", text: "Perform 90m deep work session", completed: false },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mantoric-todos", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTodos(prev => [...prev, newTodo]);
    setInputValue("");
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      {/* Task List */}
      <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar max-h-[300px]">
        {todos.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-white/[0.03] rounded-[32px]">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/5 italic">No active directives</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div 
              key={todo.id}
              className="group/item flex items-center gap-5 p-5 rounded-[24px] bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 shadow-sm"
            >
              <GripVertical className="w-4 h-4 text-white/5 group-hover/item:text-white/20 cursor-grab" />
              <button 
                onClick={() => toggleTodo(todo.id)} 
                className="transition-all duration-300 active:scale-90"
              >
                {todo.completed ? (
                  <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="w-4.5 h-4.5 text-black" />
                  </div>
                ) : (
                  <div className="h-7 w-7 rounded-lg border-2 border-white/10 hover:border-white/30 flex items-center justify-center" />
                )}
              </button>
              <span className={cn(
                "flex-1 text-[15px] font-bold tracking-tight transition-all duration-500",
                todo.completed ? "text-white/15 line-through" : "text-white/80 group-hover/item:text-white"
              )}>
                {todo.text}
              </span>
              <button 
                onClick={() => removeTodo(todo.id)}
                className="opacity-0 group-hover/item:opacity-100 p-2 rounded-lg text-white/10 hover:text-red-500 hover:bg-red-500/5 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={addTodo} className="relative group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Declare new directive..."
          className="w-full h-16 bg-[#0A0A0A] border border-white/[0.08] rounded-[22px] px-6 pr-16 text-sm font-bold text-white placeholder:text-white/5 focus:outline-none focus:border-emerald-500/30 focus:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-700"
        />
        <button 
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-3 top-3 h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-0 disabled:scale-90"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
