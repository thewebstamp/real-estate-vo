import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { getUniqueSlug } from "@/lib/slugify";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
  location: z.string().min(1),
  bedrooms: z.number().int(),
  bathrooms: z.number(),
  property_type: z.enum([
    "house",
    "apartment",
    "condo",
    "townhouse",
    "land",
    "commercial",
  ]),
  images: z
    .array(z.object({ public_id: z.string(), url: z.string() }))
    .optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const result = await query("SELECT * FROM listings ORDER BY created_at DESC");
  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const data = createSchema.parse(body);

    // Generate unique slug
    const slug = await getUniqueSlug(data.title);

    // Start a transaction
    await query("BEGIN");

    // Insert listing
    const insertResult = await query(
      `INSERT INTO listings (title, slug, description, price, location, bedrooms, bathrooms, property_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        data.title,
        slug,
        data.description || null,
        data.price,
        data.location,
        data.bedrooms,
        data.bathrooms,
        data.property_type,
      ],
    );
    const listingId = insertResult.rows[0].id;

    // Insert images if any
    if (data.images && data.images.length > 0) {
      for (const img of data.images) {
        await query(
          "INSERT INTO listing_images (listing_id, image_url, public_id) VALUES ($1, $2, $3)",
          [listingId, img.url, img.public_id],
        );
      }
    }

    await query("COMMIT");

    return NextResponse.json({ id: listingId, slug }, { status: 201 });
  } catch (error) {
    await query("ROLLBACK");
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
