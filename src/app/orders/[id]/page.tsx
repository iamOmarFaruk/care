"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Calendar,
    ArrowLeft,
    MapPin,
    Clock,
    DollarSign,
    CheckCircle2,
    Circle,
    Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { mockStore, Booking } from "@/lib/store";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = mockStore.getUser();
        if (!currentUser) {
            router.push(`/login?redirect=/orders/${id}`);
            return;
        }

        const allBookings = mockStore.getBookings(currentUser.email);
        const found = allBookings.find(b => b.id === id);

        if (found) {
            setBooking(found);
        }
        setLoading(false);
    }, [router, id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
                <Package className="w-16 h-16 text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Order Not Found</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Calculated ID: {id}</p>
                <Button asChild>
                    <Link href="/orders">Back to Orders</Link>
                </Button>
            </div>
        );
    }

    const steps = [
        { label: "Request Received", status: "completed", date: booking.createdAt },
        { label: "Confirmation", status: booking.status === "Pending" ? "current" : "completed", date: booking.status !== "Pending" ? "Confirmed" : "Processing" },
        { label: "Service In Progress", status: booking.status === "Completed" ? "completed" : booking.status === "Confirmed" ? "upcoming" : "upcoming", date: booking.date },
        { label: "Completed", status: booking.status === "Completed" ? "completed" : "upcoming", date: "-" }
    ];

    if (booking.status === "Cancelled") {
        // Simple override for cancelled state visualization
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <MotionDiv
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    <Button variant="ghost" asChild className="mb-6 pl-0 hover:pl-2 transition-all">
                        <Link href="/orders">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
                        </Link>
                    </Button>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Status Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Order Status</h1>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Order ID: #{booking.id}</p>
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' :
                                            booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                                booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                                    'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-700">
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="relative flex items-start gap-4">
                                            <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.status === 'completed'
                                                    ? 'bg-teal-50 border-teal-500 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400'
                                                    : step.status === 'current'
                                                        ? 'bg-white border-teal-500 text-teal-600 dark:bg-slate-800 dark:border-teal-400'
                                                        : 'bg-slate-50 border-slate-200 text-slate-300 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-600'
                                                }`}>
                                                {step.status === 'completed' ? (
                                                    <CheckCircle2 className="w-4 h-4" />
                                                ) : (
                                                    <Circle className={`w-3 h-3 ${step.status === 'current' ? 'fill-teal-500 text-teal-500' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} />
                                                )}
                                            </div>
                                            <div className="pt-1">
                                                <h3 className={`font-medium ${step.status === 'upcoming' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                                                    {step.label}
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                    {step.status !== 'upcoming' && step.date !== '-' ? (
                                                        typeof step.date === 'string' && step.date.includes('T')
                                                            ? new Date(step.date).toLocaleDateString()
                                                            : step.date
                                                    ) : ''}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Service Details</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                        <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                                            <Package className="w-6 h-6 text-teal-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800 dark:text-white">{booking.serviceName}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Professional Care provided by Care.xyz</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                            <Calendar className="w-5 h-5 text-teal-600 opacity-80" />
                                            <span className="text-sm font-medium">{new Date(booking.date).toDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                            <Clock className="w-5 h-5 text-teal-600 opacity-80" />
                                            <span className="text-sm font-medium">{booking.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 md:col-span-2">
                                            <MapPin className="w-5 h-5 text-teal-600 opacity-80 shrink-0" />
                                            <span className="text-sm font-medium">{booking.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Summary */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Payment Summary</h2>
                                <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Service Fee</span>
                                        <span className="text-slate-800 dark:text-white font-medium">৳{booking.totalCost}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Tax & Fees</span>
                                        <span className="text-slate-800 dark:text-white font-medium">৳0</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-4">
                                    <span className="text-slate-800 dark:text-white">Total</span>
                                    <span className="text-teal-600">৳{booking.totalCost}</span>
                                </div>
                                <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-xs text-slate-500 dark:text-slate-400 flex gap-2">
                                    <DollarSign className="w-4 h-4 shrink-0" />
                                    Payment will be collected upon completion of service
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Need Help?</h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    If you need to change or cancel this booking, please contact support.
                                </p>
                                <Button variant="outline" className="w-full text-xs" asChild>
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                            </div>
                        </div>
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
