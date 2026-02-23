import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-light mb-4">Luxury Estates</h3>
                        <p className="text-gray-400 text-sm">
                            Exceptional properties in the world&apos;s most desirable locations.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-secondary">
                                <Facebook size={20} />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-secondary">
                                <Instagram size={20} />
                            </a>
                            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-secondary">
                                <Twitter size={20} />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-secondary">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/listings" className="text-gray-400 hover:text-secondary text-sm">Listings</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-secondary text-sm">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-secondary text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>123 Luxury Ave</li>
                            <li>Beverly Hills, CA 90210</li>
                            <li>+1 (800) 555-1234</li>
                            <li>info@luxuryestates.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                    &copy; {currentYear} Luxury Estates. All rights reserved.
                </div>
            </div>
        </footer>
    );
}