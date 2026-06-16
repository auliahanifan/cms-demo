const shadowScale = [
  { name: "shadow-xs", className: "shadow-xs" },
  { name: "shadow-sm", className: "shadow-sm" },
  { name: "shadow-md", className: "shadow-md" },
  { name: "shadow-lg", className: "shadow-lg" },
];

const radiusScale = [
  { name: "rounded-sm", className: "rounded-sm" },
  { name: "rounded-md", className: "rounded-md" },
  { name: "rounded-lg", className: "rounded-lg" },
  { name: "rounded-xl", className: "rounded-xl" },
];

export function ShadowsShowcase() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shadowScale.map((shadow) => (
          <div
            key={shadow.name}
            className={`rounded-lg border bg-card p-6 ${shadow.className}`}
          >
            <p className="text-sm font-medium">{shadow.name}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {radiusScale.map((radius) => (
          <div
            key={radius.name}
            className={`h-16 w-16 border bg-muted ${radius.className}`}
          />
        ))}
      </div>
    </>
  );
}
