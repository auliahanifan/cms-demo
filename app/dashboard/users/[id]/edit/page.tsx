import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { updateUserAction } from "@/lib/actions/users";
import { getUserById } from "@/lib/queries/articles";
import { UserForm } from "@/components/forms/user-form";
import { PageContainer } from "@/components/patterns/page-container";
import { PageHeader } from "@/components/patterns/page-header";

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
    <PageContainer variant="compact">
      <PageHeader title="Edit Pengguna" description={user.email} />
      <UserForm action={boundUpdate} user={user} />
    </PageContainer>
  );
}
