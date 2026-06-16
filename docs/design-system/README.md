# Design System — Vibe Coding Class CMS

Panduan praktis untuk membangun UI yang konsisten di atas Tailwind v4, shadcn/ui, dan komponen pattern internal.

## Prinsip desain

1. **Clarity** — Hierarki tipografi jelas; satu aksi utama per layar.
2. **Consistency** — Pakai token dan pattern yang sama di publik maupun dashboard.
3. **Accessibility** — Kontras warna WCAG AA; label form selalu terhubung ke input.
4. **Density** — Halaman publik lebih lapang (`max-w-3xl`); dashboard lebih lebar (`max-w-6xl`) dengan grid padat.

Inspirasi visual: whitespace ala Google, pola enterprise ala Atlassian, polish halus ala Stripe.

## Kapan pakai primitive vs pattern

```
Butuh UI baru?
├── Sudah ada di /design-system → pakai langsung
├── Komposisi layout/feedback/data → components/patterns/
├── Kontrol dasar (button, input) → components/ui/
└── Warna/spacing → token di globals.css
```

**Primitive** (`components/ui/`) — building block shadcn: `Button`, `Input`, `Alert`, dll.

**Pattern** (`components/patterns/`) — komposisi yang dipakai ulang di banyak halaman: `PageHeader`, `EmptyState`, `StatCard`.

## Token & referensi

- [tokens.md](./tokens.md) — warna, tipografi, spacing, shadow
- [patterns.md](./patterns.md) — API komponen pattern

Living style guide: **`/design-system`** (hanya ADMIN).

## Cara menambah komponen baru

1. Cek `/design-system` dan `components/patterns/` — mungkin sudah ada.
2. Jika dipakai di 3+ tempat, ekstrak ke `components/patterns/`.
3. Jika butuh kontrol dasar baru, tambah via shadcn CLI ke `components/ui/`.
4. Warna baru → tambah CSS variable di `app/globals.css`, daftarkan di `@theme inline`.
5. Tambahkan contoh ke halaman showcase dan dokumentasi.

## Do / Don't

| Do | Don't |
|----|-------|
| `<Input />` + `<Button />` dari shadcn | Raw `<input>` / `<button>` dengan class manual |
| `text-success` atau `<SuccessMessage>` | `text-green-600` hardcoded |
| `<PageContainer variant="dashboard">` | Copy-paste `mx-auto max-w-6xl space-y-6` |
| `bg-primary`, `text-muted-foreground` | Hex/rgb arbitrary di komponen |
| `<PageHeader title actions>` | Duplikasi blok `h1` + deskripsi + tombol |

## Alur kerja fitur baru

1. Buka `/design-system`
2. Compose: `PageContainer` + `PageHeader` + form shadcn
3. Pilih variant container: `public` | `dashboard` | `form`
4. Feedback sukses → `SuccessMessage` atau `Alert variant="success"`
5. State kosong → `EmptyState`
