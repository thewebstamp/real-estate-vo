'use client';

import Link from 'next/link';

interface ContactCTAProps {
    slug: string;
    title: string;
}

export default function ContactCTA({ slug, title }: ContactCTAProps) {
    return (
        <Link
            href={`/contact?listing=${slug}`}
            className="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition-colors"
        >
            Inquire About This Property
        </Link>
    );
}