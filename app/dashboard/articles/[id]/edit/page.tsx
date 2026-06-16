import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { canDeleteArticle, canEditArticle } from "@/lib/auth/rbac";
import {
  deleteArticleFormAction,
  updateArticleAction,
} from "@/lib/actions/articles";
import {
  getAllCategories,
  getAllTags,
  getArticleById,
} from "@/lib/queries/articles";
import { ArticleForm } from "@/components/forms/article-form";
import { ArticleWorkflowActions } from "@/components/article-workflow-actions";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  return { title: article ? `Edit: ${article.title}` : "Edit Artikel" };
}

export default async function EditArticlePage({ params }: Props) {
  const user = await requireUser();
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();
  if (!canEditArticle(user, article)) redirect("/dashboard/articles");

  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);

  const boundUpdate = updateArticleAction.bind(null, id);
  const boundDelete = deleteArticleFormAction.bind(null, id);

  return (
    <PageContainer variant="content">
      <PageHeader
        title="Edit Artikel"
        description={`Penulis: ${article.author.name}`}
        meta={
          <div className="mb-2">
            <StatusBadge status={article.status} />
          </div>
        }
        actions={
          canDeleteArticle(user, article) ? (
            <form action={boundDelete}>
              <Button type="submit" variant="destructive" size="sm">
                Hapus
              </Button>
            </form>
          ) : undefined
        }
        className="items-start"
      />

      <ArticleWorkflowActions article={article} user={user} />

      <Separator />

      <ArticleForm
        action={boundUpdate}
        categories={categories}
        tags={tags}
        article={{
          title: article.title,
          content: article.content,
          excerpt: article.excerpt,
          categoryId: article.categoryId,
          tags: article.tags,
        }}
      />
    </PageContainer>
  );
}
