import { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from "@/components/animated-section";
import { ReputationStats } from "@/components/reputation-stats";
import { FaqAccordion } from "@/components/faq-accordion";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Specialist Property Advisors & Partner Agencies | Alexiant Real Estate Diani",
  description:
    "Meet the elite property advisors at Alexiant Real Estate. Decades of combined experience in Diani Beach, Galu, Tiwi, Msambweni & Kwale County real estate markets. Partner with Kenya Coast's gold-standard agency.",
  keywords: [
    "real estate agents Diani",
    "property advisors Kenya Coast",
    "Alexiant team",
    "Kwale real estate agencies",
    "Diani Beach property agency",
    "best real estate company Diani",
    "Kenya Coast property consultants",
    "luxury property advisors Mombasa South",
  ],
};

const coreValues = [
  {
    icon: "🎯",
    title: "Client-First Philosophy",
    body: "Every interaction is rooted in understanding your goals first — whether you're acquiring a beachfront villa, selling coastal land, or seeking a high-yield rental investment.",
  },
  {
    icon: "🔍",
    title: "Rigorous Due Diligence",
    body: "We verify every listing — title deeds, county approvals, utility access and boundary surveys — so you never take an uninformed risk on the Kenya Coast.",
  },
  {
    icon: "🌍",
    title: "International Standards",
    body: "From professional photography to multilingual contracts and escrow services, we bring global agency standards to the Diani property market.",
  },
  {
    icon: "📈",
    title: "Data-Driven Valuations",
    body: "Our pricing recommendations are based on actual market transactions, not guesswork. We track KES-per-acre trends across every micro-market in Kwale County.",
  },
];

const specializations = [
  {
    title: "Beachfront & Oceanview Sales",
    description:
      "Sourcing and marketing premium first-line and second-row properties along the Diani–Galu–Tiwi corridor. We handle villas, apartments and raw oceanfront parcels.",
    stats: "70+ beachfront transactions closed",
  },
  {
    title: "Agricultural Land & Shambas",
    description:
      "Expert advisory on fertile coastal shambas, large-scale development land and agricultural plots across Msambweni, Shimoni and inland Kwale.",
    stats: "200+ acres facilitated",
  },
  {
    title: "Investment & Commercial",
    description:
      "Guiding institutional and private investors into commercial frontages, retail parks and hospitality sites along Diani Beach Road and surrounding corridors.",
    stats: "KES 1.2Bn+ portfolio value",
  },
  {
    title: "Luxury Rentals & Property Management",
    description:
      "End-to-end management for holiday lets, corporate leases and long-term residential rentals with professional care, maintenance and yield reporting.",
    stats: "40+ units under management",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    body: "A 15-minute no-obligation consultation to understand your requirements, budget range and timeline for the Kenya South Coast.",
  },
  {
    step: "02",
    title: "Curated Shortlist",
    body: "Within 48 hours, we present a tailored selection of verified listings matching your brief — including off-market opportunities.",
  },
  {
    step: "03",
    title: "Guided Viewings",
    body: "Personal chaperoned viewings with detailed neighborhood context, infrastructure intel and honest professional opinions.",
  },
  {
    step: "04",
    title: "Due Diligence & Negotiation",
    body: "Title searches, survey verification, conveyancing support and skilled price negotiation to protect your investment.",
  },
  {
    step: "05",
    title: "Closing & Aftercare",
    body: "Seamless transaction closing with trusted conveyancers, followed by ongoing property management or relocation support.",
  },
];

const partnerBenefits = [
  "Premium digital listing exposure on alexiantrealestate.co.ke",
  "Professional photography & drone videography for all listings",
  "Access to our pre-qualified buyer and investor database",
  "Co-branded marketing materials and social media amplification",
  "Legal and conveyancing support through established partners",
  "Market intelligence reports and quarterly trend analysis",
];

