import { query } from '@/lib/db';
import ListingForm from '../../_components/ListingForm';
import { notFound } from 'next/navigation';

export default async function EditListingPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Fetch listing details
    const listingResult = await query('SELECT * FROM listings WHERE id = $1', [id]);
    if (listingResult.rowCount === 0) notFound();
    const listing = listingResult.rows[0];

    // Fetch images
    const imagesResult = await query('SELECT public_id, image_url as url FROM listing_images WHERE listing_id = $1', [id]);
    const images = imagesResult.rows;

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Edit Listing</h1>
            <ListingForm initialData={{ ...listing, images }} listingId={id} />
        </div>
    );
}