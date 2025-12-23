"use client";

import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-20 px-4">
            <MotionDiv
                variants={staggerContainer(0.1)}
                initial="initial"
                animate="animate"
                className="max-w-4xl w-full text-center space-y-8 md:space-y-12"
            >
                <MotionDiv variants={fadeInUp} className="space-y-4">
                    <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
                        Coming Soon
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-slate-900">
                        Get in <span className="text-teal-600">Touch</span>
                    </h1>
                    <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">
                        We're currently perfecting our contact system to better serve you.
                        In the meantime, you can reach us through the channels below.
                    </p>
                </MotionDiv>

                <MotionDiv
                    variants={fadeInUp}
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
                >
                    <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <Mail className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Email Us</h3>
                        <p className="text-xs md:text-sm text-slate-500">hello@care.xyz</p>
                    </div>

                    <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <Phone className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Call Us</h3>
                        <p className="text-xs md:text-sm text-slate-500">+880 1234 567890</p>
                    </div>

                    <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Visit Us</h3>
                        <p className="text-xs md:text-sm text-slate-500">Dhaka, Bangladesh</p>
                    </div>

                    <div className="p-4 md:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <Clock className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Working Hours</h3>
                        <p className="text-xs md:text-sm text-slate-500">24/7 Support</p>
                    </div>
                </MotionDiv>

                <MotionDiv variants={fadeInUp} className="pt-4 md:pt-8">
                    <Button asChild size="lg" className="rounded-full px-8">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </MotionDiv>
            </MotionDiv>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-24
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
