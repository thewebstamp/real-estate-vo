'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Listings' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function PublicHeader() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                {/* Gold gradient border at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-secondary/50 to-transparent" />

                <div className="container mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
                    <div className="flex justify-between items-center h-17 md:h-20">
                        {/* logo */}
                        <Link
                            href="/"
                            className="group relative block"
                        >
                            {/* Main logo text */}
                            <span className="relative z-10 block font-serif font-light tracking-wide text-primary transition-all duration-500 group-hover:text-secondary">
                                <span className="block text-[22px] lg:text-3xl xl:text-[35px] whitespace-nowrap">
                                    Luxury Estates
                                </span>
                            </span>

                            {/* Multi-layered hover effects */}

                            {/* Gold glow behind logo */}
                            <span className="absolute inset-0 -z-10 transition-all duration-700 bg-secondary/20 blur-2xl" />

                            {/* Elegant underline with gold gradient */}
                            <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-secondary to-transparent scale-x-100 origin-center" />
                        </Link>

                        {/* Desktop navigation with gold accents */}
                        <div className="hidden md:flex items-center space-x-12">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 group ${isActive ? 'text-secondary' : 'text-gray-700 hover:text-secondary'
                                            }`}
                                    >
                                        {link.label}
                                        {/* Active/ Hover indicator */}
                                        <span className={`absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-secondary to-transparent transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`} />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile menu button */}
                        {!mobileMenuOpen && (
                            <button
                                type="button"
                                className="md:hidden relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-secondary transition-colors z-60"
                                onClick={() => setMobileMenuOpen(true)}
                                aria-label="Open menu"
                            >
                                <div className="absolute inset-0 rounded-full border border-secondary/20 bg-white/50 backdrop-blur-sm" />
                                <Menu size={24} className="relative z-10" />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Fixed full-screen mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-55 md:hidden"
                    >
                        {/* Dramatic backdrop with blur */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

                        {/* Close button */}
                        <button
                            type="button"
                            className="absolute top-5 right-5 z-70 w-12 h-12 flex items-center justify-center text-white hover:text-secondary transition-colors group"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <div className="absolute inset-0 rounded-full border border-white/30 bg-white/10 backdrop-blur-md group-hover:border-secondary/50 transition-colors" />
                            <X size={24} className="relative z-10" />
                        </button>

                        {/* Animated background elements */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="absolute top-20 right-10 w-64 h-64 rounded-full bg-secondary/10 blur-3xl"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
                        />

                        {/* Menu content */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="relative flex flex-col items-center -mt-12.5 justify-center h-full px-4"
                        >
                            <div className="space-y-8 text-center">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`block text-[22px] md:text-3xl font-serif ${pathname === link.href
                                                ? 'text-secondary'
                                                : 'text-white hover:text-secondary'
                                                } transition-colors duration-300`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                        {index < navLinks.length - 1 && (
                                            <div className="w-12 h-px bg-secondary/30 mx-auto mt-8" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative element */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.7 }}
                                className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-[0.3em] uppercase"
                            >
                                Luxury Estates
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-17 md:h-20" />
        </>
    );
}