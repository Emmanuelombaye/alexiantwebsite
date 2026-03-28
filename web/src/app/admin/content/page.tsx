"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/data/site-content";

export default function AdminContentPage() {
  const [content, setContent] = useState<typeof siteContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => {
        console.error("Failed to load content:", err);
        setFeedback({ type: "error", text: "Failed to connect to the content API." });
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error((await response.json()).message || "Failed to update content");
      }

      setFeedback({ type: "success", text: "Site content updated successfully. In dev mode, your browser will hot reload automatically!" });
    } catch (error) {
      setFeedback({ type: "error", text: error instanceof Error ? error.message : "An unknown error occurred" });
    } finally {
      setIsSaving(false);
    }
  }

  function handleNestedChange(section: keyof typeof siteContent, field: string, value: string) {
    setContent((prev) => {
      if (!prev) return null;
      const sectionData = prev[section] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  }

  function handleRootChange(field: keyof typeof siteContent, value: string) {
    setContent((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value,
      };
    });
  }

  if (!content) {
    return (
      <div className="flex justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Site Content</h2>
          <p className="text-slate-500">Edit front-facing website copy safely.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {feedback && (
        <div className={`mb-8 rounded-xl p-4 text-sm font-medium ${feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {feedback.text}
        </div>
      )}

      <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
        <section>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Hero Section</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Kicker</label>
              <input
                type="text"
                value={content.hero.kicker}
                onChange={(e) => handleNestedChange("hero", "kicker", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Title</label>
              <textarea
                rows={2}
                value={content.hero.title}
                onChange={(e) => handleNestedChange("hero", "title", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Hero Body Preview</label>
              <textarea
                rows={4}
                value={content.hero.body}
                onChange={(e) => handleNestedChange("hero", "body", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        <section>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Company Identity & Contact</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
              <input
                type="text"
                value={content.companyName}
                onChange={(e) => handleRootChange("companyName", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
              <input
                type="text"
                value={content.phone}
                onChange={(e) => handleRootChange("phone", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                value={content.email}
                onChange={(e) => handleRootChange("email", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Office Location</label>
              <input
                type="text"
                value={content.office}
                onChange={(e) => handleRootChange("office", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
