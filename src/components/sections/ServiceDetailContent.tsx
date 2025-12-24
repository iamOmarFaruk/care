"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, ShieldCheck, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/components/ui/motion";

interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    pricePerHr: number;
    features: string[];
}

export default function ServiceDetailContent({ service }: { service: Service }) {
    return (
        <div className="container mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8 overflow-hidden">
            {/* Back Button */}
            <MotionDiv
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 md:mb-8"
            >
                <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                    <Link href="/#services">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                    </Link>
                </Button>
            </MotionDiv>

            <div className="grid gap-6 md:gap-12 lg:grid-cols-2">
                {/* Image Column */}
                <MotionDiv
                    variants={fadeInLeft}
                    initial="initial"
                    animate="animate"
                    className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg"
                >
                    <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                    />
                </MotionDiv>

                {/* Content Column */}
                <MotionDiv
                    variants={staggerContainer(0.2, 0.1)}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col justify-center space-y-8"
                >
                    <MotionDiv variants={fadeInRight}>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600/10 border border-teal-600/20 px-3.5 py-1.5 text-sm font-medium text-teal-600 dark:text-teal-400 shadow-sm hover:shadow-md transition-shadow">
                                <ShieldCheck className="h-4 w-4" />
                                Trusted Care
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600/10 border border-amber-600/20 px-3.5 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:shadow-md transition-shadow">
                                <BadgeCheck className="h-4 w-4" />
                                Verified Pros
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            {service.title}
                        </h1>
                        <p className="mt-3 md:mt-4 text-base md:text-xl text-muted-foreground">
                            {service.description}
                        </p>
                    </MotionDiv>

                    <MotionDiv
                        variants={fadeInUp}
                        className="space-y-3 md:space-y-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-card p-4 md:p-6 shadow-sm"
                    >
                        <h3 className="font-semibold text-foreground text-sm md:text-base">Service Features</h3>
                        <ul className="grid gap-2 md:gap-3 sm:grid-cols-2">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </MotionDiv>

                    <MotionDiv
                        variants={fadeInUp}
                        className="flex flex-col gap-4 md:gap-6 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-50 p-4 md:p-6 dark:bg-slate-900"
                    >
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Starting from</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl md:text-3xl font-bold text-primary">৳{service.pricePerHr}</span>
                                <span className="text-muted-foreground">/hour</span>
                            </div>
                        </div>
                        <Button size="lg" className="px-8 text-lg" asChild>
                            <Link href={`/booking/${service.id}`}>
                                Book This Service
                            </Link>
                        </Button>
                    </MotionDiv>
                </MotionDiv>
            </div>
        </div>
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
