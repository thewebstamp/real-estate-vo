'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, MapPin, Home, ArrowRight } from 'lucide-react';

interface Listing {
    id: string;
    title: string;
    slug: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    property_type: string;
    image_url: string | null;
}

export default function FeaturedListings({ listings }: { listings: Listing[] }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6,
            },
        },
    };

    const titleVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    if (!listings.length) {
        return (
            <section ref={sectionRef} className="py-24 px-4 bg-black">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl font-serif font-light mb-6 text-white">Featured Properties</h2>
                    <p className="text-gray-400">No featured listings available.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 bg-black relative overflow-hidden"
        >
            {/* Decorative gold accents on black */}
            <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-secondary/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-40 left-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={titleVariants}
                    className="text-center mb-16"
                >
                    <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm">
                        Curated Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-light mt-4 mb-6 text-white">
                        Featured Properties
                    </h2>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-px bg-secondary/40" />
                        <Home className="w-5 h-5 text-secondary" />
                        <div className="w-12 h-px bg-secondary/40" />
                    </div>
                </motion.div>

                {/* Listings grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {listings.map((listing) => (
                        <motion.div
                            key={listing.id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            className="group relative bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/5 hover:border-secondary/30"
                        >
                            {/* Image container */}
                            <div className="relative h-72 w-full overflow-hidden">
                                {listing.image_url ? (
                                    <Image
                                        src={listing.image_url}
                                        alt={listing.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                ) : (
                                    <Image
                                        src="/images/placeholder-listing.jpg"
                                        alt="Property placeholder"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                )}

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

                                {/* Price tag */}
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/30">
                                    <span className="font-josefin text-lg font-semibold text-secondary">
                                        ${new Intl.NumberFormat('en-US').format(listing.price)}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-josefin text-xl font-medium mb-2 text-white group-hover:text-secondary transition-colors">
                                    {listing.title}
                                </h3>

                                {/* Location */}
                                <div className="flex items-center text-gray-400 mb-4">
                                    <MapPin className="w-4 h-4 mr-1 text-secondary" />
                                    <span className="text-sm">{listing.location}</span>
                                </div>

                                {/* Features */}
                                <div className="flex items-center justify-between py-4 border-y border-white/10">
                                    <div className="flex items-center space-x-1">
                                        <Bed className="w-4 h-4 text-secondary" />
                                        <span className="text-sm text-gray-300">{listing.bedrooms} beds</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Bath className="w-4 h-4 text-secondary" />
                                        <span className="text-sm text-gray-300">{listing.bathrooms} baths</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Home className="w-4 h-4 text-secondary" />
                                        <span className="text-sm text-gray-300 capitalize">{listing.property_type}</span>
                                    </div>
                                </div>

                                {/* View details link */}
                                <Link
                                    href={`/listings/${listing.slug}`}
                                    className="mt-4 flex items-center justify-between group/link"
                                >
                                    <span className="text-sm font-medium uppercase tracking-wider text-gray-400 group-hover/link:text-secondary transition-colors">
                                        View Details
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-secondary transform group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Decorative corner accent on hover */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View all button*/}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <div className="relative group inline-block">
                        {/* Outer glow effect */}
                        <div className="absolute -inset-1 bg-linear-to-r from-secondary via-yellow-400 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                        {/* Main button container */}
                        <div className="relative">
                            <Link
                                href="/listings"
                                className="relative flex items-center justify-center space-x-3 bg-linear-to-r from-secondary to-yellow-500 px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                {/* Animated background shimmer */}
                                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

                                {/* Button text */}
                                <span className="relative text-black font-semibold uppercase tracking-wider text-sm md:text-base">
                                    View All Properties
                                </span>

                                {/* Icon container with animation */}
                                <div className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-black/20 rounded-full group-hover:bg-black/30 transition-colors">
                                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-black transform group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}