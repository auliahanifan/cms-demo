import { cn } from "@/lib/utils";

export function SuccessMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-success", className)} role="status">
      {children}
    </p>
  );
}
