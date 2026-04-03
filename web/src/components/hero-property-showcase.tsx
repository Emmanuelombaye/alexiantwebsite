"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPropertyPrice, titleCase } from "@/lib/format";
import type { Property } from "@/types/property";
import { getImageUrl, getImageAlt } from "@/lib/properties/utils";

const AUTO_ADVANCE_MS = 3400;

type HeroPropertyShowcaseProps = {
  properties: Property[];
  totalCount: number;
  availableCount: number;
};

export function HeroPropertyShowcase({ properties, totalCount, availableCount }: HeroPropertyShowcaseProps) {
  const showcaseProperties = useMemo(() => properties.slice(0, 9), [properties]);
  const [activeIndices, setActiveIndices] = useState<number[]>(() => showcaseProperties.map(() => 0));
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndices(showcaseProperties.map(() => 0));
  }, [showcaseProperties]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference);
      return () => mediaQuery.removeEventListener("change", syncPreference);
    }

    mediaQuery.addListener(syncPreference);
    return () => mediaQuery.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    const hasCyclingImages = showcaseProperties.some((property) => property.images.length > 1);

    if (prefersReducedMotion || hoveredCard !== null || !hasCyclingImages) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndices((current) =>
        showcaseProperties.map((property, index) => {
          if (property.images.length <= 1) {
            return 0;
          }

          return ((current[index] ?? 0) + 1) % property.images.length;
        }),
      );
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [hoveredCard, prefersReducedMotion, showcaseProperties]);

  function advanceCard(cardIndex: number) {
    const property = showcaseProperties[cardIndex];

    if (!property || property.images.length <= 1 || prefersReducedMotion) {
      return;
    }

    setActiveIndices((current) => {
      const next = [...current];
      next[cardIndex] = ((current[cardIndex] ?? 0) + 1) % property.images.length;
      return next;
    });
  }

  if (showcaseProperties.length === 0) {
    return (
      <div className="glass-panel rounded-[2rem] p-6 text-slate-950">
        <p className="text-sm uppercase tracking-[0.22em] text-[color:var(--brand)]">Featured stays</p>
        <p className="mt-3 text-lg font-semibold">Hero showcase cards appear here when listings are available.</p>
      </div>
    );
  }

  const showcasePhotoCount = showcaseProperties.reduce((total, property) => total + property.images.length, 0);

  return (
    <div className="relative mx-auto w-full max-w-6xl reveal-up reveal-delay-2">
      <div className="absolute inset-x-8 top-10 h-28 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/75 bg-white/72 p-5 shadow-[0_28px_60px_rgba(15,76,201,0.12)] backdrop-blur">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">Featured stays & Plots</p>
          </div>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[color:var(--brand)]">
            {showcaseProperties.length} curated listings
          </span>
        </div>

        {/* Professional Grid: Responsive columns for all devices */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcaseProperties.map((property, index) => (
            <div key={property.id} className="block">
              <ShowcaseCard
                property={property}
                activeIndex={activeIndices[index] ?? 0}
                compact={true}
                onActivate={() => advanceCard(index)}
                onHoverChange={(active) => setHoveredCard(active ? index : null)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type ShowcaseCardProps = {
  property: Property;
  activeIndex: number;
  compact: boolean;
  onActivate: () => void;
  onHoverChange: (active: boolean) => void;
};

function ShowcaseCard({ property, activeIndex, compact, onActivate, onHoverChange }: ShowcaseCardProps) {
  const hasImages = property.images.length > 0;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md h-full"
      onMouseEnter={() => {
        onHoverChange(true);
        onActivate();
      }}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => {
        onHoverChange(true);
        onActivate();
      }}
      onBlur={() => onHoverChange(false)}
    >
      <div className="relative aspect-[16/10] overflow-hidden shrink-0">
        {hasImages ? (
          <div className="flex h-full transition-transform duration-700 ease-out will-change-transform" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {property.images.map((image, index) => (
              <div key={`${property.id}-${getImageUrl(image)}-${index}`} className="relative min-w-full h-full">
                <Image
                  src={getImageUrl(image)}
                  alt={getImageAlt(image, `${property.title} showcase image ${index + 1}`)}
                  fill
                  priority={index === 0 && activeIndex === 0}
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 28rem, 100vw"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full items-end bg-[#046A38] p-5 text-white">
            <p className="text-lg font-semibold">{property.title}</p>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col justify-center bg-white p-3 border-t border-slate-50">
        <h3 className={`line-clamp-1 font-display font-semibold text-[#046A38] italic ${compact ? "text-[0.85rem]" : "text-lg"}`}>{property.title}</h3>
        <p className="line-clamp-1 text-[0.6rem] italic text-slate-400 font-light mt-0.5 mb-1">{property.summary}</p>
        
        <div className="flex items-end justify-between mt-auto">
           <div className="flex items-center gap-1 opacity-60 min-w-0 pr-2">
              <span className="text-[7px] shrink-0">📍</span>
              <p className="truncate text-[7px] font-bold uppercase tracking-[0.1em] text-slate-500">{property.location.split(',')[0]}</p>
           </div>
           <p className="text-[0.8rem] font-bold tracking-wide text-slate-950 leading-none shrink-0">
             {formatPropertyPrice(property.price, "")}
           </p>
        </div>
      </div>
    </Link>
  );
}