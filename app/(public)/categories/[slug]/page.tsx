import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getPublishedArticles,
} from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  return { title: category ? `Kategori: ${category.name}` : "Kategori" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const { articles } = await getPublishedArticles({ categorySlug: slug });

  return (
    <div className="space-y-8">
      <PageHeader
        level="display"
        title={category.name}
        description="Kategori"
      />

      {articles.length === 0 ? (
        <EmptyState title="Belum ada artikel dalam kategori ini." />
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
