"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/admin/StatsCard";
import {
    ShoppingBag,
    Users,
    CheckCircle2,
    Clock,
    ArrowRight,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { Booking } from "@/types";
import { AdminUser } from "@/lib/admin-data";

// Extended Order type for UI
type OrderItem = Booking & {
    userName: string;
    userEmail: string;
};

const statusColors: Record<Booking["status"], string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    in_progress: "bg-purple-100 text-purple-700",
    completed: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
    const [orders, setOrders] = React.useState<OrderItem[]>([]);
    const [users, setUsers] = React.useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookingsData, usersData] = await Promise.all([
                    ApiService.getAllBookings(),
                    ApiService.getUsers(),
                ]);

                // Create a map of users for quick lookup
                const userMap = new Map((usersData as any[]).map((u) => [u.id, u]));

                // Merge booking data with user info
                // Note: The API might already enrich this, but ensuring consistency here
                const enrichedOrders = bookingsData.map((booking) => {
                    const user = userMap.get(booking.userId);
                    return {
                        ...booking,
                        userName: booking.userName !== "Unknown User" ? booking.userName : (user?.name || "Unknown User"), // Use user.name from AdminUser type
                        userEmail: booking.userEmail !== "No Email" ? booking.userEmail : (user?.email || "No Email"),
                    };
                });

                setOrders(enrichedOrders);
                setUsers(usersData);
            } catch (error) {
                // Silently ignore NotAuthenticatedError (user not logged in)
                if (error instanceof NotAuthenticatedError) {
                    console.log("Not authenticated, skipping dashboard fetch");
                    return;
                }
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => o.status === "pending").length,
        completedOrders: orders.filter((o) => o.status === "completed").length,
        totalUsers: users.length,
    };

    const recentOrders = orders.slice(0, 5);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Welcome back! Here's what's happening today.
                    </p>
                </div>
                <Button asChild className="w-fit">
                    <Link href="/control-panel/orders" className="flex items-center gap-2">
                        View All Orders
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    variant="primary"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Pending Orders"
                    value={stats.pendingOrders}
                    icon={Clock}
                    variant="warning"
                />
                <StatsCard
                    title="Completed Orders"
                    value={stats.completedOrders}
                    icon={CheckCircle2}
                    variant="success"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    variant="info"
                />
            </div>

            {/* Recent Orders */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Orders</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Latest booking requests</p>
                    </div>
                    <Link
                        href="/control-panel/orders"
                        className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"
                    >
                        View all
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50">
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Order ID
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Service
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Date
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Status
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Amount
                                </th>
                                <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {recentOrders.map((order, index) => (
                                <motion.tr
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                            #{order.id.slice(0, 8).toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                {order.userName}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{order.userEmail}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 dark:text-slate-300">
                                            {order.serviceName}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 dark:text-slate-300">{order.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[order.status]
                                                }`}
                                        >
                                            {order.status.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                            ৳{order.totalCost.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Tooltip content="View Details" position="left">
                                            <Link
                                                href="/control-panel/orders"
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Tooltip>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {recentOrders.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400">No orders yet</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2024-12-24
 * │ Updated: 2024-12-24
 * └─ care ───┘
 */
