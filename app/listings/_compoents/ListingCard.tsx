'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Home, Square, Calendar, ArrowRight } from 'lucide-react';

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
    let badgeColor = 'bg-emerald-500';
    if (listing.featured) {
        badgeText = 'Featured';
        badgeColor = 'bg-secondary';
    } else if (listing.status === 'sold') {
        badgeText = 'Sold';
        badgeColor = 'bg-gray-500';
    } else if (listing.status === 'pending') {
        badgeText = 'Pending';
        badgeColor = 'bg-amber-500';
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Status / Featured Badge */}
            <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-xs font-semibold ${badgeColor} z-10 shadow-lg`}>
                {badgeText}
            </div>

            {/* Image container */}
            <Link href={`/listings/${listing.slug}`}>
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={listing.image_url || '/images/placeholder-listing.jpg'}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                    {/* Title and location */}
                    <h3 className="font-josefin text-xl font-medium mb-2 text-gray-900 group-hover:text-secondary transition-colors">
                        {listing.title}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1 text-secondary" />
                        <span className="text-sm">{listing.location}</span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-bold text-secondary mb-4">
                        ${formattedPrice}
                    </p>

                    {/* Main features */}
                    <div className="flex items-center justify-between py-4 border-y border-gray-100">
                        <div className="flex items-center space-x-1.5">
                            <Bed className="w-4 h-4 text-secondary" />
                            <span className="text-sm text-gray-600">{listing.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <Bath className="w-4 h-4 text-secondary" />
                            <span className="text-sm text-gray-600">{formattedBathrooms} Baths</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <Home className="w-4 h-4 text-secondary" />
                            <span className="text-sm text-gray-600 capitalize">{listing.property_type}</span>
                        </div>
                    </div>

                    {/* Additional details */}
                    {(listing.square_feet || listing.lot_size || listing.year_built) && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {listing.square_feet && (
                                <div className="flex items-center space-x-1">
                                    <Square className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                        {listing.square_feet.toLocaleString()} sqft
                                    </span>
                                </div>
                            )}
                            {listing.lot_size && (
                                <div className="flex items-center space-x-1">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-500">
                                        {listing.lot_size.toLocaleString()} sqft
                                    </span>
                                </div>
                            )}
                            {listing.year_built && (
                                <div className="flex items-center space-x-1">
                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="text-xs text-gray-500">{listing.year_built}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* View details link */}
                    <div className="mt-4 flex items-center justify-end text-sm text-secondary font-medium">
                        <span className="mr-2">View Details</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>

            {/* Decorative corner accent on hover */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
    );
}