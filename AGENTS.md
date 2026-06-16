<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:e2e-chrome-testing -->
# End-to-end testing wajib (Chrome)

Saat membuat atau mengubah fitur yang berjalan di browser, **wajib** verifikasi end-to-end di Chrome sebelum dianggap selesai.

## Kapan berlaku

- Fitur baru (halaman, form, alur dashboard, UI publik, dll.)
- Perubahan yang memengaruhi alur pengguna (navigasi, submit form, auth, CRUD)
- Perbaikan bug yang terlihat atau terjadi di browser

Tidak wajib untuk perubahan murni backend/schema/config yang tidak mengubah perilaku UI.

## Cara verifikasi

1. Pastikan dev server berjalan (`npm run dev` atau sesuai docs proyek).
2. Uji alur utama fitur di Chrome menggunakan **Chrome DevTools MCP** (`.cursor/mcp.json`).
3. Cek: halaman termuat, interaksi utama berhasil, tidak ada error di console, request network sesuai harapan.
4. Jika ada error (console, network, UI rusak, alur gagal): **perbaiki dan ulangi tes** sampai alur utama lulus.
5. Laporkan bukti verifikasi (route yang diuji, langkah yang dijalankan, hasil observasi) — jangan klaim selesai tanpa bukti runtime.

## Definisi selesai

Fitur **belum selesai** jika E2E di Chrome belum dijalankan, atau masih ada error yang memblokir alur utama.
<!-- END:e2e-chrome-testing -->
