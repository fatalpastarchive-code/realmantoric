"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostCard, PostType } from "@/components/social/PostCard";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Send, Globe, Users, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Combined mock posts database
const ALL_POSTS = [
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
    type: "image" as PostType,
    title: "Clean workspace, clear mind.",
    content: "My minimalist setup for today's deep work session. No distractions, just pure focus and consistent strategic execution.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop",
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
  },
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
    link: "https://github.com/ddd-crew/domain-driven-design-cheat-sheet",
    timestamp: "12 hours ago",
    metrics: { supportCount: 68, commentCount: 3 }
  }
];

// Initial mock comments
const INITIAL_COMMENTS: Record<string, Array<{ id: string; author: string; avatar: string; text: string; timestamp: string }>> = {
  post_1: [
    { id: "c1", author: "Stoic_Sage", avatar: "https://i.pravatar.cc/150?u=sage", text: "I completely agree. The person who can discipline their morning routine can manage the rest of the day.", timestamp: "1 hour ago" },
    { id: "c2", author: "Acumen_Architect", avatar: "https://i.pravatar.cc/150?u=architect", text: "As Marcus Aurelius said in Meditations: 'When you arise in the morning, think of what a precious privilege it is to be alive.'", timestamp: "45 mins ago" }
  ],
  post_2: [
    { id: "c3", author: "Marcus_Aurelius", avatar: "https://i.pravatar.cc/150?u=marcus", text: "The relationship between minimalism and mental clarity is invaluable. Great workspace.", timestamp: "2 hours ago" }
  ],
  post_3: [
    { id: "c4", author: "Iron_Will", avatar: "https://i.pravatar.cc/150?u=will", text: "I stay completely offline one day a week. It's the best method to reset mental fatigue.", timestamp: "5 hours ago" },
    { id: "c5", author: "Seneca_Younger", avatar: "https://i.pravatar.cc/150?u=seneca", text: "Turning off notifications completely should be the first step to not waste our time.", timestamp: "3 hours ago" }
  ],
};

export default function PostDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("For You");

  // Find post details or fallback to post_1
  const post = ALL_POSTS.find(p => p.id === id) || ALL_POSTS[0];

  // Load comments
  const [comments, setComments] = useState<any[]>(INITIAL_COMMENTS[post.id] || []);
  const [newCommentText, setNewCommentText] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author: "Thinker (You)",
      avatar: "https://i.pravatar.cc/150?u=user",
      text: newCommentText.trim(),
      timestamp: "Now"
    };

    setComments(prev => [newComment, ...prev]);
    setNewCommentText("");
  };

  // Sidebar mock handles
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    router.push("/social/feed");
  };

  const communities = [
    { id: "stoic", name: "Stoic Philosophy", members: "18.4k" },
    { id: "habits", name: "Habit Tracking", members: "12.1k" },
    { id: "engineering", name: "Software Design", members: "9.5k" }
  ];

  return (
    <div className="theme-social-feed min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-[1550px] w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Unified 3-column system matching main feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Sidebar Navigation */}
          <div className="lg:col-span-3 xl:col-span-2">
            <DashboardSidebar 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange} 
            />
          </div>

          {/* Center Column: Post details & comments */}
          <main className="lg:col-span-6 xl:col-span-8 space-y-6">
            
            {/* Header / Back Action */}
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <Button 
                onClick={() => router.push("/social/feed")}
                variant="ghost"
                className="h-10 px-3.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer transition-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Feed</span>
              </Button>
            </div>

            {/* Post Card Rendered Static */}
            <PostCard {...post} />

            {/* Comments Section */}
            <div className="soft-card space-y-6 bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <MessageSquare className="w-5 h-5 text-[#34D399]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Thoughts & Comments</h3>
                <span className="text-xs text-slate-500 font-semibold bg-white/5 px-2.5 py-0.5 rounded-full">
                  {comments.length} comments
                </span>
              </div>

              {/* Add Comment Box */}
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <textarea
                  placeholder="Add an honest and sincere comment to this post..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-[#10B981]/30 focus:bg-black/60 min-h-[90px] resize-none transition-none font-medium"
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="h-10 px-5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#34D399] hover:to-[#22D3EE] text-black font-extrabold text-xs transition-none shadow-md shadow-[#10B981]/15 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </Button>
                </div>
              </form>

              {/* Comments Stream */}
              <div className="space-y-4 pt-2">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="flex gap-4 p-4 rounded-xl bg-black/25 border border-white/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-secondary/50 overflow-hidden border border-white/10 shrink-0 shadow-md">
                        <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-200">{comment.author}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{comment.timestamp}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500 text-xs font-medium">
                    No comments yet. Start the conversation!
                  </div>
                )}
              </div>

            </div>

          </main>

          {/* Right Column: Active Communities Catalog */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-6">
            
            <div className="soft-card space-y-5 bg-gradient-to-b from-[#121212] to-[#0D0D0D] border-white/10 rounded-2xl shadow-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Focus Hubs</h3>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-2 pt-1">
                {communities.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white/5 transition-none">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-300 group-hover:text-[#34D399] transition-colors truncate">{sub.name}</p>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">{sub.members} members</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#34D399] group-hover:translate-x-0.5 transition-none shrink-0" />
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full h-10 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white uppercase tracking-wider hover:bg-white/10 hover:border-[#10B981]/30 transition-none cursor-pointer">
                Browse All Hubs
              </Button>
            </div>

            <div className="soft-card bg-gradient-to-b from-[#10B981]/5 to-transparent border-[#10B981]/15 space-y-4 text-center rounded-2xl shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 flex items-center justify-center mx-auto border border-[#10B981]/25">
                <Plus className="w-5 h-5 text-[#34D399]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Create a New Hub</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed px-1">Start deep conversations by creating a new room for topics you are interested in.</p>
              </div>
              <Button className="w-full h-10 rounded-xl bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#34D399] hover:to-[#22D3EE] text-black font-extrabold text-xs transition-none shadow-md shadow-[#10B981]/15 cursor-pointer">
                Create Room
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
