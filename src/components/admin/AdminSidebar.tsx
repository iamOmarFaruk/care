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

const menuGroups = [
    {
        label: "Overview",
        items: [
            { href: "/control-panel", label: "Dashboard", icon: LayoutDashboard },
        ]
    },
    {
        label: "Management",
        items: [
            { href: "/control-panel/orders", label: "Orders", icon: ShoppingBag },
            { href: "/control-panel/users", label: "Users", icon: Users },
            { href: "/control-panel/services", label: "Services", icon: Briefcase },
        ]
    },
    {
        label: "Content",
        items: [
            { href: "/control-panel/slider", label: "Slider", icon: Image },
            { href: "/control-panel/testimonials", label: "Testimonials", icon: MessageSquareQuote },
            { href: "/control-panel/about", label: "About", icon: Info },
            { href: "/control-panel/footer", label: "Footer", icon: FileText },
        ]
    },
    {
        label: "System",
        items: [
            { href: "/control-panel/profile", label: "Profile", icon: User },
            { href: "/control-panel/settings", label: "Settings", icon: Settings },
        ]
    }
];

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col z-40 shadow-xl border-r border-slate-700/50"
        >
            {/* Toggle Button - Absolute Positioned */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-5 bg-slate-800 border border-slate-600 text-slate-400 hover:text-white rounded-full p-1 shadow-lg hover:shadow-xl transition-all z-50 overflow-hidden"
            >
                <motion.div
                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronLeft className="w-4 h-4" />
                </motion.div>
            </button>

            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-slate-700/50">
                <Link href="/control-panel" className="flex items-center gap-3 w-full">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20 flex-shrink-0">
                        <Heart className="h-5 w-5 fill-current" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden"
                            >
                                Care.xyz
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto scrollbar-hide overflow-x-hidden">
                <div className="space-y-1">
                    {isCollapsed ? (
                        <Tooltip content="Visit Site" position="right">
                            <Link
                                href="/"
                                target="_blank"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-slate-400 hover:text-white hover:bg-slate-700/50 mb-2 justify-start"
                                )}
                            >
                                <Globe className="w-5 h-5 flex-shrink-0" />
                            </Link>
                        </Tooltip>
                    ) : (
                        <Link
                            href="/"
                            target="_blank"
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-slate-400 hover:text-white hover:bg-slate-700/50 mb-2"
                            )}
                        >
                            <Globe className="w-5 h-5 flex-shrink-0" />
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-medium text-sm whitespace-nowrap"
                            >
                                Visit Site
                            </motion.span>
                            <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    )}
                </div>

                {menuGroups.map((group, groupIndex) => (
                    <div key={group.label} className="space-y-1">
                        {!isCollapsed && (
                            <div className="px-3 mb-2">
                                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                                    {group.label}
                                </h3>
                            </div>
                        )}
                        {group.label !== "Overview" && isCollapsed && (
                            <div className="h-px bg-slate-700/50 mx-2 my-2" />
                        )}

                        {group.items.map((item) => {
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
                                                className="font-medium text-sm whitespace-nowrap"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    {isActive && !isCollapsed && (
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
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700/50">
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-slate-500 text-left space-y-0.5 whitespace-nowrap overflow-hidden"
                        >
                            <p>
                                NextAdmin by{' '}
                                <a
                                    href="https://github.com/iamOmarFaruk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Omar
                                </a>
                            </p>
                            <p>Version 1.0.1 • All Rights Reserved</p>
                        </motion.div>
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
