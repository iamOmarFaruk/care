"use client";

import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Scale, FileCheck, HelpCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
                        Terms of <span className="text-teal-600">Service</span>
                    </h1>
                    <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">
                        We're drafting our terms to ensure a safe and reliable environment for everyone.
                        The full terms of service will be available here shortly.
                    </p>
                </MotionDiv>

                <MotionDiv
                    variants={fadeInUp}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto"
                >
                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
                        <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                            <Scale className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Fair Usage</h3>
                            <p className="text-xs md:text-sm text-slate-500">Guidelines on how to use our platform responsibly.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
                        <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FileCheck className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Service Level</h3>
                            <p className="text-xs md:text-sm text-slate-500">What you can expect from our caregivers and support.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
                        <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                            <ShieldAlert className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Safety First</h3>
                            <p className="text-xs md:text-sm text-slate-500">Our commitment to the safety of all parties involved.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
                        <div className="h-9 w-9 md:h-10 md:w-10 shrink-0 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                            <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1 text-sm md:text-base">Support</h3>
                            <p className="text-xs md:text-sm text-slate-500">How we handle disputes and provide assistance.</p>
                        </div>
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
