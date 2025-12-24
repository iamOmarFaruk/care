"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Clock,
    Calendar,
    LogOut,
    Plus,
    ChevronRight,
    Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { mockStore, Booking, User } from "@/lib/store";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check auth
        const currentUser = mockStore.getUser();
        if (!currentUser) {
            router.push("/login?redirect=/dashboard");
            return;
        }
        setUser(currentUser);

        // Fetch bookings
        const userBookings = mockStore.getBookings(currentUser.email);
        setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    const pendingCount = bookings.filter(b => b.status === "Pending").length;
    const activeCount = bookings.filter(b => b.status === "Confirmed").length;

    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <MotionDiv
                    variants={staggerContainer(0.1, 0.1)}
                    initial="initial"
                    animate="animate"
                    className="space-y-8"
                >
                    {/* Header */}
                    <MotionDiv variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                                Welcome back, {user?.name.split(" ")[0]}!
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Manage your care services and bookings
                            </p>
                        </div>
                        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white gap-2 shadow-lg shadow-teal-600/20">
                            <Link href="/#services">
                                <Plus className="w-4 h-4" />
                                Book New Service
                            </Link>
                        </Button>
                    </MotionDiv>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <MotionDiv variants={fadeInUp} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Bookings</p>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{bookings.length}</h3>
                                </div>
                            </div>
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-amber-600 dark:text-amber-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</p>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{pendingCount}</h3>
                                </div>
                            </div>
                        </MotionDiv>

                        <MotionDiv variants={fadeInUp} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active</p>
                                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{activeCount}</h3>
                                </div>
                            </div>
                        </MotionDiv>
                    </div>

                    {/* Recent Bookings */}
                    <MotionDiv variants={fadeInUp} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Bookings</h2>
                            <Link href="/orders" className="text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 flex items-center gap-1">
                                View all <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {bookings.length > 0 ? (
                                bookings.slice(0, 3).map((booking) => (
                                    <div key={booking.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                                                    <Calendar className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-800 dark:text-white">{booking.serviceName}</h3>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                                                        <span>•</span>
                                                        <span>{booking.duration}</span>
                                                        <span>•</span>
                                                        <span>৳{booking.totalCost}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' :
                                                        booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                                                'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/orders/${booking.id}`}>
                                                        Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">No bookings yet</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                                        You haven't made any bookings yet. Explore our services to get started with professional care.
                                    </p>
                                    <Button asChild>
                                        <Link href="/#services">
                                            Explore Services
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </MotionDiv>
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
