import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/booking", "/dashboard", "/my-bookings"];
const adminRoutes = ["/control-panel"];
const adminLoginRoute = "/control-panel/login";

// API routes that require authentication
const protectedApiRoutes = ["/api/admin"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check for admin API routes - require Authorization header
    if (protectedApiRoutes.some((route) => pathname.startsWith(route))) {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized - No token provided" },
                { status: 401 }
            );
        }

        // Token exists, let the route handler verify it
        return NextResponse.next();
    }

    // Check for control panel routes (except login)
    if (pathname.startsWith("/control-panel") && pathname !== adminLoginRoute) {
        // For client-side auth, we check cookies or let client handle redirect
        // Since Firebase uses client-side auth, we let the layout handle this
        return NextResponse.next();
    }

    // For protected user routes, let client-side auth handle it
    // The layout components will redirect if not authenticated

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/api/admin/:path*",
        "/control-panel/:path*",
        "/booking/:path*",
        "/dashboard/:path*",
        "/my-bookings/:path*",
    ],
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
