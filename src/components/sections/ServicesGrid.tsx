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
                            className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-background shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
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
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-bold text-secondary-foreground">
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

                                <Button asChild className="mt-auto w-full rounded-xl py-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
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
 * │ Updated: 2025-12-23
 * └─ care ───┘
 */
