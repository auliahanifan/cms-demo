import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { canManageProducts } from "@/lib/auth/rbac";
import { getDashboardStats } from "@/lib/queries/articles";
import { updateOwnPasswordAction } from "@/lib/actions/users";
import { ActionForm, FormField } from "@/components/forms/form-fields";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";
import { StatCard } from "@/components/patterns/stat-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function DashboardPage() {
  const user = await requireUser();
  const stats = await getDashboardStats(user.id, user.role);

  const showDefaultPasswordWarning =
    user.email === "admin@example.com" && user.role === "ADMIN";

  return (
    <PageContainer variant="dashboard" className="space-y-8">
      <PageHeader
        title={`Halo, ${user.name}`}
        description="Ringkasan dashboard Anda."
      />

      {showDefaultPasswordWarning && (
        <Alert>
          <AlertTitle>Ganti password default</AlertTitle>
          <AlertDescription>
            Anda masih menggunakan akun admin default. Segera ganti password di
            bawah ini demi keamanan.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Artikel" value={stats.total} />
        <StatCard label="Draft" value={stats.draft} />
        <StatCard label="Menunggu Review" value={stats.pending} />
        <StatCard label="Dipublikasikan" value={stats.published} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/dashboard/articles/new" className={cn(buttonVariants())}>
            Tulis Artikel Baru
          </Link>
          <Link
            href="/dashboard/articles"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Kelola Artikel
          </Link>
          {canManageProducts(user) && (
            <>
              <Link href="/dashboard/products/new" className={cn(buttonVariants())}>
                Tambah Produk
              </Link>
              <Link
                href="/dashboard/products"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Kelola Produk
              </Link>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganti Password</CardTitle>
          <CardDescription>Perbarui password akun Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm action={updateOwnPasswordAction} className="max-w-md space-y-4">
            <FormField label="Password Baru" name="password" type="password" required />
            <FormField
              label="Konfirmasi Password"
              name="confirm"
              type="password"
              required
            />
            <Button type="submit">Simpan Password</Button>
          </ActionForm>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
