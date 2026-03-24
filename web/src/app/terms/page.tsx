import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Alexiant Real Estate Kenya",
  description: "The legal terms governing your use of the Alexiant platform, property inquiries, and general professional engagement.",
};

export default function TermsPage() {
  return (
    <main className="section-shell pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Terms of Engagement</h1>
        <p className="mt-8 text-lg text-slate-600 leading-relaxed">
          By accessing and using this website, you agree to comply with and be bound by the following terms and conditions, which govern your relationship with Alexiant Real Estate regarding this platform.
        </p>

        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. Property Listings</h2>
            <p className="mt-4 text-slate-600 leading-7">
              All information regarding properties, including prices, availability, and features, is for general informational purposes. While we strive for accuracy, listing information is subject to change at any time without notice. Verified details are provided during formal consultation.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">2. Professional Advice</h2>
            <p className="mt-4 text-slate-600 leading-7">
              The content on this website does not constitute financial, legal, or investment advice. We recommend that all potential investors conduct their own due diligence and consult with professional legal or financial advisors before making any real estate decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">3. Intellectual Property</h2>
            <p className="mt-4 text-slate-600 leading-7">
              All content on this site, including text, logos, photography, and the interface design, is the property of Alexiant Real Estate. Unauthorized reproduction or use of these assets for commercial purposes is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">4. Limitation of Liability</h2>
            <p className="mt-4 text-slate-600 leading-7">
              We shall not be liable for any direct or indirect damages arising out of your access to, or use of, this website or the information contained herein to the fullest extent permitted by law.
            </p>
          </div>
        </section>
        
        <p className="mt-16 text-sm text-slate-400">Current version published: March 2026</p>
      </div>
    </main>
  );
}
