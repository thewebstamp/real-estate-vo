import { Suspense } from 'react';
import { Metadata } from 'next';
import AboutHero from '@/components/about/AboutHero';
import StorySection from '@/components/about/StorySection';
import MissionSection from '@/components/about/MissionSection';
import ValuesSection from '@/components/about/ValueSection';

export const metadata: Metadata = {
    title: 'About Us | Luxury Real Estate',
    description: 'Discover our story, mission, and commitment to excellence in luxury real estate.',
};

export default function AboutPage() {
    return (
        <main className="overflow-x-hidden bg-black">
            <Suspense fallback={<div className="h-screen bg-black animate-pulse" />}>
                <AboutHero />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
                <StorySection />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
                <MissionSection />
            </Suspense>
            <Suspense fallback={<div className="h-80 bg-gray-900 animate-pulse" />}>
                <ValuesSection />
            </Suspense>
        </main>
    );
}