"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminStore, AdminUser } from "@/lib/admin-data";
import { useAuth } from "@/context/auth-context";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const { user: firebaseUser, profile, loading: authLoading, isAdmin } = useAuth();
    const [user, setUser] = React.useState<AdminUser | null>(null);

    React.useEffect(() => {
        if (authLoading) return;

        if (!firebaseUser || !isAdmin || !profile) {
            router.replace("/control-panel/login"); // Redirect to the working login page
        } else {
            // Map UserProfile to AdminUser
            const adminUser: AdminUser = {
                id: profile.uid,
                username: profile.email.split('@')[0] || "admin",
                email: profile.email,
                role: (profile.role === "super_admin" || profile.role === "admin") ? profile.role : "user",
                name: profile.fullName || "Admin",
                avatar: profile.photoURL || undefined,
                status: "active",
                createdAt: profile.createdAt,
            };
            setUser(adminUser);
        }
    }, [firebaseUser, isAdmin, profile, authLoading, router]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <AdminSidebar
                    isCollapsed={isCollapsed}
                    onToggle={() => setIsCollapsed(!isCollapsed)}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed left-0 top-0 z-50 lg:hidden"
                        >
                            <AdminSidebar isCollapsed={false} onToggle={() => setIsMobileOpen(false)} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <style jsx global>{`
                @media (min-width: 1024px) {
                    .admin-main-content {
                        margin-left: ${isCollapsed ? "72px" : "260px"};
                        transition: margin-left 0.3s ease-in-out;
                    }
                }
            `}</style>
            <div className="admin-main-content min-h-screen flex flex-col bg-slate-100/50">
                <AdminHeader
                    onMenuClick={() => setIsMobileOpen(true)}
                    user={user}
                />
                <main className="flex-1 p-6 lg:p-8">{children}</main>
            </div>
        </div>
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
