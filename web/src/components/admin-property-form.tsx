"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminImageUploader } from "@/components/admin-image-uploader";
import { MAX_PROPERTY_IMAGES } from "@/lib/properties/constants";
import type { Property, PropertyImage } from "@/types/property";

type AdminPropertyFormProps = {
  mode: "create" | "edit";
  initialProperty?: Property;
};

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseFeatures(value: string) {
  return parseLines(value).map((line) => {
    const [label, ...rest] = line.split(":");
    const normalizedLabel = label?.trim() || "Feature";
    const normalizedValue = rest.join(":").trim() || normalizedLabel;

    return {
      label: normalizedLabel,
      value: normalizedValue,
    };
  });
}

function serializeFeatures(property?: Property) {
  return property?.features.map((feature) => `${feature.label}: ${feature.value}`).join("\n") || "";
}

function serializeLines(values?: string[]) {
  return values?.join("\n") || "";
}

export function AdminPropertyForm({ mode, initialProperty }: AdminPropertyFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  
  const [title, setTitle] = useState(initialProperty?.title || "");
  const [slug, setSlug] = useState(initialProperty?.slug || "");
  const [slugEdited, setSlugEdited] = useState(false);
  const [propertyType, setPropertyType] = useState(
    initialProperty?.features.find(f => f.label === 'Type')?.value || 'House'
  );
  
  const [currency, setCurrency] = useState(
    initialProperty?.features.find(f => f.label === 'Currency')?.value ||
    (initialProperty?.priceSuffix?.match(/^(KES|USD|EUR|GBP|AED)\|/) ? initialProperty.priceSuffix.split('|')[0] : "KES")
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slugEdited && mode === "create") {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const [images, setImages] = useState<PropertyImage[]>(
    initialProperty?.images.map(img => typeof img === 'string' ? { url: img, slug: '' } : img) || []
  );
  const imageCount = images.length;
  const hasImageOverflow = imageCount > MAX_PROPERTY_IMAGES;

  function removeImage(indexToRemove: number) {
    if (window.confirm("Are you sure you want to permanently delete this property image?")) {
      setImages(images.filter((_, index) => index !== indexToRemove));
    }
  }

  function updateImageSlug(index: number, slug: string) {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, slug } : img));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (images.length === 0) {
      setStatus("error");
      setMessage("Add at least one property image.");
      return;
    }

    if (images.length > MAX_PROPERTY_IMAGES) {
      setStatus("error");
      setMessage(`Add a maximum of ${MAX_PROPERTY_IMAGES} property images.`);
      return;
    }

    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const payload = {
      title: String(formData.get("title") || ""),
      slug: String(formData.get("slug") || ""),
      category: String(formData.get("category") || "sale"),
      status: String(formData.get("status") || "available"),
      featured: formData.get("featured") === "on",
      price: Number(formData.get("price") || 0),
      priceSuffix: String(formData.get("priceSuffix") || ""),
      location: String(formData.get("location") || ""),
      summary: String(formData.get("summary") || ""),
      description: String(formData.get("description") || ""),
      features: [
        { label: 'Type', value: propertyType },
        { label: 'Currency', value: currency },
        ...parseFeatures(String(formData.get("features") || "")).filter(f => f.label !== 'Type' && f.label !== 'Currency' && f.label.toLowerCase() !== 'type' && f.label.toLowerCase() !== 'currency')
      ],
      amenities: parseLines(String(formData.get("amenities") || "")),
      images: images,
      coordinates: initialProperty?.coordinates || { lat: 0, lng: 0 },
      agent: {
        name: String(formData.get("agentName") || ""),
        role: String(formData.get("agentRole") || ""),
        phone: String(formData.get("agentPhone") || ""),
        email: String(formData.get("agentEmail") || ""),
      },
    };

    const endpoint = mode === "create" ? "/api/admin/properties" : `/api/admin/properties/${initialProperty?.id}`;
    const method = mode === "create" ? "POST" : "PATCH";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string; property?: Property };

      if (!response.ok || !result.property) {
        throw new Error(result.message || "Property save failed.");
      }

      setStatus("success");
      setMessage(result.message || "Property saved.");

      if (mode === "create") {
        router.push(`/admin/properties/${result.property.id}/edit`);
      }

      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Property save failed.");
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <section className="card-surface grid gap-6 p-8 lg:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">Title</label>
          <input name="title" required value={title} onChange={handleTitleChange} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Slug</label>
          <input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} placeholder="leave blank to auto-generate" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Category</label>
          <select name="category" defaultValue={initialProperty?.category || "sale"} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Status</label>
          <select name="status" defaultValue={initialProperty?.status || "available"} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="rented">Rented</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Currency</label>
          <select name="currency" value={currency} onChange={e => setCurrency(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
            <option value="KES">KES - Kenyan Shilling</option>
            <option value="USD">USD - US Dollar ($)</option>
            <option value="EUR">EUR - Euro (€)</option>
            <option value="GBP">GBP - British Pound (£)</option>
            <option value="AED">AED - UAE Dirham</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500">
            <option value="House">House / Villa</option>
            <option value="Plot">Plot / Land</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Price number</label>
          <input name="price" type="number" min="0" required defaultValue={initialProperty?.price} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Price suffix</label>
          <input name="priceSuffix" defaultValue={initialProperty?.priceSuffix?.includes('|') ? initialProperty.priceSuffix.split('|')[1] : initialProperty?.priceSuffix} placeholder="/ month" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700">Location</label>
          <input name="location" required defaultValue={initialProperty?.location} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700">Summary</label>
          <textarea name="summary" required rows={3} defaultValue={initialProperty?.summary} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-slate-700">Description</label>
          <textarea name="description" required rows={5} defaultValue={initialProperty?.description} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
        </div>
        <label className="flex items-center gap-3 text-sm font-medium text-slate-700 lg:col-span-2">
          <input name="featured" type="checkbox" defaultChecked={initialProperty?.featured} className="h-4 w-4 rounded border-slate-300 text-[#046A38] focus:ring-[#046A38]" />
          Mark as featured
        </label>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card-surface p-8">
          <label className="text-sm font-medium text-slate-700">Features</label>
          <textarea
            name="features"
            required
            rows={6}
            defaultValue={serializeFeatures(initialProperty).split('\n').filter(line => !line.toLowerCase().startsWith('type:') && !line.toLowerCase().startsWith('currency:')).join('\n')}
            placeholder="Bedrooms: 4&#10;Bathrooms: 3&#10;Parking: 2 cars"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-emerald-500"
          />
          <p className="mt-2 text-sm text-slate-500">Use one feature per line in the format Label: Value.</p>

          <label className="mt-6 block text-sm font-medium text-slate-700">Amenities</label>
          <textarea
            name="amenities"
            rows={6}
            defaultValue={serializeLines(initialProperty?.amenities)}
            placeholder="Swimming pool&#10;Backup water storage&#10;Fiber internet ready"
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-emerald-500"
          />
          <p className="mt-2 text-sm text-slate-500">Use one amenity per line.</p>
        </div>

        <div className="card-surface space-y-6 p-8">
          <div>
            <label className="text-sm font-medium text-slate-700">Advisor name</label>
            <input name="agentName" required defaultValue={initialProperty?.agent.name} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Advisor role</label>
            <input name="agentRole" required defaultValue={initialProperty?.agent.role} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Advisor phone</label>
            <input name="agentPhone" required defaultValue={initialProperty?.agent.phone} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Advisor email</label>
            <input name="agentEmail" type="email" required defaultValue={initialProperty?.agent.email} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" />
          </div>
        </div>
      </section>

      <section className="card-surface space-y-6 p-8">
        <div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="text-sm font-medium text-slate-700">Property Images & SEO Slugs</label>
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${hasImageOverflow ? "text-rose-600" : "text-emerald-700"}`}>
              {imageCount}/{MAX_PROPERTY_IMAGES} images
            </p>
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Ensure every image has a descriptive slug (e.g. &quot;modern-villa-pool-view&quot;) for maximum SEO impact. Each listing can have up to {MAX_PROPERTY_IMAGES} images.
          </p>
          {hasImageOverflow ? (
            <p className="mt-2 text-sm text-rose-600">Reduce the image list to {MAX_PROPERTY_IMAGES} or fewer before saving.</p>
          ) : null}
        </div>
        {images.length > 0 ? (
          <div>
            <p className="text-sm font-medium text-slate-700">Image Management</p>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {images.map((image, index) => (
                <div key={`${image.url}-${index}`} className="flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
                  <div className="relative aspect-[4/3] w-full bg-slate-200">
                    <Image
                      src={image.url}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 40vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    <div>
                       <label className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400 mb-1 block">SEO Slug / Alt Text</label>
                       <input 
                         value={image.slug}
                         onChange={(e) => updateImageSlug(index, e.target.value)}
                         placeholder="e.g. beachfront-villa-exterior"
                         className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-emerald-500"
                       />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[0.65rem] font-bold text-slate-400"># {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-xs font-bold uppercase tracking-widest text-rose-600 hover:text-rose-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <AdminImageUploader
          currentCount={imageCount}
          maxImages={MAX_PROPERTY_IMAGES}
          onUploaded={(url) => {
            if (images.length >= MAX_PROPERTY_IMAGES) {
              setStatus("error");
              setMessage(`You can add up to ${MAX_PROPERTY_IMAGES} property images.`);
              return;
            }

            setStatus("idle");
            setMessage("");
            setImages((current) => [...current, { url, slug: "" }]);
          }}
        />
      </section>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">This listing will publish with a dedicated detail page, advisor contact block and up to {MAX_PROPERTY_IMAGES} client-facing images.</p>
        <button
          type="submit"
          disabled={status === "submitting" || hasImageOverflow}
          className="rounded-full bg-[#046A38] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Saving..." : mode === "create" ? "Create property" : "Save changes"}
        </button>
      </div>

      {message ? (
        <p className={`text-sm ${status === "success" ? "text-emerald-700" : "text-rose-600"}`}>{message}</p>
      ) : null}
    </form>
  );
}