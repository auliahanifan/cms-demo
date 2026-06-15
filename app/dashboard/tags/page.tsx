import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import {
  createTagAction,
  deleteTagAction,
  updateTagAction,
} from "@/lib/actions/tags";
import { getAllTags } from "@/lib/queries/articles";
import { CategoryTagManager } from "@/components/dashboard/category-tag-manager";

export const metadata: Metadata = { title: "Tag" };

export default async function TagsPage() {
  await requireRole("ADMIN", "EDITOR");

  const tags = await getAllTags();

  return (
    <CategoryTagManager
      title="Tag"
      description="Kelola tag artikel."
      items={tags}
      createAction={createTagAction}
      updateAction={updateTagAction}
      deleteAction={deleteTagAction}
      emptyMessage="Belum ada tag."
    />
  );
}
