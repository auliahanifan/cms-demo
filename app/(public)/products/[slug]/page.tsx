import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedProductBySlug } from "@/lib/queries/products";
import { formatPrice } from "@/lib/utils/currency";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) notFound();

  return (
    <article className="space-y-8">
      <div>
        <Link
          href="/products"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Kembali ke katalog
        </Link>
      </div>

      {product.imageUrl && (
        <div className="overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>
      )}

      <header className="space-y-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tight">
          {product.name}
        </h1>
        <p className="text-xl font-semibold text-primary">
          {formatPrice(Number(product.price))}
        </p>
      </header>

      <div className="prose prose-neutral max-w-none">
        <p className="whitespace-pre-wrap text-muted-foreground">
          {product.description}
        </p>
      </div>
    </article>
  );
}
