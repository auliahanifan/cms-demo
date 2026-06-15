import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { updateUserAction } from "@/lib/actions/users";
import { getUserById } from "@/lib/queries/articles";
import { UserForm } from "@/components/forms/user-form";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);
  return { title: user ? `Edit: ${user.name}` : "Edit Pengguna" };
}

export default async function EditUserPage({ params }: Props) {
  await requireRole("ADMIN");

  const { id } = await params;
  const user = await getUserById(id);
  if (!user) notFound();

  const boundUpdate = updateUserAction.bind(null, id);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Pengguna</h1>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      <UserForm action={boundUpdate} user={user} />
    </div>
  );
}
