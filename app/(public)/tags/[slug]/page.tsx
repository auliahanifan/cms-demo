import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticles, getTagBySlug } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  return { title: tag ? `Tag: ${tag.name}` : "Tag" };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const { articles } = await getPublishedArticles({ tagSlug: slug });

  return (
    <div className="space-y-8">
      <PageHeader level="display" title={tag.name} description="Tag" />

      {articles.length === 0 ? (
        <EmptyState title="Belum ada artikel dengan tag ini." />
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
