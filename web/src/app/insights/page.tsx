import { Metadata } from "next";
import { siteContent } from "@/data/site-content";
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from "@/components/animated-section";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Coastal Market Insights & Trends | Alexiant Real Estate Blog",
  description: "Stay informed on the Diani and South Coast property markets. Data and analysis on land appreciation, rental yields, and infrastructure developments in Kwale.",
  keywords: ["Diani property trends", "South Coast real estate news", "Kwale investment guide", "Diani land prices"],
};

const articles = [
  {
    category: "Market Report",
    title: "Diani Real Estate Outlook 2026: The Rise of Galu",
    excerpt: "Why institutional investors are shifting focus further south and the impact of the new infrastructure on land valuation in Galu.",
    date: "March 10, 2026",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2070"
  },
  {
    category: "Investment Guide",
    title: "Understanding Freehold vs Leasehold on the Coast",
    excerpt: "A technical guide for international and local buyers on title structures in Kwale County and what you need to know before closing.",
    date: "February 24, 2026",
    img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2096"
  },
  {
    category: "Architecture",
    title: "Sustainable Luxury: The Future of Coastal Living",
    excerpt: "Exploring the new wave of eco-conscious villa designs that are maintaining high resale values in Diani and Tiwi.",
    date: "February 05, 2026",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function InsightsPage() {
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Insights", url: `${baseUrl}/insights` },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Market insights",
    url: `${baseUrl}/insights`,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };
  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(collectionSchema)} />
      
      {/* ─── INTELLIGENCE HERO ─── */}
      <section className="relative pt-56 pb-24 overflow-hidden bg-gradient-to-br from-[#022c22] via-[#053a2f] to-[#011611] text-white">
        {/* Luxury Background Texturing */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/5 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#058C42]/10 blur-[130px]" />
        
        <div className="section-shell relative z-10 text-center max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-[0.55rem] font-bold uppercase tracking-[0.45em] text-[#D4AF37] backdrop-blur-md mb-12">
              ✦ Proprietary Analysis
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08] italic">
              Intelligence for the <br />
              <span className="not-italic text-[#D4AF37]">Informed Visionary.</span>
            </h1>
            <div className="mx-auto mt-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            
            <p className="mt-12 text-lg md:text-xl text-white/60 leading-relaxed font-medium italic opacity-80 max-w-3xl mx-auto">
              We provide the context required to navigate the coastal frontier. Explore our rigorous analysis of market velocity, legal frameworks, and the evolution of luxury architecture.
            </p>
          </AnimatedSection>
        </div>

        {/* Bottom Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── FEATURED INTELLIGENCE ─── */}
      <section className="section-shell py-24 sm:py-32 relative z-10">
        <div className="grid gap-20">
          {/* Main Featured Report */}
          <AnimatedSection direction="up">
             <div className="group relative rounded-[4rem] overflow-hidden bg-[#011611] min-h-[550px] flex items-end shadow-3xl ring-1 ring-white/10 hover:ring-[#D4AF37]/30 transition-all duration-1000">
                <img src={articles[0].img} alt={articles[0].title} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-[2000ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011611] via-[#011611]/40 to-transparent" />
                
                {/* Absolute Indicators */}
                <div className="absolute top-12 left-12 z-20">
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Whitepaper 2026</span>
                   </div>
                </div>

                <div className="relative z-10 p-12 md:p-20 max-w-4xl">
                   <div className="flex items-center gap-4 mb-8">
                      <span className="h-[1px] w-12 bg-[#D4AF37]/40" />
                      <p className="text-[#D4AF37] text-[0.65rem] font-bold uppercase tracking-[0.4em] opacity-80">
                         {articles[0].category}
                      </p>
                   </div>
                   <h2 className="font-display text-3xl md:text-5xl font-semibold mb-8 text-white tracking-tight italic group-hover:text-[#D4AF37]/90 transition-colors duration-500">{articles[0].title}</h2>
                   <p className="text-white/50 text-xl leading-relaxed mb-10 font-medium italic opacity-80">{articles[0].excerpt}</p>
                   <p className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-white/30">{articles[0].date}</p>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-[1500ms] group-hover:translate-x-full" />
             </div>
          </AnimatedSection>

          {/* Grid of Specialized Reports */}
          <StaggerContainer className="grid gap-12 md:grid-cols-2">
            {articles.slice(1).map((article, idx) => (
              <StaggerItem key={article.title}>
                 <article className="group flex flex-col h-full bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-700 hover:-translate-y-4 hover:shadow-3xl shadow-slate-200/50 p-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[2.8rem] mb-10">
                       <img src={article.img} alt={article.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-[#022c22]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                       
                       {/* Category Tag */}
                       <div className="absolute top-8 left-8">
                          <div className="bg-white/80 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full shadow-lg">
                             <span className="text-[#022c22] text-[0.55rem] font-bold uppercase tracking-[0.3em] font-black">{article.category}</span>
                          </div>
                       </div>
                    </div>

                    <div className="px-8 pb-10 flex flex-col flex-1">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="h-[1px] w-6 bg-[#D4AF37]/40" />
                          <span className="text-[#D4AF37] text-[0.6rem] font-bold uppercase tracking-[0.4em]">{article.date}</span>
                       </div>
                       <h3 className="font-display text-2xl font-semibold text-[#022c22] mb-6 group-hover:text-[#046A38] transition-colors duration-500 italic tracking-tight">
                          {article.title}
                       </h3>
                       <p className="text-slate-500 leading-relaxed mb-10 flex-1 font-light italic opacity-80 text-[0.95rem]">
                          {article.excerpt}
                       </p>
                       <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[#046A38] text-[0.65rem] font-bold uppercase tracking-[0.4em] relative">
                             Read Insight
                             <span className="absolute -bottom-1 left-0 h-[1px] w-full scale-x-0 bg-[#D4AF37] transition-transform group-hover:scale-x-100 origin-left" />
                          </span>
                          <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#022c22] group-hover:border-[#022c22] transition-all duration-500">
                             <svg className="h-4 w-4 text-slate-300 group-hover:text-[#D4AF37] transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                             </svg>
                          </div>
                       </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#D4AF37]/[0.02] to-transparent transition-transform duration-[1200ms] group-hover:translate-x-full pointer-events-none" />
                 </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── INTELLIGENCE BRIEFING ─── */}
      <section className="section-shell pb-24 sm:pb-32">
         <div className="bg-gradient-to-br from-[#022c22] to-[#011611] rounded-[4rem] p-16 md:p-32 text-center border ring-1 ring-white/10 shadow-3xl relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-[0.05] pointer-events-none" />
            <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-[100px]" />
            
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[0.55rem] font-bold uppercase tracking-[0.4em] mb-10">Private Briefing</span>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-10 italic leading-tight">Stay connected to <br /><span className="text-[#D4AF37] not-italic font-semibold tracking-tighter">Coastal Evolution.</span></h2>
            <p className="max-w-2xl mx-auto text-white/50 mb-14 text-lg font-medium italic opacity-80 leading-relaxed">
               Subscribe to the Alexiant Intelligence network for quarterly market audits and exclusive analysis of off-market coastal land acquisitions.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
               <input type="email" placeholder="Institutional email" className="flex-1 rounded-full bg-white/5 border border-white/10 px-8 py-5 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/50 focus:bg-white/10 transition-all font-medium" />
               <button className="rounded-full bg-[#046A38] text-white px-10 py-5 font-black uppercase text-[0.65rem] tracking-[0.3em] transition-all hover:opacity-90 shadow-[0_12px_24px_rgba(4,106,56,0.25)]">
                  Join Network
               </button>
            </div>
         </div>
      </section>
    </PageTransition>
  );
}
