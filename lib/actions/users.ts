"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { requireRole, requireUser } from "@/lib/auth/session";
import { userSchema } from "@/lib/validations/schemas";
import type { ActionResult } from "@/lib/actions/auth";

export async function createUserAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  await requireRole("ADMIN");

  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  if (!parsed.data.password) {
    return { success: false, error: "Password wajib diisi" };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (existing) {
    return { success: false, error: "Email sudah digunakan" };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash,
      role: parsed.data.role,
      active: parsed.data.active ?? true,
    },
  });

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateUserAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const currentUser = await requireRole("ADMIN");

  const parsed = userSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password") || undefined,
    role: formData.get("role"),
    active: formData.get("active") === "on",
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  if (currentUser.id === id && parsed.data.role !== "ADMIN") {
    return { success: false, error: "Anda tidak dapat mengubah role sendiri" };
  }

  if (currentUser.id === id && parsed.data.active === false) {
    return {
      success: false,
      error: "Anda tidak dapat menonaktifkan akun sendiri",
    };
  }

  const data: {
    name: string;
    email: string;
    role: "ADMIN" | "EDITOR" | "AUTHOR";
    active: boolean;
    passwordHash?: string;
  } = {
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    role: parsed.data.role,
    active: parsed.data.active ?? true,
  };

  if (parsed.data.password) {
    data.passwordHash = await hashPassword(parsed.data.password);
  }

  await prisma.user.update({ where: { id }, data });
  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function updateOwnPasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!password || password.length < 8) {
    return { success: false, error: "Password minimal 8 karakter" };
  }

  if (password !== confirm) {
    return { success: false, error: "Konfirmasi password tidak cocok" };
  }

  const passwordHash = await hashPassword(password);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return { success: true };
}
