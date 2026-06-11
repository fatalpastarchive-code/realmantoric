"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="bg-background h-screen w-full flex flex-col items-center justify-center overflow-hidden selection:bg-sage selection:text-background">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-sage/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-16 animate-in fade-in zoom-in duration-1000 ease-out">
        


        {/* Cinematic Branding */}
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="relative">
            <h1 className="text-[15vw] sm:text-[90px] md:text-[140px] font-black tracking-[-0.06em] leading-[0.8] text-white">
              Mantoric
            </h1>
            <div className="absolute -top-6 -right-6 md:-right-12">
              <span className="text-sage text-4xl md:text-6xl opacity-30 font-serif italic">®</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg md:text-xl font-medium tracking-[0.3em] text-white/40 uppercase">
              Digital <span className="text-sage italic">Gentlemen's</span> Club
            </p>

          </div>
        </div>

        {/* Strategic Call to Action */}
        <div className="pt-8">
          {!isLoaded ? (
            <div className="h-24 w-72 rounded-3xl bg-white/5 animate-pulse" />
          ) : isSignedIn ? (
            <Link href="/home">
              <Button className="h-16 sm:h-20 px-10 sm:px-16 rounded-[2.5rem] bg-sage text-background font-bold text-lg sm:text-xl hover:scale-[1.05] active:scale-95 transition-all duration-700 shadow-2xl shadow-sage/10 border-none group overflow-hidden relative">
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-background transition-colors">ENTER CLUB</span>
                <ArrowRight className="ml-4 w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-3 transition-all" />
              </Button>
            </Link>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/home">
              <Button className="h-16 sm:h-20 px-10 sm:px-16 rounded-[2.5rem] bg-white text-background font-bold text-lg sm:text-xl hover:scale-[1.05] active:scale-95 transition-all duration-700 shadow-2xl shadow-black/50 border-none group overflow-hidden relative">
                <div className="absolute inset-0 bg-sage translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-background transition-colors">ENTER</span>
                <ArrowRight className="ml-4 w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:translate-x-3 transition-all" />
              </Button>
            </SignInButton>
          )}
        </div>
        

      </div>

    </div>
  );
}

