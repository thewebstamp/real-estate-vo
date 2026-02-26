'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface ContactCTAProps {
    slug: string;
    title: string;
}

export default function ContactCTA({ slug, title }: ContactCTAProps) {
    return (
        <Link
            href={`/contact?listing=${slug}`}
            className="group relative inline-flex items-center justify-center w-full space-x-2 bg-linear-to-r from-secondary to-yellow-500 text-black font-semibold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
        >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

            <MessageCircle className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Inquire About This Property</span>

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-linear-to-r from-secondary via-yellow-400 to-secondary rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
        </Link>
    );
}