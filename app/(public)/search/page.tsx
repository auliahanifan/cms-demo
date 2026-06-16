import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = { title: "Pencarian" };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const { articles } = query
    ? await getPublishedArticles({ q: query, limit: 50 })
    : { articles: [] };

  return (
    <div className="space-y-8">
      <PageHeader
        level="display"
        title="Pencarian"
        description="Cari artikel yang sudah dipublikasikan."
      />

      <form action="/search" method="get" className="flex gap-2">
        <Input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Ketik kata kunci..."
          className="flex-1"
        />
        <Button type="submit">Cari</Button>
      </form>

      {query && (
        <p className="text-sm text-muted-foreground">
          {articles.length} hasil untuk &ldquo;{query}&rdquo;
        </p>
      )}

      {!query ? (
        <EmptyState
          title="Mulai pencarian"
          description="Masukkan kata kunci di atas."
        />
      ) : articles.length === 0 ? (
        <EmptyState
          title="Tidak ada artikel yang cocok"
          description="Coba kata kunci lain."
        />
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
