const colorTokens = [
  { name: "Primary", className: "bg-primary", text: "text-primary-foreground" },
  { name: "Secondary", className: "bg-secondary", text: "text-secondary-foreground" },
  { name: "Muted", className: "bg-muted", text: "text-muted-foreground" },
  { name: "Accent", className: "bg-accent", text: "text-accent-foreground" },
  { name: "Destructive", className: "bg-destructive", text: "text-white" },
  { name: "Success", className: "bg-success", text: "text-success-foreground" },
  { name: "Warning", className: "bg-warning", text: "text-warning-foreground" },
  { name: "Info", className: "bg-info", text: "text-info-foreground" },
  { name: "Card", className: "bg-card border", text: "text-card-foreground" },
  { name: "Background", className: "bg-background border", text: "text-foreground" },
];

export function ColorsShowcase() {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {colorTokens.map((token) => (
          <div
            key={token.name}
            className={`flex h-20 items-end rounded-lg p-3 ${token.className} ${token.text}`}
          >
            <span className="text-sm font-medium">{token.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <span className="text-success">text-success</span>
        <span className="text-warning">text-warning</span>
        <span className="text-info">text-info</span>
        <span className="text-destructive">text-destructive</span>
        <span className="text-primary">text-primary</span>
        <span className="text-muted-foreground">text-muted-foreground</span>
      </div>
    </>
  );
}
