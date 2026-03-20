import Link from "next/link";
import { AdminBlogForm } from "@/components/admin-blog-form";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors">
          ←
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">New Insight Article</h1>
          <p className="text-slate-500 mt-1">Develop high-ranking SEO content for the Alexiant Journal.</p>
        </div>
      </div>

      <AdminBlogForm mode="create" />
    </div>
  );
}
