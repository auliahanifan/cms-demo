"use client";

import { useActionState } from "react";
import type { Role } from "@prisma/client";
import type { ActionResult } from "@/lib/actions/auth";
import { FormMessage, FormField } from "@/components/forms/form-fields";
import { SuccessMessage } from "@/components/patterns/success-message";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type FormAction = (
  prev: ActionResult | null,
  formData: FormData
) => Promise<ActionResult>;

export function UserForm({
  action,
  user,
  requirePassword = false,
}: {
  action: FormAction;
  user?: {
    name: string;
    email: string;
    role: Role;
    active: boolean;
  };
  requirePassword?: boolean;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-4">
      <FormMessage state={state} />
      {state?.success && (
        <SuccessMessage>Berhasil disimpan.</SuccessMessage>
      )}

      <FormField label="Nama" name="name" required defaultValue={user?.name} />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        defaultValue={user?.email}
      />
      <FormField
        label={requirePassword ? "Password" : "Password Baru (kosongkan jika tidak diubah)"}
        name="password"
        type="password"
        required={requirePassword}
      />

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          defaultValue={user?.role ?? "AUTHOR"}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
        >
          <option value="ADMIN">Admin</option>
          <option value="EDITOR">Editor</option>
          <option value="AUTHOR">Penulis</option>
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="active"
          defaultChecked={user?.active ?? true}
        />
        Akun aktif
      </label>

      <Button type="submit">Simpan</Button>
    </form>
  );
}
