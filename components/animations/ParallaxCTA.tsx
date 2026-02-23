'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative h-125 overflow-hidden">
            <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src="/images/cta-bg.jpg"
                    alt="Elegant living room interior"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={false}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-4xl md:text-5xl font-light mb-6">Ready to find your dream home?</h2>
                <p className="text-xl max-w-2xl mb-8">Browse our exclusive collection of luxury properties</p>
                <Link
                    href="/listings"
                    className="px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors duration-300 text-lg"
                >
                    View All Listings
                </Link>
            </div>
        </section>
    );
}