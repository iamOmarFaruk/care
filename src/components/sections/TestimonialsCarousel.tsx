"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Testimonial } from "@/types";

// Fallback testimonials if API fails
const fallbackTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Rahim Uddin",
        role: "Father of 2",
        content: "Care.xyz has been a lifesaver for us. We found an amazing nanny for our twins within 24 hours. Highly professional!",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop",
        isVisible: true
    },
    {
        id: "2",
        name: "Fatima Begum",
        role: "Daughter",
        content: "I was worried about leaving my mother alone at home. The caregiver from Care.xyz is like a family member now. Very trusted.",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2574&auto=format&fit=crop",
        isVisible: true
    },
    {
        id: "3",
        name: "Tanvir Ahmed",
        role: "Business Owner",
        content: "Professional service and transparent pricing. I booked specialized care for my brother, and the experience was seamless.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop",
        isVisible: true
    },
    {
        id: "4",
        name: "Ayesha Khan",
        role: "Mother of 3",
        content: "Finding a reliable nanny was stressful until Care.xyz matched us with someone caring and punctual. Our kids love her!",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2600&auto=format&fit=crop",
        isVisible: true
    },
    {
        id: "5",
        name: "Mohammad Ali",
        role: "Son",
        content: "My dad needed daily assistance. The caregiver is compassionate and always on time. Peace of mind for our family.",
        avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2600&auto=format&fit=crop",
        isVisible: true
    }
];

export default function TestimonialsCarousel() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch("/api/public/testimonials");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setTestimonials(data);
                    } else {
                        setTestimonials(fallbackTestimonials);
                    }
                } else {
                    setTestimonials(fallbackTestimonials);
                }
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
                setTestimonials(fallbackTestimonials);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Double the testimonials for seamless infinite scroll
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <div className="relative overflow-hidden">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/50 z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900/50 z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div className="flex gap-6 animate-scroll hover:pause-animation">
                {doubledTestimonials.map((testimonial, index) => (
                    <div
                        key={`${testimonial.id}-${index}`}
                        className="flex-shrink-0 w-[280px] md:w-[380px] rounded-2xl bg-background p-4 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
                    >
                        {/* Quote Icon */}
                        <div className="mb-4">
                            <svg
                                className="w-8 h-8 text-primary/20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>
                        <p className="mb-4 md:mb-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                            &ldquo;{testimonial.content}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 md:gap-4 pt-3 md:pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full ring-2 ring-primary/20">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</h4>
                                <p className="text-xs md:text-sm text-primary font-medium">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-23
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
