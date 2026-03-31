import Link from "next/link";
import { AdminPropertyDeleteButton } from "@/components/admin-property-delete-button";
import { formatPropertyPrice, titleCase } from "@/lib/format";
import { MAX_PROPERTY_IMAGES } from "@/lib/properties/constants";
import { listProperties } from "@/lib/properties/service";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const properties = await listProperties();
  const availableCount = properties.filter((property) => property.status === "available").length;
  const saleCount = properties.filter((property) => property.category === "sale").length;
  const rentCount = properties.filter((property) => property.category === "rent").length;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{properties.length}</p>
          <p className="mt-2 text-sm text-slate-500">Editable property records</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{availableCount}</p>
          <p className="mt-2 text-sm text-slate-500">Currently available listings</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-3xl font-semibold text-slate-950">{saleCount} / {rentCount}</p>
          <p className="mt-2 text-sm text-slate-500">Sale vs rent split</p>
        </div>
      </section>

      <section className="card-surface overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Property control view</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">Inventory overview</h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="max-w-xl text-sm text-slate-500">
              Keep listings clean and client-ready, with up to {MAX_PROPERTY_IMAGES} images per property and direct links to every public detail page.
            </p>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-6 py-3 text-[0.7rem] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Add property
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.22em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Photos</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Advisor</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <tr key={property.id} className="border-t border-slate-100 align-top">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-950">{property.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{property.slug}</p>
                      <Link href={`/properties/${property.slug}`} className="mt-2 inline-block text-emerald-700 hover:text-emerald-800">
                        View public page →
                      </Link>
                    </td>
                    <td className="px-6 py-4">{titleCase(property.category)}</td>
                    <td className="px-6 py-4">{titleCase(property.status)}</td>
                    <td className="px-6 py-4">{property.featured ? "Yes" : "No"}</td>
                    <td className="px-6 py-4">{property.images.length} / {MAX_PROPERTY_IMAGES}</td>
                    <td className="px-6 py-4">{formatPropertyPrice(property.price, property.priceSuffix, property.features.find(f => f.label === 'Currency')?.value)}</td>
                    <td className="px-6 py-4">{property.agent.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex min-w-40 flex-col gap-3">
                        <Link href={`/admin/properties/${property.id}/edit`} className="font-medium text-slate-950 hover:text-emerald-700">
                          Edit listing →
                        </Link>
                        <AdminPropertyDeleteButton propertyId={property.id} propertyTitle={property.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="border-t border-slate-100">
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No properties are available yet. Use the add property action to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}