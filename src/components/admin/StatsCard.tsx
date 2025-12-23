"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: "primary" | "secondary" | "success" | "warning" | "info";
}

const variantStyles = {
    primary: {
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        iconBg: "bg-white/20",
        text: "text-white",
        subtext: "text-teal-100",
    },
    secondary: {
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        iconBg: "bg-white/20",
        text: "text-white",
        subtext: "text-amber-100",
    },
    success: {
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        iconBg: "bg-white/20",
        text: "text-white",
        subtext: "text-emerald-100",
    },
    warning: {
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        iconBg: "bg-white/20",
        text: "text-white",
        subtext: "text-orange-100",
    },
    info: {
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        iconBg: "bg-white/20",
        text: "text-white",
        subtext: "text-blue-100",
    },
};

export function StatsCard({
    title,
    value,
    icon: Icon,
    trend,
    variant = "primary",
}: StatsCardProps) {
    const styles = variantStyles[variant];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "relative rounded-2xl p-6 shadow-lg overflow-hidden",
                styles.bg
            )}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className={cn("text-sm font-medium mb-1", styles.subtext)}>
                        {title}
                    </p>
                    <p className={cn("text-3xl font-bold", styles.text)}>{value}</p>
                    {trend && (
                        <div className="flex items-center gap-1 mt-2">
                            <span
                                className={cn(
                                    "text-xs font-medium px-2 py-0.5 rounded-full",
                                    trend.isPositive
                                        ? "bg-white/20 text-white"
                                        : "bg-red-400/20 text-red-100"
                                )}
                            >
                                {trend.isPositive ? "+" : ""}
                                {trend.value}%
                            </span>
                            <span className={cn("text-xs", styles.subtext)}>vs last week</span>
                        </div>
                    )}
                </div>
                <div className={cn("p-3 rounded-xl", styles.iconBg)}>
                    <Icon className={cn("w-6 h-6", styles.text)} />
                </div>
            </div>
        </motion.div>
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
