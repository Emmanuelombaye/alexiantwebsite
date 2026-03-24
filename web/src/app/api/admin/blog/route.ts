import { NextResponse } from "next/server";
import { createBlogPost, listBlogPosts } from "@/lib/blog/service";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  return NextResponse.json({ posts: await listBlogPosts(false) });
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) return NextResponse.json({ message: "Authentication required." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  try {
    const post = await createBlogPost(body as any);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create post." },
      { status: 400 },
    );
  }
}
