import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/lib/actions/categories";
import { getAllCategories } from "@/lib/queries/articles";
import { CategoryTagManager } from "@/components/dashboard/category-tag-manager";

export const metadata: Metadata = { title: "Kategori" };

export default async function CategoriesPage() {
  await requireRole("ADMIN", "EDITOR");

  const categories = await getAllCategories();

  return (
    <CategoryTagManager
      title="Kategori"
      description="Kelola kategori artikel."
      items={categories}
      createAction={createCategoryAction}
      updateAction={updateCategoryAction}
      deleteAction={deleteCategoryAction}
      emptyMessage="Belum ada kategori."
    />
  );
}
