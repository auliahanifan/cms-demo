# Panduan Deploy Blog CMS ke Vercel

Panduan ini untuk Anda yang **tidak perlu paham coding**. Ikuti langkah berikut satu per satu.

**Waktu:** sekitar 15 menit (sekali saja)

**Yang Anda butuhkan:**
- Akun [Supabase](https://supabase.com) (gratis) — sudah punya ✓
- Akun [GitHub](https://github.com) (gratis)
- Akun [Vercel](https://vercel.com) (gratis)

---

## Bagian 1: Ambil Koneksi Database dari Supabase

1. Buka [supabase.com](https://supabase.com) dan login
2. Pilih project Anda (atau buat project baru)
3. Klik ikon **Settings** (roda gigi) di sidebar kiri
4. Klik **Database**
5. Scroll ke bagian **Connection string**

### Variabel 1: DATABASE_URL

1. Pilih tab **ORM** atau **Connection pooling**
2. Pilih mode **Transaction** (port **6543**)
3. Copy connection string-nya
4. Ganti `[YOUR-PASSWORD]` dengan password database Supabase Anda
5. Simpan di notepad — ini untuk `DATABASE_URL`

Contoh bentuknya:
```
postgresql://postgres.xxxxx:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Variabel 2: DIRECT_URL

1. Pilih tab **URI** atau **Direct connection** (port **5432**)
2. Copy connection string-nya
3. Ganti password jika perlu
4. Simpan di notepad — ini untuk `DIRECT_URL`

### Variabel 3: SESSION_SECRET

Buat string acak panjang (minimal 32 karakter). Contoh:
```
vibecoding-blog-cms-rahasia-session-2026-abc123xyz
```

Atau minta Cursor/ChatGPT: "buatkan string acak 40 karakter"

---

## Bagian 2: Upload Kode ke GitHub

Jika kode sudah ada di GitHub, lewati ke Bagian 3.

1. Buka [github.com/new](https://github.com/new)
2. Buat repository baru (misalnya `blog-cms`)
3. Pilih **Private** atau **Public** sesuai keinginan
4. Jangan centang "Add README" jika repo kosong
5. Ikuti instruksi GitHub untuk push kode dari komputer Anda

> Jika menggunakan Cursor, minta agent untuk push ke GitHub, atau gunakan fitur Source Control di sidebar.

---

## Bagian 3: Deploy ke Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Login dengan akun GitHub
3. Klik **Import** pada repository `blog-cms` Anda
4. **Jangan klik Deploy dulu!** — atur environment variables terlebih dahulu

### Tambahkan Environment Variables

Di halaman import, klik **Environment Variables** lalu tambahkan 3 variabel:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Paste connection string port 6543 dari Bagian 1 |
| `DIRECT_URL` | Paste connection string port 5432 dari Bagian 1 |
| `SESSION_SECRET` | Paste string acak dari Bagian 1 |

Centang **Production**, **Preview**, dan **Development** untuk ketiga variabel.

5. Klik **Deploy**
6. Tunggu 2–5 menit sampai status **Ready**

---

## Bagian 4: Buka Situs Anda

Setelah deploy selesai, Vercel menampilkan URL seperti:
```
https://blog-cms-xxx.vercel.app
```

### Halaman publik (blog)
Buka URL tersebut — ini halaman blog untuk pembaca.

### Dashboard (admin)
Buka:
```
https://blog-cms-xxx.vercel.app/login
```

Login dengan akun default:

| | |
|---|---|
| **Email** | `admin@example.com` |
| **Password** | `Admin123!` |

### Penting: Ganti Password!

1. Setelah login, Anda masuk ke Dashboard
2. Scroll ke bagian **Ganti Password**
3. Masukkan password baru (minimal 8 karakter)
4. Klik **Simpan Password**

---

## Bagian 5: Verifikasi di Supabase (Opsional)

Untuk memastikan database terisi:

1. Buka Supabase Dashboard
2. Klik **Table Editor** di sidebar
3. Anda akan melihat tabel: User, Article, Category, Tag, dll.
4. Tabel `User` harus berisi akun admin

---

## Setelah Deploy

| Yang ingin dilakukan | Cara |
|---------------------|------|
| Update konten/kode | Push ke GitHub → Vercel deploy otomatis |
| Lihat data | Supabase → Table Editor |
| Tambah penulis/editor | Dashboard → Pengguna → Tambah Pengguna |
| Tulis artikel | Dashboard → Artikel → Artikel Baru |

---

## Troubleshooting

### Build gagal di Vercel

**Kemungkinan:** Environment variables belum diisi atau salah.

1. Vercel → Project → **Settings** → **Environment Variables**
2. Pastikan `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET` ada dan benar
3. Klik **Deployments** → **Redeploy**

### Login gagal / "Email atau password salah"

1. Pastikan deploy pertama sudah **sukses** (seed admin berjalan saat build)
2. Coba login dengan `admin@example.com` / `Admin123!`
3. Cek tabel `User` di Supabase Table Editor

### Halaman error database

- `DATABASE_URL` harus pakai **pooler port 6543** (Transaction mode)
- `DIRECT_URL` harus pakai **direct port 5432**
- Password di connection string harus benar (tanpa tanda `[` `]`)

### Lupa password admin setelah diganti

Reset lewat Supabase Table Editor:
1. Hapus baris user admin di tabel `User`
2. Redeploy di Vercel (seed akan buat admin default lagi)

---

## Ringkasan Environment Variables

```
DATABASE_URL  → Supabase pooler (6543) → aplikasi jalan
DIRECT_URL    → Supabase direct (5432)  → migrate database
SESSION_SECRET → string acak panjang     → keamanan login
```

Selesai! Blog CMS Anda sudah live. 🎉
