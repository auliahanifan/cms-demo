import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { createProductAction } from "@/lib/actions/products";
import { ProductForm } from "@/components/forms/product-form";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";

export const metadata: Metadata = { title: "Produk Baru" };

export default async function NewProductPage() {
  await requireRole("ADMIN", "EDITOR");

  return (
    <PageContainer variant="content">
      <PageHeader
        title="Produk Baru"
        description="Produk akan disimpan sebagai draft secara otomatis."
      />
      <ProductForm action={createProductAction} submitLabel="Simpan Draft" />
    </PageContainer>
  );
}
