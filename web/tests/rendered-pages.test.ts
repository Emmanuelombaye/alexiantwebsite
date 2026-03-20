import assert from "node:assert/strict";
import type { ChildProcessWithoutNullStreams } from "node:child_process";
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const HOST = "127.0.0.1";
const STARTUP_TIMEOUT_MS = 60_000;

let baseUrl = "";
let devServer: ChildProcessWithoutNullStreams | undefined;
let serverLogs = "";

function getNextCliPath() {
  return path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
}

async function getAvailablePort() {
  return new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", reject);
    server.listen(0, HOST, () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        reject(new Error("Unable to resolve an open local port for rendered page tests."));
        return;
      }

      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(address.port);
      });
    });
  });
}

async function waitForServer(url: string) {
  const deadline = Date.now() + STARTUP_TIMEOUT_MS;

  while (Date.now() < deadline) {
    if (devServer?.exitCode !== null && devServer?.exitCode !== undefined) {
      throw new Error(`Next test server exited early.\n\n${serverLogs}`);
    }

    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the dev server is ready.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for the Next test server.\n\n${serverLogs}`);
}

before(async () => {
  const port = await getAvailablePort();
  baseUrl = `http://${HOST}:${port}`;

  devServer = spawn(process.execPath, [getNextCliPath(), "dev", "--hostname", HOST, "--port", String(port)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  for (const stream of [devServer.stdout, devServer.stderr]) {
    stream.on("data", (chunk) => {
      serverLogs = `${serverLogs}${String(chunk)}`.slice(-5000);
    });
  }

  await waitForServer(`${baseUrl}/properties`);
});

after(async () => {
  if (!devServer || devServer.exitCode !== null) {
    return;
  }

  devServer.kill();

  const deadline = Date.now() + 5_000;
  while (devServer.exitCode === null && Date.now() < deadline) {
    await delay(100);
  }

  if (devServer.exitCode === null) {
    devServer.kill("SIGKILL");
  }
});

async function fetchHtml(pathname: string) {
  const response = await fetch(`${baseUrl}${pathname}`);
  const html = await response.text();

  assert.equal(response.status, 200, `Expected ${pathname} to return 200, got ${response.status}.\n\n${html.slice(0, 600)}`);

  return html;
}

function getVisibleText(html: string) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyHtml = bodyMatch?.[1] ?? html;

  return bodyHtml
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<script[^>]*>[^]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[^]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

test("properties page renders overview controls and featured summary", async () => {
  const text = getVisibleText(await fetchHtml("/properties"));

  assert.match(text, /Property collection/);
  assert.match(text, /Showing 6 matching propert ?ies/);
  assert.match(text, /Apply filters/);
  assert.match(text, /Featured collection: 3 hand-picked listings highlighted across the portfolio\./);
  assert.match(text, /Diani Beachfront Prime Plot/);
});

test("properties page renders active filter badges and single-result state", async () => {
  const text = getVisibleText(await fetchHtml("/properties\?q=villa&category=sale&status=available"));

  assert.match(text, /Showing 2 matching propert ?ies/);
  assert.match(text, /3 active filter ?s/i);
  assert.match(text, /Keyword: villa/);
  assert.match(text, /For sale/);
  assert.match(text, /Available/);
  assert.match(text, /Clear/);
  assert.match(text, /Diani Beachfront Prime Plot/);
  assert.match(text, /Galu Ocean View Villa/);
});

test("properties page renders empty-state actions when no listings match", async () => {
  const text = getVisibleText(await fetchHtml("/properties\?q=warehouse&category=rent&status=sold"));

  assert.match(text, /No properties matched your current filters\./);
  assert.match(text, /Reset search/);
  assert.match(text, /Speak to Alexiant/);
});

test("property detail page renders advisor, highlights and inquiry UI", async () => {
  const text = getVisibleText(await fetchHtml("/properties/diani-beachfront-prime-plot"));

  assert.match(text, /Diani Beachfront Prime Plot/);
  assert.match(text, /Quick facts/);
  assert.match(text, /Alex Kamau/);
  assert.match(text, /Open map location/);
  assert.match(text, /Property highlights/);
  assert.match(text, /Inquire about Diani Beachfront Prime Plot/);
  assert.match(text, /Property reference: diani-beachfront-prime-plot/);
  assert.match(text, /Related properties/);
});