const faqs = [
  {
    q: "What areas does Alexiant Real Estate cover?",
    a: "We operate across the entire Kenya South Coast including Diani Beach, Galu Beach, Tiwi, Ukunda, Msambweni, Shimoni, Funzi Island and the wider Kwale County region.",
  },
  {
    q: "Do I pay a fee to use Alexiant as a buyer?",
    a: "No. Buyer advisory is completely free. Our commission is paid by the seller upon successful transaction closure, in line with industry standards.",
  },
  {
    q: "Can Alexiant help with title deed verification?",
    a: "Absolutely. We conduct thorough title searches at the Kwale County Land Registry, verify boundary surveys, and coordinate with certified conveyancers to ensure a clean transfer.",
  },
  {
    q: "How do I list my property with Alexiant?",
    a: "Contact us via WhatsApp or our contact page. We'll arrange a free valuation visit, professional photography session, and have your listing live within 7 working days.",
  },
  {
    q: "Is Alexiant suitable for international investors?",
    a: "Yes. We regularly work with Kenyan diaspora and international investors. We provide full remote transaction support, virtual viewings, and coordinate with legal teams experienced in cross-border property purchases.",
  },
];

export default function AgenciesPage() {
  const baseUrl = getSiteUrl();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Agencies", url: `${baseUrl}/agencies` },
  ]);

  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(faqSchema)} />
      {/* --- HERO --- */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-50">
        <div className="absolute inset-0 soft-grid hero-ambient opacity-30" />
        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="max-w-4xl">
            <span className="eyebrow-chip mb-6">Our People &amp; Partners</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.15]">
              Expertise backed by{" "}
              <span className="font-script text-[#D4AF37] font-normal tracking-normal">
                local heritage
              </span>
              .
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              At Alexiant, we don&apos;t just list property; we represent the region. Our team is comprised of senior advisors who understand the technicalities of coastal land and the high-end expectations of international buyers.
            </p>
            <div className="mt-10 flex flex-wrap gap-5">
              <Link
                href="/contact"
                className="h-14 flex items-center justify-center rounded-full bg-[#046A38] px-8 text-base font-bold uppercase tracking-widest text-white shadow-xl hover:opacity-90 transition-all"
              >
                Talk to an Advisor
              </Link>
              <a
                href={siteContent.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 rounded-full border-2 border-[#046A38] bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#046A38] transition-all duration-300 hover:bg-[#046A38] hover:text-white hover:shadow-[0_10px_30px_rgba(4,106,56,0.15)]"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                WhatsApp Us
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* --- REPUTATION STATS --- */}
      <section className="section-shell py-16">
        <ReputationStats />
      </section>

      {/* --- TEAM GRID --- */}
      <section className="section-shell py-16 sm:py-24">
        <div className="grid gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-10">
            <div>
              <p className="section-kicker">The Advisory Board</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Lead Property Consultants</h2>
            </div>
            <p className="max-w-md text-slate-500 mt-4 md:mt-0">
              Direct access to the decision-makers on every transaction.
            </p>
          </div>

          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {siteContent.team.map((member) => (
              <StaggerItem key={member.name}>
                <div className="group space-y-6">
                  <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl group-hover:shadow-[#D4AF37]/10 transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#046A38]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                      <svg className="w-20 h-20 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="px-2">
                    <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mt-2">{member.role}</p>
                    <div className="mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={siteContent.whatsappHref} className="text-slate-400 hover:text-green-600">
                        WhatsApp
                      </a>
                      <span className="text-slate-200">|</span>
                      <a href={siteContent.phoneHref} className="text-slate-400 hover:text-[#046A38]">
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="section-shell">
          <AnimatedSection direction="up" className="text-center mb-16">
            <p className="section-kicker">What Sets Us Apart</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
              The Alexiant Difference
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
              We combine deep local knowledge with the professionalism of an international agency, giving you the best of both worlds when navigating coastal Kenya real estate.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <StaggerItem key={value.title}>
                <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-2xl hover:-translate-y-2 group">
                  {/* Luxury gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.03] via-transparent to-[#046A38]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Icon with zoom pulse */}
                  <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-inner group-hover:from-[#046A38]/10 group-hover:to-[#D4AF37]/10 transition-colors duration-500">
                    <span className="text-3xl animate-[zoomPulse_3s_ease-in-out_infinite]">{value.icon}</span>
                  </div>

                  {/* Gold accent bar */}
                  <div className="relative z-10 mb-5 h-[3px] w-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40 group-hover:w-14 transition-all duration-500" />

                  <h3 className="relative z-10 text-xl font-bold text-slate-900 group-hover:text-[#046A38] transition-colors">{value.title}</h3>
                  <p className="relative z-10 mt-4 text-sm leading-7 text-slate-600">{value.body}</p>

                  {/* Corner decoration */}
                  <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-[#D4AF37]/[0.06] group-hover:bg-[#D4AF37]/[0.12] transition-colors duration-500" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* --- SPECIALIZATIONS --- */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-slate-50">
        {/* Subtle ambient decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#046A38]/[0.04] blur-[100px]" />

        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="text-center mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur-md">
              ✦ Our Specializations
            </span>
            <h2 className="mt-8 text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Service Areas of Excellence
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed">
              From plots for sale in Diani Beach to luxury villa leasing in Galu, our portfolio of expertise covers the full spectrum of Kenya South Coast real estate.
            </p>
            <div className="mx-auto mt-8 h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          </AnimatedSection>

          <StaggerContainer className="grid gap-8 md:grid-cols-2">
            {specializations.map((spec, index) => (
              <StaggerItem key={spec.title}>
                <div className="group relative h-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-10 md:p-12 shadow-[0_4px_30px_rgba(15,37,64,0.05)] transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_24px_64px_rgba(212,175,55,0.12)] hover:-translate-y-2">
                  {/* Luxury gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.02] via-transparent to-[#046A38]/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Top gold trim */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative corner orbs */}
                  <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#D4AF37]/[0.05] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-[#046A38]/[0.04] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex gap-6 items-start">
                    {/* Icon in gold-ringed circle */}
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/[0.08] to-transparent group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_0_24px_rgba(212,175,55,0.15)] transition-all duration-500">
                      <span className="text-2xl animate-[zoomPulse_3.5s_ease-in-out_infinite]" style={{ animationDelay: `${index * 250}ms` }}>
                        {["🏖️", "🌴", "📊", "🏠"][index]}
                      </span>
                    </div>

                    <div className="flex-1">
                      {/* Number badge */}
                      <span className="text-xs font-extrabold text-[#D4AF37]/40 uppercase tracking-[0.2em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-1 text-xl font-bold text-slate-900 group-hover:text-[#046A38] transition-colors duration-300">
                        {spec.title}
                      </h3>

                      {/* Gold accent bar */}
                      <div className="mt-4 mb-4 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 group-hover:w-14 transition-all duration-500" />

                      <p className="text-slate-600 leading-relaxed">
                        {spec.description}
                      </p>

                      {/* Stats badge */}
                      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-gradient-to-r from-[#D4AF37]/[0.06] to-transparent px-5 py-2.5 group-hover:border-[#D4AF37]/40 group-hover:shadow-sm transition-all duration-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                        <span className="text-xs font-bold text-[#046A38] uppercase tracking-widest">
                          {spec.stats}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom corner ring decoration */}
                  <div className="absolute -bottom-5 -right-5 h-16 w-16 rounded-full border border-[#D4AF37]/[0.06] group-hover:border-[#D4AF37]/15 transition-colors duration-500" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* --- HOW WE WORK / PROCESS --- */}
      <section className="relative py-16 sm:py-24 text-white overflow-hidden">
        {/* Premium multi-layer background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1F2937]" />
        <div className="absolute inset-0 soft-grid opacity-[0.04]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/[0.04] blur-[120px] animate-[heroFloat_12s_ease-in-out_infinite]" />
        
        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="text-center mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur-md">
              ✦ How We Work
            </span>
            <h2 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Your Journey From Enquiry<br className="hidden sm:block" /> to Ownership
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
              A transparent, structured process designed to give you confidence at every stage of your Kenya Coast property transaction.
            </p>
          </AnimatedSection>

          {/* Connecting line behind cards (desktop) */}
          <div className="hidden lg:block absolute left-[10%] right-[10%] top-[58%] h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent z-0" />

          <StaggerContainer className="relative z-10 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {processSteps.map((item, index) => (
              <StaggerItem key={item.step}>
                <div className="group relative h-full rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-md transition-all duration-500 hover:bg-white/[0.1] hover:border-[#D4AF37]/30 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
                  {/* Glow orb */}
                  <div className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-[#D4AF37]/[0.06] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Step number with gold ring */}
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/10 to-transparent group-hover:border-[#D4AF37]/70 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500">
                    <span className="text-xl font-extrabold text-[#D4AF37] animate-[zoomPulse_4s_ease-in-out_infinite]" style={{ animationDelay: `${index * 400}ms` }}>
                      {item.step}
                    </span>
                  </div>

                  {/* Gold accent dash */}
                  <div className="mb-4 h-[2px] w-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-transparent group-hover:w-12 transition-all duration-500" />

                  <h3 className="text-lg font-bold tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">{item.body}</p>

                  {/* Bottom shimmer line */}
                  <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="section-shell py-16 sm:py-24">
        <AnimatedSection direction="up" className="text-center mb-16">
          <p className="section-kicker">Client Voices</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
        </AnimatedSection>

        <StaggerContainer className="grid gap-8 md:grid-cols-3">
          {siteContent.testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <div className="card-surface p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed italic flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mt-1">{testimonial.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* --- COVERAGE MAP / AREAS --- */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="section-shell">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] items-center">
            <AnimatedSection direction="right">
              <p className="section-kicker">Coverage Area</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
                Active Across the Entire South Coast
              </h2>
              <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                Our advisors operate on-the-ground across every major residential and commercial zone in Kwale County and the wider Kenya South Coast region.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {siteContent.coverage.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-slate-50 border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(siteContent.officeMapQuery)}&zoom=12&maptype=satellite`}
                  className="w-full h-[400px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Alexiant Real Estate Coverage – Diani Beach, Kwale County"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Luxury dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1F2937]" />
        <div className="absolute inset-0 soft-grid opacity-[0.03]" />
        {/* Ambient gold glow */}
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.03] blur-[100px]" />

        <div className="section-shell relative z-10">
          <AnimatedSection direction="up" className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur-md">
              ✦ FAQs
            </span>
            <h2 className="mt-8 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/50 text-lg leading-relaxed">
              Quick answers to the most common questions about working with Alexiant Real Estate.
            </p>
            {/* Decorative gold divider */}
            <div className="mx-auto mt-8 h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          </AnimatedSection>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* --- RECRUITMENT / PARTNERSHIP --- */}
      <section className="section-shell py-12">
        <div className="bg-[#111827] rounded-[3.5rem] overflow-hidden grid lg:grid-cols-2 items-center text-white">
          <div className="p-10 md:p-16 lg:p-20 space-y-8">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">Growth &amp; Synergy</span>
            <h2 className="text-4xl font-bold tracking-tight">Partner with the gold&nbsp;standard.</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Are you an independent agent or an established agency looking for better digital exposure and a premium brand umbrella in the Kwale region? Alexiant offers strategic partnerships that leverage our technology and reach.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              {partnerBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-0.5 font-bold">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Link href="/contact" className="h-14 inline-flex items-center justify-center rounded-full bg-[#046A38] px-8 text-sm font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all">
                Inquire about Partnership
              </Link>
            </div>
          </div>
          <div className="h-full bg-[url('/demo-media/properties/prop-002-1.jpg')] bg-cover bg-center min-h-[400px]" />
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="section-shell py-16 sm:py-24">
        <div className="rounded-[3.5rem] bg-slate-50 p-12 md:p-20 text-center border border-slate-100">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to begin your coastal journey?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
              Whether you&apos;re buying, selling or investing along the Kenya South Coast, our senior advisors are standing by to provide clarity and confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/properties" className="h-14 flex items-center justify-center rounded-full bg-[#046A38] px-10 text-base font-bold uppercase tracking-widest text-white hover:opacity-90 transition-all">
                Browse Our Listings
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-full border-2 border-slate-900 px-10 py-5 text-sm font-bold uppercase tracking-widest text-slate-900 transition hover:bg-slate-900 hover:text-white"
              >
                Schedule a Consultation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageTransition>
  );
}
