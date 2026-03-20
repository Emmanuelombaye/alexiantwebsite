import Link from "next/link";
import { listBlogPosts } from "@/lib/blog/service";
import { AdminBlogDeleteButton } from "@/components/admin-blog-delete-button";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listBlogPosts(false); // get all including draft

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
          <p className="text-slate-500 mt-1">Manage market insights and SEO guides.</p>
        </div>
        <Link href="/admin/blog/new" className="nav-cta-gold !px-6 !py-3">
          Create New Post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="card-surface p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img src={post.images?.[0] || "/demo-media/blog/post-1.jpg"} alt="" className="h-full w-full object-cover" />
               </div>
               <div>
                  <h3 className="font-bold text-lg text-slate-900">{post.title}</h3>
                  <div className="flex gap-4 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                     <span>{post.category}</span>
                     <span>|</span>
                     <span className={post.published ? 'text-green-600' : 'text-amber-500'}>
                        {post.published ? 'Published' : 'Draft'}
                     </span>
                  </div>
               </div>
            </div>
            <div className="flex flex-col items-end gap-3">
               <div className="flex gap-4 items-center">
                  <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">
                     Public View
                  </Link>
                  <Link href={`/admin/blog/edit/${post.id}`} className="nav-cta-gold !px-4 !py-2 !text-xs">
                     Edit Article
                  </Link>
               </div>
               <AdminBlogDeleteButton postId={post.id} postTitle={post.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
