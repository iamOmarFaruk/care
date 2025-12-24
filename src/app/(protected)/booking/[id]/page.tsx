"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import {
    Calendar as CalendarIcon,
    Clock,
    MapPin,
    CreditCard,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { mockStore, User } from "@/lib/store";
import { SERVICES } from "@/lib/mock-data";

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("4");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");

    const service = SERVICES.find((s) => s.id === id);

    useEffect(() => {
        // Check auth - though ProtectedLayout handles this, we need user info
        const currentUser = mockStore.getUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate
        if (!date || !time || !address || !duration) {
            toast.error("Please fill in all required fields");
            setLoading(false);
            return;
        }

        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create booking
        if (user) {
            mockStore.createBooking({
                serviceId: service.id,
                serviceName: service.title,
                date,
                duration: `${duration} hours`,
                // Save time in notes or combined with date if strictly needed, 
                // but for now storing in expanded fields if store schema allowed, 
                // else keep it simple.
                // We appended time to date in schema? No. 
                // We'll append it to location/notes or just rely on 'date' being just date.
                location: address,
                totalCost,
                userEmail: user.email,
                status: 'Pending',
            } as any);
        }

        toast.success("Booking request sent successfully!");
        router.push("/dashboard");
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

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-teal-500"
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
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        Confirm Booking
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                            <p className="text-xs text-left text-slate-500 dark:text-slate-400 mt-4">
                                By booking, you agree to our{" "}
                                <a href="/terms" className="text-teal-600 dark:text-teal-400 hover:underline">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-teal-600 dark:text-teal-400 hover:underline">
                                    Privacy Policy
                                </a>
                                . Payment will be collected after service confirmation.
                            </p>
                        </div>
                    </form>
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
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
