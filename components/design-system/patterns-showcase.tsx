import Link from "next/link";
import { Package } from "lucide-react";
import { EmptyState } from "@/components/patterns/empty-state";
import { PageHeader } from "@/components/patterns/page-header";
import { StatCard } from "@/components/patterns/stat-card";
import { SuccessMessage } from "@/components/patterns/success-message";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PatternsShowcase() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-caption">PageHeader</p>
        <PageHeader
          title="Judul Halaman"
          description="Deskripsi singkat halaman."
          actions={<Button size="sm">Aksi</Button>}
        />
      </div>

      <div className="space-y-2">
        <p className="text-caption">StatCard</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total Artikel" value={42} />
          <StatCard label="Draft" value={5} description="Belum dipublikasikan" />
          <StatCard label="Dipublikasikan" value={37} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-caption">SuccessMessage (inline form flash)</p>
        <SuccessMessage>Perubahan berhasil disimpan.</SuccessMessage>
      </div>

      <div className="space-y-2">
        <p className="text-caption">EmptyState</p>
        <EmptyState
          icon={<Package />}
          title="Belum ada produk"
          description="Mulai dengan menambahkan produk pertama."
          action={
            <Link
              href="/dashboard/products/new"
              className={cn(buttonVariants({ size: "sm" }))}
            >
              Buat produk
            </Link>
          }
        />
      </div>
    </div>
  );
}
