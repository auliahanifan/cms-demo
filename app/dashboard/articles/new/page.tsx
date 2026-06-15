import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { createArticleAction } from "@/lib/actions/articles";
import { getAllCategories, getAllTags } from "@/lib/queries/articles";
import { ArticleForm } from "@/components/forms/article-form";

export const metadata: Metadata = { title: "Artikel Baru" };

export default async function NewArticlePage() {
  await requireUser();
  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Artikel Baru</h1>
        <p className="text-muted-foreground">
          Artikel akan disimpan sebagai draft secara otomatis.
        </p>
      </div>
      <ArticleForm
        action={createArticleAction}
        categories={categories}
        tags={tags}
        submitLabel="Simpan Draft"
      />
    </div>
  );
}
