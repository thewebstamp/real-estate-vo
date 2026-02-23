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
        <main className="overflow-x-hidden">
            <Suspense fallback={<div className="h-screen bg-gray-900" />}>
                <AboutHero />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-100" />}>
                <StorySection />
            </Suspense>
            <Suspense fallback={<div className="h-96 bg-gray-200" />}>
                <MissionSection />
            </Suspense>
            <Suspense fallback={<div className="h-80 bg-gray-50" />}>
                <ValuesSection />
            </Suspense>
        </main>
    );
}