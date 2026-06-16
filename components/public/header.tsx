import Link from "next/link";
import { getAllCategories } from "@/lib/queries/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export async function PublicHeader() {
  const categories = await getAllCategories();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Blog
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Produk
            </Link>
          </nav>
        </div>
        <form action="/search" method="get" className="flex gap-2">
          <Input
            type="search"
            name="q"
            placeholder="Cari artikel..."
            className="sm:w-48"
          />
          <Button type="submit" size="lg">
            Cari
          </Button>
        </form>
      </div>
      {categories.length > 0 && (
        <nav className="mx-auto flex max-w-3xl flex-wrap gap-2 px-4 pb-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="rounded-sm border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
