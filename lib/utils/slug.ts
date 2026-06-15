export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>
): Promise<string> {
  const slug = slugify(base) || "item";
  let candidate = slug;
  let counter = 2;

  while (await exists(candidate)) {
    candidate = `${slug}-${counter}`;
    counter++;
  }

  return candidate;
}
