import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { dashboardNavItems } from "@/components/dashboard/nav";
import { roleLabel } from "@/lib/auth/rbac";
import type { SessionUser } from "@/lib/auth/types";
import { Button } from "@/components/ui/button";

export function DashboardSidebar({ user }: { user: SessionUser }) {
  const items = dashboardNavItems.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r bg-muted/30">
      <div className="border-b p-4">
        <Link href="/dashboard" className="text-lg font-semibold">
          Blog CMS
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Dashboard</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{roleLabel(user.role)}</p>
        <form action={logoutAction} className="mt-3">
          <Button type="submit" variant="outline" size="sm" className="w-full">
            Keluar
          </Button>
        </form>
      </div>
    </aside>
  );
}
