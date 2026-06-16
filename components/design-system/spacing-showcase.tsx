const spacingScale = [1, 2, 3, 4, 6, 8, 12, 16];

export function SpacingShowcase() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Skala spacing Tailwind (rem) dan lebar kontainer:
      </p>
      <div className="flex flex-wrap items-end gap-4">
        {spacingScale.map((n) => (
          <div key={n} className="text-center">
            <div
              className="bg-primary/20"
              style={{ width: `${n * 0.25}rem`, height: `${n * 0.25}rem` }}
            />
            <p className="mt-1 text-caption">{n}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-dashed p-4">
          <p className="text-sm font-medium">content / compact</p>
          <p className="text-caption">max-w-3xl · max-w-lg (form pengguna)</p>
        </div>
        <div className="rounded-lg border border-dashed p-4">
          <p className="text-sm font-medium">dashboard</p>
          <p className="text-caption">max-w-6xl</p>
        </div>
      </div>
    </div>
  );
}
