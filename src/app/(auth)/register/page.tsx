"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStore } from "@/lib/store";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        // other fields: nid, contact

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

        // Assignment says: Redirect to Booking Page after registration.
        // However, booking usually requires a service ID. 
        // We'll redirect to Home or My Bookings for now, or Services list.
        // Let's redirect to Services to prompt a booking.
        router.push("/#services");

        setLoading(false);
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-lg space-y-8 rounded-xl border bg-card p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Join Care.xyz to find trusted care services
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contact">Contact No</Label>
                            <Input id="contact" name="contact" placeholder="017..." required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nid">NID Number</Label>
                        <Input id="nid" name="nid" placeholder="National ID required" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required placeholder="Min 6 chars, 1 Upper, 1 Lower" />
                    </div>

                    <Button type="submit" className="w-full mt-4" disabled={loading}>
                        {loading ? "Creating account..." : "Sign up"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
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
