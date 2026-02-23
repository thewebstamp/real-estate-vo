'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on background image
            gsap.to(imageRef.current, {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Fade in text on scroll
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden">
            {/* Parallax Background */}
            <div ref={imageRef} className="hidden lg:block absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Luxury modern home with pool"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div ref={imageRef} className="lg:hidden absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src="/images/hero-bg2.jpg"
                    alt="Luxury modern home with pool"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Text Content */}
            <motion.div
                ref={textRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
                    Discover Your Dream Property
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl font-light">
                    Luxury homes in the world&apos;s most desirable locations
                </p>
                <Link
                    href="/listings"
                    className="mt-10 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 text-lg"
                >
                    Explore Listings
                </Link>
            </motion.div>
        </section>
    );
}