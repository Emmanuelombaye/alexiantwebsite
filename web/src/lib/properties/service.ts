import {
  createPropertyInventoryItem,
  deletePropertyInventoryItem,
  getPropertyInventoryById,
  getPropertyInventoryBySlug,
  listPropertyInventory,
  updatePropertyInventoryItem,
} from "@/data/property-inventory";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Property, PropertyAgent, PropertyCoordinates, PropertyFeature, PropertyPayload } from "@/types/property";

type SupabasePropertyRow = {
  id: string;
  slug: string;
  title: string;
  category: Property["category"];
  status: Property["status"];
  featured: boolean;
  price: number | string;
  price_suffix: string | null;
  location: string;
  summary: string;
  description: string;
  features: PropertyFeature[] | null;
  amenities: string[] | null;
  images: string[] | null;
  coordinates: PropertyCoordinates;
  agent: PropertyAgent;
};

const propertySelect =
  "id, slug, title, category, status, featured, price, price_suffix, location, summary, description, features, amenities, images, coordinates, agent";

function mapPropertyRow(row: SupabasePropertyRow): Property {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    status: row.status,
    featured: row.featured,
    price: Number(row.price),
    priceSuffix: row.price_suffix || undefined,
    location: row.location,
    summary: row.summary,
    description: row.description,
    features: Array.isArray(row.features) ? row.features : [],
    amenities: Array.isArray(row.amenities) ? row.amenities : [],
    images: Array.isArray(row.images) ? row.images : [],
    coordinates: row.coordinates,
    agent: row.agent,
  };
}

function toPropertyRow(payload: PropertyPayload) {
  return {
    slug: payload.slug,
    title: payload.title,
    category: payload.category,
    status: payload.status,
    featured: payload.featured,
    price: payload.price,
    price_suffix: payload.priceSuffix ?? null,
    location: payload.location,
    summary: payload.summary,
    description: payload.description,
    features: payload.features,
    amenities: payload.amenities,
    images: payload.images.map((img) => (typeof img === "string" ? img : img.url)),
    coordinates: payload.coordinates,
    agent: payload.agent,
    updated_at: new Date().toISOString(),
  };
}

async function ensureUniquePropertySlug(slug: string, currentId?: string) {
  const existingProperties = await listProperties();
  const existingSlugs = new Set(
    existingProperties.filter((property) => property.id !== currentId).map((property) => property.slug),
  );

  if (!existingSlugs.has(slug)) {
    return slug;
  }

  let index = 2;
  let candidate = `${slug}-${index}`;

  while (existingSlugs.has(candidate)) {
    index += 1;
    candidate = `${slug}-${index}`;
  }

  return candidate;
}

export async function listProperties() {
  const localInventory = listPropertyInventory();
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return localInventory;
  }

  const { data, error } = await supabase
    .from("properties")
    .select(propertySelect)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return localInventory;
  }

  const dbProperties = data.map((row) => mapPropertyRow(row as SupabasePropertyRow));
  
  // Merge logic: Bring in local inventory items that don't exist in the DB by slug
  const dbSlugs = new Set(dbProperties.map(p => p.slug));
  const merged = [
    ...dbProperties,
    ...localInventory.filter(p => !dbSlugs.has(p.slug))
  ];

  return merged;
}

export async function getPropertyBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getPropertyInventoryBySlug(slug);
  }

  const { data, error } = await supabase.from("properties").select(propertySelect).eq("slug", slug).maybeSingle();

  if (error || !data) {
    return getPropertyInventoryBySlug(slug);
  }

  return mapPropertyRow(data as SupabasePropertyRow);
}

export async function getPropertyById(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getPropertyInventoryById(id);
  }

  const { data, error } = await supabase.from("properties").select(propertySelect).eq("id", id).maybeSingle();

  if (error || !data) {
    return getPropertyInventoryById(id);
  }

  return mapPropertyRow(data as SupabasePropertyRow);
}

export async function createProperty(payload: PropertyPayload) {
  const normalizedPayload = {
    ...payload,
    slug: await ensureUniquePropertySlug(payload.slug),
  };

  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return createPropertyInventoryItem(normalizedPayload);
  }

  const { data, error } = await supabase
    .from("properties")
    .insert(toPropertyRow(normalizedPayload))
    .select(propertySelect)
    .single();

  if (error || !data) {
    return createPropertyInventoryItem(normalizedPayload);
  }

  return mapPropertyRow(data as SupabasePropertyRow);
}

export async function updateProperty(id: string, payload: PropertyPayload) {
  const normalizedPayload = {
    ...payload,
    slug: await ensureUniquePropertySlug(payload.slug, id),
  };

  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return updatePropertyInventoryItem(id, normalizedPayload);
  }

  const { data, error } = await supabase
    .from("properties")
    .update(toPropertyRow(normalizedPayload))
    .eq("id", id)
    .select(propertySelect)
    .single();

  if (error || !data) {
    return updatePropertyInventoryItem(id, normalizedPayload);
  }

  return mapPropertyRow(data as SupabasePropertyRow);
}

export async function deleteProperty(id: string) {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return deletePropertyInventoryItem(id);
  }

  const { error } = await supabase.from("properties").delete().eq("id", id);

  if (!error) {
    return true;
  }

  return deletePropertyInventoryItem(id);
}