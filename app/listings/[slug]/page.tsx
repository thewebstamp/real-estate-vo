import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ImageGallery from './ImageGallery';
import ContactCTA from './ContactCTA';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const result = await query(
        `SELECT title, description, location, price 
     FROM listings WHERE slug = $1`,
        [slug]
    );

    if (result.rowCount === 0) {
        return {
            title: 'Listing Not Found',
        };
    }

    const listing = result.rows[0];
    const title = `${listing.title} - Luxury Real Estate`;
    const description = listing.description?.slice(0, 160) ||
        `Beautiful ${listing.property_type} in ${listing.location} for $${listing.price.toLocaleString()}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            // Optionally, fetch first image for OG image
        },
    };
}

export default async function ListingPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch listing details
    const listingResult = await query(
        `SELECT id, title, description, price, location, bedrooms, bathrooms, property_type, featured, created_at
     FROM listings WHERE slug = $1`,
        [slug]
    );

    if (listingResult.rowCount === 0) {
        notFound();
    }

    const listing = listingResult.rows[0];

    // Fetch associated images
    const imagesResult = await query(
        `SELECT image_url, public_id FROM listing_images 
     WHERE listing_id = $1 ORDER BY created_at`,
        [listing.id]
    );
    const images = imagesResult.rows;

    // Generate JSON‑LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: listing.title,
        description: listing.description || `${listing.bedrooms} bed, ${listing.bathrooms} bath property in ${listing.location}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        image: images.map((img: any) => img.image_url),
        offers: {
            '@type': 'Offer',
            price: listing.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: listing.location,
        },
        numberOfBedrooms: listing.bedrooms,
        numberOfBathrooms: listing.bathrooms,
    };

    return (
        <>
            {/* Inject JSON‑LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Image Gallery */}
                    <div className="mb-8">
                        <ImageGallery images={images} title={listing.title} />
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-4xl font-light text-gray-900 mb-4">{listing.title}</h1>
                            <p className="text-2xl text-blue-600 font-semibold mb-6">
                                ${listing.price.toLocaleString()}
                            </p>
                            <p className="text-gray-700 mb-4">{listing.location}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white p-4 rounded shadow">
                                    <p className="text-sm text-gray-500">Bedrooms</p>
                                    <p className="text-2xl font-semibold">{listing.bedrooms}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <p className="text-sm text-gray-500">Bathrooms</p>
                                    <p className="text-2xl font-semibold">{listing.bathrooms}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <p className="text-sm text-gray-500">Property Type</p>
                                    <p className="text-2xl font-semibold capitalize">{listing.property_type}</p>
                                </div>
                                <div className="bg-white p-4 rounded shadow">
                                    <p className="text-sm text-gray-500">Year Built</p>
                                    <p className="text-2xl font-semibold">—</p>
                                </div>
                            </div>

                            {/* Description / Features */}
                            <div className="bg-white p-6 rounded shadow">
                                <h2 className="text-2xl font-light mb-4">Description</h2>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {listing.description || 'No description provided.'}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar with Contact CTA */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded shadow sticky top-24">
                                <h3 className="text-xl font-light mb-4">Interested in this property?</h3>
                                <ContactCTA slug={slug} title={listing.title} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}