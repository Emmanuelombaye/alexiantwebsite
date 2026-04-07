"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from "@/components/animated-section";
import { LeadForm } from "@/components/lead-form";
import { siteContent } from "@/data/site-content";
import { ArrowRight, Calculator, PieChart, TrendingUp, ShieldCheck, Globe, DollarSign, Briefcase, Zap, Info, RotateCcw } from "lucide-react";
import Link from "next/link";

// Types
type Currency = "KES" | "USD" | "EUR";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  KES: "KSh",
  USD: "$",
  EUR: "â‚¬",
};

const EXCHANGE_RATES: Record<Currency, number> = {
  KES: 1,
  USD: 128.5,
  EUR: 140.2,
};

export default function MortgagePage() {
  // Calculator Inputs
  const [price, setPrice] = useState(45000000);
  const [downPayment, setDownPayment] = useState(9000000);
  const [isDownPaymentPct, setIsDownPaymentPct] = useState(false);
  const [termYears, setTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(12.5);
  const [propertyTaxes, setPropertyTaxes] = useState(60000); // Annual
  const [homeInsurance, setHomeInsurance] = useState(30000); // Annual
  const [hoaFees, setHoaFees] = useState(5000); // Monthly
  
  const [currency, setCurrency] = useState<Currency>("KES");

  // Calculations
  const currencyRate = EXCHANGE_RATES[currency];
  
  // Real-time Down Payment Sync
  const downPaymentAmount = isDownPaymentPct ? (price * (downPayment / 100)) : downPayment;
  const loanAmount = Math.max(0, price - downPaymentAmount);
  
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  const principalAndInterest = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / totalMonths;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }, [loanAmount, monthlyRate, totalMonths]);

  const monthlyTax = propertyTaxes / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyHOA = hoaFees;
  const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyHOA;

  const formatCurrency = (val: number) => {
    const symbol = CURRENCY_SYMBOLS[currency];
    const converted = val / currencyRate;
    return `${symbol} ${converted.toLocaleString(undefined, { maximumFractionDigits: converted < 1000 ? 2 : 0 })}`;
  };

  const handleReset = () => {
    setPrice(45000000);
    setDownPayment(9000000);
    setIsDownPaymentPct(false);
    setTermYears(20);
    setInterestRate(12.5);
    setPropertyTaxes(60000);
    setHomeInsurance(30000);
    setHoaFees(5000);
  };

  return (
    <PageTransition>
      {/* EXECUTIVE HEADER */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-[#011611]">
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.03]" />
         </div>

         <div className="container relative z-10 px-4 mx-auto lg:px-8">
            <AnimatedSection direction="up" className="max-w-4xl mx-auto text-center">
               <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Capital Advisory</span>
               </div>
               <h1 className="font-display text-4xl md:text-5xl font-semibold italic text-white tracking-tight leading-[1.1] mb-4">
                  Strategic <span className="not-italic font-black text-[#D4AF37]">Investment</span> Intelligence
               </h1>
            </AnimatedSection>
         </div>
      </section>

      {/* INTELLIGENCE HUB */}
      <section className="bg-slate-50 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: CALCULATION ENGINE */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                     <div className="h-2 w-2 rounded-full bg-[#046A38]" />
                     <h3 className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-slate-900 italic">Financial Inputs</h3>
                  </div>
                  <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100">
                     {(["KES", "USD", "EUR"] as Currency[]).map(curr => (
                       <button 
                         key={curr}
                         onClick={() => setCurrency(curr)}
                         className={`px-4 py-1.5 rounded-lg text-[0.6rem] font-black transition-all ${currency === curr ? 'bg-[#011611] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                       >
                         {curr}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                  {/* Home Price */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Home Price ({currency})</label>
                     <div className="relative group">
                        <input 
                           type="number"
                           value={price}
                           onChange={(e) => setPrice(Number(e.target.value))}
                           className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20"><Info size={16} /></div>
                     </div>
                  </div>

                  {/* Down Payment */}
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Down Payment</label>
                        <div className="flex bg-slate-100/50 rounded-lg p-0.5 border border-slate-200/50">
                           <button onClick={() => setIsDownPaymentPct(false)} className={`px-2.5 py-1 rounded-md text-[0.55rem] font-black transition-all ${!isDownPaymentPct ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>{currency}</button>
                           <button onClick={() => setIsDownPaymentPct(true)} className={`px-2.5 py-1 rounded-md text-[0.55rem] font-black transition-all ${isDownPaymentPct ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}>%</button>
                        </div>
                     </div>
                     <input 
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* Loan Term */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Loan Term (Years)</label>
                     <input 
                        type="number"
                        value={termYears}
                        onChange={(e) => setTermYears(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* Interest Rate */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Interest Rate (%)</label>
                     <input 
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* Property Taxes */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Property Taxes (Annual {currency})</label>
                     <input 
                        type="number"
                        value={propertyTaxes}
                        onChange={(e) => setPropertyTaxes(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* Home Insurance */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Home Insurance (Annual {currency})</label>
                     <input 
                        type="number"
                        value={homeInsurance}
                        onChange={(e) => setHomeInsurance(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* HOA Fees */}
                  <div className="space-y-3">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">HOA Fees (Monthly {currency})</label>
                     <input 
                        type="number"
                        value={hoaFees}
                        onChange={(e) => setHoaFees(Number(e.target.value))}
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#046A38]/10 focus:border-[#046A38] transition-all"
                     />
                  </div>

                  {/* Loan Amount Autocalc */}
                  <div className="space-y-3 opacity-60">
                     <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 block">Loan Amount (Auto-Calculated)</label>
                     <div className="w-full h-14 bg-slate-100/50 border border-slate-200 rounded-2xl px-6 flex items-center text-sm font-black text-slate-400">
                        {formatCurrency(loanAmount)}
                     </div>
                  </div>
               </div>

               <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4 w-full md:w-auto">
                     <button className="flex-1 md:flex-none h-14 px-10 bg-[#046A38] text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all">
                        Calculate Strategy
                     </button>
                     <button onClick={handleReset} className="h-14 px-6 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900 transition-all border border-slate-200/50">
                        <RotateCcw size={18} />
                     </button>
                  </div>
                  <p className="text-[0.6rem] text-slate-300 italic font-medium">Bespoke results based on dynamic Kenyan financial frameworks.</p>
               </div>
            </div>

            {/* RIGHT: REAL-TIME ARCHITECTURE */}
            <div className="lg:col-span-5 space-y-8">
               <div className="bg-[#011611] rounded-[2.5rem] p-8 md:p-10 text-white shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative overflow-hidden group border border-[#D4AF37]/20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-8">
                        <div>
                           <h4 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-2">Executive Estimate</h4>
                           <div className="text-[0.55rem] text-white/40 font-bold uppercase tracking-widest flex flex-wrap gap-x-4">
                              <span>Loan: {formatCurrency(loanAmount)}</span>
                              <span>Term: {termYears} YRS</span>
                              <span>Rate: {interestRate}%</span>
                           </div>
                        </div>
                        <PieChart className="text-[#D4AF37]/40" size={18} />
                     </div>

                     <div className="mb-8">
                        <span className="text-[0.5rem] font-black uppercase tracking-[0.3em] text-white/30 block mb-2">Total Monthly Commitment</span>
                        <div className="text-3xl md:text-4xl font-display font-black italic text-[#D4AF37] tracking-tight">
                           {formatCurrency(totalMonthlyPayment)}
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-3 mb-8">
                        {[
                           { label: "Principal & Interest", value: principalAndInterest, color: "bg-[#D4AF37]" },
                           { label: "Property Taxes", value: monthlyTax, color: "bg-emerald-500" },
                           { label: "Home Insurance", value: monthlyInsurance, color: "bg-emerald-200" },
                           { label: "HOA Fees", value: monthlyHOA, color: "bg-slate-700" }
                        ].map((item, i) => (
                           <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/10 transition-all group/card">
                              <div className="text-[0.45rem] font-black uppercase tracking-[0.2em] text-white/30 mb-2 flex items-center gap-2">
                                 <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                                 {item.label}
                              </div>
                              <p className="text-xs font-bold text-white group-hover/card:text-[#D4AF37] transition-colors">{formatCurrency(item.value)}</p>
                           </div>
                        ))}
                     </div>

                     {/* Doughnut Visualization (SVG) - Compact */}
                     <div className="relative h-48 w-48 mx-auto mb-8 group/viz">
                        <svg viewBox="0 0 100 100" className="h-full w-full transform -rotate-90">
                           <circle cx="50" cy="50" r="40" fill="transparent" stroke="#15151a" strokeWidth="10" />
                           <motion.circle 
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: (principalAndInterest / totalMonthlyPayment) }}
                              cx="50" cy="50" r="40" fill="transparent" stroke="#D4AF37" strokeWidth="10" strokeLinecap="round" 
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                           <span className="text-[0.4rem] font-black uppercase tracking-widest text-white/20">Structure</span>
                           <span className="text-sm font-display italic font-black text-white">Bespoke</span>
                        </div>
                     </div>

                     <button className="w-full h-14 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] text-slate-900 rounded-full text-[0.6rem] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                        Prequalify Now <ArrowRight size={12} />
                     </button>
                  </div>
               </div>

               {/* ADVISOR CALLOUT */}
               <div className="rounded-[2rem] bg-white border border-slate-100 p-8 shadow-sm flex items-center gap-6 group hover:border-[#046A38]/30 transition-all cursor-pointer">
                  <div className="h-16 w-16 rounded-2xl bg-[#046A38]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                     <Briefcase className="text-[#046A38]" size={24} />
                  </div>
                  <div>
                     <h5 className="text-[0.8rem] font-bold text-slate-900 mb-1">Mortgage Advisory Team</h5>
                     <p className="text-[0.7rem] text-slate-400 group-hover:text-[#046A38] transition-colors flex items-center gap-2">
                        Unlock elite lending opportunities <ArrowRight size={10} />
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL LEAD SECTION - MASTERPIECE BRIEF */}
      <section className="section-shell py-12 bg-slate-50 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[6000px] bg-[#D4AF37]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <AnimatedSection direction="up">
              <div className="rounded-[3rem] bg-white p-1 md:p-1 shadow-[0_40px_80px_rgba(4,106,56,0.08)] border border-slate-100 relative overflow-hidden group">
                 <div className="bg-white rounded-[2.9rem] h-full w-full p-8 md:p-16 flex flex-col items-center text-center">
                    
                    {/* TEXTUAL AUTHORITY - NOW ON TOP */}
                    <div className="max-w-2xl mx-auto mb-12">
                       <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                          <span className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Confidential Strategy</span>
                          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                       </div>
                       <h2 className="font-display text-3xl md:text-5xl font-semibold italic text-slate-900 tracking-tight leading-[1.1] mb-6">
                         Secure Your <span className="not-italic font-black text-[#046A38]">Portfolio Expansion</span>
                       </h2>
                       <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                         Unlock bespoke lending architectures with our network of premier financial institutions. Your roadmap to <span className="text-slate-900 font-bold italic text-base">coastal legacy</span> starts here.
                       </p>
                    </div>

                    {/* THE INTAKE ENGINE - CENTERED CARD */}
                    <div className="w-full max-w-xl">
                       <div className="bg-slate-50/50 rounded-[2.5rem] p-1 border border-slate-100 shadow-inner relative">
                          <LeadForm dark={false} className="!p-6 md:!p-10" />
                       </div>
                    </div>

                    {/* ADVISORY BADGE - COMPACT */}
                    <div className="mt-12 flex items-center gap-4 py-4 px-8 rounded-full bg-slate-50 border border-slate-100">
                       <div className="flex -space-x-3">
                          {[0,1,2].map((_, i) => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                               <img src={["https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100","https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=100&h=100","https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=100&h=100"][i]} alt="Advisor" className="h-full w-full object-cover" />
                            </div>
                          ))}
                       </div>
                       <div className="h-4 w-[1px] bg-slate-200" />
                       <p className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest">
                         12+ Dedicated <span className="text-[#046A38]">Diani Specialists</span> Active
                       </p>
                    </div>
                 </div>
              </div>
           </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}


