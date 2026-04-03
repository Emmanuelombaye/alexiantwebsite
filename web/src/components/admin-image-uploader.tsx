"use client";

import { useRef, useState } from "react";

type AdminImageUploaderProps = {
  onUploaded: (url: string) => void;
  currentCount: number;
  maxImages: number;
};

/** Compress + convert to WebP using browser Canvas. No dependencies needed. */
async function compressToWebP(file: File, maxWidth = 1920, quality = 0.82): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          const webpName = file.name.replace(/\.[^.]+$/, "") + ".webp";
          resolve(new File([blob], webpName, { type: "image/webp" }));
        },
        "image/webp",
        quality,
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error("Image load failed")); };
    img.src = objectUrl;
  });
}

export function AdminImageUploader({ onUploaded, currentCount, maxImages }: AdminImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const remainingSlots = Math.max(maxImages - currentCount, 0);
  const limitReached = currentCount >= maxImages;

  async function handleUpload() {
    if (limitReached) {
      setStatus("error");
      setMessage(`You can upload up to ${maxImages} property images.`);
      return;
    }

    const file = inputRef.current?.files?.[0];

    if (!file) {
      setStatus("error");
      setMessage("Choose an image file first.");
      return;
    }

    const MAX_FILE_SIZE_MB = 3;
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setStatus("error");
      setMessage(`Image too large. Please compress it to under ${MAX_FILE_SIZE_MB}MB before uploading.`);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    setStatus("uploading");
    setMessage("Compressing image...");

    let fileToUpload: File;
    try {
      fileToUpload = await compressToWebP(file);
      setMessage(`Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(fileToUpload.size / 1024).toFixed(0)}KB. Uploading...`);
    } catch {
      // fallback to original if compression fails
      fileToUpload = file;
      setMessage("Uploading...");
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { message?: string; url?: string };

      if (!response.ok || !result.url) {
        throw new Error(result.message || "Image upload failed.");
      }

      onUploaded(result.url);
      setStatus("success");
      setMessage(result.message || `Image uploaded. ${Math.min(currentCount + 1, maxImages)} of ${maxImages} slots used.`);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    }
  }

  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-slate-950">Upload image to Supabase Storage</p>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {currentCount}/{maxImages} used
        </p>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Upload one image at a time. {remainingSlots > 0 ? `${remainingSlots} upload slot${remainingSlots === 1 ? "" : "s"} remaining.` : "Image limit reached."} If storage is not configured yet, you can still paste public image URLs below.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input ref={inputRef} type="file" accept="image/*" disabled={limitReached} className="block w-full text-sm text-slate-600 disabled:opacity-50" />
        <button
          type="button"
          onClick={handleUpload}
          disabled={status === "uploading" || limitReached}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {status === "uploading" ? "Uploading..." : limitReached ? "Limit reached" : "Upload image"}
        </button>
      </div>
      {message ? (
        <p className={`mt-3 text-sm ${status === "success" ? "text-emerald-700" : "text-rose-600"}`}>{message}</p>
      ) : null}
    </div>
  );
}