import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { siteContent } from "@/data/site-content";
import { isAdminRequest } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(siteContent);
}

export async function POST(request: Request) {
  const ok = await isAdminRequest();
  if (!ok) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), "src", "data", "site-content.ts");
    
    // We only update the deeply merged fields provided in the body for safety
    // For simplicity, we assume 'body' provides the full updated siteContent object.
    const newContent = { ...siteContent, ...body };
    
    const fileContents = `export const siteContent = ${JSON.stringify(newContent, null, 2)};\n`;
    
    await fs.writeFile(filePath, fileContents, "utf8");
    
    return NextResponse.json({ message: "Site content updated successfully", data: newContent });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update site content: " + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
