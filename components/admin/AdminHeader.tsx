'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut, Home } from 'lucide-react';

export default function AdminHeader() {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side */}
                    <div className="flex items-center space-x-6">
                        <Link href="/admin/listings" className="text-xl font-light text-primary">
                            Admin Dashboard
                        </Link>
                        <nav className="hidden sm:flex space-x-4">
                            <Link
                                href="/admin/listings"
                                className={`px-3 py-2 text-sm font-medium rounded-md ${pathname.startsWith('/admin/listings')
                                        ? 'bg-gray-100 text-primary'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Listings
                            </Link>
                        </nav>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-gray-500 hover:text-primary"
                            title="View public site"
                        >
                            <Home size={20} />
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center space-x-1 text-gray-500 hover:text-primary"
                        >
                            <LogOut size={20} />
                            <span className="text-sm hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}