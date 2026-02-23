'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ListingCardProps {
    listing: {
        id: string;
        title: string;
        slug: string;
        price: number;
        location: string;
        bedrooms: number;
        bathrooms: number;
        property_type: string;
        image_url: string | null;
    };
    index: number;
}

export default function ListingCard({ listing, index }: ListingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
            <Link href={`/listings/${listing.slug}`}>
                <div className="relative h-64 w-full">
                    {listing.image_url ? (
                        <Image
                            src={listing.image_url}
                            alt={listing.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <Image
                            src="/images/placeholder-listing.jpg"
                            alt="Property placeholder"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                    <p className="text-gray-600 mb-2">{listing.location}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-3">
                        ${listing.price.toLocaleString()}
                    </p>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>{listing.bedrooms} beds</span>
                        <span>{listing.bathrooms} baths</span>
                        <span className="capitalize">{listing.property_type}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}