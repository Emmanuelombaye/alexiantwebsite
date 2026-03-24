import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Alexiant Real Estate Kenya",
  description: "Our commitment to protecting your digital footprint and ensuring total privacy for all property inquiries and data.",
};

export default function PrivacyPage() {
  return (
    <main className="section-shell pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Privacy Policy</h1>
        <p className="mt-8 text-lg text-slate-600 leading-relaxed">
          At Alexiant Real Estate, we treat your data with the same level of exclusivity as our portfolio. This privacy policy describes how we collect, use, and protect your information when you visit our website or interact with our services.
        </p>

        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">1. Data Collection</h2>
            <p className="mt-4 text-slate-600 leading-7">
              We collect information that you voluntarily provide to us when you inquire about a property, subscribe to our newsletter, or contact our advisors. This may include your name, email address, phone number, and preferences.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">2. Usage of Information</h2>
            <p className="mt-4 text-slate-600 leading-7">
              Your information is used solely to facilitate your inquiries, personalize your experience with our listings, and communicate updates regarding our portfolio. We never sell or share your data with third-party marketing companies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">3. Security Standards</h2>
            <p className="mt-4 text-slate-600 leading-7">
              We employ military-grade encryption and secure access protocols (including HMAC-signed tokens for internal administration) to ensure that your data remains confidential and protected from unauthorized access.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">4. Contact Us</h2>
            <p className="mt-4 text-slate-600 leading-7">
              If you have any questions regarding this policy or want to request a deletion of your data, please contact our privacy officer through our main contact channels.
            </p>
          </div>
        </section>
        
        <p className="mt-16 text-sm text-slate-400">Last updated: March 2026</p>
      </div>
    </main>
  );
}
