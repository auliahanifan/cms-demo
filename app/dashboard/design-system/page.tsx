import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { ColorsShowcase } from "@/components/design-system/colors-showcase";
import { IconsShowcase } from "@/components/design-system/icons-showcase";
import { PatternsShowcase } from "@/components/design-system/patterns-showcase";
import { PrimitivesShowcase } from "@/components/design-system/primitives-showcase";
import { ShadowsShowcase } from "@/components/design-system/shadows-showcase";
import { ShowcaseSection } from "@/components/design-system/showcase-section";
import { SpacingShowcase } from "@/components/design-system/spacing-showcase";
import { TypographyShowcase } from "@/components/design-system/typography-showcase";

export const metadata: Metadata = { title: "Design System" };

const sectionIds = [
  "colors",
  "typography",
  "spacing",
  "shadows",
  "primitives",
  "patterns",
  "icons",
] as const;

export default async function DesignSystemPage() {
  await requireRole("ADMIN");

  return (
    <PageContainer variant="dashboard" className="space-y-12 pb-12">
      <PageHeader
        title="Design System"
        description="Referensi token, primitives, dan pola komponen Vibe Coding Class CMS."
      />

      <nav className="flex flex-wrap gap-2 text-sm">
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-md border px-3 py-1 capitalize hover:bg-muted"
          >
            {id}
          </a>
        ))}
      </nav>

      <ShowcaseSection id="colors" title="Colors">
        <ColorsShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="typography" title="Typography">
        <TypographyShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="spacing" title="Spacing & Layout">
        <SpacingShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="shadows" title="Shadows & Radius">
        <ShadowsShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="primitives" title="Primitives">
        <PrimitivesShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="patterns" title="Patterns">
        <PatternsShowcase />
      </ShowcaseSection>

      <ShowcaseSection id="icons" title="Icons">
        <IconsShowcase />
      </ShowcaseSection>
    </PageContainer>
  );
}
