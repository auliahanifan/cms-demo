import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">Halaman tidak ditemukan.</p>
      <Link href="/" className="mt-6 underline">
        Kembali ke beranda
      </Link>
    </div>
  );
}
