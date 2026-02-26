'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-black text-white relative overflow-hidden">
            {/* Decorative gold elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

            <div className="relative container mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-20 z-10">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    {/* Brand - full width on mobile, centered */}
                    <div className="md:col-span-5 text-center md:text-left">
                        <div className="inline-block md:block">
                            <h3 className="font-serif text-3xl md:text-4xl font-light mb-4 bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent">
                                Luxury Estates
                            </h3>
                            <div className="w-20 h-px bg-secondary mx-auto md:mx-0 mb-6" />
                        </div>
                        <p className="text-gray-400 text-[14px] md:text-[16px] font-josefin max-w-md mx-auto md:mx-0 leading-relaxed">
                            Exceptional properties in the world&apos;s most desirable locations.
                            Curated for those who demand the extraordinary.
                        </p>

                        {/* Social links - centered on mobile */}
                        <div className="flex justify-center md:justify-start space-x-5 mt-8">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-2 border border-gray-800 rounded-full group-hover:border-secondary transition-colors">
                                    <Facebook size={18} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                </div>
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-2 border border-gray-800 rounded-full group-hover:border-secondary transition-colors">
                                    <Instagram size={18} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                </div>
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-2 border border-gray-800 rounded-full group-hover:border-secondary transition-colors">
                                    <Twitter size={18} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                </div>
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative p-2 border border-gray-800 rounded-full group-hover:border-secondary transition-colors">
                                    <Linkedin size={18} className="text-gray-400 group-hover:text-secondary transition-colors" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - centered on mobile */}
                    <div className="md:col-span-3 text-center md:text-left">
                        <h4 className="font-serif text-lg md:text-xl lg:text-2xl mb-6 text-secondary relative inline-block md:block">
                            Quick Links
                            <span className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-12 h-px bg-secondary/40" />
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="/listings"
                                    className="text-gray-400 hover:text-secondary text-[14px] md:text-[16px] font-josefin transition-colors inline-block"
                                >
                                    Listings
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-400 hover:text-secondary text-[14px] md:text-[16px] font-josefin transition-colors inline-block"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-secondary text-[14px] md:text-[16px] font-josefin transition-colors inline-block"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact - centered on mobile */}
                    <div className="md:col-span-4 text-center md:text-left">
                        <h4 className="font-serif text-lg md:text-xl lg:text-2xl mb-6 text-secondary relative inline-block md:block">
                            Contact
                            <span className="absolute -bottom-2 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-12 h-px bg-secondary/40" />
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-center md:justify-start space-x-3">
                                <MapPin size={16} className="text-secondary shrink-0" />
                                <span className="text-gray-400 text-[14px] md:text-[16px] font-josefin">123 Luxury Ave, Beverly Hills, CA 90210</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-3">
                                <Phone size={16} className="text-secondary shrink-0" />
                                <span className="text-gray-400 text-[14px] md:text-[16px] font-josefin">+1 (800) 555-1234</span>
                            </li>
                            <li className="flex items-center justify-center md:justify-start space-x-3">
                                <Mail size={16} className="text-secondary shrink-0" />
                                <span className="text-gray-400 text-[14px] md:text-[16px] font-josefin">info@luxuryestates.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-gray-800/50">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <p className="text-gray-500 text-xs tracking-wide order-2 md:order-1">
                            &copy; {currentYear} Luxury Estates. All rights reserved.
                        </p>

                        {/* Scroll to top button */}
                        <button
                            onClick={scrollToTop}
                            className="group relative order-1 md:order-2"
                            aria-label="Scroll to top"
                        >
                            <div className="absolute inset-0 bg-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative p-3 border border-gray-800 rounded-full group-hover:border-secondary transition-colors">
                                <ArrowUp size={18} className="text-gray-400 group-hover:text-secondary transition-colors" />
                            </div>
                        </button>

                        <div className="flex space-x-6 order-3">
                            <Link href="/" className="text-gray-500 hover:text-secondary text-xs transition-colors">
                                Privacy
                            </Link>
                            <Link href="/" className="text-gray-500 hover:text-secondary text-xs transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}