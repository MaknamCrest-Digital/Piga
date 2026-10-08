import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";

// On-demand revalidation, called by docs/wordpress/mu-revalidate.php on save.
// POST { tags: string[] } with header x-revalidate-secret.

const safeEqual = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

export async function POST(req: NextRequest) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!secret || !safeEqual(given, secret)) return NextResponse.json({ ok: false }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { tags?: unknown } | null;
  const tags = Array.isArray(body?.tags) ? body.tags.filter((t): t is string => typeof t === "string" && t.startsWith("wp")) : [];
  if (!tags.length) return NextResponse.json({ ok: false, error: "No wp:* tags given" }, { status: 400 });

  for (const tag of tags) revalidateTag(tag, "max"); // Next 16: cache profile is required
  return NextResponse.json({ ok: true, revalidated: tags });
}
