"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/50 py-20 bg-background select-none">
      <div className="container mx-auto px-12 max-w-[1600px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-white tracking-tight leading-none">Mantoric.</h2>
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-sage/80 mt-2">Build the Future</span>
            </div>
          </div>

          <nav className="flex items-center gap-12">
            {[
              { name: "MANIFESTO", href: "/manifesto" },
              { name: "PROTOCOL", href: "/terms" },
              { name: "PRIVACY", href: "/privacy" },
              { name: "STUDIO", href: "/work" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 hover:text-sage transition-all hover:tracking-[0.5em]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6 bg-white/[0.02] border border-white/5 px-6 py-3 rounded-2xl">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold uppercase tracking-widest text-white/10">ESTABLISHED</span>
              <span className="text-[10px] font-bold text-white/40 uppercase">MMXXIV</span>
            </div>
            <div className="h-6 w-[1px] bg-white/5" />
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse shadow-[0_0_10px_rgba(139,168,136,0.6)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-sage">SECURE</span>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/[0.02] flex justify-between items-center">
          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/5">
            © {currentYear} Mantoric Gentlemen's Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">"Vincit qui se vincit"</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

