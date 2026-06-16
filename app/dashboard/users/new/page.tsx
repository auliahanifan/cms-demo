import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { createUserAction } from "@/lib/actions/users";
import { UserForm } from "@/components/forms/user-form";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";

export const metadata: Metadata = { title: "Tambah Pengguna" };

export default async function NewUserPage() {
  await requireRole("ADMIN");

  return (
    <PageContainer variant="compact">
      <PageHeader
        title="Tambah Pengguna"
        description="Buat akun baru untuk tim konten."
      />
      <UserForm action={createUserAction} requirePassword />
    </PageContainer>
  );
}
