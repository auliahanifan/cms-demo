import { PageHeader } from "@/components/patterns/page-header";

/** @deprecated Use `<PageHeader level="section" />` instead. */
export function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return <PageHeader level="section" title={title} actions={action} />;
}
