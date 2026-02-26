import { query } from '@/lib/db';
import ListingForm from '../../_components/ListingForm';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditListingPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Fetch listing details
    const listingResult = await query('SELECT * FROM listings WHERE id = $1', [id]);
    if (listingResult.rowCount === 0) notFound();
    const listing = listingResult.rows[0];

    // Fetch images
    const imagesResult = await query('SELECT public_id, image_url as url FROM listing_images WHERE listing_id = $1 ORDER BY created_at', [id]);
    const images = imagesResult.rows;

    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/admin/listings"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Listings</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-serif font-light text-gray-900">Edit Listing</h1>
                <p className="text-sm text-gray-500 mt-1">Update property details</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
                <ListingForm initialData={{ ...listing, images }} listingId={id} />
            </div>
        </div>
    );
}