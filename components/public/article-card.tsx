import Link from "next/link";
import type { Article, Category, Tag, User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/date";

type ArticleWithRelations = Article & {
  author: Pick<User, "id" | "name" | "email">;
  category: Category | null;
  tags: { tag: Tag }[];
};

export function ArticleCard({ article }: { article: ArticleWithRelations }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={article.publishedAt?.toISOString()}>
            {formatDate(article.publishedAt)}
          </time>
          {article.category && (
            <Link href={`/categories/${article.category.slug}`}>
              <Badge variant="secondary">{article.category.name}</Badge>
            </Link>
          )}
        </div>
        <CardTitle className="text-xl leading-snug">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:underline"
          >
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {article.excerpt && (
          <p className="mb-3 text-muted-foreground">{article.excerpt}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {article.tags.map(({ tag }) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <Badge variant="outline">{tag.name}</Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
