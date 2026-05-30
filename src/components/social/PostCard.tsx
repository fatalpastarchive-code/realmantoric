"use client";

import React, { useState } from "react";
import { 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Heart,
  ExternalLink,
  ArrowUpCircle,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export type PostType = "text" | "image" | "question" | "link";

interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  sub?: {
    id: string;
    name: string;
  };
  type: PostType;
  title?: string;
  content: string;
  timestamp: string;
  metrics: {
    supportCount: number;
    commentCount: number;
  };
  image?: string;
  link?: string;
  isSupported?: boolean;
}

export function PostCard({
  id,
  author,
  sub,
  type,
  title,
  content,
  timestamp,
  metrics,
  image,
  link,
  isSupported: initialIsSupported = false,
}: PostCardProps) {
  const [supported, setSupported] = useState(initialIsSupported);
  const [supportCount, setSupportCount] = useState(metrics.supportCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const router = useRouter();

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsReported(true);
    
    // Webhook simulation (Fire and forget)
    try {
      fetch("https://discord.com/api/webhooks/mock-webhook-id/mock-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **New Report**: Post by ${author.name} (${id}) has been flagged as toxic.`
        })
      }).catch(() => {});
    } catch (err) {}

    setTimeout(() => setIsReported(false), 3000);
  };

  const handleSupport = () => {
    setSupported(!supported);
    setSupportCount(prev => supported ? prev - 1 : prev + 1);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") || 
      target.closest("a") || 
      target.closest(".interactive-element")
    ) {
      return;
    }
    router.push(`/social/post/${id}`);
  };

  let hostname = link || "";
  try {
    if (link) {
      hostname = new URL(link).hostname;
    }
  } catch (e) {
    // Fallback to full link
  }

  return (
    <article 
      onClick={handleCardClick}
      className="soft-card p-0 overflow-hidden group relative rounded-[32px] cursor-pointer bg-[#121212] transition-all duration-500 hover:shadow-2xl hover:shadow-[#10B981]/5 border border-white/5 hover:border-[#10B981]/30"
    >
      {/* Background ambient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 via-transparent to-[#22D3EE]/0 group-hover:from-[#10B981]/5 group-hover:to-[#22D3EE]/5 transition-all duration-700 pointer-events-none" />

      <div className="relative z-10 p-7 md:p-9 space-y-6">
        
        {/* Post Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[18px] bg-secondary/50 overflow-hidden border border-white/10 shrink-0 shadow-xl group-hover:border-[#10B981]/30 transition-all duration-300">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="text-[17px] font-black text-white transition-colors group-hover:text-[#34D399] tracking-tight">
                  {author.name}
                </span>
                {sub && (
                  <>
                    <span className="text-slate-700 text-xs select-none">•</span>
                    <span 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="interactive-element px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/25 hover:bg-[#10B981]/20 hover:border-[#10B981]/40 transition-all cursor-pointer shadow-lg shadow-[#10B981]/5"
                    >
                      {sub.name}
                    </span>
                  </>
                )}
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
                {timestamp}
              </span>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
              className="p-2.5 text-slate-500 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/5"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-48 bg-[#151515] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={handleReport}
                  className="w-full px-4 py-2.5 flex items-center gap-2.5 text-left text-[12px] font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Report to Council
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-4 pt-2 relative">
          
          {/* Report Notification */}
          {isReported && (
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[12px] font-bold text-emerald-400 uppercase tracking-wider">Şikayetiniz İletildi</span>
              </div>
            </div>
          )}
          {title && (
            <h2 className={cn(
              "text-xl md:text-2xl font-black text-white leading-snug tracking-tight",
              type === "question" && "text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]"
            )}>
              {type === "question" ? `Question: ${title}` : title}
            </h2>
          )}
          <p className="text-[16px] md:text-[17px] text-slate-300 leading-relaxed font-medium">
            {content}
          </p>
        </div>

        {/* Cinematic Media */}
        {type === "image" && image && (
          <div className="rounded-[24px] overflow-hidden border border-white/10 bg-black/40 shadow-2xl relative max-h-[520px] group-hover:border-white/20 transition-all duration-500">
            <img 
              src={image} 
              alt={title || "Post Image"} 
              className="w-full h-auto object-cover max-h-[520px] group-hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        )}

        {/* Tactical Link Preview */}
        {type === "link" && link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); }}
            className="flex items-center justify-between p-5 rounded-[24px] bg-black/50 border border-white/5 hover:border-[#22D3EE]/40 hover:bg-[#151515] transition-all duration-300 group/link shadow-xl"
          >
            <div className="flex items-center gap-5 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981]/20 to-[#22D3EE]/20 flex items-center justify-center border border-[#22D3EE]/30 shrink-0 shadow-inner group-hover/link:rotate-3 transition-transform">
                <ExternalLink className="w-6 h-6 text-[#22D3EE]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-black text-slate-200 transition-colors truncate group-hover/link:text-white">{hostname}</span>
                <span className="text-[12px] text-slate-500 truncate mt-1 font-bold">{link}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/link:bg-[#22D3EE]/20 group-hover/link:border-[#22D3EE]/40 transition-all shrink-0">
              <Share2 className="w-4 h-4 text-slate-400 group-hover/link:text-[#22D3EE] transition-all" />
            </div>
          </a>
        )}

        {/* Post Actions */}
        <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-slate-400">
          <button 
            onClick={(e) => { e.stopPropagation(); handleSupport(); }}
            className={cn(
              "flex items-center gap-2.5 py-2.5 px-4 rounded-xl transition-all group/btn text-[12px] font-bold uppercase tracking-wider select-none border cursor-pointer",
              supported 
                ? "text-black bg-gradient-to-r from-[#10B981] to-[#34D399] border-transparent shadow-lg shadow-[#10B981]/20" 
                : "border-white/5 hover:text-[#34D399] hover:bg-white/5 hover:border-[#10B981]/30"
            )}
          >
            <Heart className={cn("w-4.5 h-4.5 transition-all", supported ? "fill-black text-black group-hover/btn:scale-110" : "text-slate-400 group-hover/btn:text-[#34D399]")} />
            <span>{supportCount} Supports</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); router.push(`/social/post/${id}`); }}
            className="flex items-center gap-2.5 py-2.5 px-4 rounded-xl border border-white/5 hover:border-[#22D3EE]/30 hover:text-white hover:bg-white/5 transition-all group/btn text-[12px] font-bold uppercase tracking-wider select-none cursor-pointer"
          >
            <MessageCircle className="w-4.5 h-4.5 text-slate-400 group-hover/btn:text-[#22D3EE] transition-colors" />
            <span>{metrics.commentCount} Comments</span>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); }}
            className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl border border-white/5 hover:border-[#10B981]/30 hover:text-white hover:bg-white/5 transition-all group/btn text-[12px] font-bold uppercase tracking-wider select-none ml-auto cursor-pointer"
          >
            <Share2 className="w-4.5 h-4.5 text-slate-400 group-hover/btn:text-[#10B981] transition-colors" />
          </button>
        </div>

      </div>
    </article>
  );
}
