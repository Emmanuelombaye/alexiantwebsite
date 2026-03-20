"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PropertyImage } from "@/types/property";
import { getImageUrl, getImageAlt } from "@/lib/properties/utils";

type PropertyGalleryProps = {
  title: string;
  images: (string | PropertyImage)[];
};

const AUTO_PLAY_INTERVAL_MS = 4200;

export function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const canNavigate = images.length > 1;
  const shouldAutoPlay = canNavigate && !isPaused && !prefersReducedMotion;

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

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
    if (!shouldAutoPlay) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, AUTO_PLAY_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [shouldAutoPlay, images.length]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsPaused(true);
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || !canNavigate) {
      setIsPaused(false);
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const swipeDistance = touchStartX.current - touchEndX;

    touchStartX.current = null;

    if (Math.abs(swipeDistance) < 40) {
      setIsPaused(false);
      return;
    }

    if (swipeDistance > 0) {
      showNext();
      setIsPaused(false);
      return;
    }

    showPrevious();
    setIsPaused(false);
  };

  return (
    <div className="space-y-4">
      <div
        className="group relative overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-white shadow-sm"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={(event) => {
          if (!canNavigate) {
            return;
          }

          if (event.key === "ArrowLeft") {
            showPrevious();
          }

          if (event.key === "ArrowRight") {
            showNext();
          }
        }}
        tabIndex={0}
        style={{ touchAction: "pan-y" }}
      >
        <div className="relative h-[30rem] w-full md:h-[34rem]">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={`${getImageUrl(image)}-${index}`}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  isActive ? "scale-100 opacity-100" : "pointer-events-none scale-105 opacity-0"
                }`}
              >
                <Image
                  src={getImageUrl(image)}
                  alt={getImageAlt(image, `${title} image ${index + 1}`)}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/5" />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-slate-950/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {images.length} photos
        </div>
        {canNavigate ? (
          <div className="absolute right-4 top-4 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {prefersReducedMotion ? `${activeIndex + 1} / ${images.length}` : isPaused ? "Paused" : "Auto tour"}
          </div>
        ) : null}
        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/55 text-lg text-white opacity-100 transition hover:bg-slate-950/75 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              aria-label="Show previous property photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/55 text-lg text-white opacity-100 transition hover:bg-slate-950/75 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
              aria-label="Show next property photo"
            >
              ›
            </button>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4">
              {images.map((image, index) => (
                <button
                  key={`${getImageUrl(image)}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show property photo ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-7 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${getImageUrl(image)}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`min-w-[7rem] overflow-hidden rounded-[1.4rem] border bg-white text-left shadow-sm transition sm:min-w-0 ${
                  isActive ? "border-[color:var(--brand)] ring-2 ring-blue-100" : "border-[var(--border-soft)] hover:border-blue-300"
                }`}
              >
                <Image
                  src={getImageUrl(image)}
                  alt={getImageAlt(image, `${title} image ${index + 1}`)}
                  width={800}
                  height={600}
                  className="h-28 w-full object-cover"
                  sizes="(min-width: 640px) 20vw, 100vw"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}