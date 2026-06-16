import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/queries/products";
import { ProductCard } from "@/components/public/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produk</h1>
        <p className="mt-2 text-muted-foreground">
          Jelajahi katalog produk kami.
        </p>
      </div>

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
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          {q ? (
            <p>Tidak ada produk yang cocok dengan pencarian Anda.</p>
          ) : (
            <p>Belum ada produk yang dipublikasikan.</p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        <Link href="/" className="underline">
          Kembali ke beranda
        </Link>
      </p>
    </div>
  );
}
