import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Luxury Real Estate',
    description: 'Get in touch with our team for inquiries, viewings, or any questions about luxury properties.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden py-16">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a86c20_1px,transparent_1px),linear-gradient(to_bottom,#c9a86c20_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

            {/* Decorative orbs */}
            <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/13 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-[#c99b47] font-medium tracking-[0.3em] uppercase text-sm">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-light mt-4 mb-6 text-gray-900">
                        Contact Us
                    </h1>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-px bg-secondary/40" />
                        <Mail className="w-5 h-5 text-[#c99b47]" />
                        <div className="w-12 h-px bg-secondary/40" />
                    </div>
                    <p className="text-gray-600 font-josefin text-[18px] lg:text-[20px] mt-6 max-w-2xl mx-auto">
                        We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you shortly.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full md:rounded-3xl lg:rounded-full p-5 text-center border border-secondary/40 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Phone className="w-5 h-5 text-secondary" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                        <p className="text-gray-600 text-sm">+1 (800) 555-1234</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-full md:rounded-3xl lg:rounded-full p-5 text-center border border-secondary/40 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Mail className="w-5 h-5 text-secondary" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                        <p className="text-gray-600 text-sm">info@luxuryestates.com</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-full md:rounded-3xl lg:rounded-full p-5 text-center border border-secondary/40 shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">Office Hours</h3>
                        <p className="text-gray-600 text-sm">Mon-Fri: 9am - 6pm</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-3xl mx-auto">
                    <Suspense fallback={
                        <div className="bg-black/90 rounded-2xl p-8 animate-pulse">
                            <div className="h-10 bg-gray-700 rounded mb-6" />
                            <div className="space-y-4">
                                <div className="h-12 bg-gray-700 rounded" />
                                <div className="h-12 bg-gray-700 rounded" />
                                <div className="h-12 bg-gray-700 rounded" />
                                <div className="h-24 bg-gray-700 rounded" />
                            </div>
                        </div>
                    }>
                        <ContactForm />
                    </Suspense>
                </div>

                {/* Map Section */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 text-gray-500">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="text-sm">123 Luxury Ave, Beverly Hills, CA 90210</span>
                    </div>
                </div>
            </div>
        </main>
    );
}