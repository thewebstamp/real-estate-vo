'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text animation
            gsap.fromTo(textRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: 1,
                    },
                }
            );

            // Image animation
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: 50, scale: 0.95 },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: 1,
                    },
                }
            );

            // Stats animation
            gsap.fromTo(statsRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div ref={textRef} className="space-y-6 text-center lg:text-left">
                        <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm block">
                            Our Journey
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900">
                            Three Decades of Excellence
                        </h2>
                        <div className="w-20 h-1 bg-secondary/30 mx-auto lg:mx-0" />
                        <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto lg:mx-0">
                            Founded in 1995, we set out to redefine luxury real estate. Over the past three decades,
                            we have grown into a global network of agents dedicated to finding the perfect property
                            for every client. Our approach combines local expertise with international reach,
                            ensuring that every transaction is seamless and personal.
                        </p>

                        {/* Stats */}
                        <div ref={statsRef} className="grid grid-cols-3 gap-6 pt-8 max-w-md mx-auto lg:mx-0">
                            <div className="text-center">
                                <p className="text-3xl font-serif text-secondary">30+</p>
                                <p className="text-sm text-gray-500">Years</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-serif text-secondary">1000+</p>
                                <p className="text-sm text-gray-500">Properties</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-serif text-secondary">50+</p>
                                <p className="text-sm text-gray-500">Locations</p>
                            </div>
                        </div>
                    </div>

                    {/* Image with overlay stats */}
                    <div ref={imageRef} className="relative mt-8 lg:mt-0">
                        <div className="relative h-100 md:h-125 rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto lg:max-w-none">
                            <Image
                                src="/images/about-story.jpg"
                                alt="Our team"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                        </div>

                        {/* Floating stats cards */}
                        <div className="absolute -bottom-6 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 w-[calc(100%-2rem)] max-w-xs lg:max-w-none lg:w-auto">
                            <div className="flex items-center justify-center lg:justify-start space-x-3">
                                <Award className="w-6 h-6 md:w-8 md:h-8 text-secondary shrink-0" />
                                <div>
                                    <p className="text-xs md:text-sm text-gray-500">Award Winner</p>
                                    <p className="font-semibold text-gray-900 text-sm md:text-base">Luxury Real Estate 2024</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-6 right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 bg-white p-4 md:p-6 rounded-xl shadow-xl border border-gray-100 w-[calc(100%-2rem)] max-w-xs lg:max-w-none lg:w-auto">
                            <div className="flex items-center justify-center lg:justify-start space-x-3">
                                <Users className="w-6 h-6 md:w-8 md:h-8 text-secondary shrink-0" />
                                <div>
                                    <p className="text-xs md:text-sm text-gray-500">Expert Agents</p>
                                    <p className="font-semibold text-gray-900 text-sm md:text-base">200+ Professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}