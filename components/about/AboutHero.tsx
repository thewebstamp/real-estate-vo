'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax image
            gsap.to(imageRef.current, {
                y: 150,
                scale: 1.1,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Overlay lighten
            gsap.to(overlayRef.current, {
                backgroundColor: 'rgba(0,0,0,0.2)',
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            // Text reveal
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 100, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top 70%',
                        end: 'center center',
                        scrub: 1.2,
                    },
                }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden bg-black">
            {/* Background image with parallax */}
            <div ref={imageRef} className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform">
                <div ref={overlayRef} className="absolute inset-0 bg-black/59 transition-colors duration-300" />
                <Image
                    src="/images/about-hero.jpg"
                    alt="Luxury real estate office"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={95}
                />
                <div ref={overlayRef} className="absolute inset-0 bg-black/59 transition-colors duration-300" />
            </div>

            {/* Gold gradient orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

            {/* Text content */}
            <motion.div
                ref={textRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <span className="text-secondary tracking-[0.3em] uppercase text-sm mb-4">Since 1995</span>
                <h1 className="font-serif text-6xl md:text-8xl font-light mb-6 leading-tight">
                    Our Story
                </h1>
                <div className="w-24 h-1 bg-secondary/50 mb-8" />
                <p className="text-[21px] md:text-2xl font-josefin max-w-3xl font-light text-white/90">
                    Crafting exceptional real estate experiences for over three decades
                </p>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-white/60 text-xs tracking-[0.2em] uppercase">Scroll</span>
                        <div className="w-0.5 h-12 bg-linear-to-b from-secondary to-transparent animate-pulse" />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}