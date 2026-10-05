import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page isn’t growing here." lead="The page you’re looking for doesn’t exist or has moved.">
      <ButtonLink href="/" variant="primary">Back to home</ButtonLink>
    </PageHero>
  );
}
