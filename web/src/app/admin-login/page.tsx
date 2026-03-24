import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminRequest } from "@/lib/admin-auth";
import type { Metadata } from "next";

type AdminLoginPageProps = {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
};

function getSafeRedirectPath(value?: string) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/admin";
  }

  return value;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  // Auth uses ADMIN_PORTAL_PASSWORD, NOT Supabase — check the right env var
  const authEnabled = Boolean(process.env.ADMIN_PORTAL_PASSWORD);
  const params = await searchParams;
  const redirectTo = getSafeRedirectPath(params.redirectTo);
  const isAdmin = await isAdminRequest();

  if (isAdmin) {
    redirect(redirectTo);
  }

  return (
    <div className="section-shell py-16 pb-20">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="dark-panel rounded-[2rem] p-8 md:p-10">
          <p className="section-kicker text-emerald-300">Secure admin access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Admin login</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            This login screen is now wired for Supabase Auth so the admin area can be protected once your project credentials are added.
          </p>
        </div>

        <div className="card-surface p-8">
          <p className="section-kicker">Sign in</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Access the Alexiant admin workspace</h2>
          <p className="mt-4 leading-7 text-slate-600">
            Enter the admin password to access the Alexiant control room. Public lead capture stays available, while admin pages remain protected.
          </p>
          {!authEnabled ? (
            <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
              Add <code>ADMIN_PORTAL_PASSWORD</code> to your environment variables to activate admin login.
            </div>
          ) : null}
          <AdminLoginForm authEnabled={authEnabled} redirectTo={redirectTo} />
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-snippet": 0,
      "max-image-preview": "none",
      "max-video-preview": 0,
    },
  },
};