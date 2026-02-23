import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Luxury Real Estate',
    description: 'Get in touch with our team for inquiries, viewings, or any questions about luxury properties.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-light text-gray-900 mb-4 text-center">Contact Us</h1>
                <p className="text-gray-600 text-center mb-12">
                    We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you shortly.
                </p>
                <Suspense fallback={<div>Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>
        </main>
    );
}