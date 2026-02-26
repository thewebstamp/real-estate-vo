'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Sparkles, Users, Gem, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        title: 'Integrity',
        description: 'Honest, transparent, and ethical in all we do.',
        icon: Shield,
        gradient: 'from-blue-500/20 to-blue-600/20'
    },
    {
        title: 'Excellence',
        description: 'Striving for the highest standards in service.',
        icon: Sparkles,
        gradient: 'from-secondary/20 to-yellow-500/20'
    },
    {
        title: 'Innovation',
        description: 'Embracing new ideas and technology to serve you better.',
        icon: Gem,
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        title: 'Community',
        description: 'Building vibrant communities and lasting relationships.',
        icon: Users,
        gradient: 'from-green-500/20 to-emerald-500/20'
    },
];

export default function ValuesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: 1,
                    },
                }
            );

            // Cards animation
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                            end: 'top 20%',
                            scrub: 1,
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,168,108,0.03),transparent_50%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm block">
                        What We Stand For
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
                        Our Core Values
                    </h2>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-px bg-secondary/40" />
                        <Heart className="w-5 h-5 text-secondary" />
                        <div className="w-12 h-px bg-secondary/40" />
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div
                                key={value.title}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="group relative bg-white rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-100 border border-gray-100 hover:border-secondary/30"
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-100`} />

                                {/* Icon */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto bg-linear-to-br from-secondary/10 to-transparent rounded-full flex items-center justify-center border border-secondary/20 group-hover:border-secondary/40 transition-colors">
                                        <Icon className="w-6 h-6 md:w-8 md:h-8 text-secondary group-hover:scale-110 transition-transform" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="relative font-serif text-lg md:text-xl font-medium text-gray-900 mb-2 md:mb-3 group-hover:text-secondary transition-colors">
                                    {value.title}
                                </h3>
                                <p className="relative text-gray-500 text-xs md:text-sm leading-relaxed">
                                    {value.description}
                                </p>

                                {/* Decorative corner */}
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-secondary/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-secondary/20 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        );
                    })}
                </div>

                {/* Stats Bar */}
                <div className="mt-20 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-serif text-secondary">30+</p>
                            <p className="text-xs md:text-sm text-gray-500">Years</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-serif text-secondary">1000+</p>
                            <p className="text-xs md:text-sm text-gray-500">Properties</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-serif text-secondary">200+</p>
                            <p className="text-xs md:text-sm text-gray-500">Agents</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl md:text-3xl font-serif text-secondary">50+</p>
                            <p className="text-xs md:text-sm text-gray-500">Locations</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}