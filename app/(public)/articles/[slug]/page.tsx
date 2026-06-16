import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ArticleContent } from "@/components/public/article-content";
import { getPublishedArticleBySlug } from "@/lib/queries/articles";
import { formatDate } from "@/lib/utils/date";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) notFound();

  return (
    <article>
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={article.publishedAt?.toISOString()}>
            {formatDate(article.publishedAt)}
          </time>
          <span>·</span>
          <span>{article.author.name}</span>
          {article.category && (
            <>
              <span>·</span>
              <Link href={`/categories/${article.category.slug}`}>
                <Badge variant="secondary">{article.category.name}</Badge>
              </Link>
            </>
          )}
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {article.title}
        </h1>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.map(({ tag }) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="outline">{tag.name}</Badge>
              </Link>
            ))}
          </div>
        )}
      </header>
      <ArticleContent content={article.content} />
    </article>
  );
}
