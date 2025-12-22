"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStore } from "@/lib/store";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Mail, Lock, ArrowRight, User, Phone, CreditCard } from "lucide-react";


export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Validate password: 6+ char, 1 uppercase, 1 lowercase
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 6 characters, with 1 uppercase and 1 lowercase letter.");
            setLoading(false);
            return;
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        mockStore.login(email, name);
        toast.success("Account created successfully!");

        router.push("/#services");
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Register Form */}
                <MotionDiv
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="w-full max-w-md py-12"
                >
                    <div className="w-full max-w-md">
                        {/* Form Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 lg:p-10 border border-slate-100">
                            <MotionDiv
                                variants={staggerContainer(0.08, 0.1)}
                                initial="initial"
                                animate="animate"
                                className="space-y-5"
                            >
                                {/* Header */}
                                <MotionDiv variants={fadeInUp} className="text-center space-y-2">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">
                                        Create an account
                                    </h1>
                                    <p className="text-slate-500 text-sm lg:text-base">
                                        Join Care.xyz to find trusted care services
                                    </p>
                                </MotionDiv>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Name & Contact Row */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <MotionDiv variants={fadeInUp} className="space-y-3">
                                            <Label htmlFor="name" className="text-slate-700 font-medium block mb-2">Full Name</Label>
                                            <div className="relative">
                                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'name' ? 'text-[#0d9488]' : 'text-slate-400'}`}>
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    required
                                                    onFocus={() => setFocusedField('name')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="h-11 pl-11 bg-slate-50/50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white transition-all duration-200"
                                                />
                                            </div>
                                        </MotionDiv>
                                        <MotionDiv variants={fadeInUp} className="space-y-3">
                                            <Label htmlFor="contact" className="text-slate-700 font-medium block mb-2">Contact No</Label>
                                            <div className="relative">
                                                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'contact' ? 'text-[#0d9488]' : 'text-slate-400'}`}>
                                                    <Phone className="w-4 h-4" />
                                                </div>
                                                <Input
                                                    id="contact"
                                                    name="contact"
                                                    placeholder="017..."
                                                    required
                                                    onFocus={() => setFocusedField('contact')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="h-11 pl-11 bg-slate-50/50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white transition-all duration-200"
                                                />
                                            </div>
                                        </MotionDiv>
                                    </div>

                                    {/* NID */}
                                    <MotionDiv variants={fadeInUp} className="space-y-3">
                                        <Label htmlFor="nid" className="text-slate-700 font-medium block mb-2">NID Number</Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'nid' ? 'text-[#0d9488]' : 'text-slate-400'}`}>
                                                <CreditCard className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="nid"
                                                name="nid"
                                                placeholder="National ID required"
                                                required
                                                onFocus={() => setFocusedField('nid')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-11 pl-12 bg-slate-50/50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Email */}
                                    <MotionDiv variants={fadeInUp} className="space-y-3">
                                        <Label htmlFor="email" className="text-slate-700 font-medium block mb-2">Email address</Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-[#0d9488]' : 'text-slate-400'}`}>
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                required
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-11 pl-12 bg-slate-50/50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Password */}
                                    <MotionDiv variants={fadeInUp} className="space-y-3">
                                        <Label htmlFor="password" className="text-slate-700 font-medium block mb-2">Password</Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-[#0d9488]' : 'text-slate-400'}`}>
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                placeholder="Min 6 chars, 1 Upper, 1 Lower"
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-11 pl-12 bg-slate-50/50 border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white transition-all duration-200"
                                            />
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">Must include uppercase and lowercase letters</p>
                                    </MotionDiv>

                                    {/* Sign Up Button */}
                                    <MotionDiv variants={fadeInUp} className="pt-2">
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#0d9488] to-[#14b8a6] hover:from-[#115e59] hover:to-[#0d9488] shadow-lg shadow-[#0d9488]/25 group"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Creating account...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Create account
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            )}
                                        </Button>
                                    </MotionDiv>
                                </form>

                                {/* Sign In Link */}
                                <MotionDiv variants={fadeInUp} className="text-center pt-2">
                                    <p className="text-slate-500">
                                        Already have an account?{" "}
                                        <Link
                                            href="/login"
                                            className="font-semibold text-[#0d9488] hover:text-[#115e59] transition-colors"
                                        >
                                            Sign in
                                        </Link>
                                    </p>
                                </MotionDiv>
                            </MotionDiv>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-slate-400 text-sm mt-6">
                            By signing up, you agree to our{" "}
                            <Link href="#" className="text-slate-600 hover:text-[#0d9488] transition-colors">Terms</Link>
                            {" "}and{" "}
                            <Link href="#" className="text-slate-600 hover:text-[#0d9488] transition-colors">Privacy Policy</Link>
                        </p>
                    </div>
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
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
