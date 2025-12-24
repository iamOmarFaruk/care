"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Calendar,
    ArrowRight,
    MapPin,
    Clock,
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";
import { mockStore, Booking, User } from "@/lib/store";

export default function OrdersPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const currentUser = mockStore.getUser();
        if (!currentUser) {
            router.push("/login?redirect=/orders");
            return;
        }

        const userBookings = mockStore.getBookings(currentUser.email);
        setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
    }, [router]);

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === "all" || booking.status.toLowerCase() === filter.toLowerCase();
        const matchesSearch = booking.serviceName.toLowerCase().includes(search.toLowerCase()) ||
            booking.id.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <MotionDiv
                    variants={staggerContainer(0.05, 0.05)}
                    initial="initial"
                    animate="animate"
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Order History</h1>
                            <p className="text-slate-500 dark:text-slate-400">Track and manage your service requests</p>
                        </div>
                        <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
                            <Link href="/#services">Book New Service</Link>
                        </Button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by service or ID..."
                                className="pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors ${filter === status
                                        ? "bg-teal-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="space-y-4">
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <MotionDiv variants={fadeInUp} key={booking.id}>
                                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Date Box */}
                                            <div className="hidden md:flex flex-col items-center justify-center w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-100 dark:border-slate-600 shrink-0">
                                                <span className="text-xl font-bold text-slate-800 dark:text-white">
                                                    {new Date(booking.date).getDate()}
                                                </span>
                                                <span className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
                                                    {new Date(booking.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-1">
                                                            {booking.serviceName}
                                                        </h3>
                                                        <p className="text-xs text-slate-400">Order ID: #{booking.id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' :
                                                        booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                                                'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400 mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-teal-600" />
                                                        {new Date(booking.date).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-teal-600" />
                                                        {booking.duration}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-teal-600" />
                                                        {booking.location}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex md:flex-col items-center justify-end gap-2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 pt-4 md:pt-0 md:pl-6">
                                                <Button size="sm" asChild className="w-full">
                                                    <Link href={`/orders/${booking.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </MotionDiv>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-800 dark:text-white">No orders found</h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    {filter !== "all"
                                        ? `You have no ${filter} orders.`
                                        : "You haven't booked any services yet."}
                                </p>
                            </div>
                        )}
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
