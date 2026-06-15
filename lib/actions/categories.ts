"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/session";
import { categorySchema } from "@/lib/validations/schemas";
import { uniqueSlug } from "@/lib/utils/slug";
import type { ActionResult } from "@/lib/actions/auth";

export async function createCategoryAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.category.findUnique({ where: { slug: s } });
    return !!existing;
  });

  await prisma.category.create({
    data: { name: parsed.data.name, slug },
  });

  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function updateCategoryAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.category.findFirst({
      where: { slug: s, NOT: { id } },
    });
    return !!existing;
  });

  await prisma.category.update({
    where: { id },
    data: { name: parsed.data.name, slug },
  });

  revalidatePath("/dashboard/categories");
  return { success: true };
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  await prisma.category.delete({ where: { id } });
  revalidatePath("/dashboard/categories");
  return { success: true };
}
