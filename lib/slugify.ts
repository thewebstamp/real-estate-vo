import { query } from "./db";

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function getUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const result = await query("SELECT id FROM listings WHERE slug = $1", [
      slug,
    ]);
    if (result.rowCount === 0) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}
