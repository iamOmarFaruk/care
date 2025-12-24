"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { signInWithGoogle } = useAuth();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            // Firebase authentication
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Successfully logged in!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error);
            if (error.code === "auth/user-not-found") {
                toast.error("No account found with this email.");
            } else if (error.code === "auth/wrong-password") {
                toast.error("Incorrect password.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email address.");
            } else if (error.code === "auth/invalid-credential") {
                toast.error("Invalid email or password.");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        try {
            await signInWithGoogle();
            toast.success("Successfully logged in with Google!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Google sign-in error:", error);
            toast.error("Google sign-in failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Login Form */}
                <MotionDiv
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    className="w-full max-w-md py-12"
                >
                    <div className="w-full max-w-md">
                        {/* Form Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-5 md:p-8 lg:p-10 border border-slate-100 dark:border-slate-700">
                            <MotionDiv
                                variants={staggerContainer(0.1, 0.1)}
                                initial="initial"
                                animate="animate"
                                className="space-y-4 md:space-y-6"
                            >
                                {/* Header */}
                                <MotionDiv variants={fadeInUp} className="text-center space-y-2">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
                                        Welcome back
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm lg:text-base">
                                        Sign in to continue to your account
                                    </p>
                                </MotionDiv>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                    {/* Email Field */}
                                    <MotionDiv variants={fadeInUp} className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium block mb-1.5 text-sm">
                                            Email or Username
                                        </Label>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'email' ? 'text-[#0d9488]' : 'text-slate-400 dark:text-slate-500'}`}>
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="name@example.com or username"
                                                required
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                className="h-12 pl-12 bg-slate-50/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Password Field */}
                                    <MotionDiv variants={fadeInUp} className="space-y-2">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium text-sm">
                                                Password
                                            </Label>
                                            <Link
                                                href="#"
                                                className="text-sm text-[#0d9488] hover:text-[#115e59] font-medium transition-colors"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${focusedField === 'password' ? 'text-[#0d9488]' : 'text-slate-400 dark:text-slate-500'}`}>
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
                                                className="h-12 pl-12 bg-slate-50/50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-[#0d9488] focus:ring-[#0d9488]/20 focus:bg-white dark:focus:bg-slate-700 transition-all duration-200"
                                            />
                                        </div>
                                    </MotionDiv>

                                    {/* Sign In Button */}
                                    <MotionDiv variants={fadeInUp}>
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
                                                    Signing in...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Sign in
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            )}
                                        </Button>
                                    </MotionDiv>

                                    {/* Divider */}
                                    <MotionDiv variants={fadeInUp} className="relative py-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white dark:bg-slate-800 px-4 text-slate-400 dark:text-slate-500 font-medium">
                                                Or continue with
                                            </span>
                                        </div>
                                    </MotionDiv>

                                    {/* Google Button */}
                                    <MotionDiv variants={fadeInUp}>
                                        <Button
                                            variant="outline"
                                            type="button"
                                            className="w-full h-12 text-base font-medium border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-300 dark:hover:border-slate-500 rounded-xl"
                                            onClick={handleGoogleSignIn}
                                            disabled={loading}
                                        >
                                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Continue with Google
                                        </Button>
                                    </MotionDiv>
                                </form>

                                {/* Sign Up Link */}
                                <MotionDiv variants={fadeInUp} className="text-center pt-2">
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Don&apos;t have an account?{" "}
                                        <Link
                                            href="/register"
                                            className="font-semibold text-[#0d9488] hover:text-[#115e59] transition-colors"
                                        >
                                            Sign up for free
                                        </Link>
                                    </p>
                                </MotionDiv>
                            </MotionDiv>
                        </div>

                        {/* Footer */}
                        <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-8">
                            By signing in, you agree to our{" "}
                            <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-[#0d9488] transition-colors">Terms</Link>
                            {" "}and{" "}
                            <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-[#0d9488] transition-colors">Privacy Policy</Link>
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
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
