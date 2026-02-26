'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';

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
        reset,
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
                reset(); // Clear form on success

                // Reset success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 5000);
            }
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            {/* Status Messages */}
            <AnimatePresence>
                {submitStatus === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl flex items-center space-x-3"
                    >
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <p className="text-emerald-400 text-sm">
                            Thank you for your message. We&apos;ll be in touch soon.
                        </p>
                    </motion.div>
                )}

                {submitStatus === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <p className="text-red-400 text-sm">
                            Something went wrong. Please try again or call us directly.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dark Gradient Form */}
            <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 md:p-10 shadow-2xl border border-gray-700">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-secondary to-transparent rounded-t-2xl" />

                <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Full Name <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                id="name"
                                type="text"
                                {...register('name')}
                                placeholder="John Doe"
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                disabled={submitStatus === 'loading'}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="flex gap-6 flex-col md:flex-row">
                        {/* Email Field */}
                        <div className="space-y-2 md:w-[50%]">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email Address <span className="text-secondary">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    placeholder="john@example.com"
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    disabled={submitStatus === 'loading'}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2 md:w-[50%]">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                                Phone Number <span className="text-gray-500 text-xs">(optional)</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    id="phone"
                                    type="tel"
                                    {...register('phone')}
                                    placeholder="+1 (555) 123-4567"
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    disabled={submitStatus === 'loading'}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                            Message <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                            <textarea
                                id="message"
                                rows={5}
                                {...register('message')}
                                placeholder="Tell us about your property interests..."
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
                                disabled={submitStatus === 'loading'}
                            />
                        </div>
                        {errors.message && (
                            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="group relative w-full bg-linear-to-r from-secondary to-yellow-500 text-black font-semibold py-4 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

                        <div className="relative flex items-center justify-center space-x-2">
                            <span>{submitStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                            <Send className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform ${submitStatus === 'loading' ? 'animate-pulse' : ''}`} />
                        </div>

                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-linear-to-r from-secondary via-yellow-400 to-secondary rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                    </button>

                    {/* Disclaimer */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                        By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                </div>
            </div>
        </form>
    );
}