import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const clientRoot = path.join(root, "..", "dist", "client");
const worker = await import("../dist/server/index.js");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

async function serveAsset(url, response) {
  const relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const filePath = path.resolve(clientRoot, relative);
  if (!filePath.startsWith(path.resolve(clientRoot))) return false;
  try {
    const file = await fs.readFile(filePath);
    response.statusCode = 200;
    response.setHeader("Content-Type", contentTypes[path.extname(filePath)] || "application/octet-stream");
    response.end(file);
    return true;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  const url = new URL(req.url || "/", `https://${req.headers.host || "localhost"}`);
  if (url.pathname.startsWith("/_next/") || url.pathname === "/favicon.svg" || url.pathname.startsWith("/file.svg") || url.pathname.startsWith("/globe.svg") || url.pathname.startsWith("/window.svg")) {
    if (await serveAsset(url, res)) return;
  }

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") headers.set(key, value);
    else if (Array.isArray(value)) headers.set(key, value.join(", "));
  }
  const body = req.method === "GET" || req.method === "HEAD" ? undefined : req;
  const response = await worker.default.fetch(new Request(url, { method: req.method, headers, body, duplex: body ? "half" : undefined }));
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
