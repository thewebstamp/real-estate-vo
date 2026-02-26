'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTextBlock() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const cornerTLRef = useRef<HTMLDivElement>(null);
    const cornerTRRef = useRef<HTMLDivElement>(null);
    const cornerBLRef = useRef<HTMLDivElement>(null);
    const cornerBRRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!textRef.current) return;

            // Clear any existing transforms
            gsap.set(textRef.current, { scale: 1, opacity: 1 });

            // Text scales from very small (0.3) to normal (1) while scrolling
            gsap.fromTo(textRef.current,
                { scale: 0.3, opacity: 0.2 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        end: 'center center',
                        scrub: 1.5,
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Corner accents animate from center outward
            if (cornerTLRef.current && cornerTRRef.current && cornerBLRef.current && cornerBRRef.current) {
                gsap.fromTo([cornerTLRef.current, cornerTRRef.current, cornerBLRef.current, cornerBRRef.current],
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.8,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            end: 'center center',
                            scrub: 1,
                        },
                    }
                );
            }

            // Background image goes from very large scale to normal
            if (bgImageRef.current) {
                gsap.fromTo(bgImageRef.current,
                    { scale: 1.8 },
                    {
                        scale: 1,
                        duration: 2.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: 1.8,
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Force initial state
            gsap.set(textRef.current, { scale: 0.3, opacity: 0.2 });

            // Animate to final state
            gsap.to(textRef.current, {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    end: 'center center',
                    scrub: 1.5,
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-40 lg:py-45 flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background image with dramatic zoom */}
            <div
                ref={bgImageRef}
                className="absolute inset-0 w-full h-full will-change-transform"
            >
                <Image
                    src="/images/bg.jpg"
                    alt="Luxury architectural detail"
                    fill
                    className="object-cover"
                    quality={95}
                    priority={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-gray-700/35 via-gray-700/25 to-gray-700/35" />
            </div>

            {/* Content container */}
            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-10">
                {/* Decorative corner accents */}
                <div className="relative">
                    {/* Top-left corner accent */}
                    <div
                        ref={cornerTLRef}
                        className="absolute -top-12 -left-12 w-24 h-24"
                    >
                        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-black/60 rounded-tl-3xl" />
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-black/40 rounded-tl-xl" />
                    </div>

                    {/* Top-right corner accent */}
                    <div
                        ref={cornerTRRef}
                        className="absolute -top-12 -right-12 w-24 h-24"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-black/60 rounded-tr-3xl" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-black/40 rounded-tr-xl" />
                    </div>

                    {/* Bottom-left corner accent */}
                    <div
                        ref={cornerBLRef}
                        className="absolute -bottom-12 -left-12 w-24 h-24"
                    >
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-black/60 rounded-bl-3xl" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-black/40 rounded-bl-xl" />
                    </div>

                    {/* Bottom-right corner accent */}
                    <div
                        ref={cornerBRRef}
                        className="absolute -bottom-12 -right-12 w-24 h-24"
                    >
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-black/60 rounded-br-3xl" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-black/40 rounded-br-xl" />
                    </div>

                    {/* Text content */}
                    <div className="relative max-w-4xl mx-auto text-center px-6 md:px-8">
                        <h2
                            ref={textRef}
                            className="font-josefin font-medium text-[27px] md:text-[34px] lg:text-[44px] leading-relaxed md:leading-relaxed text-black drop-shadow-lg"
                        >
                            Every property we represent is a reflection of craftsmanship,
                            vision, and architectural brilliance.
                        </h2>

                        {/* Floating divider */}
                        <div className="mt-12 flex items-center justify-center space-x-6">
                            <div className="w-16 h-px bg-linear-to-r from-transparent via-black to-transparent" />
                            <div className="relative">
                                <div className="w-2 h-2 bg-black/80 rounded-full animate-pulse" />
                                <div className="absolute inset-0 w-2 h-2 bg-black/40 rounded-full animate-ping" />
                            </div>
                            <div className="w-16 h-px bg-linear-to-r from-transparent via-black to-transparent" />
                        </div>

                        {/* Floating accent line */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </section>
    );
}