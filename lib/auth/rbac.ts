import type { Article, Role } from "@prisma/client";
import type { SessionUser } from "@/lib/auth/types";

export function canManageUsers(user: SessionUser): boolean {
  return user.role === "ADMIN";
}

export function canManageTaxonomy(user: SessionUser): boolean {
  return user.role === "ADMIN" || user.role === "EDITOR";
}

export function canManageProducts(user: SessionUser): boolean {
  return user.role === "ADMIN" || user.role === "EDITOR";
}

export function canEditArticle(
  user: SessionUser,
  article: Pick<Article, "authorId" | "status">
): boolean {
  if (user.role === "ADMIN" || user.role === "EDITOR") return true;
  if (user.role === "AUTHOR") {
    return article.authorId === user.id && article.status !== "PUBLISHED";
  }
  return false;
}

export function canDeleteArticle(
  user: SessionUser,
  article: Pick<Article, "authorId" | "status">
): boolean {
  if (user.role === "ADMIN" || user.role === "EDITOR") return true;
  if (user.role === "AUTHOR") {
    return (
      article.authorId === user.id &&
      (article.status === "DRAFT" || article.status === "PENDING_REVIEW")
    );
  }
  return false;
}

export function canPublish(user: SessionUser): boolean {
  return user.role === "ADMIN" || user.role === "EDITOR";
}

export function canPublishDirectly(user: SessionUser): boolean {
  return user.role === "ADMIN";
}

export function canSubmitForReview(
  user: SessionUser,
  article: Pick<Article, "authorId" | "status">
): boolean {
  return (
    user.role === "AUTHOR" &&
    article.authorId === user.id &&
    article.status === "DRAFT"
  );
}

export function canUnpublish(user: SessionUser): boolean {
  return user.role === "ADMIN" || user.role === "EDITOR";
}

export function canSendBack(
  user: SessionUser,
  article: Pick<Article, "status">
): boolean {
  return (
    (user.role === "ADMIN" || user.role === "EDITOR") &&
    article.status === "PENDING_REVIEW"
  );
}

export function roleLabel(role: Role): string {
  const labels: Record<Role, string> = {
    ADMIN: "Admin",
    EDITOR: "Editor",
    AUTHOR: "Penulis",
  };
  return labels[role];
}

export function statusLabel(status: Article["status"]): string {
  const labels: Record<Article["status"], string> = {
    DRAFT: "Draft",
    PENDING_REVIEW: "Menunggu Review",
    PUBLISHED: "Dipublikasikan",
  };
  return labels[status];
}
