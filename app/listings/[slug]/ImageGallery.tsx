'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
    images: Array<{ image_url: string; public_id: string }>;
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="relative w-full h-96 bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <Image
                    src="/images/placeholder-listing.jpg"
                    alt="No image available"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        );
    }

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setSelectedImage(images[index].image_url);
    };

    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex].image_url);
    };

    const previousImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setSelectedImage(images[newIndex].image_url);
    };

    return (
        <>
            {/* Main Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main image */}
                <div className="md:col-span-2 md:row-span-2">
                    <div
                        className="relative h-64 md:h-full w-full rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => openLightbox(0)}
                    >
                        <Image
                            src={images[0].image_url}
                            alt={`${title} - Main Image`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                            View All {images.length} Photos
                        </div>
                    </div>
                </div>

                {/* Thumbnail grid */}
                {images.slice(1, 5).map((img, index) => (
                    <div
                        key={img.public_id}
                        className={`relative h-48 w-full rounded-2xl overflow-hidden cursor-pointer group ${index >= 2 ? 'hidden md:block' : ''
                            }`}
                        onClick={() => openLightbox(index + 1)}
                    >
                        <Image
                            src={img.image_url}
                            alt={`${title} - Image ${index + 2}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Show count on last thumbnail if more than 5 images */}
                        {index === 3 && images.length > 5 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white font-medium text-lg">
                                    +{images.length - 5} more
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-[15vh] bg-red-300 rounded-full p-2 right-6 text-black/70 hover:text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); previousImage(); }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Image counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[90vh] mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt={`${title} - Enlarged view`}
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}