'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            );
            gsap.fromTo(imageRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        end: 'center center',
                        scrub: 1,
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div ref={imageRef} className="relative h-96 order-2 md:order-1">
                    <Image
                        src="/images/about-mission.jpg"
                        alt="Our mission"
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div ref={textRef} className="order-1 md:order-2">
                    <h2 className="text-4xl font-light mb-6">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To connect discerning buyers with extraordinary properties, offering unparalleled
                        service and market insight. We believe in building lasting relationships, not just
                        closing deals. Every client deserves a tailored experience that reflects their unique
                        vision and lifestyle.
                    </p>
                </div>
            </div>
        </section>
    );
}