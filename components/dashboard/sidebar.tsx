import Link from "next/link";
import type { Role } from "@prisma/client";
import { logoutAction } from "@/lib/actions/auth";
import { roleLabel } from "@/lib/auth/rbac";
import type { SessionUser } from "@/lib/auth/types";
import { Button } from "@/components/ui/button";

type NavItem = {
  href: string;
  label: string;
  roles?: Role[];
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/articles", label: "Artikel" },
  { href: "/dashboard/categories", label: "Kategori", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/tags", label: "Tag", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/users", label: "Pengguna", roles: ["ADMIN"] },
];

export function DashboardSidebar({ user }: { user: SessionUser }) {
  const items = navItems.filter(
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
