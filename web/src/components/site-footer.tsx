import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { Facebook, Instagram, Linkedin, Twitter, PhoneCall } from "lucide-react";
import { SecureContact } from "@/components/secure-contact";
import { FooterMap } from "@/components/footer-map";
import { RequestCallBackModal } from "@/components/request-callback-modal";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export function SiteFooter() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#D4AF37]/20 bg-gradient-to-br from-[#022c22] via-[#053a2f] to-[#011611] pt-16 md:pt-32 pb-0 flex flex-col text-white">
      <style>{`
        @keyframes footer-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-footer-slide {
          animation: footer-slide 180s linear infinite;
        }
      `}</style>
      
      {/* Dynamic Luxury Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.14] mix-blend-luminosity">
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#022c22] via-transparent to-[#011611]" />
        <div className="animate-footer-slide flex h-full w-max">
           {[
             '/demo-media/neighborhoodImages/diani-1.png',
             '/demo-media/neighborhoodImages/galu-1.png',
             '/demo-media/neighborhoodImages/tiwi-1.png',
             '/demo-media/neighborhoodImages/watamu-1.png',
             '/demo-media/neighborhoodImages/diani-1.png',
           ].map((src, i) => (
             <div key={i} className="relative h-full w-[1200px] flex-shrink-0">
               <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
               <div className="absolute inset-y-0 right-0 z-10 w-[400px] bg-gradient-to-l from-[#022c22] to-transparent pointer-events-none" />
               <div className="absolute inset-y-0 left-0 z-10 w-[400px] bg-gradient-to-r from-[#022c22] to-transparent pointer-events-none" />
             </div>
           ))}
        </div>
      </div>

      <div className="absolute -top-48 -left-48 z-10 h-[600px] w-[600px] rounded-full bg-[#D4AF37]/10 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 -right-48 z-10 h-[400px] w-[400px] rounded-full bg-[#058C42]/20 blur-[130px] pointer-events-none" />

      <div className="section-shell relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1fr_1.2fr] lg:gap-x-12 lg:gap-y-20">
          
          {/* LOGO & HQ COLUMN */}
          <div className="col-span-2 space-y-6 md:col-span-4 lg:col-span-1 lg:space-y-10">
            <Link href="/" className="group inline-flex items-center">
              <div className="relative rounded-2xl bg-white/5 p-4 backdrop-blur-md ring-1 ring-[#D4AF37]/30 transition-transform group-hover:scale-[1.02]">
                <img 
                  src="/logo.svg" 
                  alt="Alexiant Real Estate Logo"
                  className="h-10 md:h-12 w-auto brightness-200 contrast-125 grayscale invert transition-all" 
                />
              </div>
            </Link>
            
            <p className="max-w-[340px] font-display text-[0.8rem] md:text-[0.95rem] italic leading-relaxed tracking-wide text-white opacity-60">
              Listing the coast with <span className="font-bold not-italic text-[#D4AF37]">The gold standard.</span>
            </p>
            
            <div className="flex flex-col gap-4">
              <RequestCallBackModal />
            </div>
          </div>

          {/* PORTFOLIO */}
          <div className="md:col-span-1">
            <h4 className="mb-4 md:mb-8 font-display text-[0.95rem] md:text-[1.1rem] font-bold tracking-widest text-[#D4AF37] uppercase">Properties</h4>
            <nav className="flex flex-col gap-3 md:gap-5 text-[0.75rem] md:text-[0.85rem] font-medium tracking-wide">
              <Link href="/properties?category=sale" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">For Sale</Link>
              <Link href="/properties?category=rent" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">For Rent</Link>
              <Link href="/neighborhoods" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">Neighborhoods</Link>
              <Link href="/valuation" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">Valuation</Link>
            </nav>
          </div>

          {/* AGENCY */}
          <div className="md:col-span-1">
            <h4 className="mb-4 md:mb-8 font-display text-[0.95rem] md:text-[1.1rem] font-bold tracking-widest text-[#D4AF37] uppercase">Company</h4>
            <nav className="flex flex-col gap-3 md:gap-5 text-[0.75rem] md:text-[0.85rem] font-medium tracking-wide">
              <Link href="/about" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">About</Link>
              <Link href="/services" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">Services</Link>
              <Link href="/blog" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">Blog</Link>
              <Link href="/contact" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100">Contact</Link>
              <Link href="/admin" className="opacity-70 transition-all duration-300 hover:translate-x-2 hover:text-[#D4AF37] hover:opacity-100 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                Admin
              </Link>
            </nav>
          </div>

          {/* DOWNLOAD & SOCIALS */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="mb-10">
               <h4 className="mb-4 font-display text-[0.95rem] md:text-[1.1rem] font-bold tracking-widest text-[#D4AF37] uppercase">Mobile Access</h4>
               <p className="text-[0.65rem] md:text-[0.75rem] italic text-white/50 mb-4 tracking-wide">Take your executive portfolio anywhere.</p>
               <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <a href="#" className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all group overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                     <svg className="w-6 h-6 text-white/90 group-hover:text-[#D4AF37] transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.365 7.043c-.85 0-2.148-1-3.535-.968-1.84.025-3.52 1.054-4.464 2.68-2.028 3.498-.515 8.7 1.408 11.455.938 1.345 2.052 2.898 3.528 2.84 1.408-.052 1.933-.907 3.633-.907 1.685 0 2.162.907 3.648.88 1.543-.025 2.502-1.41 3.407-2.73 1.04-1.517 1.48-3.016 1.505-3.097-.037-.01-2.905-1.12-2.935-4.484-.025-2.82 2.275-4.184 2.384-4.244-1.328-1.942-3.385-2.203-4.11-2.268-1.625-.152-3.375.98-4.156.98zM16.96 2.973c.828-1.02 1.385-2.427 1.233-3.824-1.182.046-2.636.79-3.483 1.804-.76.892-1.417 2.336-1.24 3.712 1.326.104 2.66-.685 3.49-1.692z"/>
                     </svg>
                     <div className="flex flex-col items-start -space-y-0.5 relative z-10">
                        <span className="text-[0.45rem] font-medium uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">Download on the</span>
                        <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors tracking-wide">App Store</span>
                     </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all group overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                     <svg className="w-5 h-5 ml-0.5 text-white/90 group-hover:text-[#D4AF37] transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.587-1.415V3.229c0-.528.21-.1.586-.14zM14.636 12.84l3.141 3.14-11.69 6.643 8.549-8.55v-.002zM18.886 8.586l-4.25 4.254-4.25-4.253L18.887 8.586zm1.182 2.01l-1.393-1.392-3.195 3.196 3.195 3.195 1.393-1.393a1.996 1.996 0 0 0 0-3.605z"/>
                     </svg>
                     <div className="flex flex-col items-start -space-y-0.5 relative z-10 ml-0.5">
                        <span className="text-[0.45rem] font-medium uppercase tracking-[0.2em] text-white/50 group-hover:text-white/80 transition-colors">Get it on</span>
                        <span className="text-xs font-semibold text-white/90 group-hover:text-white transition-colors tracking-wide">Google Play</span>
                     </div>
                  </a>
               </div>
            </div>

            <div>
               <h4 className="mb-4 font-display text-[0.8rem] font-bold tracking-[0.2em] text-[#D4AF37] uppercase">Follow Us</h4>
               <div className="flex items-center gap-4">
                  {[
                    { icon: Facebook, href: "https://www.facebook.com/p/Alexiant-Real-Estate-61555242691281/" },
                    { icon: TikTokIcon, href: "https://www.tiktok.com/@alexiantrealestate" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/alexiant-estate-99a18532b/" },
                    { icon: Instagram, href: "https://www.instagram.com/alexiant/" },
                  ].map((Social, i) => (
                    <a key={i} href={Social.href} target="_blank" rel="noopener noreferrer" className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]">
                       <Social.icon className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-[#D4AF37] transition-colors" />
                    </a>
                  ))}
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM WHITE BAR */}
      <div className="w-full bg-white relative z-20 py-8 px-4 sm:px-8 mt-16 md:mt-24 border-t-4 border-[#046A38]">
         <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-between gap-6 text-[0.65rem] md:text-[0.7rem] font-medium tracking-[0.2em] text-[#046A38] md:flex-row">
            <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-3 md:gap-0">
              <span className="font-bold">© {new Date().getFullYear()} Alexiant Group.</span>
              <span className="mx-4 md:mx-6 hidden opacity-30 md:inline">|</span> 
              <span className="italic uppercase text-[0.5rem] tracking-[0.4em] mb-2 md:mb-0 opacity-90 font-bold tracking-widest text-[#058C42]">Crafted For Excellence</span>
              <span className="mx-4 hidden opacity-30 md:inline">|</span>
              <a 
                href="https://wa.me/254777770755?text=Hello%20DonFilm%20Creations!%20I%20saw%20the%20Alexiant%20Real%20Estate%20website%20and%20I%20am%20interested%20in%20your%20executive%20website%20development%20and%20premium%20tech%20services%20(Digital%20Marketing,%20Social%20Management,%20Cinema%20&%20Videography)." 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.25em] transition-all hover:text-[#022c22] opacity-90 flex items-center gap-1.5"
              >
                Powered By <span className="font-black text-[#D4AF37] hover:text-[#022c22] transition-colors tracking-widest drop-shadow-sm">DonFilm Creations</span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <Link href="/privacy" className="font-bold transition-colors hover:text-[#022c22]">Privacy Policy</Link>
              <Link href="/terms" className="font-bold transition-colors hover:text-[#022c22]">Agreement</Link>
              <div className="flex items-center gap-2">
                 <span className="block h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                 <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                    <SecureContact type="phone" value={siteContent.phone} />
                 </span>
              </div>
              <a 
                href="https://www.google.com/maps/place/ALEXIANT+REAL+ESTATE/@-4.322754,39.5580223,17z/data=!3m1!4b1!4m6!3m5!1s0x184045176628ef35:0xda96e15ad0e3b4ef!8m2!3d-4.322754!4d39.5580223!16s%2Fg%2F11y3z1z20y?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-transform hover:scale-105"
              >
                 <span className="block h-2 w-2 rounded-full bg-[#058C42] shadow-[0_0_12px_rgba(5,140,66,0.5)] animate-pulse" />
                 <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#058C42] group-hover:text-[#022c22] transition-colors">Diani HQ</span>
              </a>
            </div>
         </div>

         {/* EXACT OFFICE LOCATION MAP */}
         <div className="max-w-[1400px] w-full mx-auto mt-8 pt-6 md:pt-8 border-t border-slate-200/60 flex flex-col gap-4 md:gap-6 justify-center items-center text-center">
             <h4 className="font-black text-black tracking-[0.2em] text-sm md:text-[0.95rem] uppercase flex items-center gap-2">
               OFFICE LOCATION
             </h4>
             <div className="w-full">
               <FooterMap />
             </div>
         </div>
      </div>
    </footer>
  );
}