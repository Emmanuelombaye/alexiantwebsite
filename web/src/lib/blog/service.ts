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
import { unstable_cache, revalidateTag } from "next/cache";

type SupabaseBlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image: string;
  published: boolean;
};

const blogSelect = "id, slug, title, excerpt, content, author, category, date, image, published";

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
    images: row.image ? [row.image] : [],
    published: row.published,
  };
}

export async function listBlogPostsRaw(publishedOnly = true) {
  const localInventory = listBlogInventory(publishedOnly);
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return localInventory;
  }

  let query = supabase
    .from("blog_posts")
    .select(blogSelect)
    .order("date", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true) as typeof query;
  }

  const { data, error } = await query;

  if (error || !data) {
    return localInventory;
  }

  const dbPosts = data.map((row) => mapBlogRow(row as SupabaseBlogRow));
  
  const dbSlugs = new Set(dbPosts.map(p => p.slug));
  const merged = [
    ...dbPosts,
    ...localInventory.filter(p => !dbSlugs.has(p.slug))
  ];

  return merged;
}

export const listBlogPosts = unstable_cache(
  async (publishedOnly = true) => {
    return listBlogPostsRaw(publishedOnly);
  },
  ['blog-posts-list'],
  { revalidate: 3600, tags: ['blog'] }
);

export async function getBlogPostBySlugRaw(slug: string) {
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

export const getBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    return getBlogPostBySlugRaw(slug);
  },
  ['blog-post-by-slug'],
  { revalidate: 3600, tags: ['blog'] }
);

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
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return createBlogInventoryItem(data as Omit<BlogPost, "id"> & { id?: string });
  }

  const insertData: any = { ...data, image: data.images ? data.images[0] || "" : "" };
  delete insertData.images;
  delete insertData.id;

  const { data: created, error } = await supabase
    .from("blog_posts")
    .insert(insertData)
    .select(blogSelect)
    .single();

  if (error || !created) {
    console.error("Supabase blog creation error:", error);
    return createBlogInventoryItem(data as Omit<BlogPost, "id"> & { id?: string });
  }

  revalidateTag("blog", "page");
  return mapBlogRow(created as SupabaseBlogRow);
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return updateBlogInventoryItem(id, data);
  }

  const updateData: any = { ...data };
  if (data.images) {
    updateData.image = data.images[0] || "";
    delete updateData.images;
  }
  delete updateData.id;

  const { data: updated, error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id)
    .select(blogSelect)
    .single();

  if (error || !updated) {
    console.error("Supabase blog update error:", error);
    return updateBlogInventoryItem(id, data);
  }

  revalidateTag("blog", "page");
  return mapBlogRow(updated as SupabaseBlogRow);
}

export async function deleteBlogPost(id: string) {
  const supabase = await createSupabaseAdminClient();

  if (!supabase) {
    return deleteBlogInventoryItem(id);
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (!error) {
    revalidateTag("blog", "page");
    return true;
  }

  return deleteBlogInventoryItem(id);
}
