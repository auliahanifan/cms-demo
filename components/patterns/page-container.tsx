import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pageContainerVariants = cva("mx-auto w-full", {
  variants: {
    variant: {
      content: "max-w-3xl space-y-6",
      compact: "max-w-lg space-y-6",
      dashboard: "max-w-6xl space-y-6",
    },
  },
  defaultVariants: {
    variant: "dashboard",
  },
});

export function PageContainer({
  variant,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageContainerVariants>) {
  return (
    <div
      className={cn(pageContainerVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
