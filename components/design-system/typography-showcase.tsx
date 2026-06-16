export function TypographyShowcase() {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      <p className="text-display">Display — Judul halaman publik</p>
      <p className="text-heading-1">Heading 1 — Judul halaman dashboard</p>
      <p className="text-heading-2">Heading 2 — Judul section</p>
      <p className="text-body">Body — Teks UI default (text-sm)</p>
      <p className="text-caption">Caption — Meta, timestamp, hint</p>
      <div className="prose prose-neutral max-w-none text-sm">
        <p>
          Prose — Konten artikel dengan <strong>typography plugin</strong>{" "}
          untuk paragraf panjang.
        </p>
      </div>
    </div>
  );
}
