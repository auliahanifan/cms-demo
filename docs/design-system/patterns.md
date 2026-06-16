# Pattern Components

Komponen di `components/patterns/` — bukan primitive shadcn, melainkan komposisi yang distandarkan di seluruh app.

## PageContainer

Wrapper lebar + spacing vertikal.

```tsx
import { PageContainer } from "@/components/patterns/page-container";

<PageContainer variant="dashboard">
  {children}
</PageContainer>
```

| Prop `variant` | Layout |
|----------------|--------|
| `public` | `max-w-3xl space-y-6` |
| `dashboard` | `max-w-6xl space-y-6` |
| `form` | `max-w-3xl space-y-6` |

## PageHeader

Judul halaman + deskripsi opsional + slot aksi kanan.

```tsx
import { PageHeader } from "@/components/patterns/page-header";

<PageHeader
  title="Produk"
  description="Kelola katalog produk."
  actions={<Button>Produk Baru</Button>}
/>
```

## SectionHeading

Judul section dengan aksi opsional (link, tombol kecil).

```tsx
import { SectionHeading } from "@/components/patterns/section-heading";

<SectionHeading title="Aksi Cepat" action={<Link href="...">Lihat semua</Link>} />
```

## StatCard

Kartu metrik untuk dashboard — wrap shadcn `Card`.

```tsx
import { StatCard } from "@/components/patterns/stat-card";

<StatCard label="Total Artikel" value={42} description="Opsional" />
```

## SuccessMessage

Feedback inline setelah form berhasil — ganti `text-green-600`.

```tsx
import { SuccessMessage } from "@/components/patterns/success-message";

{state?.success && <SuccessMessage>Berhasil disimpan.</SuccessMessage>}
```

Alternatif block-level: `Alert variant="success"` dari `components/ui/alert`.

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

```tsx
<Alert variant="success">
  <CheckCircle2 />
  <AlertTitle>Berhasil</AlertTitle>
  <AlertDescription>Data tersimpan.</AlertDescription>
</Alert>
```

## Kapan membuat pattern baru

Ekstrak ke folder ini jika:

- Pola yang sama muncul di **3+** file
- Melibatkan komposisi 2+ primitive dengan layout tetap
- Perlu didokumentasikan di `/design-system`

Jangan ekstrak untuk one-off layout yang tidak akan dipakai ulang.
