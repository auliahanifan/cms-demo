import type { ArticleStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const articleInclude = {
  author: { select: { id: true, name: true, email: true } },
  category: true,
  tags: { include: { tag: true } },
} as const;

export async function getPublishedArticles({
  page = 1,
  limit = 10,
  categorySlug,
  tagSlug,
  q,
}: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  tagSlug?: string;
  q?: string;
}) {
  const where: Prisma.ArticleWhereInput = {
    status: "PUBLISHED",
  };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (tagSlug) {
    where.tags = { some: { tag: { slug: tagSlug } } };
  }

  if (q?.trim()) {
    where.OR = [
      { title: { contains: q.trim(), mode: "insensitive" } },
      { content: { contains: q.trim(), mode: "insensitive" } },
      { excerpt: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: articleInclude,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.article.count({ where }),
  ]);

  return { articles, total, pages: Math.ceil(total / limit) };
}

export async function getPublishedArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: articleInclude,
  });
}

export async function getDashboardArticles({
  q,
  status,
  authorId,
  userRole,
  userId,
}: {
  q?: string;
  status?: ArticleStatus;
  authorId?: string;
  userRole: "ADMIN" | "EDITOR" | "AUTHOR";
  userId: string;
}) {
  const where: Prisma.ArticleWhereInput = {};

  if (userRole === "AUTHOR") {
    where.authorId = userId;
  }

  if (status) {
    where.status = status;
  }

  if (authorId && userRole !== "AUTHOR") {
    where.authorId = authorId;
  }

  if (q?.trim()) {
    where.OR = [
      { title: { contains: q.trim(), mode: "insensitive" } },
      { content: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  return prisma.article.findMany({
    where,
    include: articleInclude,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: { id },
    include: articleInclude,
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function getAllTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getTagBySlug(slug: string) {
  return prisma.tag.findUnique({ where: { slug } });
}

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      _count: { select: { articles: true } },
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
    },
  });
}

export async function getDashboardStats(userId: string, role: string) {
  const authorFilter = role === "AUTHOR" ? { authorId: userId } : {};

  const [total, draft, pending, published] = await Promise.all([
    prisma.article.count({ where: authorFilter }),
    prisma.article.count({ where: { ...authorFilter, status: "DRAFT" } }),
    prisma.article.count({
      where: { ...authorFilter, status: "PENDING_REVIEW" },
    }),
    prisma.article.count({ where: { ...authorFilter, status: "PUBLISHED" } }),
  ]);

  return { total, draft, pending, published };
}
