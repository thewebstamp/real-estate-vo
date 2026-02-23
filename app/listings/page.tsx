import { query } from '@/lib/db';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import ListingGrid from './_compoents/ListingGrid';
import ListingsFilter from './_compoents/ListingsFilter';

export const metadata: Metadata = {
    title: 'Properties for Sale | Luxury Real Estate',
    description: 'Browse our exclusive collection of luxury properties, apartments, and houses in prime locations.',
};

// Define the shape of search params
interface SearchParams {
    q?: string;        // location search
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    propertyType?: string;
}

export default async function ListingsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    // Build dynamic WHERE clause based on provided filters
    const conditions: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];
    let paramIndex = 1;

    // Location search (case‑insensitive)
    if (params.q) {
        conditions.push(`location ILIKE $${paramIndex++}`);
        values.push(`%${params.q}%`);
    }

    // Price range
    if (params.minPrice) {
        const min = parseFloat(params.minPrice);
        if (!isNaN(min)) {
            conditions.push(`price >= $${paramIndex++}`);
            values.push(min);
        }
    }
    if (params.maxPrice) {
        const max = parseFloat(params.maxPrice);
        if (!isNaN(max)) {
            conditions.push(`price <= $${paramIndex++}`);
            values.push(max);
        }
    }

    // Bedrooms (minimum)
    if (params.bedrooms) {
        const beds = parseInt(params.bedrooms, 10);
        if (!isNaN(beds)) {
            conditions.push(`bedrooms >= $${paramIndex++}`);
            values.push(beds);
        }
    }

    // Bathrooms (minimum)
    if (params.bathrooms) {
        const baths = parseFloat(params.bathrooms);
        if (!isNaN(baths)) {
            conditions.push(`bathrooms >= $${paramIndex++}`);
            values.push(baths);
        }
    }

    // Property type (single selection)
    if (params.propertyType) {
        conditions.push(`property_type = $${paramIndex++}`);
        values.push(params.propertyType);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Fetch listings with their first image
    const sql = `
    SELECT 
      l.id, l.title, l.slug, l.price, l.location, 
      l.bedrooms, l.bathrooms, l.property_type,
      (SELECT image_url FROM listing_images WHERE listing_id = l.id ORDER BY created_at LIMIT 1) as image_url
    FROM listings l
    ${whereClause}
    ORDER BY l.created_at DESC
    LIMIT 20
  `;

    const result = await query(sql, values);
    const listings = result.rows;

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-light text-gray-900 mb-8">Properties for Sale</h1>

                {/* Filter Section */}
                <Suspense fallback={<div>Loading filters...</div>}>
                    <ListingsFilter />
                </Suspense>

                {/* Results Count */}
                <p className="text-gray-600 mb-6">
                    {listings.length} {listings.length === 1 ? 'property' : 'properties'} found
                </p>

                {/* Listing Grid */}
                <Suspense fallback={<div>Loading listings...</div>}>
                    <ListingGrid listings={listings} />
                </Suspense>
            </div>
        </main>
    );
}