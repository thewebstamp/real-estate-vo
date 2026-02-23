'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ListingCardProps {
    listing: {
        id: string;
        title: string;
        slug: string;
        price: number | string;
        location: string;
        bedrooms: number;
        bathrooms: number | string;
        property_type: string;
        image_url: string | null;
        year_built?: number;
        lot_size?: number;
        square_feet?: number;
        featured?: boolean;
        status?: 'for_sale' | 'sold' | 'pending';
    };
    index: number;
}

export default function ListingCard({ listing, index }: ListingCardProps) {
    const formattedPrice = new Intl.NumberFormat('en-US').format(
        Number(listing.price)
    );

    const formattedBathrooms = Number(listing.bathrooms) % 1 === 0
        ? Number(listing.bathrooms)
        : Number(listing.bathrooms).toFixed(1);

    // Badge text & color
    let badgeText = 'For Sale';
    let badgeColor = 'bg-green-600';
    if (listing.featured) {
        badgeText = 'Featured';
        badgeColor = 'bg-yellow-500';
    } else if (listing.status === 'sold') {
        badgeText = 'Sold';
        badgeColor = 'bg-red-500';
    } else if (listing.status === 'pending') {
        badgeText = 'Pending';
        badgeColor = 'bg-orange-500';
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
        >
            {/* Status / Featured Badge */}
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-semibold ${badgeColor} z-10`}>
                {badgeText}
            </div>

            <Link href={`/listings/${listing.slug}`}>
                <div className="relative h-64 w-full">
                    <Image
                        src={listing.image_url || '/images/placeholder-listing.jpg'}
                        alt={listing.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{listing.title}</h3>
                    <p className="text-gray-500 mb-3">{listing.location}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-4">${formattedPrice}</p>

                    <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
                        <span>{listing.bedrooms} Beds</span>
                        <span>{formattedBathrooms} Baths</span>
                        <span className="capitalize">{listing.property_type}</span>
                    </div>

                    {(listing.square_feet || listing.lot_size || listing.year_built) && (
                        <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-3">
                            {listing.square_feet && <span>{listing.square_feet.toLocaleString()} sqft</span>}
                            {listing.lot_size && <span>Lot: {listing.lot_size.toLocaleString()} sqft</span>}
                            {listing.year_built && <span>Built: {listing.year_built}</span>}
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
}