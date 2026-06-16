import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { createArticleAction } from "@/lib/actions/articles";
import { getAllCategories, getAllTags } from "@/lib/queries/articles";
import { ArticleForm } from "@/components/forms/article-form";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";

export const metadata: Metadata = { title: "Artikel Baru" };

export default async function NewArticlePage() {
  await requireUser();
  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);

  return (
    <PageContainer variant="content">
      <PageHeader
        title="Artikel Baru"
        description="Artikel akan disimpan sebagai draft secara otomatis."
      />
      <ArticleForm
        action={createArticleAction}
        categories={categories}
        tags={tags}
        submitLabel="Simpan Draft"
      />
    </PageContainer>
  );
}
