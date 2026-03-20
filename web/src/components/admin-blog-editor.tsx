"use client";

import { useState, useEffect } from "react";
import { AdminImageUploader } from "./admin-image-uploader";

type BlockType = "h2" | "h3" | "p" | "image" | "link";

type Block = {
  id: string;
  type: BlockType;
  value: string;
  metadata?: {
    url?: string;
    alt?: string;
    linkText?: string;
  };
};

type AdminBlogEditorProps = {
  initialHtml?: string;
  onChange: (html: string) => void;
};

export function AdminBlogEditor({ initialHtml = "", onChange }: AdminBlogEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Parse initial HTML into blocks (very basic parser)
  useEffect(() => {
    if (initialHtml && blocks.length === 0) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = initialHtml;
      const newBlocks: Block[] = [];
      
      Array.from(tempDiv.children).forEach((el, index) => {
        const id = `block-${Date.now()}-${index}`;
        if (el.tagName === "H2") {
          newBlocks.push({ id, type: "h2", value: el.textContent || "" });
        } else if (el.tagName === "H3") {
          newBlocks.push({ id, type: "h3", value: el.textContent || "" });
        } else if (el.tagName === "P") {
          newBlocks.push({ id, type: "p", value: el.textContent || "" });
        } else if (el.tagName === "DIV" && el.querySelector("img")) {
          const img = el.querySelector("img");
          newBlocks.push({ 
            id, 
            type: "image", 
            value: "", 
            metadata: { url: img?.getAttribute("src") || "", alt: img?.getAttribute("alt") || "" } 
          });
        }
        // Add more parsing logic if needed
      });
      
      if (newBlocks.length > 0) {
        setBlocks(newBlocks);
      } else if (initialHtml.trim()) {
        // If not structured, just put it in a paragraph
        setBlocks([{ id: `block-${Date.now()}-0`, type: "p", value: initialHtml }]);
      }
    }
    
    if (!initialHtml && blocks.length === 0) {
       setBlocks([{ id: `block-${Date.now()}-0`, type: "h2", value: "New Article Section" }]);
    }
  }, [initialHtml]);

  useEffect(() => {
    const html = blocks
      .map((block) => {
        if (block.type === "h2") return `<h2>${block.value}</h2>`;
        if (block.type === "h3") return `<h3>${block.value}</h3>`;
        if (block.type === "p") return `<p>${block.value}</p>`;
        if (block.type === "image") {
          return `<div class="blog-image-container"><img src="${block.metadata?.url}" alt="${block.metadata?.alt}" /><p class="image-caption">${block.metadata?.alt}</p></div>`;
        }
        if (block.type === "link") {
           return `<p><a href="${block.metadata?.url}" class="blog-link">${block.metadata?.linkText || block.value}</a></p>`;
        }
        return "";
      })
      .join("\n");
    onChange(html);
  }, [blocks, onChange]);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      value: type === "image" ? "" : "Text here...",
      metadata: type === "image" ? { url: "", alt: "" } : type === "link" ? { url: "", linkText: "" } : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, value: string, metadata?: any) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, value, metadata: { ...b.metadata, ...metadata } } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newBlocks.length) {
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 p-4 bg-slate-900 rounded-3xl sticky top-20 z-10 shadow-xl border border-slate-800">
        <button type="button" onClick={() => addBlock("h2")} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Main Head</button>
        <button type="button" onClick={() => addBlock("h3")} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Sub Head</button>
        <button type="button" onClick={() => addBlock("p")} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Paragraph</button>
        <button type="button" onClick={() => addBlock("image")} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-widest">Add Image</button>
        <button type="button" onClick={() => addBlock("link")} className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Add Link</button>
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="group relative bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => moveBlock(index, "up")} className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">↑</button>
              <button type="button" onClick={() => moveBlock(index, "down")} className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs">↓</button>
            </div>
            
            <div className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity">
               <button type="button" onClick={() => removeBlock(block.id)} className="w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600">×</button>
            </div>

            {block.type === "h2" && (
              <input 
                className="w-full text-3xl font-bold bg-transparent border-none focus:ring-0 placeholder-slate-200"
                placeholder="Main Heading..."
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "h3" && (
              <input 
                className="w-full text-xl font-bold bg-transparent border-none focus:ring-0 placeholder-slate-200 text-[#D4AF37]"
                placeholder="Sub Heading..."
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "p" && (
              <textarea 
                className="w-full text-lg leading-relaxed bg-transparent border-none focus:ring-0 placeholder-slate-200 resize-none font-serif"
                placeholder="Start writing..."
                rows={Math.max(3, block.value.split('\n').length)}
                value={block.value}
                onChange={(e) => updateBlock(block.id, e.target.value)}
              />
            )}

            {block.type === "image" && (
              <div className="space-y-4">
                {block.metadata?.url ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                    <img src={block.metadata.url} className="w-full h-full object-cover" alt="" />
                    <button 
                      type="button" 
                      onClick={() => updateBlock(block.id, block.value, { url: "" })}
                      className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <AdminImageUploader 
                    currentCount={0} 
                    maxImages={1} 
                    onUploaded={(url) => updateBlock(block.id, block.value, { url })}
                  />
                )}
                <input 
                  className="w-full text-sm italic text-slate-500 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-1 focus:ring-amber-500"
                  placeholder="Image SEO Slug / Alt text..."
                  value={block.metadata?.alt}
                  onChange={(e) => updateBlock(block.id, block.value, { alt: e.target.value })}
                />
              </div>
            )}

            {block.type === "link" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                   <label className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-1 block">Link Text</label>
                   <input 
                     className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold"
                     placeholder="Click here..."
                     value={block.metadata?.linkText}
                     onChange={(e) => updateBlock(block.id, block.value, { linkText: e.target.value })}
                   />
                </div>
                <div>
                   <label className="text-[0.6rem] font-bold uppercase tracking-widest text-slate-400 mb-1 block">URL</label>
                   <input 
                     className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-mono"
                     placeholder="https://..."
                     value={block.metadata?.url}
                     onChange={(e) => updateBlock(block.id, block.value, { url: e.target.value })}
                   />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {blocks.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem]">
          <p className="text-slate-400 font-medium">Your masterpiece starts here.</p>
          <button type="button" onClick={() => addBlock("p")} className="mt-4 text-[#D4AF37] font-bold hover:underline">Add your first section</button>
        </div>
      )}
    </div>
  );
}
