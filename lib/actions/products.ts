"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/session";
import { productSchema } from "@/lib/validations/schemas";
import { uniqueSlug } from "@/lib/utils/slug";
import type { ActionResult } from "@/lib/actions/auth";

function parseProductForm(formData: FormData) {
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const published = formData.get("published") === "on";

  return productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    imageUrl: imageUrl || "",
    published,
  });
}

export async function createProductAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.product.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const product = await prisma.product.create({
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      price: parsed.data.price,
      imageUrl: parsed.data.imageUrl || null,
      published: false,
    },
  });

  revalidatePath("/dashboard/products");
  redirect(`/dashboard/products/${product.id}/edit`);
}

export async function updateProductAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return { success: false, error: "Produk tidak ditemukan" };
  }

  const parsed = parseProductForm(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  const slug = await uniqueSlug(parsed.data.name, async (s) => {
    const existing = await prisma.product.findFirst({
      where: { slug: s, NOT: { id } },
    });
    return !!existing;
  });

  const published = parsed.data.published ?? false;
  const publishedAt =
    published && !product.published
      ? new Date()
      : published
        ? product.publishedAt
        : null;

  await prisma.product.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      price: parsed.data.price,
      imageUrl: parsed.data.imageUrl || null,
      published,
      publishedAt,
    },
  });

  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${id}/edit`);
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  if (product.slug !== slug) {
    revalidatePath(`/products/${product.slug}`);
  }
  return { success: true };
}

export async function deleteProductAction(id: string): Promise<ActionResult> {
  await requireRole("ADMIN", "EDITOR");

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return { success: false, error: "Produk tidak ditemukan" };
  }

  await prisma.product.delete({ where: { id } });
  revalidatePath("/dashboard/products");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  redirect("/dashboard/products");
}

export async function deleteProductFormAction(
  id: string,
  formData: FormData
): Promise<void> {
  void formData;
  await deleteProductAction(id);
}
