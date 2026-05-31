"use client";

import React, { useState, useEffect } from "react";
import { PostCard, PostType } from "@/components/social/PostCard";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search,
  Zap,
  PenLine,
  MessageCircleQuestion,
  ChevronRight,
  Users,
  Globe,
  Radio,
  Sparkles,
  Heart,
  Activity,
  Compass,
  Link as LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const INITIAL_POSTS = [
  {
    id: "post_1",
    author: {
      name: "Marcus_Aurelius",
      avatar: "https://i.pravatar.cc/150?u=marcus"
    },
    sub: { id: "stoic", name: "Stoic Philosophy" },
    type: "text" as PostType,
    title: "Consistency is the true foundation of growth",
    content: "It's not what you do once in a while, it's what you do every single day. A fortress is built brick by brick. My morning routine has become my sanctuary.",
    timestamp: "2 hours ago",
    metrics: { supportCount: 245, commentCount: 12 }
  },
  {
    id: "post_2",
    author: {
      name: "Iron_Will",
      avatar: "https://i.pravatar.cc/150?u=will"
    },
    sub: { id: "habits", name: "Habit Tracking" },
    type: "text" as PostType,
    title: "Clean workspace, clear mind.",
    content: "My minimalist setup for today's deep work session. No distractions, just pure focus and consistent strategic execution.",
    timestamp: "4 hours ago",
    metrics: { supportCount: 120, commentCount: 8 }
  },
  {
    id: "post_3",
    author: {
      name: "Stoic_Sage",
      avatar: "https://i.pravatar.cc/150?u=sage"
    },
    sub: { id: "experience", name: "Life Lessons" },
    type: "question" as PostType,
    title: "How do you deal with digital burnout?",
    content: "I've been feeling overwhelmed by constant connectivity lately. What are your best strategies for a digital detox without losing professional momentum?",
    timestamp: "6 hours ago",
    metrics: { supportCount: 85, commentCount: 42 }
  }
];

const MORE_DUMMY_POSTS = [
  {
    id: "post_4",
    author: {
      name: "Seneca_Younger",
      avatar: "https://i.pravatar.cc/150?u=seneca"
    },
    sub: { id: "stoic", name: "Stoic Philosophy" },
    type: "text" as PostType,
    title: "On the Shortness of Life",
    content: "It is not that we have a short time to live, but that we waste a lot of it. The disciplined man keeps his focus on what truly matters and ignores ephemeral noise.",
    timestamp: "9 hours ago",
    metrics: { supportCount: 312, commentCount: 19 }
  },
  {
    id: "post_5",
    author: {
      name: "Acumen_Architect",
      avatar: "https://i.pravatar.cc/150?u=architect"
    },
    sub: { id: "engineering", name: "Software Design" },
    type: "link" as PostType,
    title: "Tactical Domain-Driven Architecture Guidelines",
    content: "Check out these modern architectural patterns focused on strict code maintainability and high scalability under high concurrency.",
    timestamp: "12 hours ago",
    metrics: { supportCount: 68, commentCount: 3 },
    link: "https://github.com/ddd-crew/domain-driven-design-cheat-sheet"
  }
];

