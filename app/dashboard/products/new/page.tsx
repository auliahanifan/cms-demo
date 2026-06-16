import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { createProductAction } from "@/lib/actions/products";
import { ProductForm } from "@/components/forms/product-form";

export const metadata: Metadata = { title: "Produk Baru" };

export default async function NewProductPage() {
  await requireRole("ADMIN", "EDITOR");

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Produk Baru</h1>
        <p className="text-muted-foreground">
          Produk akan disimpan sebagai draft secara otomatis.
        </p>
      </div>
      <ProductForm action={createProductAction} submitLabel="Simpan Draft" />
    </div>
  );
}
