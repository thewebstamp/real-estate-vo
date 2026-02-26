'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Star, Trash2, Search, Filter, X, ChevronDown } from 'lucide-react';

// Featured Toggle Component
export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
    const router = useRouter();
    const [isFeatured, setIsFeatured] = useState(featured);
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/listings/${id}/featured`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featured: !isFeatured }),
            });
            if (res.ok) {
                setIsFeatured(!isFeatured);
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggle}
            disabled={loading}
            className={`inline-flex items-center space-x-1 px-3 py-1.5 text-xs rounded-lg transition-all ${isFeatured
                    ? 'bg-secondary/20 text-secondary border border-secondary/30'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
        >
            <Star className={`w-3 h-3 ${isFeatured ? 'fill-current' : ''}`} />
            <span>{isFeatured ? 'Featured' : 'Set Featured'}</span>
        </button>
    );
}

// Delete Button Component
export function DeleteButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/listings/${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium inline-flex items-center space-x-1"
        >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
        </button>
    );
}

// Listings Filter Component
export function ListingsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);

    // Local state for filters
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');
    const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
    const [featured, setFeatured] = useState(searchParams.get('featured') || 'all');
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            // eslint-disable-next-line react-hooks/immutability
            updateFilters();
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    // Update filters when other fields change
    useEffect(() => {
        updateFilters();
    }, [status, propertyType, featured, minPrice, maxPrice]);

    const updateFilters = () => {
        const params = new URLSearchParams();

        if (search) params.set('search', search);
        if (status && status !== 'all') params.set('status', status);
        if (propertyType && propertyType !== 'all') params.set('propertyType', propertyType);
        if (featured && featured !== 'all') params.set('featured', featured);
        if (minPrice) params.set('minPrice', minPrice);
        if (maxPrice) params.set('maxPrice', maxPrice);

        router.push(`/admin/listings?${params.toString()}`);
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        setPropertyType('all');
        setFeatured('all');
        setMinPrice('');
        setMaxPrice('');
        router.push('/admin/listings');
    };

    const hasActiveFilters = search || status !== 'all' || propertyType !== 'all' ||
        featured !== 'all' || minPrice || maxPrice;

    const propertyTypes = [
        { value: 'all', label: 'All Types' },
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'land', label: 'Land' },
        { value: 'commercial', label: 'Commercial' },
    ];

    const statuses = [
        { value: 'all', label: 'All Status' },
        { value: 'for_sale', label: 'For Sale' },
        { value: 'pending', label: 'Pending' },
        { value: 'sold', label: 'Sold' },
    ];

    const featuredOptions = [
        { value: 'all', label: 'All' },
        { value: 'true', label: 'Featured Only' },
        { value: 'false', label: 'Non-Featured' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            {/* Filter Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-secondary transition-colors"
                >
                    <Filter className="w-5 h-5" />
                    <span className="font-medium">Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-secondary transition-colors"
                    >
                        <X className="w-4 h-4" />
                        <span>Clear all</span>
                    </button>
                )}
            </div>

            {/* Filter Content */}
            {isExpanded && (
                <div className="p-4 space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                        />
                    </div>

                    {/* Filter Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                            >
                                {statuses.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Property Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                            >
                                {propertyTypes.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Featured Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                            <select
                                value={featured}
                                onChange={(e) => setFeatured(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                            >
                                {featuredOptions.map(f => (
                                    <option key={f.value} value={f.value}>{f.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {hasActiveFilters && (
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-2">Active filters:</p>
                            <div className="flex flex-wrap gap-2">
                                {search && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Search: {search}</span>
                                        <button onClick={() => setSearch('')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {status !== 'all' && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Status: {statuses.find(s => s.value === status)?.label}</span>
                                        <button onClick={() => setStatus('all')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {propertyType !== 'all' && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Type: {propertyTypes.find(t => t.value === propertyType)?.label}</span>
                                        <button onClick={() => setPropertyType('all')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {featured !== 'all' && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Featured: {featured === 'true' ? 'Yes' : 'No'}</span>
                                        <button onClick={() => setFeatured('all')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {minPrice && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Min: ${minPrice}</span>
                                        <button onClick={() => setMinPrice('')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                                {maxPrice && (
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                                        <span>Max: ${maxPrice}</span>
                                        <button onClick={() => setMaxPrice('')} className="hover:text-secondary/80">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}