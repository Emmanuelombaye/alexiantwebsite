import { NextResponse } from "next/server";
import { deleteBlogPost, getBlogPostById, updateBlogPost } from "@/lib/blog/service";
import { cookies } from "next/headers";
import { getAdminCookieName } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function ensureAdmin() {
  const store = await cookies();
  return store.get(getAdminCookieName())?.value === "1";
}

export async function GET(_: Request, { params }: RouteContext) {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const updated = await updateBlogPost(id, body as any);
  if (!updated) return NextResponse.json({ message: "Post not found." }, { status: 404 });
  return NextResponse.json({ post: updated });
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const ok = await ensureAdmin();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) return NextResponse.json({ message: "Post not found." }, { status: 404 });

  await deleteBlogPost(id);
  return NextResponse.json({ ok: true });
}

