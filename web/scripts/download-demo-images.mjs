import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const IMAGES = [
  // Blog
  { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2070", out: "blog/post-1.jpg" },
  { url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=2096", out: "blog/post-2.jpg" },
  { url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=2070", out: "blog/post-3.jpg" },
  // Properties
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80", out: "properties/prop-001-1.jpg" },
  { url: "https://images.unsplash.com/photo-1469796466635-455ede028aca?w=1200&q=80", out: "properties/prop-001-2.jpg" },
  { url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", out: "properties/prop-002-1.jpg" },
  { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80", out: "properties/prop-002-2.jpg" },
  { url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80", out: "properties/prop-003-1.jpg" },
  { url: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&q=80", out: "properties/prop-003-2.jpg" },
  { url: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80", out: "properties/prop-004-1.jpg" },
  { url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80", out: "properties/prop-004-2.jpg" },
  { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80", out: "properties/prop-005-1.jpg" },
  { url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=80", out: "properties/prop-005-2.jpg" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", out: "properties/prop-006-1.jpg" },
  { url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80", out: "properties/prop-006-2.jpg" },
];

const PUBLIC_ROOT = join(process.cwd(), "public", "demo-media");

async function downloadOne({ url, out }) {
  const targetPath = join(PUBLIC_ROOT, out);
  const dir = targetPath.split(/[/\\]/).slice(0, -1).join("/");
  await mkdir(dir, { recursive: true });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${res.status} downloading ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(targetPath, buf);
  return targetPath;
}

async function main() {
  console.log(`Downloading ${IMAGES.length} demo images to ${PUBLIC_ROOT}`);
  const results = [];
  for (const item of IMAGES) {
    process.stdout.write(`- ${item.out} ... `);
    const p = await downloadOne(item);
    console.log("ok");
    results.push(p);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

