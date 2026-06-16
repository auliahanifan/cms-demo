import { cn } from "@/lib/utils";

type PageHeaderLevel = "display" | "page" | "section";

const headingClasses: Record<PageHeaderLevel, string> = {
  display: "text-display",
  page: "text-heading-1",
  section: "text-heading-2",
};

export function PageHeader({
  title,
  description,
  actions,
  level = "page",
  meta,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  level?: PageHeaderLevel;
  meta?: React.ReactNode;
  className?: string;
}) {
  const Heading = level === "section" ? "h2" : "h1";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4",
        className
      )}
    >
      <div>
        {meta}
        <Heading className={headingClasses[level]}>{title}</Heading>
        {description && (
          <p
            className={cn(
              "text-muted-foreground",
              level === "display" && "mt-2"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}
