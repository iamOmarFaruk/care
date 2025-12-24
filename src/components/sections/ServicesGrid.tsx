"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Baby, HeartHandshake, Stethoscope, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionH2, MotionP, fadeInUp, staggerContainer } from "@/components/ui/motion";
import type { Service } from "@/types";

// Icon mapping for services - includes both component names and service IDs
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Baby: Baby,
    HeartHandshake: HeartHandshake,
    Stethoscope: Stethoscope,
    "baby-care": Baby,
    "elderly-care": HeartHandshake,
    "special-care": Stethoscope,
};

// Fallback services if API fails
const fallbackServices: Service[] = [
    {
        id: "baby-care",
        title: "Child Care & Babysitting",
        description: "Reliable and loving nannies to take care of your children while you are away. We ensure safety and engagement.",
        icon: "Baby",
        pricePerHr: 500,
        image: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=2670&auto=format&fit=crop",
        features: ["Certified Nannies", "Educational Activities", "Meal Preparation", "Bedtime Routine"],
        isActive: true
    },
    {
        id: "elderly-care",
        title: "Elderly Care Companion",
        description: "Compassionate caregivers to assist your elderly parents with daily activities, medication, and companionship.",
        icon: "HeartHandshake",
        pricePerHr: 600,
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2670&auto=format&fit=crop",
        features: ["Medication Reminders", "Mobility Assistance", "Personal Hygiene", "Doctor Visits"],
        isActive: true
    },
    {
        id: "special-care",
        title: "Special Needs Support",
        description: "Professional care for individuals with special needs, ensuring comfort, dignity, and proper medical attention.",
        icon: "Stethoscope",
        pricePerHr: 700,
        image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2670&auto=format&fit=crop",
        features: ["Specialized Training", "Therapy Support", "24/7 Monitoring", "Emergency Handling"],
        isActive: true
    }
];

export function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/services");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setServices(data);
                    } else {
                        setServices(fallbackServices);
                    }
                } else {
                    setServices(fallbackServices);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
                setServices(fallbackServices);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return (
            <section id="services" className="bg-muted/50 py-10 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="bg-muted/50 py-10 md:py-24">
            <MotionDiv
                variants={staggerContainer(0.2)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="mb-8 md:mb-12 text-center">
                    <MotionH2
                        variants={fadeInUp}
                        className="text-2xl md:text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Our Services
                    </MotionH2>
                    <MotionP
                        variants={fadeInUp}
                        className="mt-3 md:mt-4 text-sm md:text-lg text-muted-foreground"
                    >
                        Comprehensive care solutions tailored to your family&apos;s needs.
                    </MotionP>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon || ''] || iconMap[service.id] || Baby;

                        return (
                            <MotionDiv
                                key={service.id}
                                variants={fadeInUp}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-background shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                            >
                                {/* Image */}
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-4 md:p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-colors">
                                            <IconComponent className="h-6 w-6 text-primary transition-colors" />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Starts from</span>
                                            <span className="text-xl font-bold text-[#0d9488]">
                                                ৳{service.pricePerHr}
                                                <span className="text-sm font-medium text-[#0d9488]">/hr</span>
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold text-card-foreground">
                                        {service.title}
                                    </h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        {service.description}
                                    </p>

                                    <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                                        {service.features.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button asChild className="mt-auto w-full rounded-xl py-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                                        <Link href={`/services/${service.id}`}>
                                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </MotionDiv>
                        );
                    })}
                </div>
            </MotionDiv>
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
