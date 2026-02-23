'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const listingSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    location: z.string().min(1, 'Location is required'),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(0),
    property_type: z.enum(['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial']),
});

type ListingFormData = z.infer<typeof listingSchema>;

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?: any;
    listingId?: string;
}

export default function ListingForm({ initialData, listingId }: Props) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<{ public_id: string; url: string }[]>(
        initialData?.images || []
    );
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ListingFormData>({
        resolver: zodResolver(listingSchema),
        defaultValues: initialData,
    });

    // Cloudinary upload handler
    const uploadImage = async (file: File) => {
        setUploading(true);
        try {
            // Get signature from our API
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
            setImages((prev) => [...prev, { public_id: data.public_id, url: data.secure_url }]);
        } catch (error) {
            console.error('Upload failed', error);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (publicId: string) => {
        // For a real app, you might also delete from Cloudinary via API
        setImages(images.filter((img) => img.public_id !== publicId));
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    {...register('title')}
                    className="w-full border rounded px-3 py-2"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    {...register('description')}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('price', { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                        {...register('location')}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Bedrooms</label>
                    <input
                        type="number"
                        {...register('bedrooms', { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.bedrooms && <p className="text-red-500 text-sm">{errors.bedrooms.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Bathrooms</label>
                    <input
                        type="number"
                        step="0.5"
                        {...register('bathrooms', { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2"
                    />
                    {errors.bathrooms && <p className="text-red-500 text-sm">{errors.bathrooms.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Property Type</label>
                    <select {...register('property_type')} className="w-full border rounded px-3 py-2">
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                    </select>
                    {errors.property_type && <p className="text-red-500 text-sm">{errors.property_type.message}</p>}
                </div>
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium mb-2">Images</label>
                <div className="flex flex-wrap gap-4 mb-4">
                    {images.map((img) => (
                        <div key={img.public_id} className="relative w-32 h-32">
                            <Image
                                src={img.url}
                                alt="Listing"
                                fill
                                className="object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(img.public_id)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(uploadImage);
                    }}
                    className="block"
                />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {listingId ? 'Update' : 'Create'} Listing
                </button>
            </div>
        </form>
    );
}