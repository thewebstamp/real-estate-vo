import { query } from '@/lib/db';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Home } from 'lucide-react';
import ListingsFilter from './_compoents/ListingsFilter';
import ListingGrid from './_compoents/ListingGrid';

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
    
    const conditions: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];
    let paramIndex = 1;

    // Search across multiple fields (title, location, description)
    if (params.q) {
        conditions.push(`(
        title ILIKE $${paramIndex} OR 
        location ILIKE $${paramIndex} OR 
        description ILIKE $${paramIndex}
    )`);
        values.push(`%${params.q}%`);
        paramIndex++;
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
            l.id,
            l.title,
            l.slug,
            l.price,
            l.location,
            l.bedrooms,
            l.bathrooms,
            l.property_type,
            l.square_feet,
            l.lot_size,
            l.year_built,
            l.featured,
            l.status,
            (
                SELECT image_url 
                FROM listing_images 
                WHERE listing_id = l.id 
                ORDER BY created_at 
                LIMIT 1
            ) as image_url
        FROM listings l
        ${whereClause}
        ORDER BY l.created_at DESC
        LIMIT 20
    `;

    const result = await query(sql, values);
    const listings = result.rows;

    return (
        <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-150 relative overflow-hidden pt-5 pb-14">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a86c15_1px,transparent_1px),linear-gradient(to_bottom,#c9a86c15_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

            {/* Decorative gradient orbs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

            {/* Decorative header element */}
            <div className="relative bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                            <Home className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-light text-gray-900">
                                Properties for Sale
                            </h1>
                            <p className="text-gray-500 mt-1 font-josefin text-[17px] md:text-[18px] lg:text-[19px]">
                                Discover your perfect luxury property from our curated collection
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filter Section */}
                <Suspense fallback={<div className="animate-pulse bg-white/80 backdrop-blur-sm h-32 rounded-xl" />}>
                    <ListingsFilter />
                </Suspense>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        <span className="font-semibold text-secondary">{listings.length}</span> {listings.length === 1 ? 'property' : 'properties'} found
                    </p>
                    <div className="text-sm text-gray-400 bg-white/50 px-3 py-1 rounded-full">
                        Sorted by: Newest
                    </div>
                </div>

                {/* Listing Grid */}
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl h-96 animate-pulse" />
                        ))}
                    </div>
                }>
                    <ListingGrid listings={listings} />
                </Suspense>
            </div>
        </main>
    );
}