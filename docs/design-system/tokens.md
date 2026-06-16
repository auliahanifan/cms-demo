# Token Reference

Semua token didefinisikan di `app/globals.css` dan didaftarkan di blok `@theme inline` (Tailwind v4).

## Warna brand & semantic

| Token | Class Tailwind | Penggunaan |
|-------|----------------|------------|
| `--primary` | `bg-primary`, `text-primary` | Aksi utama, link, accent brand (biru) |
| `--secondary` | `bg-secondary` | Aksi sekunder |
| `--muted` | `bg-muted`, `text-muted-foreground` | Latar halus, teks sekunder |
| `--destructive` | `text-destructive`, `bg-destructive` | Error, hapus |
| `--success` | `text-success`, `bg-success` | Sukses, konfirmasi positif |
| `--warning` | `text-warning`, `bg-warning` | Peringatan |
| `--info` | `text-info`, `bg-info` | Informasi netral (cyan — beda dari primary) |

Nilai light mode (OKLCH):

- Primary: `oklch(0.45 0.18 250)` — biru profesional
- Success: `oklch(0.62 0.17 145)`
- Warning: `oklch(0.75 0.15 85)`
- Info: `oklch(0.58 0.14 220)` — cyan, bukan biru brand

Dark mode memiliki override di selector `.dark`.

## Tipografi

Font: **Inter** (via `app/layout.tsx`).

| Utility class | Setara | Penggunaan |
|---------------|--------|------------|
| `.text-display` | `text-3xl font-bold tracking-tight` | Judul halaman publik |
| `.text-heading-1` | `text-2xl font-bold` | Judul halaman dashboard |
| `.text-heading-2` | `text-lg font-semibold` | Judul section |
| `.text-body` | `text-sm` | Teks UI default |
| `.text-caption` | `text-xs text-muted-foreground` | Meta, timestamp |
| `.prose` | typography plugin | Konten artikel panjang |

## Spacing & layout

Skala spacing standar Tailwind: `1` (4px) hingga `16` (64px).

Lebar kontainer (`PageContainer`):

| Variant | Class | Dipakai di |
|---------|-------|------------|
| `content` | `max-w-3xl` | Form artikel/produk, edit |
| `compact` | `max-w-lg` | Form pengguna |
| `dashboard` | `max-w-6xl` | List, tabel, ringkasan |

Halaman publik memakai `max-w-3xl` dari `app/(public)/layout.tsx` — tidak perlu `PageContainer` di dalamnya.

Pola vertikal umum: `space-y-6` (form), `space-y-8` (dashboard section).

## Shadow

| Token | Class |
|-------|-------|
| `--shadow-xs` | `shadow-xs` |
| `--shadow-sm` | `shadow-sm` |
| `--shadow-md` | `shadow-md` |
| `--shadow-lg` | `shadow-lg` |

## Radius

Base: `--radius: 0.625rem` (10px).

Turunan: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` — dihitung dari `--radius` di `@theme`.

## Menambah token baru

1. Tambah CSS variable di `:root` dan `.dark`
2. Daftarkan di `@theme inline` sebagai `--color-*` atau `--shadow-*`
3. Uji di `/dashboard/design-system`
4. Update dokumen ini
