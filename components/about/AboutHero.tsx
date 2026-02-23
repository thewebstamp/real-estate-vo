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

    useEffect(() => {
        const ctx = gsap.context(() => {
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
            <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                    src="/images/about-hero.jpg"
                    alt="Luxury real estate office"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <motion.div
                ref={textRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                <h1 className="text-5xl md:text-7xl font-light mb-6">Our Story</h1>
                <p className="text-xl md:text-2xl max-w-2xl font-light">
                    Crafting exceptional real estate experiences since 1995
                </p>
            </motion.div>
        </section>
    );
}