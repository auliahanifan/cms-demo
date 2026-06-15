import Link from "next/link";
import { getAllCategories } from "@/lib/queries/articles";

export async function PublicHeader() {
  const categories = await getAllCategories();

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Blog
        </Link>
        <form action="/search" method="get" className="flex gap-2">
          <input
            type="search"
            name="q"
            placeholder="Cari artikel..."
            className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-48"
          />
          <button
            type="submit"
            className="rounded-md bg-primary px-3 text-sm text-primary-foreground"
          >
            Cari
          </button>
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
