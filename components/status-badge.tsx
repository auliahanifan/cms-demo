import type { ArticleStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { statusLabel } from "@/lib/auth/rbac";

const variants: Record<
  ArticleStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  DRAFT: "secondary",
  PENDING_REVIEW: "outline",
  PUBLISHED: "default",
};

export function StatusBadge({ status }: { status: ArticleStatus }) {
  return <Badge variant={variants[status]}>{statusLabel(status)}</Badge>;
}
