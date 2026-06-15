import Link from "next/link";
import { getPublishedArticles } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";

export default async function HomePage() {
  const { articles } = await getPublishedArticles({ limit: 20 });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Artikel Terbaru</h1>
        <p className="mt-2 text-muted-foreground">
          Temukan konten terbaru dari tim kami.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          <p>Belum ada artikel yang dipublikasikan.</p>
          <p className="mt-2 text-sm">
            <Link href="/login" className="underline">
              Masuk ke dashboard
            </Link>{" "}
            untuk mulai menulis.
          </p>
        </div>
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
