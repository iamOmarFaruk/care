"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/mock-data";
import { MotionDiv, MotionH2, MotionP, fadeInUp, staggerContainer } from "@/components/ui/motion";

export function ServicesGrid() {
    return (
        <section id="services" className="bg-muted/50 py-16 md:py-24">
            <MotionDiv
                variants={staggerContainer(0.2)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="container mx-auto px-4 sm:px-6 lg:px-8"
            >
                <div className="mb-12 text-center">
                    <MotionH2
                        variants={fadeInUp}
                        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Our Services
                    </MotionH2>
                    <MotionP
                        variants={fadeInUp}
                        className="mt-4 text-lg text-muted-foreground"
                    >
                        Comprehensive care solutions tailored to your family&apos;s needs.
                    </MotionP>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((service) => (
                        <MotionDiv
                            key={service.id}
                            variants={fadeInUp}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg"
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
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-semibold text-primary">
                                        starts from ৳{service.pricePerHr}/hr
                                    </span>
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
                                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button asChild className="w-full">
                                    <Link href={`/services/${service.id}`}>
                                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </MotionDiv>
                    ))}
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
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
