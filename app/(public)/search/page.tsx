import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";

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
      <div>
        <h1 className="text-3xl font-bold">Pencarian</h1>
        <form action="/search" method="get" className="mt-4 flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Ketik kata kunci..."
            className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-4 text-sm text-primary-foreground"
          >
            Cari
          </button>
        </form>
      </div>

      {query && (
        <p className="text-sm text-muted-foreground">
          {articles.length} hasil untuk &ldquo;{query}&rdquo;
        </p>
      )}

      {!query ? (
        <p className="text-muted-foreground">Masukkan kata kunci untuk mencari.</p>
      ) : articles.length === 0 ? (
        <p className="text-muted-foreground">Tidak ada artikel yang cocok.</p>
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
