"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AdminLoginFormProps = {
  authEnabled: boolean;
  redirectTo: string;
};

export function AdminLoginForm({ authEnabled, redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authEnabled) {
      setStatus("error");
      setMessage("Admin login is not configured yet.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        throw new Error(data?.message || "Login failed.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Login failed.");
      return;
    }

    router.replace(redirectTo);
    router.refresh();
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#046A38]"
      />
      <button
        type="submit"
        disabled={status === "loading" || !authEnabled}
        className="rounded-full bg-[#046A38] px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Signing in..." : "Sign in to admin"}
      </button>
      {message ? <p className="text-sm text-rose-600">{message}</p> : null}
    </form>
  );
}