import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPropertyDeleteButton } from "@/components/admin-property-delete-button";
import { AdminPropertyForm } from "@/components/admin-property-form";
import { MAX_PROPERTY_IMAGES } from "@/lib/properties/constants";
import { getPropertyById } from "@/lib/properties/service";

export const dynamic = "force-dynamic";

type EditAdminPropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAdminPropertyPage({ params }: EditAdminPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin/properties" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            ← Back to inventory
          </Link>
          <div className="card-surface mt-4 p-8">
            <p className="section-kicker">Edit listing</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">{property.title}</h2>
            <p className="mt-4 max-w-3xl text-slate-600">
              Update listing details, manage up to {MAX_PROPERTY_IMAGES} images, or remove the property from the admin inventory.
            </p>
          </div>
        </div>
        <AdminPropertyDeleteButton propertyId={property.id} propertyTitle={property.title} redirectTo="/admin/properties" />
      </div>

      <AdminPropertyForm mode="edit" initialProperty={property} />
    </div>
  );
}