import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPage, getLegalPages } from "@/lib/content";
import type { LegalSlug } from "@/lib/content/types";
import { PageHero } from "@/components/ui/PageHero";

// Privacy, Cookies, Terms (checklist 10.1, 10.2). Only pages present in the
// content layer are generated; everything else 404s.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getLegalPages()).map((p) => ({ legal: p.slug }));
}

type Props = { params: Promise<{ legal: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getLegalPage((await params).legal as LegalSlug);
  return page ? { title: page.title } : {};
}

export default async function LegalPage({ params }: Props) {
  const page = await getLegalPage((await params).legal as LegalSlug);
  if (!page) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={page.title} lead={`Last updated ${page.updated}`} />
      <section className="bg-paper py-20">
        <div
          className="container-site max-w-3xl space-y-5 leading-8 text-muted [&_a]:text-forest-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </section>
    </>
  );
}
