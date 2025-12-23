"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore, AdminUser, OrderItem } from "@/lib/admin-data";
import { toast } from "sonner";
import {
    Menu,
    Bell,
    ChevronDown,
    LogOut,
    User,
    Settings,
} from "lucide-react";

interface AdminHeaderProps {
    onMenuClick: () => void;
    user: AdminUser | null;
}

export function AdminHeader({ onMenuClick, user }: AdminHeaderProps) {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isNotifOpen, setIsNotifOpen] = React.useState(false);
    const [pendingOrders, setPendingOrders] = React.useState<OrderItem[]>([]);

    // Refs for click outside
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const notifRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Fetch pending orders
        const orders = adminStore.getOrders();
        const pending = orders
            .filter(o => o.status === "pending")
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5);
        setPendingOrders(pending);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        adminStore.adminLogout();
        toast.success("Logged out successfully");
        router.push("/login");
    };

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <Menu className="w-5 h-5 text-slate-600" />
                </button>
                <div>
                    <h1 className="text-lg font-semibold text-slate-800">Admin Dashboard</h1>
                    <p className="text-xs text-slate-500 hidden sm:block">
                        Manage your Care.xyz platform
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors group"
                    >
                        <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                        {pendingOrders.length > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotifOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 overflow-hidden z-50"
                            >
                                <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-800">Notifications</h3>
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                        {pendingOrders.length} Pending
                                    </span>
                                </div>

                                <div className="max-h-[320px] overflow-y-auto">
                                    {pendingOrders.length > 0 ? (
                                        pendingOrders.map((order) => (
                                            <div key={order.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="text-sm font-medium text-slate-800">{order.serviceName}</p>
                                                    <span className="text-xs text-slate-500 whitespace-nowrap">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">
                                                            {order.userName.charAt(0)}
                                                        </div>
                                                        <p className="text-xs text-slate-600">{order.userName}</p>
                                                    </div>
                                                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                                        Pending
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center">
                                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Bell className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <p className="text-sm text-slate-500">No pending orders</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                                    <Link
                                        href="/admin/orders"
                                        onClick={() => setIsNotifOpen(false)}
                                        className="flex items-center justify-center w-full py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                                    >
                                        See All Notifications
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600">
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white font-medium text-sm">
                                    {user?.name?.charAt(0) || "A"}
                                </div>
                            )}
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-medium text-slate-700">
                                {user?.name || "Admin"}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">
                                {user?.role?.replace("_", " ") || "Super Admin"}
                            </p>
                        </div>
                        <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 overflow-hidden"
                            >
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <p className="font-medium text-slate-800">{user?.name}</p>
                                    <p className="text-xs text-slate-500">{user?.email}</p>
                                </div>

                                <div className="py-1">
                                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                        <User className="w-4 h-4" />
                                        Profile
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                </div>

                                <div className="border-t border-slate-100 pt-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
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
