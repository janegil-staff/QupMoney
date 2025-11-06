// lib/fetchWithSession.js

import { headers } from "next/headers";

export async function fetchWithSession(path) {
  const headersList = headers();
  const cookie = headersList["cookie"] || "";

  const res = await fetch(`http://localhost:3000${path}`, {
    headers: { Cookie: cookie },
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  if (!res.ok || !isJson) {
    const fallback = await res.text();
    console.error(`Fetch failed for ${path}:`, fallback);
    return null;
  }

  return await res.json();
}
