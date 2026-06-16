import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getDashboardProducts } from "@/lib/queries/products";
import { formatPrice } from "@/lib/utils/currency";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { EmptyState } from "@/components/patterns/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/date";

export const metadata: Metadata = { title: "Produk" };

type Props = {
  searchParams: Promise<{ q?: string; published?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  await requireRole("ADMIN", "EDITOR");
  const { q, published: publishedParam } = await searchParams;

  const published =
    publishedParam === "true"
      ? true
      : publishedParam === "false"
        ? false
        : undefined;

  const products = await getDashboardProducts({ q, published });

  return (
    <PageContainer variant="dashboard">
      <PageHeader
        title="Produk"
        description="Kelola katalog produk."
        actions={
          <Link href="/dashboard/products/new" className={cn(buttonVariants())}>
            Produk Baru
          </Link>
        }
      />

      <form className="flex flex-wrap gap-2" method="get">
        <Input
          name="q"
          placeholder="Cari produk..."
          defaultValue={q}
          className="max-w-xs"
        />
        <select
          name="published"
          defaultValue={publishedParam ?? ""}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="">Semua status</option>
          <option value="true">Dipublikasikan</option>
          <option value="false">Belum dipublikasikan</option>
        </select>
        <Button type="submit" variant="secondary">
          Filter
        </Button>
      </form>

      {products.length === 0 ? (
        <EmptyState
          title="Belum ada produk"
          description="Mulai dengan membuat produk pertama Anda."
          action={
            <Link
              href="/dashboard/products/new"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Buat produk pertama
            </Link>
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Diperbarui</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatPrice(Number(product.price))}</TableCell>
                  <TableCell>
                    <Badge variant={product.published ? "default" : "secondary"}>
                      {product.published ? "Dipublikasikan" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDateTime(product.updatedAt)}</TableCell>
                  <TableCell>
                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" })
                      )}
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
