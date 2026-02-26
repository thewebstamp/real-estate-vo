import ListingForm from '../_components/ListingForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewListingPage() {
    return (
        <div>
            <div className="mb-6">
                <Link
                    href="/admin/listings"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-secondary transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Listings</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-serif font-light text-gray-900">Create New Listing</h1>
                <p className="text-sm text-gray-500 mt-1">Add a new property to your portfolio</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
                <ListingForm />
            </div>
        </div>
    );
}