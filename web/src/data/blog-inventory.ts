import { blogPosts, type BlogPost } from "@/data/blog-posts";

function clonePost(post: BlogPost | (Omit<BlogPost, "images"> & { image?: string; images?: string[] })): BlogPost {
  return { 
    ...post as BlogPost, 
    images: Array.isArray(post.images) ? post.images : (('image' in post && post.image) ? [post.image] : []) 
  };
}

function createLocalPostId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `post-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// In Next.js dev mode, files are re-evaluated on HMR.
// We use globalThis to persist the inventory across reloads for a better admin experience.
const GLOBAL_BLOG_KEY = "__ALEXIANT_BLOG_INVENTORY__";
const globalAny = globalThis as unknown as { [GLOBAL_BLOG_KEY]: BlogPost[] };

if (!globalAny[GLOBAL_BLOG_KEY]) {
  globalAny[GLOBAL_BLOG_KEY] = blogPosts.map(clonePost);
}

const getInventory = (): BlogPost[] => globalAny[GLOBAL_BLOG_KEY];
const setInventory = (newInventory: BlogPost[]) => {
  globalAny[GLOBAL_BLOG_KEY] = newInventory;
};

export function listBlogInventory(publishedOnly: boolean) {
  const posts = getInventory().map(clonePost);
  const filtered = publishedOnly ? posts.filter((p) => p.published) : posts;
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogInventoryById(id: string) {
  const post = getInventory().find((p) => p.id === id);
  return post ? clonePost(post) : null;
}

export function getBlogInventoryBySlug(slug: string) {
  const post = getInventory().find((p) => p.slug === slug);
  return post ? clonePost(post) : null;
}

export function createBlogInventoryItem(payload: Omit<BlogPost, "id"> & { id?: string }) {
  const post: BlogPost = {
    id: payload.id || createLocalPostId(),
    slug: payload.slug,
    title: payload.title,
    excerpt: payload.excerpt,
    content: payload.content,
    author: payload.author,
    category: payload.category,
    date: payload.date,
    images: payload.images,
    published: payload.published,
  };

  setInventory([post, ...getInventory()]);
  return clonePost(post);
}

export function updateBlogInventoryItem(id: string, payload: Partial<Omit<BlogPost, "id">>) {
  const inventory = getInventory();
  const index = inventory.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: BlogPost = {
    ...inventory[index],
    ...payload,
    id,
  };

  setInventory(inventory.map((p, i) => (i === index ? updated : p)));
  return clonePost(updated);
}

export function deleteBlogInventoryItem(id: string) {
  const inventory = getInventory();
  const prevLen = inventory.length;
  const next = inventory.filter((p) => p.id !== id);
  setInventory(next);
  return next.length < prevLen;
}

