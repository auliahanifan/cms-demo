import type { Role } from "@prisma/client";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
};

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/articles", label: "Artikel", icon: FileText },
  {
    href: "/dashboard/products",
    label: "Produk",
    icon: Package,
    roles: ["ADMIN", "EDITOR"],
  },
  {
    href: "/dashboard/categories",
    label: "Kategori",
    icon: FolderTree,
    roles: ["ADMIN", "EDITOR"],
  },
  {
    href: "/dashboard/tags",
    label: "Tag",
    icon: Tag,
    roles: ["ADMIN", "EDITOR"],
  },
  { href: "/dashboard/users", label: "Pengguna", icon: Users, roles: ["ADMIN"] },
  {
    href: "/dashboard/design-system",
    label: "Design System",
    icon: Settings,
    roles: ["ADMIN"],
  },
];
