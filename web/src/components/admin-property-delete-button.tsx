"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminPropertyDeleteButtonProps = {
  propertyId: string;
  propertyTitle: string;
  redirectTo?: string;
};

export function AdminPropertyDeleteButton({ propertyId, propertyTitle, redirectTo }: AdminPropertyDeleteButtonProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleDelete() {
    const confirmed = window.confirm(`Delete \"${propertyTitle}\"? This action cannot be undone.`);

    if (!confirmed) {
      return;
    }

    setStatus("deleting");
    setMessage("");

    try {
      const response = await fetch(`/api/admin/properties/${propertyId}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Delete failed.");
      }

      if (redirectTo) {
        router.push(redirectTo);
      }

      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Delete failed.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={status === "deleting"}
        className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:opacity-60"
      >
        {status === "deleting" ? "Deleting..." : "Delete"}
      </button>
      {message ? <p className="mt-2 text-sm text-rose-600">{message}</p> : null}
    </div>
  );
}