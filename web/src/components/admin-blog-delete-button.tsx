"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminBlogDeleteButtonProps = {
  postId: string;
  postTitle: string;
  redirectTo?: string;
};

export function AdminBlogDeleteButton({ postId, postTitle, redirectTo }: AdminBlogDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Are you sure you want to delete "${postTitle}"? This cannot be undone.`);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete post.");
      }

      setIsDeleting(false);
      
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
        // Fallback for visual confirmation in some Next.js versions
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Delete failed.");
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs font-bold uppercase tracking-widest text-rose-500 hover:text-rose-700 disabled:opacity-50 transition-colors"
    >
      {isDeleting ? "Deleting..." : "Permanently Delete"}
    </button>
  );
}
