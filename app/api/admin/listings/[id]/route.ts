/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";
import { getUniqueSlug } from "@/lib/slugify";
import { deleteImage } from "@/lib/cloudinary";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  location: z.string().min(1).optional(),
  bedrooms: z.number().int().optional(),
  bathrooms: z.number().optional(),
  property_type: z
    .enum(["house", "apartment", "condo", "townhouse", "land", "commercial"])
    .optional(),
  images: z
    .array(z.object({ public_id: z.string(), url: z.string() }))
    .optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const listingResult = await query("SELECT * FROM listings WHERE id = $1", [
    id,
  ]);
  if (listingResult.rowCount === 0) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  const listing = listingResult.rows[0];

  const imagesResult = await query(
    "SELECT * FROM listing_images WHERE listing_id = $1",
    [id],
  );
  listing.images = imagesResult.rows;

  return NextResponse.json(listing);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await request.json();
    const data = updateSchema.parse(body);

    await query("BEGIN");

    // If title changed, update slug
    let slug;
    if (data.title) {
      slug = await getUniqueSlug(data.title);
    }

    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.title) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.price !== undefined) {
      updates.push(`price = $${paramIndex++}`);
      values.push(data.price);
    }
    if (data.location) {
      updates.push(`location = $${paramIndex++}`);
      values.push(data.location);
    }
    if (data.bedrooms !== undefined) {
      updates.push(`bedrooms = $${paramIndex++}`);
      values.push(data.bedrooms);
    }
    if (data.bathrooms !== undefined) {
      updates.push(`bathrooms = $${paramIndex++}`);
      values.push(data.bathrooms);
    }
    if (data.property_type) {
      updates.push(`property_type = $${paramIndex++}`);
      values.push(data.property_type);
    }
    if (slug) {
      updates.push(`slug = $${paramIndex++}`);
      values.push(slug);
    }
    updates.push(`updated_at = now()`);

    if (updates.length > 0) {
      values.push(id);
      await query(
        `UPDATE listings SET ${updates.join(", ")} WHERE id = $${paramIndex}`,
        values,
      );
    }

    // Handle images: we need to sync the provided images with DB
    if (data.images) {
      // Get current images
      const currentImages = await query(
        "SELECT public_id FROM listing_images WHERE listing_id = $1",
        [id],
      );
      const currentPublicIds = currentImages.rows.map((r: any) => r.public_id);
      const newPublicIds = data.images.map((img) => img.public_id);

      // Images to delete (in DB and Cloudinary)
      const toDelete = currentPublicIds.filter(
        (pid) => !newPublicIds.includes(pid),
      );
      for (const pid of toDelete) {
        await deleteImage(pid); // Delete from Cloudinary
        await query(
          "DELETE FROM listing_images WHERE listing_id = $1 AND public_id = $2",
          [id, pid],
        );
      }

      // Images to add
      const toAdd = data.images.filter(
        (img) => !currentPublicIds.includes(img.public_id),
      );
      for (const img of toAdd) {
        await query(
          "INSERT INTO listing_images (listing_id, image_url, public_id) VALUES ($1, $2, $3)",
          [id, img.url, img.public_id],
        );
      }
    }

    await query("COMMIT");

    return NextResponse.json({ success: true });
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  try {
    await query("BEGIN");

    // Get all image public_ids to delete from Cloudinary
    const images = await query(
      "SELECT public_id FROM listing_images WHERE listing_id = $1",
      [id],
    );
    for (const row of images.rows) {
      await deleteImage(row.public_id);
    }

    // Delete listing (cascade will remove images from DB)
    await query("DELETE FROM listings WHERE id = $1", [id]);

    await query("COMMIT");

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    await query("ROLLBACK");
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
