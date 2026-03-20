import { listLeadInquiries } from "@/lib/leads/service";
import { titleCase } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await listLeadInquiries();
  const newCount = leads.filter((lead) => lead.status === "new").length;
  const propertyLeadCount = leads.filter((lead) => lead.source === "property-page").length;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{leads.length}</p>
          <p className="mt-2 text-sm text-slate-500">Inquiry records available to inspect</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{newCount}</p>
          <p className="mt-2 text-sm text-slate-500">New inquiries awaiting follow-up</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{propertyLeadCount}</p>
          <p className="mt-2 text-sm text-slate-500">Leads originating from property detail pages</p>
        </div>
      </section>

      <section className="card-surface overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <p className="section-kicker">Lead inbox</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Inquiry monitoring</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
            Review buyer, tenant, seller and investor requests in one place, including inquiries coming directly from property detail pages.
          </p>
        </div>

        <div className="grid gap-4 p-6">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700">{titleCase(lead.intent)}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700">{titleCase(lead.status)}</span>
                    <span className="rounded-full bg-white px-3 py-1 text-slate-700">{titleCase(lead.source.replace("-", " "))}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">{lead.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {lead.email} · {lead.phone}
                  </p>
                  {lead.propertySlug ? (
                    <p className="mt-2 text-sm text-slate-500">Property: {lead.propertySlug}</p>
                  ) : null}
                </div>
                <p className="text-sm text-slate-500">
                  {new Intl.DateTimeFormat("en-KE", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(lead.receivedAt))}
                </p>
              </div>
              <p className="mt-4 leading-7 text-slate-600">{lead.message}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}