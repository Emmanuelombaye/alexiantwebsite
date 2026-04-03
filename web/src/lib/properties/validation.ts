import { MAX_PROPERTY_IMAGES } from "@/lib/properties/constants";
import type { Property, PropertyAgent, PropertyCoordinates, PropertyFeature, PropertyImage, PropertyPayload } from "@/types/property";

type PropertyValidationResult =
  | { ok: true; data: PropertyPayload }
  | { ok: false; message: string };

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptionalText(value: unknown) {
  const normalized = normalizeText(value);
  return normalized || undefined;
}

function normalizeBoolean(value: unknown) {
  return value === true || value === "true" || value === "on" || value === 1;
}

function normalizeTextArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value.map((item) => normalizeText(item)).filter(Boolean);
}

function normalizeFeatures(value: unknown): PropertyFeature[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const feature = item as Record<string, unknown>;
      const label = normalizeText(feature.label);
      const detail = normalizeText(feature.value);

      if (!label || !detail) {
        return null;
      }

      return { label, value: detail };
    })
    .filter((feature): feature is PropertyFeature => Boolean(feature));
}

function normalizeCoordinates(value: unknown): PropertyCoordinates {
  if (!value || typeof value !== "object") {
    return { lat: 0, lng: 0 };
  }

  const coordinates = value as Record<string, unknown>;
  const lat = Number(coordinates.lat);
  const lng = Number(coordinates.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { lat: 0, lng: 0 };
  }

  return { lat, lng };
}

function normalizeAgent(value: unknown): PropertyAgent | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const agent = value as Record<string, unknown>;
  const name = normalizeText(agent.name);
  const role = normalizeText(agent.role);
  const phone = normalizeText(agent.phone);
  const email = normalizeText(agent.email);

  if (!name || !role || !phone || !email) {
    return null;
  }

  return { name, role, phone, email };
}

function isPropertyCategory(value: unknown): value is Property["category"] {
  return value === "sale" || value === "rent";
}

function isPropertyStatus(value: unknown): value is Property["status"] {
  return value === "available" || value === "sold" || value === "rented";
}

export function createPropertySlug(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || "property";
}

function normalizeImages(value: unknown): (string | PropertyImage)[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        const trimmed = item.trim();
        return trimmed || null;
      }
      if (item && typeof item === "object") {
        const img = item as Record<string, unknown>;
        const url = normalizeText(img.url);
        const slug = normalizeText(img.slug);
        if (!url) return null;
        return { url, slug };
      }
      return null;
    })
    .filter((item): item is string | PropertyImage => Boolean(item));
}

// ... existing code ...

export function validatePropertyPayload(value: unknown): PropertyValidationResult {
  if (!value || typeof value !== "object") {
    return { ok: false, message: "Invalid property payload." };
  }

  const payload = value as Record<string, unknown>;
  const title = normalizeText(payload.title);
  const category = payload.category;
  const status = payload.status;
  const price = Number(payload.price);
  const location = normalizeText(payload.location);
  const summary = normalizeText(payload.summary);
  const description = normalizeText(payload.description);
  const features = normalizeFeatures(payload.features);
  const amenities = normalizeTextArray(payload.amenities);
  const images = normalizeImages(payload.images);
  const coordinates = normalizeCoordinates(payload.coordinates);
  const agent = normalizeAgent(payload.agent);

  if (!title) {
    return { ok: false, message: "Property title is required." };
  }

  if (!isPropertyCategory(category)) {
    return { ok: false, message: "Choose a valid property category." };
  }

  if (!isPropertyStatus(status)) {
    return { ok: false, message: "Choose a valid property status." };
  }

  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, message: "Price must be a valid number." };
  }

  if (!location || !summary || !description) {
    return { ok: false, message: "Location, summary and description are required." };
  }

  if (features.length === 0) {
    return { ok: false, message: "Add at least one property feature." };
  }

  if (images.length === 0) {
    return { ok: false, message: "Add at least one property image." };
  }

  if (images.length > MAX_PROPERTY_IMAGES) {
    return { ok: false, message: `Add a maximum of ${MAX_PROPERTY_IMAGES} property images.` };
  }

  if (!agent) {
    return { ok: false, message: "Complete the assigned advisor details." };
  }

  return {
    ok: true,
    data: {
      slug: createPropertySlug(normalizeText(payload.slug) || title),
      title,
      category,
      status,
      featured: normalizeBoolean(payload.featured),
      price: Math.round(price),
      priceSuffix: normalizeOptionalText(payload.priceSuffix),
      location,
      summary,
      description,
      features,
      amenities,
      images,
      coordinates,
      agent,
    },
  };
}