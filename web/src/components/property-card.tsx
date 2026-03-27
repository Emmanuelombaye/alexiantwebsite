"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { formatKes, titleCase } from "@/lib/format";
import { type Property } from "@/types/property";
import { getImageUrl, getImageAlt } from "@/lib/properties/utils";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <Link ref={ref} data-inview={isInView} href={`/properties/${property.slug}`} className="group relative block w-full">
      <article className="relative flex flex-col h-full bg-white rounded-[2.8rem] border border-slate-100 p-3 shadow-xl shadow-slate-200/20 hover:border-[#D4AF37]/30 group-data-[inview=true]:border-[#D4AF37]/30 transition-all duration-700 hover:-translate-y-3 group-data-[inview=true]:shadow-[0_30px_60px_rgba(4,106,56,0.15)] overflow-hidden hover:shadow-[0_30px_60px_rgba(4,106,56,0.15)]">
        {/* Cinematic Image Container */}
        <div className="relative aspect-[3/2] rounded-[2.3rem] overflow-hidden mb-6 bg-slate-50 group-hover:shadow-[0_10px_40px_rgba(212,175,55,0.25)] group-data-[inview=true]:shadow-[0_10px_40px_rgba(212,175,55,0.25)] transition-shadow duration-700">
          {property.images?.[0] ? (
            <>
              <Image
                src={getImageUrl(property.images[0])}
                alt={getImageAlt(property.images[0], property.title)}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-1000 group-hover:scale-105 group-data-[inview=true]:scale-105"
              />
              {property.images?.[1] && (
                <Image
                  src={getImageUrl(property.images[1])}
                  alt={getImageAlt(property.images[1], `${property.title} - Extra view`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-1000 opacity-0 group-hover:opacity-100 group-data-[inview=true]:opacity-100 group-hover:scale-105 group-data-[inview=true]:scale-105"
                />
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300">
              <svg className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-data-[inview=true]:opacity-100 transition-opacity duration-700" />
          
          {/* Subtle Featured Badge only */}
          {property.featured && (
            <div className="absolute top-6 left-6 z-20">
               <div className="bg-[#D4AF37]/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                 <span className="text-white text-[0.5rem] font-black uppercase tracking-[0.2em]">Signature Feature</span>
               </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="px-6 pb-6 flex-1 flex flex-col">
          <h3 className="font-display text-xl font-semibold text-[#046A38] tracking-tight leading-tight italic mb-2 line-clamp-1">
            {property.title}
          </h3>

          <p className="text-slate-500 text-[0.8rem] leading-relaxed font-light italic opacity-80 mb-4 line-clamp-1">
            {property.summary}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#D4AF37] text-xs">📍</span>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-slate-400 truncate">
               {property.location}
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
               <p className="text-[0.85rem] font-bold tracking-wide text-slate-950 leading-none">
                 {formatKes(property.price)}
                 <span className="font-sans text-[0.55rem] font-normal uppercase tracking-widest text-slate-400 ml-2 italic">{property.priceSuffix}</span>
               </p>
            </div>
            
            <div className="h-11 w-11 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#046A38] group-data-[inview=true]:bg-[#046A38] group-hover:border-[#046A38] group-data-[inview=true]:border-[#046A38] transition-all duration-500 shadow-sm shrink-0">
               <svg className="h-4 w-4 text-slate-300 group-hover:text-white group-data-[inview=true]:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/[0.02] to-transparent transition-transform duration-1000 group-hover:translate-x-full group-data-[inview=true]:translate-x-full pointer-events-none" />
      </article>
    </Link>
  );
}