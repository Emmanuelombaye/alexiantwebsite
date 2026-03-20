"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import type { BlogPost } from "@/data/blog-posts";
import { AdminImageUploader } from "./admin-image-uploader";

type BlogSection = {
  id: string;
  subtitle: string;
  content: string;
};

type AdminBlogFormProps = {
  mode: "create" | "edit";
  initialPost?: BlogPost;
};

export function AdminBlogForm({ mode, initialPost }: AdminBlogFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  
  // Images State (Max 3)
  const [images, setImages] = useState<string[]>(initialPost?.images || []);
  
  // Composition State
  const initialSections: BlogSection[] = initialPost?.content 
    ? parseHtmlToSections(initialPost.content) 
    : [{ id: "1", subtitle: "", content: "" }];
    
  const [sections, setSections] = useState<BlogSection[]>(initialSections);

  function parseHtmlToSections(html: string): BlogSection[] {
    // Simple parser for existing HTML posts
    const div = document.createElement('div');
    div.innerHTML = html;
    const sections: BlogSection[] = [];
    
    let currentSection: BlogSection | null = null;
    
    Array.from(div.children).forEach((child, idx) => {
      if (child.tagName === 'H2' || child.tagName === 'H3') {
        if (currentSection) sections.push(currentSection);
        currentSection = { id: String(idx), subtitle: child.textContent || "", content: "" };
      } else {
        if (!currentSection) currentSection = { id: String(idx), subtitle: "", content: "" };
        currentSection.content += child.outerHTML;
      }
    });
    
    if (currentSection) sections.push(currentSection);
    return sections.length > 0 ? sections : [{ id: "1", subtitle: "", content: html }];
  }

  function generateHtml() {
    return sections.map(s => {
      const sub = s.subtitle ? `<h3>${s.subtitle}</h3>` : "";
      const body = s.content.split('\n').filter(p => p.trim()).map(p => {
        if (p.trim().startsWith('<')) return p; // Already HTML
        return `<p>${p.trim()}</p>`;
      }).join('');
      return `${sub}${body}`;
    }).join('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      excerpt: String(formData.get("excerpt") || ""),
      content: generateHtml(),
      category: String(formData.get("category") || "Market Report"),
      images: images,
      author: String(formData.get("author") || "Alexiant Advisor"),
      published: formData.get("published") === "on",
      date: initialPost?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    try {
      const endpoint = mode === "edit" && initialPost?.id ? `/api/admin/blog/${initialPost.id}` : "/api/admin/blog";
      const method = mode === "edit" && initialPost?.id ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message || "Failed to save blog post.");
      }
      
      setStatus("success");
      setMessage("Article published successfully.");
      
      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 1000);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Failed to save blog post.");
    }
  }

  const addSection = () => {
    setSections([...sections, { id: String(Date.now()), subtitle: "", content: "" }]);
  };

  const updateSection = (id: string, field: keyof BlogSection, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* CORE IDENTITY */}
          <section className="card-surface p-8 space-y-8">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-8 w-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">🖋️</span>
               <h2 className="text-lg font-bold text-slate-900">Article Identity</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
               <div>
                 <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mb-2 block text-traced">Article Title</label>
                 <input 
                   name="title" 
                   required 
                   defaultValue={initialPost?.title} 
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-900 focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                   placeholder="e.g. Diani Market Insights 2026"
                 />
               </div>
               <div>
                 <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mb-2 block text-traced">Slug (URL Path)</label>
                 <input 
                   name="slug" 
                   required 
                   defaultValue={initialPost?.slug} 
                   className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 font-mono text-xs text-slate-500 focus:ring-2 focus:ring-[#D4AF37] outline-none" 
                   placeholder="diani-market-insights-2026"
                 />
               </div>
            </div>

            <div>
              <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mb-2 block text-traced">Short Hook / Excerpt</label>
              <textarea 
                name="excerpt" 
                required 
                rows={2}
                defaultValue={initialPost?.excerpt} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-600 focus:ring-2 focus:ring-[#D4AF37] outline-none resize-none" 
                placeholder="A compelling 1-2 sentence summary for the listing cards..."
              />
            </div>
          </section>

          {/* COMPOSITION ENGINE */}
          <section className="card-surface p-8 space-y-8">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-4">
                  <span className="h-8 w-8 rounded-xl bg-[#046A38]/10 flex items-center justify-center text-[#046A38]">📖</span>
                  <h2 className="text-lg font-bold text-slate-900">Article Composition</h2>
               </div>
               <span className="text-[0.6rem] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">Non-IT Friendly Mode</span>
            </div>

            <div className="space-y-12">
               {sections.map((section, index) => (
                 <div key={section.id} className="relative group">
                    <div className="absolute -left-12 top-0 text-[0.6rem] font-black text-slate-200 group-hover:text-[#D4AF37] transition-colors pt-4">
                       SECTION {(index + 1).toString().padStart(2, '0')}
                    </div>
                    
                    <div className="space-y-4 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative shadow-sm">
                       {sections.length > 1 && (
                         <button 
                           type="button" 
                           onClick={() => removeSection(section.id)}
                           className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white border border-slate-100 text-rose-500 flex items-center justify-center shadow-lg hover:bg-rose-50 transition-colors"
                         >✕</button>
                       )}
                       
                       <input 
                         value={section.subtitle}
                         onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
                         placeholder="Sub-title (Optional)"
                         className="w-full bg-transparent text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 focus:border-[#D4AF37] outline-none"
                       />
                       
                       <textarea 
                         value={section.content}
                         onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                         placeholder="Write your paragraphs here. Use simple text, the system will arrange it professionally."
                         rows={6}
                         className="w-full bg-transparent text-slate-600 leading-relaxed font-serif text-lg focus:ring-0 outline-none resize-none"
                       />
                    </div>
                 </div>
               ))}
            </div>

            <button 
              type="button"
              onClick={addSection}
              className="w-full py-6 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-[0.65rem] hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
            >
              + Add New Composition Block
            </button>
          </section>
        </div>

        {/* SIDEBAR ASSETS */}
        <aside className="space-y-8">
          <section className="card-surface p-8 space-y-8">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-8 w-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">🖼️</span>
               <h2 className="text-lg font-bold text-slate-900">Article Gallery</h2>
            </div>

            <div>
               <label className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 mb-4 block">Visual Assets (Max 3)</label>
               <AdminImageUploader 
                 maxImages={3}
                 currentCount={images.length}
                 onUploaded={(url) => setImages([...images, url])}
               />
            </div>

            {images.length > 0 && (
               <div className="grid gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-100">
                       <img src={img} alt="" className="w-full h-full object-cover" />
                       <button 
                         type="button" 
                         onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                         className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                       >✕</button>
                    </div>
                  ))}
               </div>
            )}
          </section>

          <section className="card-surface p-8 space-y-6">
            <div>
               <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Publication Strategy</label>
               <select name="category" defaultValue={initialPost?.category || "Market Report"} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#D4AF37] outline-none">
                 <option>Market Report</option>
                 <option>Investment Guide</option>
                 <option>Lifestyle</option>
                 <option>Legal Advisory</option>
               </select>
            </div>

            <div>
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Author Identity</label>
              <input 
                name="author" 
                required 
                defaultValue={initialPost?.author || "Alexiant Advisor"} 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#D4AF37] outline-none" 
              />
            </div>

            <div className="pt-6 border-t border-slate-50">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                     <input 
                       name="published" 
                       type="checkbox" 
                       defaultChecked={initialPost?.published} 
                       className="sr-only peer"
                     />
                     <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#046A38] transition-colors"></div>
                     <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-600 group-hover:text-slate-900">Live on website</span>
               </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full h-16 rounded-[2rem] bg-[#046A38] text-white font-display text-sm font-black uppercase tracking-[0.2em] transition hover:opacity-90 shadow-[0_20px_40px_rgba(4,106,56,0.15)] disabled:opacity-50"
          >
            {status === "submitting" ? "Archiving..." : mode === "create" ? "Launch Article" : "Save Changes"}
          </button>

          {message && (
            <div className={`p-4 rounded-2xl text-center text-[0.65rem] font-black uppercase tracking-widest border ${
              status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
            }`}>
              {message}
            </div>
          )}
        </aside>
      </div>
    </form>
  );
}
