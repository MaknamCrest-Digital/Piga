import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// Leaves draft mode: /api/preview/exit?path=/about
export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const path = req.nextUrl.searchParams.get("path") ?? "/";
  redirect(path.startsWith("/") && !path.startsWith("//") ? path : "/");
}
