import { query } from '@/lib/db';
import Link from 'next/link';
import { DeleteButton, FeaturedToggle, ListingsFilter } from './components';
import { Plus, Home } from 'lucide-react';

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;

  // Build filter conditions
  const conditions: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [];
  let paramIndex = 1;

  // Search by title or location
  if (params.search && typeof params.search === 'string') {
    conditions.push(`(title ILIKE $${paramIndex} OR location ILIKE $${paramIndex})`);
    values.push(`%${params.search}%`);
    paramIndex++;
  }

  // Filter by status
  if (params.status && typeof params.status === 'string' && params.status !== 'all') {
    conditions.push(`status = $${paramIndex}`);
    values.push(params.status);
    paramIndex++;
  }

  // Filter by property type
  if (params.propertyType && typeof params.propertyType === 'string' && params.propertyType !== 'all') {
    conditions.push(`property_type = $${paramIndex}`);
    values.push(params.propertyType);
    paramIndex++;
  }

  // Price range
  if (params.minPrice && typeof params.minPrice === 'string') {
    const min = parseFloat(params.minPrice);
    if (!isNaN(min)) {
      conditions.push(`price >= $${paramIndex}`);
      values.push(min);
      paramIndex++;
    }
  }
  if (params.maxPrice && typeof params.maxPrice === 'string') {
    const max = parseFloat(params.maxPrice);
    if (!isNaN(max)) {
      conditions.push(`price <= $${paramIndex}`);
      values.push(max);
      paramIndex++;
    }
  }

  // Filter by featured
  if (params.featured && typeof params.featured === 'string' && params.featured !== 'all') {
    conditions.push(`featured = $${paramIndex}`);
    values.push(params.featured === 'true');
    paramIndex++;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const result = await query(`
        SELECT id, title, slug, price, location, bedrooms, bathrooms, property_type, status, year_built, lot_size, square_feet, featured, created_at
        FROM listings
        ${whereClause}
        ORDER BY created_at DESC
    `, values);

  const listings = result.rows;

  return (
    <div>
      {/* Header with responsive spacing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-light text-gray-900">Listings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your property listings</p>
        </div>
        <Link
          href="/admin/listings/new"
          className="inline-flex items-center space-x-2 bg-linear-to-r from-secondary to-yellow-500 text-black px-4 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 group"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Listing</span>
        </Link>
      </div>

      {/* Filter Component */}
      <ListingsFilter />

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-500">
        Showing {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
      </div>

      {/* Listings Table/Cards */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bed/Bath</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {listings.map(listing => (
                <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{listing.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    ${new Intl.NumberFormat('en-US').format(listing.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{listing.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {listing.bedrooms} / {listing.bathrooms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{listing.property_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${listing.status === 'for_sale' ? 'bg-green-100 text-green-700' :
                      listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        listing.status === 'sold' ? 'bg-gray-100 text-gray-700' : ''
                      }`}>
                      {listing.status?.replace('_', ' ') || 'for sale'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    <div>{listing.year_built || '—'}</div>
                    <div>{listing.square_feet?.toLocaleString() || '—'} sqft</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <FeaturedToggle id={listing.id} featured={listing.featured} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/admin/listings/${listing.id}/edit`}
                        className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteButton id={listing.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {listings.map(listing => (
            <div key={listing.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${listing.status === 'for_sale' ? 'bg-green-100 text-green-700' :
                  listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    listing.status === 'sold' ? 'bg-gray-100 text-gray-700' : ''
                  }`}>
                  {listing.status?.replace('_', ' ') || 'for sale'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div className="text-gray-600">Price:</div>
                <div className="font-medium text-gray-900">${new Intl.NumberFormat('en-US').format(listing.price)}</div>

                <div className="text-gray-600">Bed/Bath:</div>
                <div className="text-gray-900">{listing.bedrooms} / {listing.bathrooms}</div>

                <div className="text-gray-600">Type:</div>
                <div className="text-gray-900 capitalize">{listing.property_type}</div>

                {listing.square_feet && (
                  <>
                    <div className="text-gray-600">Sq Ft:</div>
                    <div className="text-gray-900">{listing.square_feet.toLocaleString()}</div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <FeaturedToggle id={listing.id} featured={listing.featured} />
                <div className="flex items-center space-x-4">
                  <Link
                    href={`/admin/listings/${listing.id}/edit`}
                    className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <DeleteButton id={listing.id} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {listings.length === 0 && (
          <div className="text-center py-16">
            <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No listings found</p>
            {(params.search || params.status || params.propertyType) && (
              <Link
                href="/admin/listings"
                className="inline-block mt-2 text-secondary hover:text-secondary/80"
              >
                Clear filters
              </Link>
            )}
            {!params.search && !params.status && !params.propertyType && (
              <Link
                href="/admin/listings/new"
                className="inline-block mt-4 text-secondary hover:text-secondary/80"
              >
                Add your first listing
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}