import { query } from '@/lib/db';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ImageGallery from './ImageGallery';
import { FaFacebook, FaWhatsapp, FaPinterest, FaEnvelope } from 'react-icons/fa';
import ContactCTA from './ContactCTA';
import { Bed, Bath, Home, Square, MapPin, ArrowLeft, Calendar, Ruler } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Dynamic metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const result = await query(
        `SELECT title, description, location, price, property_type 
     FROM listings WHERE slug = $1`,
        [slug]
    );

    if (result.rowCount === 0) {
        return {
            title: 'Listing Not Found',
        };
    }

    const listing = result.rows[0];
    const title = `${listing.title} | Luxury Real Estate`;
    const description = listing.description?.slice(0, 160) ||
        `Beautiful ${listing.property_type} in ${listing.location} for $${new Intl.NumberFormat('en-US').format(listing.price)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}

export default async function ListingPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch listing details with all fields
    const listingResult = await query(
        `SELECT id, title, description, price, location, bedrooms, bathrooms, 
                property_type, featured, created_at, square_feet, lot_size, year_built, status
         FROM listings 
         WHERE slug = $1`,
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

    // Format price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(listing.price);

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

            <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
                {/* Subtle gold grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a86c10_1px,transparent_1px),linear-gradient(to_bottom,#c9a86c10_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

                {/* Decorative gold orbs - very subtle */}
                <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
                    {/* Back button */}
                    <Link
                        href="/listings"
                        className="inline-flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Listings</span>
                    </Link>

                    {/* Image Gallery */}
                    <div className="mb-10">
                        <ImageGallery images={images} title={listing.title} />
                    </div>

                    {/* Property Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Title & Price Section */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h1 className="font-josefin text-3xl md:text-4xl text-gray-900 mb-2">
                                            {listing.title}
                                        </h1>
                                        <div className="flex items-center text-gray-500">
                                            <MapPin className="w-4 h-4 mr-1 text-secondary" />
                                            <span>{listing.location}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-serif text-3xl md:text-4xl font-light text-secondary">
                                            {formattedPrice}
                                        </p>
                                        {listing.status && (
                                            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${listing.status === 'for_sale' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                                                listing.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                                                    listing.status === 'sold' ? 'bg-gray-100 text-gray-600 border border-gray-200' : ''
                                                }`}>
                                                {listing.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Key Features Grid */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                <h2 className="font-serif text-2xl mb-6 text-gray-900">
                                    Key Features
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 transition-colors">
                                        <Bed className="w-6 h-6 text-secondary mx-auto mb-2" />
                                        <p className="text-xl font-semibold text-gray-900">{listing.bedrooms}</p>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 transition-colors">
                                        <Bath className="w-6 h-6 text-secondary mx-auto mb-2" />
                                        <p className="text-xl font-semibold text-gray-900">{listing.bathrooms}</p>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 transition-colors">
                                        <Home className="w-6 h-6 text-secondary mx-auto mb-2" />
                                        <p className="text-xl font-semibold text-gray-900 capitalize">{listing.property_type}</p>
                                        <p className="text-sm text-gray-500">Type</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-secondary/30 transition-colors">
                                        <Square className="w-6 h-6 text-secondary mx-auto mb-2" />
                                        <p className="text-xl font-semibold text-gray-900">
                                            {listing.square_feet?.toLocaleString() || '-'}
                                        </p>
                                        <p className="text-sm text-gray-500">Sq Ft</p>
                                    </div>
                                </div>

                                {/* Additional Details */}
                                {(listing.lot_size || listing.year_built) && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="grid grid-cols-2 gap-6">
                                            {listing.lot_size && (
                                                <div className="flex items-center space-x-3">
                                                    <Ruler className="w-5 h-5 text-secondary" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Lot Size</p>
                                                        <p className="text-lg font-medium text-gray-900">
                                                            {listing.lot_size.toLocaleString()} sq ft
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {listing.year_built && (
                                                <div className="flex items-center space-x-3">
                                                    <Calendar className="w-5 h-5 text-secondary" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">Year Built</p>
                                                        <p className="text-lg font-medium text-gray-900">
                                                            {listing.year_built}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                <h2 className="font-serif text-2xl font-light mb-4 text-gray-900">
                                    Description
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-600 font-light text-lg leading-relaxed">
                                        {listing.description || 'No description provided.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Contact Card */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="font-serif text-xl font-light mb-4 text-gray-900">
                                        Interested in this property?
                                    </h3>
                                    <ContactCTA slug={slug} title={listing.title} />

                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-gray-400">
                                            We&apos;ll respond within 24 hours
                                        </p>
                                    </div>

                                    {/* Decorative gold accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-bl-3xl" />
                                </div>

                                {/* Property Highlights */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                    <h4 className="font-serif text-lg font-light mb-4 text-gray-900">Property Highlights</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                                            Prime location
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                                            Luxury finishes
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                                            Recently renovated
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2" />
                                            Excellent natural light
                                        </li>
                                    </ul>
                                </div>

                                {/* Share Card */}
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow">
                                    <h4 className="font-serif text-lg font-light mb-4 text-gray-900">Share this property</h4>
                                    <div className="flex justify-center space-x-4">
                                        <a href="..." className="w-12 h-12 bg-[#1877f2]/10 rounded-full flex items-center justify-center text-[#1877f2] hover:bg-[#1877f2] hover:text-white">
                                            <FaFacebook className="w-5 h-5" />
                                        </a>
                                        <a href="..." className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-black hover:bg-black hover:text-white">
                                            <FaWhatsapp className="w-5 h-5" />
                                        </a>
                                        <a href="..." className="w-12 h-12 bg-[#e60023]/10 rounded-full flex items-center justify-center text-[#e60023] hover:bg-[#e60023] hover:text-white">
                                            <FaPinterest className="w-5 h-5" />
                                        </a>
                                        <a href="..." className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-secondary hover:text-white">
                                            <FaEnvelope className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}