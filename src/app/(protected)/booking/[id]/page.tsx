"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MotionDiv } from "@/components/ui/motion";
import { useAuth } from "@/context/auth-context";
import { Service } from "@/types";
import { auth } from "@/lib/firebase";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useTheme } from "@/components/ThemeProvider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const { user, profile, loading: authLoading } = useAuth();
    const { resolvedTheme } = useTheme();

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("4");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    // Payment State
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [showPayment, setShowPayment] = useState(false);

    // Fetch service from Firebase
    useEffect(() => {
        async function fetchService() {
            try {
                const res = await fetch(`/api/services/${id}`);
                if (!res.ok) {
                    throw new Error("Service not found");
                }
                const data = await res.json();
                setService(data);
            } catch (error) {
                console.error("Failed to fetch service:", error);
                toast.error("Service not found");
                router.push("/#services");
            } finally {
                setLoading(false);
            }
        }

        fetchService();
    }, [id, router]);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            toast.error("Please log in to book a service");
            router.push("/login");
        }
    }, [authLoading, user, router]);

    if (loading || authLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-slate-800">Service not found</h1>
                <Button onClick={() => router.push("/#services")} className="mt-4">
                    Back to Services
                </Button>
            </div>
        );
    }

    const totalCost = service.pricePerHr * parseInt(duration || "0");

    const handleInitiatePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Validate
        if (!date || !time || !address || !duration) {
            toast.error("Please fill in all required fields");
            setSubmitting(false);
            return;
        }

        try {
            // Get auth token
            const token = await user?.getIdToken();
            if (!token) {
                toast.error("Please log in to book a service");
                router.push("/login");
                return;
            }

            // Create Payment Intent
            const res = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount: totalCost,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to initiate payment");
            }

            setClientSecret(data.clientSecret);
            setShowPayment(true);
        } catch (error: any) {
            console.error("Payment initiation failed:", error);
            toast.error(error.message || "Failed to initiate payment");
        } finally {
            setSubmitting(false);
        }
    };

    const handleBookingSuccess = async (paymentIntentId: string) => {
        try {
            const token = await user?.getIdToken();
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    serviceId: service.id,
                    serviceName: service.title,
                    date,
                    time,
                    duration: `${duration} hours`,
                    location: address,
                    totalCost,
                    notes: notes || undefined,
                    paymentIntentId,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to finalise booking");
            }

            toast.success("Booking confirmed successfully!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Booking finalized failed:", error);
            toast.error("Payment successful but booking failed. Please contact support.");
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-8 md:grid-cols-3"
            >
                {/* Sidebar / Service Info */}
                <div className="h-fit bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm order-1 md:order-2">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Booking Summary</h2>

                    <div className="space-y-6">
                        <div>
                            <div className="w-full h-32 relative rounded-xl overflow-hidden mb-3">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-white">{service.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                ৳{service.pricePerHr}/hour
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Duration</span>
                                <span className="font-medium text-slate-700 dark:text-slate-200">{duration} hours</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Rate</span>
                                <span className="font-medium text-slate-700 dark:text-slate-200">৳{service.pricePerHr}/hr</span>
                            </div>
                            <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                                <span className="text-slate-800 dark:text-white">Total</span>
                                <span className="text-teal-600 dark:text-teal-400">৳{totalCost}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm order-2 md:order-1">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Schedule Service</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Fill in the details below to book your appointment
                        </p>
                    </div>

                    {!showPayment ? (
                        <form onSubmit={handleInitiatePayment} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="date">Date</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="date"
                                            type="date"
                                            className="pl-9 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                                            value={date}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                                            min={new Date().toISOString().split("T")[0]}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="time">Start Time</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <Input
                                            id="time"
                                            type="time"
                                            className="pl-9 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                                            value={time}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="duration">Duration (Hours)</Label>
                                <select
                                    id="duration"
                                    className="flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={duration}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDuration(e.target.value)}
                                >
                                    {[2, 3, 4, 5, 6, 8, 10, 12, 24].map((h) => (
                                        <option key={h} value={h}>{h} Hours</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="address">Service Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Textarea
                                        id="address"
                                        placeholder="Enter your full address (e.g. House #12, Road #3, Sector #4, Uttara, Dhaka)"
                                        className="pl-9 min-h-[80px] resize-none border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                                        value={address}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="notes">Special Requirements (Optional)</Label>
                                <Textarea
                                    id="notes"
                                    placeholder="Any specific instructions or needs?"
                                    className="resize-none border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-auto px-8 h-12 text-base bg-teal-600 hover:bg-teal-700"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Proceed to Payment
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    )}
                                </Button>
                                <p className="text-xs text-left text-slate-500 dark:text-slate-400 mt-4">
                                    By booking, you agree to our{" "}
                                    <a href="/terms" className="text-teal-600 dark:text-teal-400 hover:underline">
                                        Terms of Service
                                    </a>.
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                            <div className="mb-6 flex justify-between items-center">
                                <h3 className="text-lg font-semibold dark:text-white">Secure Payment</h3>
                                <Button variant="ghost" size="sm" onClick={() => setShowPayment(false)}>
                                    Edit Details
                                </Button>
                            </div>
                            {clientSecret && (
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: resolvedTheme === 'dark' ? 'night' : 'stripe',
                                            labels: 'floating',
                                            variables: {
                                                colorPrimary: '#0d9488',
                                            }
                                        }
                                    }}
                                >
                                    <CheckoutForm
                                        amount={totalCost}
                                        onSuccess={handleBookingSuccess}
                                        onCancel={() => setShowPayment(false)}
                                    />
                                </Elements>
                            )}
                        </div>
                    )}
                </div>
            </MotionDiv>

        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
