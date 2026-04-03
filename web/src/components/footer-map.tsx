"use client";

import { useState } from "react";
import { Maximize2, Minimize2, MapPin } from "lucide-react";

export function FooterMap() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] ${isExpanded ? "h-[75vh]" : "h-[200px] sm:h-[240px] md:h-[300px]"} bg-slate-100 border border-slate-200`}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.468426177385!2d39.55544737400081!3d-4.322748646482343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184045176628ef35%3A0xda96e15ad0e3b4ef!2sALEXIANT%20REAL%20ESTATE!5e0!3m2!1sen!2ske!4v1775038753533!5m2!1sen!2ske" 
        title="Alexiant Real Estate Location" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full border-none"
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 md:left-auto md:right-6 md:translate-x-0 z-20 flex items-center gap-3">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=ALEXIANT+REAL+ESTATE&destination_place_id=0xda96e15ad0e3b4ef:0x184045176628ef35"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white text-[#022c22] px-5 py-3 rounded-full shadow-lg border border-slate-200 hover:bg-[#D4AF37] hover:text-[#011611] hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">Get Directions</span>
        </a>
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
