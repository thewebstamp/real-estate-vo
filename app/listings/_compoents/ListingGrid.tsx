import ListingCard from './ListingCard';

interface ListingGridProps {
    listings: Array<{
        id: string;
        title: string;
        slug: string;
        price: number | string;
        location: string;
        bedrooms: number;
        bathrooms: number | string;
        property_type: string;
        image_url: string | null;
        square_feet?: number;
        lot_size?: number;
        year_built?: number;
    }>;
}

export default function ListingGrid({ listings }: ListingGridProps) {
    if (listings.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 mb-3">🏠</div>
                <p className="text-gray-500 text-lg">No properties match your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} index={index} />
            ))}
        </div>
    );
}