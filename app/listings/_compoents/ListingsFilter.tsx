'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

export default function ListingsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for immediate feedback
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '');
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced function to update URL
  const updateFilters = useDebouncedCallback(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (propertyType) params.set('propertyType', propertyType);

    router.push(`/listings?${params.toString()}`);
  }, 300);

  // Trigger debounced update when any filter changes
  useEffect(() => {
    updateFilters();
  }, [searchTerm, minPrice, maxPrice, bedrooms, bathrooms, propertyType, updateFilters]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    setBathrooms('');
    setPropertyType('');
    router.push('/listings');
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || minPrice || maxPrice || bedrooms || bathrooms || propertyType;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-gray-700 hover:text-secondary transition-colors"
        >
          <SlidersHorizontal size={18} />
          <span className="font-medium">Filters</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-secondary transition-colors"
          >
            <X size={16} />
            <span>Clear all</span>
          </button>
        )}
      </div>

      {/* Filter content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'p-6' : 'h-0 p-0 opacity-0 pointer-events-none'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Search input */}
          <div className="md:col-span-2 lg:col-span-3 space-y-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search Properties
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, location, description..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Search across property titles, locations, and descriptions
            </p>
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Min Price ($)
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="No min"
              min="0"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Max Price ($)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="No max"
              min="0"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors"
            />
          </div>

          {/* Bedrooms */}
          <div className="space-y-2">
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
              Bedrooms (min)
            </label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors appearance-none bg-white"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div className="space-y-2">
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
              Bathrooms (min)
            </label>
            <select
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors appearance-none bg-white"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors appearance-none bg-white"
            >
              <option value="">All</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="md:hidden p-4 border-t border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-3 bg-secondary text-black font-medium rounded-lg hover:bg-secondary/90 transition-colors"
        >
          {isExpanded ? 'Apply Filters' : 'Show Filters'}
        </button>
      </div>
    </div>
  );
}