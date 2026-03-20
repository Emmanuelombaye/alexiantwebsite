import Link from "next/link";
import { AdminPropertyForm } from "@/components/admin-property-form";
import { MAX_PROPERTY_IMAGES } from "@/lib/properties/constants";

export const dynamic = "force-dynamic";

export default function NewAdminPropertyPage() {
  return (
    <div className="space-y-8">
      <Link href="/admin/properties" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
        ← Back to inventory
      </Link>

      <div className="card-surface p-8">
        <p className="section-kicker">Create listing</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">Add a new property</h2>
        <p className="mt-4 max-w-3xl text-slate-600">
          Add the public-facing details for a home, plot or rental listing, including summary, highlights, advisor details and up to {MAX_PROPERTY_IMAGES} images.
        </p>
      </div>

      <AdminPropertyForm mode="create" />
    </div>
  );
}