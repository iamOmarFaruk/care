"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { ActivityLog } from "@/types";
import {
    Activity,
    User,
    ShoppingBag,
    Settings,
    Clock,
    Search,
    Filter,
    FileText,
} from "lucide-react";

const activityIcons: Record<string, any> = {
    order: ShoppingBag,
    user: User,
    system: Settings,
};

const activityColors: Record<string, string> = {
    order: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    user: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    system: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function ActivityPage() {
    const [activities, setActivities] = React.useState<ActivityLog[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filterType, setFilterType] = React.useState<string>("all");

    React.useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await ApiService.getActivities();
                setActivities(data);
            } catch (error) {
                if (error instanceof NotAuthenticatedError) return;
                console.error("Failed to fetch activities:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const filteredActivities = activities.filter((activity) => {
        const matchesSearch =
            activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.action.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || activity.type === filterType;
        return matchesSearch && matchesType;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Activity Log</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Track all system events and user actions
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                            <option value="all">All Types</option>
                            <option value="order">Orders</option>
                            <option value="user">Users</option>
                            <option value="system">System</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Activity List */}
            <div className="space-y-4">
                {filteredActivities.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No activities found</p>
                    </div>
                ) : (
                    filteredActivities.map((activity, index) => {
                        const Icon = activityIcons[activity.type] || Activity;
                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                                <div className={`p-2 rounded-lg ${activityColors[activity.type] || activityColors.system}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                                                {activity.userName} <span className="text-slate-400 font-normal">performed</span> {activity.action}
                                            </p>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                                {activity.details}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
