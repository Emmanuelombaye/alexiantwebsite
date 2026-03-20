import Link from "next/link";
import { siteContent } from "@/data/site-content";
import { listLeadInquiries } from "@/lib/leads/service";
import { listProperties } from "@/lib/properties/service";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [leads, properties] = await Promise.all([listLeadInquiries(), listProperties()]);
  const availableCount = properties.filter((property) => property.status === "available").length;
  const archivedCount = properties.filter((property) => property.status !== "available").length;
  const featuredCount = properties.filter((property) => property.featured).length;
  const recentLeads = leads.slice(0, 3);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{properties.length}</p>
          <p className="mt-2 text-sm text-slate-500">Listings in the current portfolio</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{availableCount}</p>
          <p className="mt-2 text-sm text-slate-500">Listings currently available to clients</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{featuredCount}</p>
          <p className="mt-2 text-sm text-slate-500">Listings highlighted on the public website</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{leads.length}</p>
          <p className="mt-2 text-sm text-slate-500">Inquiry records in the lead inbox</p>
        </div>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface p-8">
          <p className="section-kicker">Workspace modules</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">What the control room already supports</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {siteContent.adminModules.map((module) => (
              <div key={module} className="rounded-3xl bg-slate-50 p-5 text-slate-700">
                {module}
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-8">
          <p className="section-kicker">Operations view</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Current website status</h2>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li>• Listings already support category, status, featured visibility and advisor assignment.</li>
            <li>• Public listing pages and detail pages read from the shared property service.</li>
            <li>• Contact and viewing requests feed into the lead inbox workflow.</li>
            <li>• Admin route protection can be activated once Supabase environment variables are added.</li>
            <li>• Property creation and editing already support up to five listing images.</li>
          </ul>
          <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-950">Easy-to-edit files</p>
            <ul className="mt-3 space-y-2">
              <li>• <code>src/data/site-content.ts</code></li>
              <li>• <code>src/data/properties.ts</code></li>
              <li>• <code>src/data/property-inventory.ts</code></li>
              <li>• <code>src/components/admin-property-form.tsx</code></li>
              <li>• <code>src/app/api/admin/properties/route.ts</code></li>
            </ul>
            <p className="mt-4">Archived / unavailable inventory currently shown: {archivedCount}</p>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-surface p-8">
          <p className="section-kicker">Navigation</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Move between daily admin tasks</h2>
          <div className="mt-6 grid gap-4">
            <Link href="/admin/properties" className="rounded-3xl bg-slate-50 p-5 text-slate-700 transition hover:bg-slate-100">
              <p className="font-semibold text-slate-950">Property inventory</p>
              <p className="mt-2 text-sm">Create, edit and review listing status, photo count, advisor assignment and public page links.</p>
            </Link>
            <Link href="/admin/blog" className="rounded-3xl bg-slate-50 p-5 text-slate-700 transition hover:bg-slate-100">
              <p className="font-semibold text-slate-950">Blog & Insights</p>
              <p className="mt-2 text-sm">Manage SEO articles, market guides, and investor news to drive traffic.</p>
            </Link>
            <Link href="/admin/leads" className="rounded-3xl bg-slate-50 p-5 text-slate-700 transition hover:bg-slate-100">
              <p className="font-semibold text-slate-950">Lead inbox</p>
              <p className="mt-2 text-sm">Inspect incoming inquiries from contact forms and property detail pages.</p>
            </Link>
          </div>
        </div>

        <div className="card-surface p-8">
          <p className="section-kicker">Recent inquiries</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Latest lead preview</h2>
          <div className="mt-6 space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-950">{lead.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {lead.intent} inquiry{lead.propertySlug ? ` for ${lead.propertySlug}` : ""}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{lead.message}</p>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
                No leads have been submitted yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}