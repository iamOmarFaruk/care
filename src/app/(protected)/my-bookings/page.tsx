"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockStore, Booking } from "@/lib/store";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";


export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        setBookings(mockStore.getBookings());
    }, []);

    if (bookings.length === 0) {
        return (
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <h1 className="mb-4 text-2xl font-bold">No Bookings Found</h1>
                <p className="mb-8 text-muted-foreground">You haven&apos;t booked any services yet.</p>
                <Button asChild>
                    <Link href="/#services">Browse Services</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
                <p className="text-muted-foreground">Track and manage your service appointments.</p>
            </MotionDiv>

            <MotionDiv
                variants={staggerContainer(0.1)}
                initial="initial"
                animate="animate"
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {bookings.map((booking) => (
                    <MotionDiv
                        key={booking.id}
                        variants={fadeInUp}
                        whileHover={{ y: -5 }}
                        className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                {booking.serviceName}
                            </span>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 border-green-200' :
                                    'bg-gray-100 text-gray-800 border-gray-200'
                                }`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="mb-6 space-y-3">
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Calendar className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>Date: {booking.date}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>Duration: {booking.duration}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                <span className="line-clamp-2">{booking.location}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
                            <span className="text-lg font-bold text-foreground">৳{booking.totalCost}</span>
                            <Button variant="outline" size="sm">Details</Button>
                        </div>
                    </MotionDiv>
                ))}
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
