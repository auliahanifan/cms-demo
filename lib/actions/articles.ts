"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ArticleStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import {
  canDeleteArticle,
  canEditArticle,
  canPublish,
  canPublishDirectly,
  canSendBack,
  canSubmitForReview,
  canUnpublish,
} from "@/lib/auth/rbac";
import { z } from "zod";
import { articleSchema } from "@/lib/validations/schemas";
import { uniqueSlug } from "@/lib/utils/slug";
import {
  isEditorContentEmpty,
  sanitizeArticleHtml,
} from "@/lib/sanitize/html";
import type { ActionResult } from "@/lib/actions/auth";

function parseArticleForm(formData: FormData) {
  const tagIds = formData.getAll("tagIds").map(String).filter(Boolean);
  const categoryId = formData.get("categoryId") as string;
  const rawContent = String(formData.get("content") ?? "");
  const content = sanitizeArticleHtml(rawContent);

  if (isEditorContentEmpty(content)) {
    return {
      success: false as const,
      error: new z.ZodError([
        {
          code: "custom",
          message: "Isi artikel wajib diisi",
          path: ["content"],
        },
      ]),
    };
  }

  return articleSchema.safeParse({
    title: formData.get("title"),
    content,
    excerpt: formData.get("excerpt") || undefined,
    categoryId: categoryId || undefined,
    tagIds: tagIds.length > 0 ? tagIds : undefined,
  });
}

async function syncArticleTags(articleId: string, tagIds: string[] = []) {
  await prisma.articleTag.deleteMany({ where: { articleId } });
  if (tagIds.length > 0) {
    await prisma.articleTag.createMany({
      data: tagIds.map((tagId) => ({ articleId, tagId })),
    });
  }
}

export async function createArticleAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = parseArticleForm(formData);

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.title, async (s) => {
    const existing = await prisma.article.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const article = await prisma.article.create({
    data: {
      title: parsed.data.title,
      slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt,
      categoryId: parsed.data.categoryId || null,
      authorId: user.id,
      status: "DRAFT",
    },
  });

  await syncArticleTags(article.id, parsed.data.tagIds);

  revalidatePath("/dashboard/articles");
  redirect(`/dashboard/articles/${article.id}/edit`);
}

export async function updateArticleAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    return { success: false, error: "Artikel tidak ditemukan" };
  }

  if (!canEditArticle(user, article)) {
    return { success: false, error: "Anda tidak memiliki akses" };
  }

  const parsed = parseArticleForm(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.title, async (s) => {
    const existing = await prisma.article.findFirst({
      where: { slug: s, NOT: { id } },
    });
    return !!existing;
  });

  await prisma.article.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      content: parsed.data.content,
      excerpt: parsed.data.excerpt,
      categoryId: parsed.data.categoryId || null,
    },
  });

  await syncArticleTags(id, parsed.data.tagIds);
  revalidatePath("/dashboard/articles");
  revalidatePath(`/dashboard/articles/${id}/edit`);
  return { success: true };
}

export async function deleteArticleAction(id: string): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    return { success: false, error: "Artikel tidak ditemukan" };
  }

  if (!canDeleteArticle(user, article)) {
    return { success: false, error: "Anda tidak memiliki akses" };
  }

  await prisma.article.delete({ where: { id } });
  revalidatePath("/dashboard/articles");
  redirect("/dashboard/articles");
}

export async function deleteArticleFormAction(
  id: string,
  formData: FormData
): Promise<void> {
  void formData;
  await deleteArticleAction(id);
}

async function updateStatus(
  id: string,
  status: ArticleStatus,
  publishedAt?: Date | null
) {
  await prisma.article.update({
    where: { id },
    data: { status, publishedAt },
  });
  revalidatePath("/dashboard/articles");
  revalidatePath("/");
}

export async function submitForReviewAction(id: string): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return { success: false, error: "Artikel tidak ditemukan" };
  if (!canSubmitForReview(user, article)) {
    return { success: false, error: "Tidak dapat mengirim artikel ini" };
  }

  await updateStatus(id, "PENDING_REVIEW", null);
  return { success: true };
}

export async function publishArticleAction(id: string): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return { success: false, error: "Artikel tidak ditemukan" };
  if (!canPublish(user)) {
    return { success: false, error: "Anda tidak memiliki akses" };
  }

  if (article.status === "DRAFT" && !canPublishDirectly(user)) {
    return {
      success: false,
      error: "Artikel harus melalui review terlebih dahulu",
    };
  }

  await updateStatus(id, "PUBLISHED", new Date());
  revalidatePath(`/articles/${article.slug}`);
  return { success: true };
}

export async function unpublishArticleAction(id: string): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return { success: false, error: "Artikel tidak ditemukan" };
  if (!canUnpublish(user)) {
    return { success: false, error: "Anda tidak memiliki akses" };
  }

  await updateStatus(id, "DRAFT", null);
  revalidatePath(`/articles/${article.slug}`);
  return { success: true };
}

export async function sendBackArticleAction(id: string): Promise<ActionResult> {
  const user = await requireUser();
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) return { success: false, error: "Artikel tidak ditemukan" };
  if (!canSendBack(user, article)) {
    return { success: false, error: "Tidak dapat mengembalikan artikel ini" };
  }

  await updateStatus(id, "DRAFT", null);
  return { success: true };
}
