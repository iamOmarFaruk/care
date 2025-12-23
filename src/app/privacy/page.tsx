"use client";

import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Shield, Eye, Lock, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
            <MotionDiv
                variants={staggerContainer(0.1)}
                initial="initial"
                animate="animate"
                className="max-w-4xl w-full text-center space-y-12"
            >
                <MotionDiv variants={fadeInUp} className="space-y-4">
                    <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800">
                        Coming Soon
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                        Privacy <span className="text-teal-600">Policy</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We take your privacy seriously. We're currently updating our privacy policy
                        to ensure complete transparency and compliance with the latest standards.
                    </p>
                </MotionDiv>

                <MotionDiv
                    variants={fadeInUp}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
                >
                    <div className="space-y-3">
                        <div className="h-14 w-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4 border border-teal-100">
                            <Shield className="h-7 w-7" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Data Protection</h3>
                        <p className="text-sm text-slate-500">Your data is encrypted and stored securely.</p>
                    </div>

                    <div className="space-y-3">
                        <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                            <Eye className="h-7 w-7" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Transparency</h3>
                        <p className="text-sm text-slate-500">Clear information on how we use your data.</p>
                    </div>

                    <div className="space-y-3">
                        <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 border border-purple-100">
                            <Lock className="h-7 w-7" />
                        </div>
                        <h3 className="font-semibold text-slate-900">User Control</h3>
                        <p className="text-sm text-slate-500">You have full control over your information.</p>
                    </div>
                </MotionDiv>

                <MotionDiv variants={fadeInUp} className="pt-8 flex flex-col items-center gap-4">
                    <p className="text-sm text-slate-400 italic flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Last updated: Coming soon
                    </p>
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
