'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Target, Heart, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-4 bg-linear-to-b from-gray-900 to-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#c9a86c08_1px,transparent_1px),linear-gradient(to_bottom,#c9a86c08_1px,transparent_1px)] bg-size-[4rem_4rem]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div ref={imageRef} className="relative order-2 lg:order-1 mt-8 lg:mt-0">
                        <div className="relative h-100 md:h-125 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 max-w-lg mx-auto lg:max-w-none">
                            <Image
                                src="/images/about-mission.jpg"
                                alt="Our mission"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        </div>

                        {/* Quote overlay */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[calc(100%-3rem)] bg-black/60 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-800">
                            <p className="text-white/90 text-xs md:text-sm italic text-center">
                                &quot;Every client deserves a tailored experience that reflects their unique vision.&quot;
                            </p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div ref={textRef} className="space-y-8 order-1 lg:order-2 text-center lg:text-left">
                        <span className="text-secondary font-medium tracking-[0.3em] uppercase text-sm block">
                            Our Purpose
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl font-light text-white">
                            Redefining Luxury Real Estate
                        </h2>
                        <div className="w-20 h-1 bg-secondary/30 mx-auto lg:mx-0" />
                        <p className="text-gray-300 leading-relaxed text-lg max-w-2xl mx-auto lg:mx-0">
                            To connect discerning buyers with extraordinary properties, offering unparalleled
                            service and market insight. We believe in building lasting relationships, not just
                            closing deals.
                        </p>

                        {/* Value cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto lg:mx-0">
                            <div
                                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-secondary/30 transition-colors text-center"
                            >
                                <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <h3 className="text-white font-medium mb-1">Precision</h3>
                                <p className="text-gray-400 text-sm">Perfect matches</p>
                            </div>
                            <div
                                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-secondary/30 transition-colors text-center"
                            >
                                <Heart className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <h3 className="text-white font-medium mb-1">Passion</h3>
                                <p className="text-gray-400 text-sm">Dedication to excellence</p>
                            </div>
                            <div
                                className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-secondary/30 transition-colors text-center"
                            >
                                <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
                                <h3 className="text-white font-medium mb-1">Trust</h3>
                                <p className="text-gray-400 text-sm">Built on integrity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}