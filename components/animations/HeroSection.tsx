/* eslint-disable react-hooks/purity */
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const goldOrbRef = useRef<HTMLDivElement>(null);
    const floatingParticlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a timeline that responds to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });

            // Heading fades and shrinks
            tl.to(headingRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                ease: 'power1.out',
            }, 0);

            // Paragraph and button grow
            tl.to(paragraphRef.current, {
                scale: 1.3,
                duration: 1,
                ease: 'power1.out',
            }, 0);

            tl.to(buttonRef.current, {
                scale: 1.2,
                duration: 1,
                ease: 'power1.out',
            }, 0);

            // Background zooms in
            tl.to(bgRef.current, {
                scale: 1.2,
                duration: 1,
                ease: 'power1.out',
            }, 0);

            // Animations for decorative elements
            tl.to(goldOrbRef.current, {
                scale: 1.5,
                opacity: 0.3,
                duration: 1,
                ease: 'power1.out',
            }, 0);

            tl.to(floatingParticlesRef.current, {
                y: -50,
                opacity: 0.2,
                duration: 1,
                ease: 'power1.out',
            }, 0);
        }, heroRef);

        // Floating animation for gold orb
        gsap.to(goldOrbRef.current, {
            y: 30,
            x: 20,
            rotation: 5,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        // Particle animation
        if (floatingParticlesRef.current) {
            const particles = floatingParticlesRef.current.children;
            gsap.to(particles, {
                y: 'random(-20, 20)',
                x: 'random(-20, 20)',
                rotation: 'random(0, 360)',
                duration: 'random(5, 10)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: 0.5,
            });
        }

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen overflow-hidden"
            style={{ marginTop: '-4.25rem' }}
        >
            {/* Background image with overlay */}
            <div ref={bgRef} className="absolute inset-0 w-full h-full will-change-transform">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Luxury modern home with pool"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={95}
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/68 via-black/58 to-black/68" />
            </div>

            {/* Decorative gold orb - floating element */}
            <div
                ref={goldOrbRef}
                className="absolute z-50 top-20 right-20 w-64 h-64 rounded-full bg-secondary/15 blur-3xl"
            />

            {/* Floating particles */}
            <div ref={floatingParticlesRef} className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/35 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Centered text container */}
            <div
                ref={textContainerRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10"
            >
                {/* Max width container for heading */}
                <div className="max-w-4xl mx-auto">
                    <h1
                        ref={headingRef}
                        className="font-serif text-[38px] md:text-[52px] lg:text-[64px] font-light mb-1 md:mb-4 tracking-wide leading-tight"
                    >
                        Discover Your Dream Property
                    </h1>
                </div>

                {/* Decorative gold line */}
                <div className="w-24 h-0.75 bg-linear-to-r from-transparent via-secondary to-transparent mb-4" />

                {/* Max width for paragraph */}
                <div className="max-w-3xl mx-auto">
                    <p
                        ref={paragraphRef}
                        className="text-[20px] md:text-2xl lg:text-[26.5px] font-josefin font-light mb-12 leading-relaxed"
                    >
                        Luxury homes in the world&apos;s most desirable locations
                    </p>
                </div>

                {/* Bbutton */}
                <div ref={buttonRef} className="relative group">
                    {/* Outer glow effect */}
                    <div className="absolute -inset-1 bg-linear-to-r from-secondary via-yellow-400 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

                    {/* Main button container */}
                    <div className="relative">
                        {/* Button with glass morphism effect */}
                        <Link
                            href="/listings"
                            className="relative flex items-center justify-center space-x-3 bg-linear-to-r from-secondary to-yellow-500 px-8 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Animated background shimmer */}
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

                            {/* Button text */}
                            <span className="relative text-black font-bold uppercase tracking-[0.2em] text-sm md:text-base">
                                Explore
                            </span>

                            {/* Icon container with animation */}
                            <div className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 bg-black/20 rounded-full group-hover:bg-black/30 transition-colors">
                                <svg
                                    className="w-3 h-3 md:w-4 md:h-4 text-black transform group-hover:translate-x-0.5 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll indicator with gold accent */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-white/60 text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-0.5 h-12 bg-linear-to-b from-secondary to-transparent animate-pulse" />
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/50 to-transparent" />
        </section>
    );
}