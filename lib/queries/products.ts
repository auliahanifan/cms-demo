import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getDashboardProducts({
  q,
  published,
}: {
  q?: string;
  published?: boolean;
}) {
  const where: Prisma.ProductWhereInput = {};

  if (published !== undefined) {
    where.published = published;
  }

  if (q?.trim()) {
    where.OR = [
      { name: { contains: q.trim(), mode: "insensitive" } },
      { description: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  return prisma.product.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getPublishedProducts({
  limit,
  q,
}: {
  limit?: number;
  q?: string;
} = {}) {
  const where: Prisma.ProductWhereInput = { published: true };

  if (q?.trim()) {
    where.OR = [
      { name: { contains: q.trim(), mode: "insensitive" } },
      { description: { contains: q.trim(), mode: "insensitive" } },
    ];
  }

  return prisma.product.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPublishedProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, published: true },
  });
}
