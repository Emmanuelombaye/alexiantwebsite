"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildPropertiesHref, countActivePropertyFilters, getPropertyFilterBadges } from "@/lib/property-filters";

type PropertyFiltersProps = {
  defaultQuery: string;
  defaultCategory: string;
  defaultStatus: string;
  resultCount: number;
  totalCount: number;
  saleCount: number;
  rentCount: number;
  availableCount: number;
  featuredCount: number;
  defaultType?: string;
};

export function PropertyFilters({
  defaultQuery,
  defaultCategory,
  defaultStatus,
  resultCount,
  totalCount,
  saleCount,
  rentCount,
  availableCount,
  featuredCount,
  defaultType,
}: PropertyFiltersProps) {
  const router = useRouter();
  const activeFilterCount = countActivePropertyFilters({ query: defaultQuery, category: defaultCategory, status: defaultStatus, type: defaultType });
  const quickLinks = [
    { label: "All listings", href: buildPropertiesHref({}), value: totalCount },
    { label: "Available now", href: buildPropertiesHref({ status: "available" }), value: availableCount },
    { label: "For sale", href: buildPropertiesHref({ category: "sale" }), value: saleCount },
    { label: "For rent", href: buildPropertiesHref({ category: "rent" }), value: rentCount },
  ];

  return (
    <div className="relative mt-8">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.02] to-transparent rounded-[2.5rem] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-4 px-4 mb-3">
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildPropertiesHref({ query: defaultQuery, category: defaultCategory, status: defaultStatus, type: "" })}
              className={`px-4 py-1.5 rounded-full border text-[0.55rem] font-bold uppercase tracking-widest shadow-sm transition-all ${
                !defaultType ? "bg-[#046A38] border-[#046A38] text-white" : "bg-white border-slate-100 text-slate-400 hover:border-[#046A38] hover:text-[#046A38]"
              }`}
            >
              All Assets
            </Link>
            <Link
              href={buildPropertiesHref({ query: defaultQuery, category: defaultCategory, status: defaultStatus, type: "house" })}
              className={`px-4 py-1.5 rounded-full border text-[0.55rem] font-bold uppercase tracking-widest shadow-sm transition-all ${
                defaultType === 'house' ? "bg-[#046A38] border-[#046A38] text-white" : "bg-white border-slate-100 text-slate-400 hover:border-[#046A38] hover:text-[#046A38]"
              }`}
            >
              Houses & Villas
            </Link>
            <Link
              href={buildPropertiesHref({ query: defaultQuery, category: defaultCategory, status: defaultStatus, type: "plot" })}
              className={`px-4 py-1.5 rounded-full border text-[0.55rem] font-bold uppercase tracking-widest shadow-sm transition-all ${
                defaultType === 'plot' ? "bg-[#046A38] border-[#046A38] text-white" : "bg-white border-slate-100 text-slate-400 hover:border-[#046A38] hover:text-[#046A38]"
              }`}
            >
              Prime Plots
            </Link>
          </div>

          <div className="flex-1" />
          
          {activeFilterCount > 0 && (
            <button 
              type="button"
              onClick={() => router.push('/properties')}
              className="bg-[#046A38] rounded-full px-4 py-1.5 text-[0.55rem] font-black uppercase tracking-widest text-white shadow-lg shadow-emerald-500/10 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Clear {activeFilterCount}
            </button>
          )}
        </div>

        <form action="/properties" className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto] items-center bg-white/70 backdrop-blur-xl p-2 rounded-[2rem] border border-[#D4AF37]/10 shadow-[0_15px_40px_rgba(15,37,64,0.05)]">
          {/* Keyword Search */}
          <div className="relative group">
            <div className="relative">
              <input
                name="q"
                defaultValue={defaultQuery}
                placeholder="Search Coastal Inventory..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-100 bg-white/50 focus:bg-white focus:border-[#046A38] outline-none transition-all duration-300 font-bold text-slate-900 text-xs placeholder:text-slate-300 placeholder:font-normal"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Select */}
          <div className="relative">
            <div className="relative">
              <select
                name="category"
                defaultValue={defaultCategory}
                className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-100 bg-white/50 focus:bg-white focus:border-[#046A38] outline-none transition-all duration-300 font-bold text-slate-900 text-xs appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="sale">Property for Sale</option>
                <option value="rent">Luxury Rentals</option>
              </select>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Status Select */}
          <div className="relative">
            <div className="relative">
              <select
                name="status"
                defaultValue={defaultStatus}
                className="w-full h-11 pl-4 pr-10 rounded-xl border border-slate-100 bg-white/50 focus:bg-white focus:border-[#046A38] outline-none transition-all duration-300 font-bold text-slate-900 text-xs appearance-none cursor-pointer"
              >
                <option value="">Any Status</option>
                <option value="available">Available Now</option>
                <option value="sold">Sold Items</option>
                <option value="rented">Fully Rented</option>
              </select>
              <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="h-11 px-6 rounded-xl bg-[#046A38] text-white font-black uppercase tracking-[0.2em] text-[0.6rem] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            Search
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}