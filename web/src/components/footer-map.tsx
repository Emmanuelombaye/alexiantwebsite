"use client";

import { useState } from "react";
import { Maximize2, Minimize2, MapPin } from "lucide-react";

export function FooterMap() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? "h-[75vh]" : "h-[180px] sm:h-[220px]"} bg-slate-100 border-t border-[#D4AF37]/20`}>
      <iframe 
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=-4.322754,39.5580223+(Alexiant%20HQ)&t=&z=15&ie=UTF8&iwloc=B&output=embed" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]"
      />
      
      {/* Overlay Info Badge */}
      <div className={`absolute top-4 left-4 z-10 flex flex-col gap-2 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-90'}`}>
         <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl shadow-black/5 border border-slate-200/50 flex items-center gap-3 w-fit">
           <span className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#058C42] opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-[#058C42]"></span>
           </span>
           <div>
             <span className="block text-[0.65rem] md:text-xs font-black uppercase tracking-widest text-[#022c22]">
               Alexiant HQ
             </span>
             {isExpanded && (
                <span className="block text-[0.55rem] font-semibold text-slate-500 tracking-wider">
                  Diani Beach, Kenya
                </span>
             )}
           </div>
         </div>
      </div>

      {/* Expand/Collapse Control */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 z-20">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center gap-2.5 bg-[#022c22] text-white px-6 py-3 rounded-full shadow-[0_15px_30px_rgba(2,44,34,0.3)] border border-[#046A38] hover:bg-[#D4AF37] hover:text-[#011611] hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {isExpanded ? (
            <>
              <Minimize2 className="w-4 h-4" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Close Map</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">View Map</span>
            </>
          )}
        </button>
      </div>

      {/* Invisible overlay when collapsed to prevent scroll-trapping */}
      {!isExpanded && (
        <div 
           className="absolute inset-0 z-10 bg-black/[0.02] hover:bg-black/[0.04] transition-colors" 
           onClick={() => setIsExpanded(true)}
           style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
}
