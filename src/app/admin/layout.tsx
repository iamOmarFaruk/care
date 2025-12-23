"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { adminStore, AdminUser } from "@/lib/admin-data";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        // Check admin session
        const session = adminStore.getAdminSession();
        if (!session || (session.role !== "super_admin" && session.role !== "admin")) {
            router.replace("/login");
        } else {
            setUser(session);
        }
        setIsLoading(false);
    }, [router]);

    if (isLoading) {
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
        return null;
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
            <motion.div
                initial={false}
                animate={{ marginLeft: isCollapsed ? 72 : 260 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="min-h-screen lg:ml-[260px]"
                style={{ marginLeft: 0 }} // Reset for mobile
            >
                <div
                    className="hidden lg:block"
                    style={{ marginLeft: isCollapsed ? 72 : 260, transition: "margin-left 0.3s ease-in-out" }}
                >
                    {/* This empty div is just for spacing on desktop */}
                </div>
                <div className={`lg:ml-0`} style={{ marginLeft: 0 }}>
                    <div
                        className="transition-[margin-left] duration-300 ease-in-out"
                        style={{
                            marginLeft:
                                typeof window !== "undefined" && window.innerWidth >= 1024
                                    ? isCollapsed
                                        ? 72
                                        : 260
                                    : 0,
                        }}
                    >
                        <style jsx>{`
              @media (min-width: 1024px) {
                div {
                  margin-left: ${isCollapsed ? "72px" : "260px"};
                }
              }
            `}</style>
                    </div>
                </div>

                <div
                    className="min-h-screen flex flex-col transition-[margin-left] duration-300"
                    id="admin-main-content"
                >
                    <style jsx global>{`
            @media (min-width: 1024px) {
              #admin-main-content {
                margin-left: ${isCollapsed ? "72px" : "260px"} !important;
              }
            }
          `}</style>
                    <AdminHeader
                        onMenuClick={() => setIsMobileOpen(true)}
                        user={user}
                    />
                    <main className="flex-1 p-4 lg:p-6">{children}</main>
                </div>
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
