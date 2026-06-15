"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/session";
import { tagSchema } from "@/lib/validations/schemas";
import { uniqueSlug } from "@/lib/utils/slug";
import type { ActionResult } from "@/lib/actions/auth";

export async function createTagAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const parsed = tagSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.tag.findUnique({ where: { slug: s } });
    return !!existing;
  });

  await prisma.tag.create({
    data: { name: parsed.data.name, slug },
  });

  revalidatePath("/dashboard/tags");
  return { success: true };
}

export async function updateTagAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const parsed = tagSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.tag.findFirst({
      where: { slug: s, NOT: { id } },
    });
    return !!existing;
  });

  await prisma.tag.update({
    where: { id },
    data: { name: parsed.data.name, slug },
  });

  revalidatePath("/dashboard/tags");
  return { success: true };
}

export async function deleteTagAction(id: string): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  await prisma.tag.delete({ where: { id } });
  revalidatePath("/dashboard/tags");
  return { success: true };
}
