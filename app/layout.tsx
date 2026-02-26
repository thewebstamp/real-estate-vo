import type { Metadata } from 'next';
import { Inter, Josefin_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import PublicHeader from '@/components/layout/PublicHeader';
import PublicFooter from '@/components/layout/PublicFooter';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Luxury Real Estate',
    template: '%s | Luxury Real Estate',
  },
  description: 'Discover exceptional luxury properties in prime locations worldwide.',
  keywords: ['real estate', 'luxury homes', 'property', 'houses for sale'],
  authors: [{ name: 'Luxury Real Estate Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Luxury Real Estate',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourhandle',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${josefin.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <PublicHeader />
        <main className="grow">{children}</main>
        <PublicFooter />
      </body>
    </html>
  );
}