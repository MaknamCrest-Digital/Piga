import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

// WordPress preview link → /api/preview?secret=…&path=/about
// Turns on draft mode so lib/wp fetches drafts with the application password.

const safeEqual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function GET(req: NextRequest) {
  const secret = process.env.WORDPRESS_PREVIEW_SECRET;
  const given = req.nextUrl.searchParams.get("secret") ?? "";
  if (!secret || !safeEqual(given, secret)) return new Response("Invalid preview token", { status: 401 });

  // Only same-site paths, so the route can't be used as an open redirect.
  const path = req.nextUrl.searchParams.get("path") ?? "/";
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path : "/";

  (await draftMode()).enable();
  redirect(safePath);
}
