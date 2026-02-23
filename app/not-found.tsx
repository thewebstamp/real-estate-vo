import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Page Not Found | Luxury Real Estate',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-2xl text-center">
                <div className="relative w-64 h-64 mx-auto mb-8">
                    <Image
                        src="/images/404-bg.jpg"
                        alt="Luxury background"
                        fill
                        className="object-cover rounded-full opacity-20"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl font-light text-gray-300">404</span>
                    </div>
                </div>
                <h1 className="text-4xl font-light text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Return to Homepage
                </Link>
            </div>
        </main>
    );
}