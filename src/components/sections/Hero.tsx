"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH1, MotionP, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Loader2 } from "lucide-react";
import type { SliderContent } from "@/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Fallback slides if API fails or no data
const fallbackSlides = [
    {
        id: "baby-care",
        title: "Child Care & Babysitting",
        subtitle: "Your Little Ones",
        ctaText: "Find a Nanny",
        ctaLink: "/services/baby-care",
        backgroundImage: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=2670&auto=format&fit=crop",
        order: 1
    },
    {
        id: "elderly-care",
        title: "Elderly Care Companion",
        subtitle: "Your Parents",
        ctaText: "Find a Companion",
        ctaLink: "/services/elderly-care",
        backgroundImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2670&auto=format&fit=crop",
        order: 2
    },
    {
        id: "special-care",
        title: "Special Needs Support",
        subtitle: "Your Loved Ones",
        ctaText: "Find Specialist",
        ctaLink: "/services/special-care",
        backgroundImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2670&auto=format&fit=crop",
        order: 3
    }
];

export function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [slides, setSlides] = useState<SliderContent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const res = await fetch("/api/public/sliders");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setSlides(data);
                    } else {
                        setSlides(fallbackSlides as SliderContent[]);
                    }
                } else {
                    setSlides(fallbackSlides as SliderContent[]);
                }
            } catch (error) {
                console.error("Failed to fetch sliders:", error);
                setSlides(fallbackSlides as SliderContent[]);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    if (loading) {
        return (
            <section className="relative min-h-[480px] md:min-h-[600px] w-full overflow-hidden bg-slate-900 -mt-16 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </section>
        );
    }

    return (
        <section className="relative min-h-[480px] md:min-h-[600px] w-full overflow-hidden bg-slate-900 -mt-16">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/50 !w-3 !h-3",
                    bulletActiveClass: "!bg-primary !w-8 !rounded-full",
                }}
                loop={slides.length > 1}
                speed={1000}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="h-full min-h-[480px] md:min-h-[700px]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative flex min-h-[480px] md:min-h-[700px] w-full items-center justify-center py-8 md:py-24 lg:py-32 xl:py-48 pt-20 md:pt-24">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={slide.backgroundImage}
                                    alt={slide.title}
                                    className="h-full w-full object-cover opacity-40 transition-transform duration-[2000ms] scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
                            </div>

                            <MotionDiv
                                key={`content-${slide.id}-${activeIndex === index ? 'active' : 'inactive'}`}
                                variants={staggerContainer(0.2, 0.1)}
                                initial="initial"
                                animate={activeIndex === index ? "animate" : "initial"}
                                className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8"
                            >
                                <div className="mx-auto max-w-4xl text-center">
                                    <MotionH1
                                        variants={fadeInUp}
                                        className="scroll-m-20 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
                                    >
                                        {slide.title}
                                    </MotionH1>

                                    <MotionP
                                        variants={fadeInUp}
                                        className="mt-4 md:mt-6 text-sm md:text-lg text-gray-200 max-w-2xl mx-auto px-2"
                                    >
                                        {slide.subtitle}
                                    </MotionP>

                                    <MotionDiv
                                        variants={fadeInUp}
                                        className="mt-6 md:mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                                    >
                                        <Button size="default" className="min-w-[160px] md:min-w-[200px] text-sm md:text-lg" asChild>
                                            <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                                        </Button>
                                        <Button size="default" variant="secondary" className="min-w-[160px] md:min-w-[200px] text-sm md:text-lg" asChild>
                                            <Link href="/#services">Explore Services</Link>
                                        </Button>
                                    </MotionDiv>
                                </div>
                            </MotionDiv>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Pagination Styling */}
            <style jsx global>{`
                .swiper-pagination {
                    bottom: 30px !important;
                }
                .swiper-pagination-bullet {
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    background: var(--primary) !important;
                }
            `}</style>
        </section>
    );
}


/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 24-12-24
 * └─ care ───┘
 */

