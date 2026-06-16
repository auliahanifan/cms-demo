import { PageHeader } from "@/components/patterns/page-header";

export function ShowcaseSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-6 space-y-4">
      <PageHeader level="section" title={title} />
      {children}
    </section>
  );
}
