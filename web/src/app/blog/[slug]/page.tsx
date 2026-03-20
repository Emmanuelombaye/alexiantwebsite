import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, listBlogPosts } from "@/lib/blog/service";
import { PageTransition, AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animated-section";
import Link from "next/link";
import { buildBreadcrumbList, toJsonLdScript } from "@/lib/seo/jsonld";
import { getSiteUrl } from "@/lib/seo/site-url";
import { toIsoDate } from "@/lib/seo/dates";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const p = await params;
  const post = await getBlogPostBySlug(p.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Alexiant Real Estate Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.images || [],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const p = await params;
  const post = await getBlogPostBySlug(p.slug);
  if (!post) notFound();

  const otherPosts = (await listBlogPosts()).filter(op => op.id !== post.id).slice(0, 2);
  const baseUrl = getSiteUrl();
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;
  const breadcrumbSchema = buildBreadcrumbList([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: canonicalUrl },
  ]);
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: (post.images || []).map(img => img.startsWith("http") ? img : `${baseUrl}${img}`),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Alexiant Real Estate",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.svg`,
      },
    },
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.date),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  const postImages = post.images || [];
  const coverImage = postImages[0] || "/demo-media/blog/post-1.jpg";
  const galleryImages = postImages.slice(1, 3);

  return (
    <PageTransition className="pb-20 bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLdScript(blogPostingSchema)} />
      {/* --- HEADER --- */}
      <div className="pt-24 lg:pt-28 bg-white" />
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-24 overflow-hidden mx-4 sm:mx-6 rounded-[2.5rem] lg:rounded-[4rem] shadow-2xl group">
        <img src={coverImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="section-shell relative z-10 text-left">
           <AnimatedSection direction="up" className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-[0.6rem] font-black uppercase tracking-[0.4em] text-[#D4AF37] backdrop-blur-md mb-8">
                ✦ {post.category}
              </span>
              <h1 className="text-4xl md:text-7xl font-display font-medium italic text-white tracking-tight leading-[1.05] drop-shadow-lg">
                 {post.title}
              </h1>
              <div className="mt-12 flex items-center gap-8 text-white/60 text-[0.65rem] font-bold uppercase tracking-[0.3em]">
                 <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                    <span>Written by {post.author}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span>{post.date}</span>
                 </div>
              </div>
           </AnimatedSection>
        </div>
      </section>

      {/* --- CONTENT --- */}
      <section className="section-shell py-24">
         <div className="grid lg:grid-cols-[1fr_380px] gap-24 items-start">
            <AnimatedSection direction="up">
               <div className="prose prose-slate prose-xl max-w-none prose-headings:font-display prose-headings:italic prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-[1.8] prose-a:text-[#046A38] prose-strong:text-slate-950">
                  <div className="blog-content leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
               </div>

               {/* GALLERY INTEGRATION */}
               {galleryImages.length > 0 && (
                 <div className="mt-24 grid md:grid-cols-2 gap-8">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl group">
                         <img src={img} alt={`${post.title} detail ${idx + 2}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    ))}
                 </div>
               )}

               <div className="mt-32 p-10 rounded-[3rem] bg-slate-50 border border-slate-100 italic text-slate-500 text-sm leading-relaxed relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-[#D4AF37]/5 blur-2xl rounded-full" />
                  <span className="text-[#D4AF37] font-black not-italic block mb-4 uppercase tracking-[0.3em] text-[0.6rem]">Market Protocol</span>
                  Disclaimer: This article is for architectural and informational purposes only and does not constitute technical or legal real estate advice. Alexiant Real Estate encourages all investors to perform independent due diligence before committing to coastal asset acquisitions in Kenya.
               </div>
            </AnimatedSection>

            <aside className="sticky top-40 space-y-16">
               <div className="rounded-[3rem] bg-[#0f0f12] p-10 border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-12 -right-12 h-32 w-32 bg-[#D4AF37]/10 blur-3xl rounded-full transition-all group-hover:scale-150" />
                  <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-6 block">Concierge Entry</span>
                  <h3 className="text-2xl font-display font-semibold italic text-white mb-6 leading-tight">Expert Advisory & <br /><span className="not-italic font-black text-[#D4AF37]">Consultation</span></h3>
                  <p className="text-white/50 mb-10 leading-relaxed text-sm font-light">
                    Our senior advisors provide granular technical data on Diani land plots, holiday villa ROIs, and legal frameworks for international buyers.
                  </p>
                  <Link href="/contact" className="group relative inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#D4AF37] px-8 text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#011611] shadow-xl hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)] transition-all">
                     <span>Secure Consultation</span>
                  </Link>
               </div>

               <div>
                  <div className="flex items-center gap-4 mb-10">
                     <span className="h-px flex-1 bg-slate-100" />
                     <h3 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-400">Regional Insights</h3>
                     <span className="h-px flex-1 bg-slate-100" />
                  </div>
                  <div className="grid gap-10">
                     {otherPosts.map(op => (
                       <Link key={op.id} href={`/blog/${op.slug}`} className="group block">
                          <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-md border border-slate-50">
                             <img src={op.images?.[0] || "/demo-media/blog/post-1.jpg"} alt={op.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                             <div className="absolute inset-0 bg-slate-900/5 mix-blend-overlay" />
                          </div>
                          <h4 className="font-display font-semibold text-lg italic text-slate-900 group-hover:text-[#046A38] transition-colors line-clamp-2 leading-snug mb-2">
                             {op.title}
                          </h4>
                          <span className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                             Read Insight <span>→</span>
                          </span>
                       </Link>
                     ))}
                  </div>
               </div>
            </aside>
         </div>
      </section>
    </PageTransition>
  );
}