export default function SocialFeedPage() {
  const [activeSection, setActiveSection] = useState("For You");
  const [posts, setPosts] = useState<any[]>(INITIAL_POSTS);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postLink, setPostLink] = useState("");
  const [postType, setPostType] = useState<PostType>("text");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Communities catalog mock list
  const communities = [
    { id: "stoic", name: "Stoic Philosophy", members: "18.4k" },
    { id: "learning", name: "Language Learning", members: "12k" },
    { id: "habits", name: "Habit Tracking", members: "8.5k" },
    { id: "books", name: "Book Club", members: "5.4k" },
    { id: "experience", name: "Shared Experience", members: "15.1k" },
  ];

  // Load posts filter simulation
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    // Reset/filter mock logic
    if (section === "Trending") {
      setPosts([...INITIAL_POSTS].sort((a, b) => b.metrics.supportCount - a.metrics.supportCount));
    } else if (section === "Following") {
      setPosts(INITIAL_POSTS.filter(p => p.author.name !== "Stoic_Sage"));
    } else {
      setPosts(INITIAL_POSTS);
    }
  };

  // Submit Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: `post_${Date.now()}`,
      author: {
        name: "Honorable_Member",
        avatar: "https://i.pravatar.cc/150?u=honorable"
      },
      sub: { id: "general", name: "General Assembly" },
      type: postType,
      title: postTitle.trim() || undefined,
      content: postText.trim(),
      timestamp: "Just now",
      metrics: { supportCount: 1, commentCount: 0 },
      ...(postType === "link" && postLink && { link: postLink })
    };

    setPosts([newPost, ...posts]);
    setPostText("");
    setPostTitle("");
    setPostLink("");
    setIsAddingPost(false);
  };

  // Infinite Scroll Trigger
  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    setTimeout(() => {
      setPosts(prev => [...prev, ...MORE_DUMMY_POSTS]);
      setIsLoadingMore(false);
      setHasMore(false); // only 1 batch of mock pagination
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-2 sticky top-[5.5rem] self-start space-y-6">
            <DashboardSidebar 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange} 
            />
          </aside>

          {/* Main Feed Area - Scrollable */}
          <main className="lg:col-span-7 space-y-8">
            {/* ── Hero Banner ─────────────────────────────────────────────── */}
            <header className="relative w-full rounded-3xl overflow-hidden border border-white/5 bg-[#121212] shadow-2xl mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-[#10B981]/10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#22D3EE]/[0.05] to-transparent pointer-events-none" />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                <Globe className="w-48 h-48 text-[#10B981] stroke-[1]" />
              </div>

              <div className="relative z-10 p-8 md:p-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#10B981]/20 to-[#22D3EE]/20 border border-[#10B981]/30 text-[#34D399] text-[10px] font-black uppercase tracking-widest select-none shadow-lg shadow-[#10B981]/10 mb-5">
                  <Radio className="w-4 h-4" />
                  Community · Network
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-slate-100 to-[#10B981] bg-clip-text text-transparent leading-none mb-4">
                  Social Feed
                </h1>
                <p className="text-slate-400 text-base md:text-lg font-medium max-w-xl leading-relaxed">
                  A shared space for honest and sincere experiences. Pure interaction away from the noise.
                </p>
              </div>
            </header>

            {/* Premium Creative Quick Post Box */}
            {!isAddingPost ? (
              <div 
                onClick={() => setIsAddingPost(true)}
                className="mb-10 cursor-pointer group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/10 to-[#22D3EE]/10 rounded-[28px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative soft-card flex items-center gap-5 p-4 rounded-[28px] bg-gradient-to-b from-[#161616] to-[#121212] border border-white/5 hover:border-[#10B981]/30 transition-all duration-300 shadow-xl">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center shrink-0 border border-[#10B981]/50 group-hover:scale-[1.05] group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-[#10B981]/20">
                    <Sparkles className="w-6 h-6 text-black fill-black/20" />
                  </div>
                  <div className="flex-1 bg-black/50 border border-white/5 rounded-2xl px-6 py-4.5 text-slate-400 text-[15px] font-semibold select-none group-hover:bg-black/70 group-hover:text-slate-300 transition-all duration-300">
                    What's on your mind or what are you working on today?
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="mb-10 space-y-6 soft-card bg-gradient-to-br from-[#161616] to-[#101010] rounded-[28px] p-8 border border-[#10B981]/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981]/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#10B981]/20 flex items-center justify-center border border-[#10B981]/30">
                        <PenLine className="w-4 h-4 text-[#34D399]" />
                      </div>
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">New Post</span>
                    </div>
                    <div className="flex gap-2 bg-black/50 p-1.5 border border-white/5 rounded-xl">
                      {(["text", "question", "link"] as PostType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPostType(type)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer select-none",
                            postType === type 
                              ? "bg-gradient-to-r from-[#10B981] to-[#34D399] text-black shadow-lg shadow-[#10B981]/20" 
                              : "text-slate-500 hover:text-white hover:bg-white/5"
                          )}
                        >
                          {type === "text" ? "Text" : type === "question" ? "Question" : "Link"}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {postType === "question" && (
                    <input
                      type="text"
                      placeholder="What is your question or main idea?"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white placeholder:text-slate-600 outline-none focus:border-[#10B981]/50 focus:ring-1 focus:ring-[#10B981]/50 transition-all font-bold shadow-inner"
                    />
                  )}
                  {postType === "link" && (
                    <input
                      type="text"
                      placeholder="https://example.com"
                      value={postLink}
                      onChange={(e) => setPostLink(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-6 py-4 text-base text-[#22D3EE] placeholder:text-slate-600 outline-none focus:border-[#22D3EE]/50 focus:ring-1 focus:ring-[#22D3EE]/50 transition-all font-semibold shadow-inner"
                    />
                  )}
                  <textarea 
                    placeholder={postType === "link" ? "What do you think about this link?" : postType === "question" ? "What is your detailed question?" : "Pour out your thoughts..."}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-base text-slate-200 placeholder:text-slate-600 outline-none focus:border-[#10B981]/50 focus:ring-1 focus:ring-[#10B981]/50 min-h-[160px] resize-none transition-all font-medium leading-relaxed shadow-inner"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 relative z-10">
                  <Button 
                    type="button"
                    variant="ghost" 
                    onClick={() => setIsAddingPost(false)}
                    className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white h-12 px-6 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={!postText.trim() || (postType === "link" && !postLink.trim())}
                    className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#34D399] hover:to-[#22D3EE] text-black font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-[#10B981]/25 disabled:opacity-30 cursor-pointer hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Post
                  </Button>
                </div>
              </form>
            )}

            {/* Infinite Stream of Post Cards */}
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  id={post.id}
                  author={post.author}
                  sub={post.sub}
                  type={post.type}
                  title={post.title}
                  content={post.content}
                  timestamp={post.timestamp}
                  metrics={post.metrics}
                  link={post.link}
                />
              ))}
            </div>

            {/* Infinite Scroll Trigger Button */}
            {hasMore ? (
              <div className="flex items-center justify-center pt-8 pb-12">
                <Button 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  variant="outline"
                  className="h-12 w-[240px] max-w-full rounded-xl border-white/5 bg-[#121212] hover:bg-[#1a1a1a] hover:border-[#10B981]/30 text-slate-400 hover:text-white font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  {isLoadingMore ? "Loading posts..." : "Load Previous Posts"}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center py-12 text-[12px] font-bold text-slate-500 uppercase tracking-widest border-t border-white/5 text-center">
                You have read all posts for now. Start a new conversation by sharing your thoughts.
              </div>
            )}
          </main>

          {/* Right Sidebar - Sticky */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-[5.5rem] self-start space-y-8">
            <div className="relative soft-card overflow-hidden bg-[#121212] border border-white/5 p-7 rounded-[32px] shadow-2xl">
              <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-[#10B981]/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Compass className="w-4 h-4 text-[#34D399]" />
                  </div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-white">Communities</h3>
                </div>
                
                <div className="space-y-3">
                  {communities.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 group cursor-pointer transition-all border border-transparent hover:border-white/10">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-[#10B981] group-hover:shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-all" />
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold text-slate-300 group-hover:text-white transition-colors truncate tracking-tight">{sub.name}</p>
                          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.1em] mt-0.5">{sub.members} Members</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#34D399] transition-all shrink-0" />
                    </div>
                  ))}
                </div>
                
                <Button variant="ghost" className="w-full mt-4 h-12 rounded-xl bg-black/40 border border-white/5 text-[10px] font-black text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest cursor-pointer">
                  Explore All
                </Button>
              </div>
            </div>

            {/* Premium Call to Action */}
            <div className="soft-card bg-gradient-to-br from-[#10B981]/10 to-transparent border-[#10B981]/20 p-6 rounded-3xl space-y-4 text-center relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#10B981]/10 rounded-full blur-2xl group-hover:bg-[#10B981]/20 transition-all duration-500" />
              <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 flex items-center justify-center mx-auto border border-[#10B981]/30">
                <Plus className="w-6 h-6 text-[#34D399]" />
              </div>
              <div className="space-y-2 relative z-10">
                <h4 className="text-sm font-bold text-white">Create Community</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Create a dedicated space for your interests and share your experiences.</p>
              </div>
              <Button className="w-full h-11 rounded-xl bg-[#10B981] text-black font-bold text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest shadow-lg shadow-[#10B981]/20">
                Create Now
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}