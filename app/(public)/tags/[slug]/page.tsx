import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedArticles, getTagBySlug } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";

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
      <div>
        <p className="text-sm text-muted-foreground">Tag</p>
        <h1 className="text-3xl font-bold">{tag.name}</h1>
      </div>
      {articles.length === 0 ? (
        <p className="text-muted-foreground">Belum ada artikel dengan tag ini.</p>
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
