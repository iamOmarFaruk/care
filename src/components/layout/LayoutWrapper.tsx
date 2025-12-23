"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current route is admin or auth (login/register)
    const isAdminRoute = pathname?.startsWith("/admin");
    const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/register");

    // Don't show Navbar and Footer on admin or auth pages
    if (isAdminRoute || isAuthRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen flex-1 flex flex-col pt-16">
                {children}
            </main>
            <Footer />
        </>
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
