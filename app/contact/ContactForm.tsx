'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const searchParams = useSearchParams();
    const listingSlug = searchParams.get('listing');
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    // Prefill message if coming from a listing
    useEffect(() => {
        if (listingSlug) {
            setValue('message', `I'm interested in the property: ${listingSlug}. Please contact me with more information.`);
        }
    }, [listingSlug, setValue]);

    const onSubmit = async (data: ContactFormData) => {
        setSubmitStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-sm">
            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded">
                    Thank you for your message. We&apos;ll be in touch soon.
                </div>
            )}
            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded">
                    Something went wrong. Please try again or call us directly.
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('name')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={submitStatus === 'loading'}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={submitStatus === 'loading'}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (optional)
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={submitStatus === 'loading'}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        rows={5}
                        {...register('message')}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={submitStatus === 'loading'}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    );
}