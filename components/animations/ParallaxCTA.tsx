'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Home, ChevronRight } from 'lucide-react';

export default function ParallaxCTA() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
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
                duration: 0.8,
            },
        },
    };

    const imageVariants: Variants = {
        hidden: { scale: 1.2, opacity: 0.8 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-screen overflow-hidden bg-black"
        >
            {/* Background image with zoom animation */}
            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="/images/cta-bg.jpg"
                    alt="Luxury Interior"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/30" />
            </motion.div>

            {/* Decorative gold elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute top-20 right-20 w-64 h-64 bg-secondary rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="absolute bottom-20 left-20 w-80 h-80 bg-secondary rounded-full blur-3xl"
            />

            {/* Content container */}
            <div className="relative z-20 flex items-center justify-center h-full px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative"
                >
                    {/* Main glass card */}
                    <motion.div
                        variants={itemVariants}
                        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 text-center max-w-4xl shadow-2xl overflow-hidden"
                    >
                        {/* Inner decorative elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-secondary/30 rounded-tl-3xl" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />

                        {/* Sparkle icon */}
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-8 right-8 text-secondary/50"
                        >
                            <Sparkles size={24} />
                        </motion.div>

                        {/* Home icon */}
                        <motion.div
                            initial={{ y: 0 }}
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-8 left-8 text-secondary"
                        >
                            <Home size={24} />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                            <motion.span
                                variants={itemVariants}
                                className="inline-block text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4"
                            >
                            </motion.span>

                            <motion.h2
                                variants={itemVariants}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight"
                            >
                                Your Next Chapter
                                <span className="block text-secondary">Begins Here</span>
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-white/70 text-lg md:text-xl font-josefin tracking-wide max-w-2xl mx-auto mb-10"
                            >
                                Explore our hand-selected portfolio of distinguished residences,
                                where luxury meets legacy.
                            </motion.p>

                            {/* Premium button with shimmer */}
                            <motion.div
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                className="inline-block group"
                            >
                                <Link
                                    href="/listings"
                                    className="relative flex items-center justify-center space-x-3 bg-linear-to-r from-secondary to-yellow-500 px-10 py-5 rounded-full overflow-hidden shadow-2xl"
                                >
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

                                    {/* Text */}
                                    <span className="relative text-black font-semibold uppercase tracking-wider text-sm md:text-base">
                                        View Collection
                                    </span>

                                    {/* Icon container */}
                                    <div className="relative flex items-center justify-center w-7 h-7 bg-black/20 rounded-full group-hover:bg-black/30 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-black transform group-hover:translate-x-0.5 transition-transform" />
                                    </div>

                                    {/* Glow effect */}
                                    <div className="absolute -inset-1 bg-linear-to-r from-secondary via-yellow-400 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                                </Link>
                            </motion.div>

                            {/* Decorative divider */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center justify-center space-x-3 mt-12"
                            >
                                <div className="w-12 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
                                <ChevronRight className="w-4 h-4 text-secondary/60" />
                                <div className="w-12 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
}