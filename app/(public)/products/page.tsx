import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/queries/products";
import { ProductCard } from "@/components/public/product-card";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Produk",
  description: "Katalog produk kami",
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const products = await getPublishedProducts({ q });

  return (
    <div className="space-y-8">
      <PageHeader
        level="display"
        title="Produk"
        description="Jelajahi katalog produk kami."
      />

      <form className="flex flex-wrap gap-2" method="get">
        <Input
          name="q"
          placeholder="Cari produk..."
          defaultValue={q}
          className="max-w-xs"
        />
        <Button type="submit" variant="secondary">
          Cari
        </Button>
      </form>

      {products.length === 0 ? (
        <EmptyState
          title={
            q
              ? "Tidak ada produk yang cocok"
              : "Belum ada produk yang dipublikasikan"
          }
          description={
            q ? "Coba kata kunci lain." : "Katalog akan muncul di sini."
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        <Link href="/" className={cn(buttonVariants({ variant: "link", size: "sm" }))}>
          Kembali ke beranda
        </Link>
      </p>
    </div>
  );
}
