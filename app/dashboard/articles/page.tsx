import Link from "next/link";
import type { Metadata } from "next";
import type { ArticleStatus } from "@prisma/client";
import { requireUser } from "@/lib/auth/session";
import { getDashboardArticles } from "@/lib/queries/articles";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/date";

export const metadata: Metadata = { title: "Artikel" };

type Props = {
  searchParams: Promise<{ q?: string; status?: ArticleStatus }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const user = await requireUser();
  const { q, status } = await searchParams;

  const articles = await getDashboardArticles({
    q,
    status,
    userRole: user.role,
    userId: user.id,
  });

  return (
    <PageContainer variant="dashboard">
      <PageHeader
        title="Artikel"
        description="Kelola semua artikel."
        actions={
          <Link
            href="/dashboard/articles/new"
            className={cn(buttonVariants())}
          >
            Artikel Baru
          </Link>
        }
      />

      <form className="flex flex-wrap gap-2" method="get">
        <Input
          name="q"
          placeholder="Cari artikel..."
          defaultValue={q}
          className="max-w-xs"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Semua status</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING_REVIEW">Menunggu Review</option>
          <option value="PUBLISHED">Dipublikasikan</option>
        </select>
        <Button type="submit" variant="secondary">
          Filter
        </Button>
      </form>

      {articles.length === 0 ? (
        <EmptyState
          title="Belum ada artikel"
          description="Mulai dengan membuat artikel pertama Anda."
          action={
            <Link
              href="/dashboard/articles/new"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Buat artikel pertama
            </Link>
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Penulis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Diperbarui</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={article.status} />
                  </TableCell>
                  <TableCell>{formatDateTime(article.updatedAt)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/articles/${article.id}/edit`}
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageContainer>
  );
}
