"use client";

import { useState } from "react";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "./animated-section";
import type { BlogPost } from "@/data/blog-posts";
import { motion, AnimatePresence } from "framer-motion";

type BlogListClientProps = {
  posts: BlogPost[];
};

const CATEGORIES = ["All", "Market Report", "Investment Guide", "Lifestyle", "Legal Advisory"];

export function BlogListClient({ posts }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="space-y-20">
      {/* ─── EXECUTIVE FILTER BAR ─── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-slate-50 pb-12">
         <div className="max-w-xl">
            <span className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-5 block">Editorial Archive</span>
            <h3 className="font-display text-4xl md:text-5xl font-semibold text-[#022c22] italic tracking-tight">Market Perspectives</h3>
            <p className="text-slate-500 mt-5 text-lg font-medium italic opacity-70 leading-relaxed">Curated intelligence from the frontier of coastal investment.</p>
         </div>
         
         <div className="flex gap-4 flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-8 py-3.5 rounded-full text-[0.6rem] font-black uppercase tracking-[0.25em] transition-all duration-500 relative overflow-hidden group border
                    ${isActive 
                      ? "text-white border-[#046A38] shadow-[0_15px_30px_rgba(4,106,56,0.15)]" 
                      : "text-slate-400 hover:text-slate-900 bg-white shadow-sm border-slate-100 hover:border-[#D4AF37]/50"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="active-cat-bg"
                      className="absolute inset-0 bg-[#046A38] z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
         </div>
      </div>

      {/* ─── FILTERED GRID ─── */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <StaggerItem key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 p-3 shadow-xl shadow-slate-200/10 hover:border-[#D4AF37]/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                    {/* Image Container with Luxury Crop */}
                    <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-8 bg-slate-50 ring-1 ring-slate-100 group-hover:ring-[#D4AF37]/30 transition-all duration-700">
                       <img src={post.images?.[0] || "/demo-media/blog/post-1.jpg"} alt={post.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       
                       {/* Absolute Badge */}
                       <div className="absolute top-6 left-6">
                          <div className="bg-white/95 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full shadow-lg">
                             <span className="text-[#022c22] text-[0.5rem] font-black uppercase tracking-[0.25em]">
                                {post.category}
                             </span>
                          </div>
                       </div>
                    </div>

                    <div className="px-5 pb-6 flex-1 flex flex-col">
                       <div className="flex items-center gap-4 mb-5">
                          <div className="h-[1px] w-6 bg-[#D4AF37]/30" />
                          <p className="text-[0.55rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]/80">{post.date}</p>
                       </div>
                       <h4 className="font-display text-xl font-semibold text-[#022c22] group-hover:text-[#046A38] transition-colors mb-4 leading-tight italic tracking-tight">
                          {post.title}
                       </h4>
                       <p className="text-slate-500 text-[0.85rem] line-clamp-2 leading-relaxed font-light mb-8 italic opacity-70">
                          {post.excerpt}
                       </p>

                       {/* Bottom Interactive Link */}
                       <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-400 group-hover:text-[#046A38] transition-colors relative">
                             View Insight
                             <span className="absolute -bottom-1.5 left-0 h-[1px] w-full scale-x-0 bg-[#D4AF37] transition-transform group-hover:scale-x-100 origin-left" />
                          </span>
                          <div className="h-9 w-9 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#046A38] group-hover:border-[#046A38] transition-all duration-500">
                             <svg className="h-3.5 w-3.5 text-slate-300 group-hover:text-white transition-all transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                             </svg>
                          </div>
                       </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {filteredPosts.length === 0 && (
              <div className="py-32 text-center">
                 <div className="text-[#D4AF37]/20 text-6xl mb-6 italic font-display leading-none">Archives Empty</div>
                 <p className="text-slate-400 font-display italic text-xl">No curated insights currently available in the <span className="text-[#046A38] font-bold not-italic font-sans text-sm uppercase tracking-widest">{activeCategory}</span> vault.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
