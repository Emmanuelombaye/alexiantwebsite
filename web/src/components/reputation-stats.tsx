"use client";

import { AnimatedCounter } from "@/components/animated-counter";

const stats = [
  { end: 10, suffix: "+", label: "Years in South Coast", icon: "📅" },
  { end: 350, suffix: "+", label: "Transactions Closed", icon: "🤝" },
  { end: 2.4, suffix: "Bn", prefix: "KES ", label: "Combined Portfolio Value", icon: "💰", decimals: 1 },
  { end: 98, suffix: "%", label: "Client Satisfaction Rate", icon: "⭐" },
];

export function ReputationStats() {
  return (
    <div className="relative">
      {/* Section background accent */}
      <div className="absolute inset-x-0 -top-10 -bottom-10 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent rounded-[3rem] -z-10" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative text-center overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-10 shadow-[0_4px_30px_rgba(15,37,64,0.06)] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] hover:-translate-y-3"
          >
            {/* Luxury gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.04] via-transparent to-[#046A38]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Top gold trim line */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Decorative glow orbs */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#D4AF37]/[0.06] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-[#046A38]/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Icon in gold-ringed circle */}
            <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/[0.08] to-transparent group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.18)] transition-all duration-500">
              <span
                className="text-2xl animate-[zoomPulse_3s_ease-in-out_infinite]"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {stat.icon}
              </span>
            </div>

            {/* Animated number */}
            <p className="relative z-10 text-4xl md:text-5xl font-extrabold text-[#046A38] tabular-nums leading-none">
              <AnimatedCounter
                end={stat.end}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                duration={2200}
              />
            </p>

            {/* Gold accent bar — expands on hover */}
            <div className="relative z-10 mx-auto mt-5 mb-4 h-[3px] w-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 group-hover:w-16 transition-all duration-500" />

            <p className="relative z-10 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
              {stat.label}
            </p>

            {/* Bottom corner decoration */}
            <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full border border-[#D4AF37]/[0.08] group-hover:border-[#D4AF37]/20 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}
