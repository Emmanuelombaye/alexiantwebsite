import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/blog/service";
import { AdminBlogForm } from "@/components/admin-blog-form";
import { AdminBlogDeleteButton } from "@/components/admin-blog-delete-button";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditPostPageProps) {
  const p = await params;
  const post = await getBlogPostById(p.id);
  if (!post) notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors">
          ←
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Edit Insight</h1>
          <p className="text-slate-500 mt-1">Refining market intelligence for the {post.title}.</p>
        </div>
        <AdminBlogDeleteButton postId={post.id} postTitle={post.title} redirectTo="/admin/blog" />
      </div>

      <AdminBlogForm mode="edit" initialPost={post} />
    </div>
  );
}
