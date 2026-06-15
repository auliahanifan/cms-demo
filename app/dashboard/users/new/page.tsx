import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { createUserAction } from "@/lib/actions/users";
import { UserForm } from "@/components/forms/user-form";

export const metadata: Metadata = { title: "Tambah Pengguna" };

export default async function NewUserPage() {
  await requireRole("ADMIN");

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tambah Pengguna</h1>
        <p className="text-muted-foreground">Buat akun baru untuk tim konten.</p>
      </div>
      <UserForm action={createUserAction} requirePassword />
    </div>
  );
}
