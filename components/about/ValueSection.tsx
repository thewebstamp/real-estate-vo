'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
    { title: 'Integrity', description: 'Honest, transparent, and ethical in all we do.' },
    { title: 'Excellence', description: 'Striving for the highest standards in service.' },
    { title: 'Innovation', description: 'Embracing new ideas and technology to serve you better.' },
    { title: 'Community', description: 'Building vibrant communities and lasting relationships.' },
];

export default function ValuesSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'bottom 60%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-light text-center mb-12">Our Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className="text-center"
                        >
                            <h3 className="text-2xl font-light mb-2">{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}