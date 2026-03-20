import type { BlogPost } from "@/data/blog-posts";
import {
  createBlogInventoryItem,
  deleteBlogInventoryItem,
  getBlogInventoryById,
  getBlogInventoryBySlug,
  listBlogInventory,
  updateBlogInventoryItem,
} from "@/data/blog-inventory";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase/server";

type SupabaseBlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  images: string[];
  published: boolean;
};

const blogSelect = "id, slug, title, excerpt, content, author, category, date, images, published";

function mapBlogRow(row: SupabaseBlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    category: row.category,
    date: row.date,
    images: Array.isArray(row.images) ? row.images : [],
    published: row.published,
  };
}

export async function listBlogPosts(publishedOnly = true) {
  const localInventory = listBlogInventory(publishedOnly);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return localInventory;
  }

  const query = supabase
    .from("blog_posts")
    .select(blogSelect)
    .order("date", { ascending: false });

  if (publishedOnly) {
    query.eq("published", true);
  }

  const { data, error } = await query;

  if (error || !data) {
    return localInventory;
  }

  const dbPosts = data.map((row) => mapBlogRow(row as SupabaseBlogRow));
  
  // Merge logic: Bring in local inventory items that don't exist in the DB by slug
  const dbSlugs = new Set(dbPosts.map(p => p.slug));
  const merged = [
    ...dbPosts,
    ...localInventory.filter(p => !dbSlugs.has(p.slug))
  ];

  return merged;
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getBlogInventoryBySlug(slug);
  }

  const { data, error } = await supabase.from("blog_posts").select(blogSelect).eq("slug", slug).maybeSingle();

  if (error || !data) {
    return getBlogInventoryBySlug(slug);
  }

  return mapBlogRow(data as SupabaseBlogRow);
}

export async function getBlogPostById(id: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getBlogInventoryById(id);
  }

  const { data, error } = await supabase.from("blog_posts").select(blogSelect).eq("id", id).maybeSingle();

  if (error || !data) {
    return getBlogInventoryById(id);
  }

  return mapBlogRow(data as SupabaseBlogRow);
}

export async function createBlogPost(data: Partial<BlogPost>) {
  if (
    !data.slug ||
    !data.title ||
    !data.excerpt ||
    !data.content ||
    !data.author ||
    !data.category ||
    !data.date ||
    !data.images ||
    !Array.isArray(data.images) ||
    typeof data.published !== "boolean"
  ) {
    throw new Error("Missing required blog post fields.");
  }

  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return createBlogInventoryItem(data as Omit<BlogPost, "id"> & { id?: string });
  }

  const { data: created, error } = await supabase
    .from("blog_posts")
    .insert(data)
    .select(blogSelect)
    .single();

  if (error || !created) {
    console.error("Supabase blog creation error:", error);
    return createBlogInventoryItem(data as Omit<BlogPost, "id"> & { id?: string });
  }

  return mapBlogRow(created as SupabaseBlogRow);
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return updateBlogInventoryItem(id, data);
  }

  const { data: updated, error } = await supabase
    .from("blog_posts")
    .update(data)
    .eq("id", id)
    .select(blogSelect)
    .single();

  if (error || !updated) {
    console.error("Supabase blog update error:", error);
    return updateBlogInventoryItem(id, data);
  }

  return mapBlogRow(updated as SupabaseBlogRow);
}

export async function deleteBlogPost(id: string) {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return deleteBlogInventoryItem(id);
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (!error) {
    return true;
  }

  return deleteBlogInventoryItem(id);
}
