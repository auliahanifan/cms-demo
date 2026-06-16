import { dashboardNavItems } from "@/components/dashboard/nav";

export function IconsShowcase() {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Ikon navigasi dashboard (sumber: `dashboardNavItems`):
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {dashboardNavItems.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
          >
            <Icon className="size-5 text-muted-foreground" />
            <span className="text-caption">{label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
