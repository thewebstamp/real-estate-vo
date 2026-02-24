// app/page.tsx
import { query } from '@/lib/db';
import { Suspense } from 'react';
import ParallaxCTA from '@/components/animations/ParallaxCTA';
import HeroSection from '@/components/animations/HeroSection';
import AnimatedTextBlock from '@/components/animations/AnimatedTextBlock';
import FeaturedListings from '@/components/animations/FeaturedListings';
import JsonLd from './JsonLD';

// Force fresh SSR on every request
export const revalidate = 0;

export default async function HomePage() {
  const featuredResult = await query(
    `SELECT 
        l.id, l.title, l.slug, l.price, l.location, 
        l.bedrooms, l.bathrooms, l.property_type,
        (SELECT image_url FROM listing_images WHERE listing_id = l.id ORDER BY created_at LIMIT 1) as image_url
     FROM listings l
     WHERE featured = true
     ORDER BY l.created_at DESC
     LIMIT 6`
  );

  const featuredListings = featuredResult.rows.map(listing => ({
    ...listing,
    price: Number(listing.price)
  }));

  return (
    <>
      <JsonLd />
      <main className="overflow-x-hidden">
        <Suspense fallback={<div className="h-screen bg-gray-900" />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-gray-100" />}>
          <AnimatedTextBlock />
        </Suspense>

        <Suspense fallback={<div className="h-96 bg-gray-200" />}>
          <FeaturedListings listings={featuredListings} />
        </Suspense>

        <Suspense fallback={<div className="h-80 bg-gray-300" />}>
          <ParallaxCTA />
        </Suspense>
      </main>
    </>
  );
}