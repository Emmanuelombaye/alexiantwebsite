import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/blog/service";
import { isAdminRequest } from "@/lib/admin-auth";
import type { BlogPost } from "@/data/blog-posts";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: RouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const updated = await updateBlogPost(id, body as Partial<BlogPost>);
  if (!updated) return NextResponse.json({ message: "Post not found." }, { status: 404 });
  revalidatePath("/blog");
  revalidatePath(`/blog/${updated.slug}`);
  revalidatePath("/");
  return NextResponse.json({ post: updated });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });

  await deleteBlogPost(id);
  revalidatePath("/blog");
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
