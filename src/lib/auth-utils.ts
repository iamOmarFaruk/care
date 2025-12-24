import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export type VerifiedUser = {
    uid: string;
    email: string;
    role: "super_admin" | "admin" | "user";
};

/**
 * Extract Bearer token from Authorization header
 */
function extractToken(request: NextRequest): string | null {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
        return null;
    }
    return authHeader.substring(7);
}

/**
 * Verify Firebase ID token from request
 * Returns null if token is invalid or missing
 */
export async function verifyIdToken(request: NextRequest): Promise<VerifiedUser | null> {
    try {
        const token = extractToken(request);
        if (!token) {
            return null;
        }

        // Verify token with Firebase Admin
        const decodedToken = await adminAuth.verifyIdToken(token);

        // Fetch user role from Firestore
        const userDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
        if (!userDoc.exists) {
            return null;
        }

        const userData = userDoc.data();
        return {
            uid: decodedToken.uid,
            email: decodedToken.email || "",
            role: userData?.role || "user",
        };
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}

/**
 * Verify user is an admin (admin or super_admin role)
 * Returns null if not authenticated or not admin
 */
export async function verifyAdmin(request: NextRequest): Promise<VerifiedUser | null> {
    const user = await verifyIdToken(request);
    if (!user) {
        return null;
    }

    if (user.role !== "admin" && user.role !== "super_admin") {
        return null;
    }

    return user;
}

/**
 * Unauthorized response helper
 */
export function unauthorizedResponse(message: string = "Unauthorized") {
    return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Forbidden response helper
 */
export function forbiddenResponse(message: string = "Forbidden") {
    return NextResponse.json({ error: message }, { status: 403 });
}

/**
 * Bad request response helper (for validation errors)
 */
export function badRequestResponse(errors: unknown) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
