import { Metadata } from "next";
import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { listBlogPosts } from "@/lib/blog/service";
import { PageTransition, AnimatedSection } from "@/components/animated-section";
import { BlogListClient } from "@/components/blog-list-client";
import { BlogCtaClient } from "@/components/blog-cta-client";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "The Alexiant Journal | Executive Coastal Intelligence",
  description: "Market insights, investment strategy, and the heritage of the Kenyan Coast. Curated intelligence for the global investor.",
  keywords: ["Diani real estate news", "coastal Kenya investment", "luxury property market", "Alexiant Journal"],
};

export default async function BlogPage() {
  const allPosts = await listBlogPosts();
  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);
  const baseUrl = getSiteUrl();
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Journal", url: `${baseUrl}/blog` },
  ]);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Alexiant Journal",
    url: `${baseUrl}/blog`,
    isPartOf: { "@type": "WebSite", name: "Alexiant Real Estate", url: baseUrl },
  };

  return (
    <PageTransition className="pb-20 overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(collectionSchema)} />
      
      {/* ─── THE JOURNAL GRID ─── */}
      <section className="section-shell pt-40 pb-0 relative z-10">
        <AnimatedSection direction="up" className="mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-5 py-2 text-[0.55rem] font-bold uppercase tracking-[0.45em] text-[#D4AF37] backdrop-blur-md mb-8">
            ✦ Intelligence
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[#022c22] leading-[1.08] italic">
            The <span className="not-italic text-[#D4AF37]">Alexiant</span> Journal.
          </h1>
          <div className="mt-8 h-[1px] w-20 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
        </AnimatedSection>

        {featuredPost && (
          <AnimatedSection direction="up" delay={0.2} className="mb-0">
             <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-[4rem] overflow-hidden bg-[#011611] aspect-[16/9] lg:aspect-[21/8] shadow-3xl ring-1 ring-[#D4AF37]/10 hover:ring-[#D4AF37]/30 transition-all duration-700">
                <img src={featuredPost.images?.[0] || "/demo-media/blog/post-1.jpg"} alt={featuredPost.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011611] via-[#011611]/30 to-transparent" />
                
                <div className="absolute top-10 right-10 z-20">
                   <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full shadow-2xl">
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Editorial Feature</span>
                   </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-10 md:p-20 z-20">
                   <div className="flex gap-6 items-center mb-8">
                      <span className="h-[1px] w-12 bg-[#D4AF37]/40" />
                      <span className="text-white/40 text-[0.6rem] font-bold uppercase tracking-[0.3em]">{featuredPost.date}</span>
                   </div>
                   <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-white max-w-4xl tracking-tight leading-[1.12] italic">
                      {featuredPost.title}
                   </h2>
                </div>
             </Link>
          </AnimatedSection>
        )}
      </section>

      {/* ─── LATEST INSIGHTS GRID ─── */}
      <section className="section-shell pt-12 pb-24 sm:pb-32 relative z-10">
        <BlogListClient posts={remainingPosts} />
      </section>

      {/* ─── CTA: THE STRATEGY CALL ─── */}
      <section className="section-shell pb-24">
         <BlogCtaClient phone={siteContent.phone} phoneHref={siteContent.phoneHref} />
      </section>
    </PageTransition>
  );
}
