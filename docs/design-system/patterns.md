# Pattern Components

Komponen di `components/patterns/` — bukan primitive shadcn, melainkan komposisi yang distandarkan di seluruh app.

## PageContainer

Wrapper lebar + spacing vertikal untuk halaman dashboard dan form.

```tsx
import { PageContainer } from "@/components/patterns/page-container";

<PageContainer variant="dashboard">
  {children}
</PageContainer>
```

| Prop `variant` | Layout |
|----------------|--------|
| `content` | `max-w-3xl space-y-6` — form artikel/produk |
| `compact` | `max-w-lg space-y-6` — form pengguna |
| `dashboard` | `max-w-6xl space-y-6` — list, tabel, ringkasan |

Halaman publik sudah dibungkus `max-w-3xl` di layout — gunakan `PageHeader` / `EmptyState` saja.

## PageHeader

Judul halaman atau section + deskripsi opsional + slot aksi kanan.

```tsx
import { PageHeader } from "@/components/patterns/page-header";

<PageHeader
  title="Produk"
  description="Kelola katalog produk."
  actions={<Button>Produk Baru</Button>}
/>
```

| Prop `level` | Elemen | Class |
|--------------|--------|-------|
| `display` (default publik) | `h1` | `text-display` |
| `page` (default) | `h1` | `text-heading-1` |
| `section` | `h2` | `text-heading-2` |

Props tambahan: `meta` (badge/status di atas judul), `className`.

`SectionHeading` masih ada sebagai alias `level="section"` — prefer `PageHeader` langsung.

## StatCard

Kartu metrik untuk dashboard — wrap shadcn `Card`.

```tsx
import { StatCard } from "@/components/patterns/stat-card";

<StatCard label="Total Artikel" value={42} description="Opsional" />
```

## SuccessMessage vs Alert

| Kebutuhan | Komponen |
|-----------|----------|
| Flash inline setelah submit form berhasil | `<SuccessMessage>` |
| Notice persisten di halaman (password default, workflow) | `<Alert variant="success">` |

```tsx
// Inline form flash
{state?.success && <SuccessMessage>Berhasil disimpan.</SuccessMessage>}

// Block-level notice
<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Berhasil</AlertTitle>
  <AlertDescription>Data tersimpan.</AlertDescription>
</Alert>
```

## EmptyState

State kosong dengan border dashed.

```tsx
import { EmptyState } from "@/components/patterns/empty-state";

<EmptyState
  icon={<Package />}
  title="Belum ada produk"
  description="Mulai dengan menambahkan produk pertama."
  action={<Button>Tambah</Button>}
/>
```

## Alert variants

`components/ui/alert.tsx` mendukung:

- `default` — informasi umum
- `destructive` — error
- `success` — operasi berhasil (dengan ikon opsional)
- `warning` — peringatan

## Dashboard shell

`components/dashboard/shell.tsx` — layout sidebar + header untuk semua route `/dashboard/*`.

Navigasi sidebar: `components/dashboard/nav.ts` (`dashboardNavItems`) — satu sumber untuk sidebar dan showcase ikon.

## Kapan membuat pattern baru

Ekstrak ke folder ini jika:

- Pola yang sama muncul di **3+** file
- Melibatkan komposisi 2+ primitive dengan layout tetap
- Perlu didokumentasikan di `/dashboard/design-system`

Jangan ekstrak untuk one-off layout yang tidak akan dipakai ulang.
