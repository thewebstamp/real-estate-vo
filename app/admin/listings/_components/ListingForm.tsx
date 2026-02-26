'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { X, Upload, Save } from 'lucide-react';

const listingSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    location: z.string().min(1, 'Location is required'),
    bedrooms: z.number().int().min(0, 'Must be >= 0'),
    bathrooms: z.number().min(0, 'Must be >= 0'),
    property_type: z.enum(['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial']),
    status: z.enum(['for_sale', 'sold', 'pending']),
    year_built: z.number().int().min(1000).max(new Date().getFullYear()).optional(),
    lot_size: z.number().min(0).optional(),
    square_feet: z.number().min(0).optional(),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface Props {
    initialData?: Partial<ListingFormData> & { images?: { public_id: string; url: string }[] };
    listingId?: string;
}

export default function ListingForm({ initialData, listingId }: Props) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<{ public_id: string; url: string }[]>(initialData?.images || []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ListingFormData>({
        resolver: zodResolver(listingSchema),
        defaultValues: initialData,
    });

    // Cloudinary upload
    const uploadImage = async (file: File) => {
        setUploading(true);
        try {
            const signRes = await fetch('/api/cloudinary/sign');
            const { timestamp, signature, folder, apiKey, cloudName } = await signRes.json();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('api_key', apiKey);
            formData.append('folder', folder);

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await uploadRes.json();
            setImages(prev => [...prev, { public_id: data.public_id, url: data.secure_url }]);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (publicId: string) => {
        setImages(images.filter(img => img.public_id !== publicId));
    };

    const onSubmit = async (data: ListingFormData) => {
        const method = listingId ? 'PUT' : 'POST';
        const url = listingId ? `/api/admin/listings/${listingId}` : '/api/admin/listings';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, images }),
        });

        if (res.ok) {
            router.push('/admin/listings');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input {...register('title')} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                        <input {...register('location')} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea {...register('description')} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors resize-none" />
                </div>
            </div>

            {/* Pricing & Type */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Pricing & Type</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                        <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                        <select {...register('property_type')} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors">
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="townhouse">Townhouse</option>
                            <option value="land">Land</option>
                            <option value="commercial">Commercial</option>
                        </select>
                        {errors.property_type && <p className="text-red-500 text-sm mt-1">{errors.property_type.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                        <select {...register('status')} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors">
                            <option value="for_sale">For Sale</option>
                            <option value="sold">Sold</option>
                            <option value="pending">Pending</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                    </div>
                </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms *</label>
                        <input type="number" {...register('bedrooms', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms *</label>
                        <input type="number" step="0.5" {...register('bathrooms', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year Built</label>
                        <input type="number" {...register('year_built', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.year_built && <p className="text-red-500 text-sm mt-1">{errors.year_built.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lot Size (sqft)</label>
                        <input type="number" step="0.01" {...register('lot_size', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.lot_size && <p className="text-red-500 text-sm mt-1">{errors.lot_size.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                        <input type="number" step="1" {...register('square_feet', { valueAsNumber: true })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-colors" />
                        {errors.square_feet && <p className="text-red-500 text-sm mt-1">{errors.square_feet.message}</p>}
                    </div>
                </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900">Property Images</h2>
                <div className="flex flex-wrap gap-4 mb-4">
                    {images.map(img => (
                        <div key={img.public_id} className="relative w-32 h-32 group">
                            <Image src={img.url} alt="Listing" fill className="object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => removeImage(img.public_id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <label className="relative cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <span className="flex items-center space-x-2">
                            <Upload className="w-4 h-4" />
                            <span>Upload Images</span>
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={e => {
                                const files = Array.from(e.target.files || []);
                                files.forEach(uploadImage);
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </label>
                    {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className="inline-flex items-center space-x-2 bg-linear-to-r from-secondary to-yellow-500 text-black px-6 py-2.5 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    <span>{listingId ? 'Update' : 'Create'} Listing</span>
                </button>
            </div>
        </form>
    );
}