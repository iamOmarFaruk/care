"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Image,
    Info,
    Briefcase,
    MessageSquareQuote,
    FileText,
    Users,
    ShoppingBag,
    ChevronLeft,
    Heart,
    Globe,
    ExternalLink,
    User,
    Settings,
} from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface AdminSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const menuItems = [
    { href: "/control-panel", label: "Dashboard", icon: LayoutDashboard },
    { href: "/control-panel/orders", label: "Orders", icon: ShoppingBag },
    { href: "/control-panel/users", label: "Users", icon: Users },
    { href: "/control-panel/slider", label: "Slider", icon: Image },
    { href: "/control-panel/about", label: "About", icon: Info },
    { href: "/control-panel/services", label: "Services", icon: Briefcase },
    { href: "/control-panel/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { href: "/control-panel/footer", label: "Footer", icon: FileText },
    { href: "/control-panel/profile", label: "Profile", icon: User },
    { href: "/control-panel/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col z-40 shadow-xl"
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
                <Link href="/control-panel" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
                        <Heart className="h-5 w-5 fill-current" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-lg font-bold tracking-tight"
                            >
                                Care.xyz
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                    <motion.div
                        animate={{ rotate: isCollapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </motion.div>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                <Link
                    href="/"
                    target="_blank"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-slate-400 hover:text-white hover:bg-slate-700/50 mb-2"
                    )}
                >
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-medium text-sm"
                        >
                            Visit Site
                        </motion.span>
                    )}
                    {!isCollapsed && <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                </Link>

                <div className="h-px bg-slate-700/50 mx-2 mb-4" />

                {menuItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/control-panel" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    const linkContent = (
                        <Link
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-white")} />
                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="font-medium text-sm"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </Link>
                    );

                    return isCollapsed ? (
                        <Tooltip key={item.href} content={item.label} position="right">
                            {linkContent}
                        </Tooltip>
                    ) : (
                        <div key={item.href}>{linkContent}</div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-slate-500 text-center"
                        >
                            Admin Panel v1.0
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2024-12-24
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
