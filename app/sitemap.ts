import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/listings',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic listing pages
  const listingsResult = await query('SELECT slug, updated_at FROM listings');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listingPages = listingsResult.rows.map((listing: any) => ({
    url: `${baseUrl}/listings/${listing.slug}`,
    lastModified: listing.updated_at || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...listingPages];
}