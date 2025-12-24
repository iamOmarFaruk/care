"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Shield, Lock, ArrowRight, Mail } from "lucide-react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AdminUser } from "@/lib/admin-data";

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Get ID token to verify admin status on server
            const idToken = await firebaseUser.getIdToken();

            // Verify admin status via server-side API (bypasses Firestore rules)
            const response = await fetch("/api/auth/verify-admin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Access denied.");
                await auth.signOut();
                setLoading(false);
                return;
            }

            if (!data.isAdmin) {
                toast.error("Access denied. Admin privileges required.");
                await auth.signOut();
                setLoading(false);
                return;
            }

            toast.success("Welcome back, Admin!");
            router.push("/control-panel");
        } catch (error: unknown) {
            console.error("Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "Invalid admin credentials.";
            if (errorMessage.includes("user-not-found") || errorMessage.includes("wrong-password") || errorMessage.includes("invalid-credential")) {
                toast.error("Invalid email or password.");
            } else {
                toast.error(errorMessage);
            }
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
            </div>

            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
                <MotionDiv
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="w-full max-w-md py-12"
                >
                    <div className="w-full max-w-md">
                        {/* Admin Badge */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 rounded-full px-6 py-2">
                                <Shield className="w-5 h-5 text-teal-400" />
                                <span className="text-teal-300 font-semibold tracking-wide">ADMIN CONTROL PANEL</span>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 p-5 md:p-8 lg:p-10 border border-slate-700/50">
                            <MotionDiv
                                variants={staggerContainer(0.1, 0.1)}
                                initial="initial"
                                animate="animate"
                                className="space-y-4 md:space-y-6"
                            >
                                {/* Header */}
                                <MotionDiv variants={fadeInUp} className="text-center space-y-2">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                                        Admin Access
                                    </h1>
                                    <p className="text-slate-400 text-xs md:text-sm lg:text-base">
                                        Enter your credentials to access the control panel
                                    </p>
                                </MotionDiv>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                    {/* Email Field */}
                                    <MotionDiv variants={fadeInUp} className="space-y-2">
                                        <Label htmlFor="username" className="text-slate-300 font-medium block mb-1.5 text-sm">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'username' ? 'text-teal-400' : 'text-slate-500'}`}>
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="username"
                                                name="username"
                                                type="email"
                                                placeholder="admin@care.xyz"
                                                required
                                                onFocus={() => setFocusedField('username')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-12 pl-12 bg-slate-700/50 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20 focus:bg-slate-700 transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Password Field */}
                                    <MotionDiv variants={fadeInUp} className="space-y-2">
                                        <Label htmlFor="password" className="text-slate-300 font-medium block mb-1.5 text-sm">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-teal-400' : 'text-slate-500'}`}>
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                required
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-12 pl-12 bg-slate-700/50 border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20 focus:bg-slate-700 transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Sign In Button */}
                                    <MotionDiv variants={fadeInUp}>
                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-lg shadow-teal-500/25 group"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Authenticating...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    <Shield className="w-5 h-5" />
                                                    Access Control Panel
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            )}
                                        </Button>
                                    </MotionDiv>
                                </form>

                                {/* Back to Site Link */}
                                <MotionDiv variants={fadeInUp} className="text-center pt-2">
                                    <Link
                                        href="/"
                                        className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium"
                                    >
                                        ← Back to website
                                    </Link>
                                </MotionDiv>
                            </MotionDiv>
                        </div>

                        {/* Security Notice */}
                        <p className="text-center text-slate-500 text-xs mt-6 flex items-center justify-center gap-2">
                            <Lock className="w-3 h-3" />
                            Secure admin access only. All activities are logged.
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
 * │ Created: 2025-12-24
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
