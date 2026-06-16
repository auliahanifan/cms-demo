import Link from "next/link";
import type { SessionUser } from "@/lib/auth/types";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export function DashboardShell({
  user,
  header,
  children,
}: {
  user: SessionUser;
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar user={user} />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4">
          {header ?? <div />}
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function DashboardPublicSiteLink() {
  return (
    <Link href="/" className="text-sm text-muted-foreground hover:underline">
      Lihat situs publik →
    </Link>
  );
}
