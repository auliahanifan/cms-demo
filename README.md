# Blog CMS

Sistem pengelola blog dengan dashboard admin dan halaman publik.

## Fitur

- Dashboard untuk Admin, Editor, dan Penulis
- Alur review artikel (draft → review → publish)
- Kelola kategori, tag, dan pengguna
- Halaman blog publik dengan pencarian dan filter

## Deploy (Tanpa Coding)

**Ikuti panduan lengkap:** [docs/PANDUAN-DEPLOY.md](docs/PANDUAN-DEPLOY.md)

Ringkasan:
1. Copy connection string dari Supabase
2. Import project ke Vercel
3. Paste 3 environment variables
4. Deploy — selesai!

## Login Default (setelah deploy pertama)

- Email: `admin@example.com`
- Password: `Admin123!`

**Segera ganti password** setelah login pertama.

## Tech Stack

- Next.js 16 (App Router)
- Prisma + Supabase (PostgreSQL)
- Tailwind CSS + shadcn/ui

## Development (Opsional)

```bash
cp .env.example .env.local
# Isi DATABASE_URL, DIRECT_URL, SESSION_SECRET dari Supabase
# Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY untuk upload gambar

npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Buka http://localhost:3000
