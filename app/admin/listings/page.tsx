import { query } from '@/lib/db';
import Link from 'next/link';
import { DeleteButton, FeaturedToggle } from './components';

export default async function ListingsPage() {
    const result = await query(`
    SELECT id, title, slug, price, location, bedrooms, bathrooms, property_type, featured, created_at
    FROM listings
    ORDER BY created_at DESC
  `);
    const listings = result.rows;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Listings</h1>
                <Link
                    href="/admin/listings/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Listing
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Bed/Bath
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Featured
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {listings.map((listing) => (
                            <tr key={listing.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{listing.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${listing.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{listing.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {listing.bedrooms} / {listing.bathrooms}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{listing.property_type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <FeaturedToggle id={listing.id} featured={listing.featured} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                    <Link
                                        href={`/admin/listings/${listing.id}/edit`}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton id={listing.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}