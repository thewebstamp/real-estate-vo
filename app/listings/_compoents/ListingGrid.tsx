import ListingCard from './ListingCard';

interface ListingGridProps {
    listings: Array<{
        id: string;
        title: string;
        slug: string;
        price: number;
        location: string;
        bedrooms: number;
        bathrooms: number;
        property_type: string;
        image_url: string | null;
    }>;
}

export default function ListingGrid({ listings }: ListingGridProps) {
    if (listings.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties match your criteria.</p>
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