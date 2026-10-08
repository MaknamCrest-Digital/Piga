import "server-only";
import { draftMode } from "next/headers";

// WPGraphQL transport. Only lib/wp/* talks to WordPress; pages go through lib/content.
// Unset WORDPRESS_GRAPHQL_URL = seed mode (see piga-wordpress-cms skill).

export const wpEnabled = () => Boolean(process.env.WORDPRESS_GRAPHQL_URL);

/** One hour safety net; webhooks (app/api/revalidate) refresh content sooner. */
const REVALIDATE_SECONDS = 3600;

async function isPreview() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (e.g. generateStaticParams at build time)
  }
}

export async function wpQuery<T>(query: string, variables: Record<string, unknown> = {}, tags: string[] = []): Promise<T> {
  const url = process.env.WORDPRESS_GRAPHQL_URL;
  if (!url) throw new Error("WORDPRESS_GRAPHQL_URL is not set");

  const preview = await isPreview();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const { WORDPRESS_APP_USER: user, WORDPRESS_APP_PASSWORD: pass } = process.env;
  // Drafts need an authenticated request (application password, never a real login).
  if (preview && user && pass) headers.Authorization = `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: { ...variables, asPreview: preview } }),
    ...(preview ? { cache: "no-store" as const } : { next: { tags: ["wp", ...tags], revalidate: REVALIDATE_SECONDS } }),
  });
  if (!res.ok) throw new Error(`WordPress responded ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (!json.data) throw new Error("WordPress returned no data");
  return json.data;
}

/** Cache tags. The WordPress mu-plugin (docs/wordpress/mu-revalidate.php) sends the same names. */
export const tags = {
  settings: "wp:settings",
  page: (slug: string) => `wp:page:${slug}`,
  people: "wp:people",
  partners: "wp:partners",
  varieties: "wp:varieties",
  events: "wp:events",
  posts: "wp:posts",
  post: (slug: string) => `wp:post:${slug}`,
  legal: "wp:legal",
} as const;
