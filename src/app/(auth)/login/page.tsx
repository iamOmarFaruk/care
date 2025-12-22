"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MotionDiv, fadeInUp, scaleIn, staggerContainer } from "@/components/ui/motion";

import { mockStore } from "@/lib/store";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email && password) {
            mockStore.login(email);
            toast.success("Successfully logged in!");
            router.push("/");
        } else {
            toast.error("Please fill in all fields.");
        }
        setLoading(false);
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <MotionDiv
                variants={scaleIn}
                initial="initial"
                animate="animate"
                className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to your account to manage your bookings
                    </p>
                </div>

                <MotionDiv
                    variants={staggerContainer(0.1, 0.2)}
                    initial="initial"
                    animate="animate"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <MotionDiv variants={fadeInUp} className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                className="bg-background"
                            />
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="bg-background"
                            />
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp}>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp} className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp}>
                            <Button variant="outline" type="button" className="w-full" onClick={() => toast.info("Social login simulated")}>
                                Google
                            </Button>
                        </MotionDiv>
                    </form>
                </MotionDiv>

                <MotionDiv variants={fadeInUp} className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-medium text-primary hover:underline">
                        Sign up
                    </Link>
                </MotionDiv>
            </MotionDiv>
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
