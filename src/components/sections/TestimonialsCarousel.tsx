"use client";

import { TESTIMONIALS } from "@/lib/mock-data";

interface TestimonialsCarouselProps {
    testimonials?: typeof TESTIMONIALS;
}

export default function TestimonialsCarousel({ testimonials = TESTIMONIALS }: TestimonialsCarouselProps) {
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
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
