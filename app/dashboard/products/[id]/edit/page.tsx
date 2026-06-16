import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import {
  deleteProductFormAction,
  updateProductAction,
} from "@/lib/actions/products";
import { getProductById } from "@/lib/queries/products";
import { ProductForm } from "@/components/forms/product-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product ? `Edit: ${product.name}` : "Edit Produk" };
}

export default async function EditProductPage({ params }: Props) {
  await requireRole("ADMIN", "EDITOR");
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const boundUpdate = updateProductAction.bind(null, id);
  const boundDelete = deleteProductFormAction.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2">
            <Badge variant={product.published ? "default" : "secondary"}>
              {product.published ? "Dipublikasikan" : "Draft"}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold">Edit Produk</h1>
          <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
        </div>
        <form action={boundDelete}>
          <Button type="submit" variant="destructive" size="sm">
            Hapus
          </Button>
        </form>
      </div>

      <Separator />

      <ProductForm
        action={boundUpdate}
        product={{
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          published: product.published,
        }}
      />
    </div>
  );
}
