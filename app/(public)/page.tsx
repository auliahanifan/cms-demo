import Link from "next/link";
import { getPublishedArticles } from "@/lib/queries/articles";
import { ArticleCard } from "@/components/public/article-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const { articles } = await getPublishedArticles({ limit: 20 });

  return (
    <div className="space-y-8">
      <PageHeader
        level="display"
        title="Artikel Terbaru"
        description="Temukan konten terbaru dari tim kami."
      />

      {articles.length === 0 ? (
        <EmptyState
          title="Belum ada artikel yang dipublikasikan"
          description="Masuk ke dashboard untuk mulai menulis."
          action={
            <Link href="/login" className={cn(buttonVariants({ variant: "link" }))}>
              Masuk ke dashboard
            </Link>
          }
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
