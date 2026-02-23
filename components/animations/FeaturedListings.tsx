'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

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
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;
                gsap.fromTo(card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'bottom 60%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!listings.length) {
        return (
            <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-light mb-12">Featured Properties</h2>
                    <p className="text-gray-500">No featured listings available.</p>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-light text-center mb-12"
                >
                    Featured Properties
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((listing, index) => (
                        <div
                            key={listing.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
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
                                        ${new Intl.NumberFormat('en-US').format(listing.price)}
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{listing.bedrooms} beds</span>
                                        <span>{listing.bathrooms} baths</span>
                                        <span className="capitalize">{listing.property_type}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}