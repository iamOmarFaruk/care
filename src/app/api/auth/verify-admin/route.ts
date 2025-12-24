import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
    try {
        // Get the ID token from the request body
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json(
                { error: "ID token required" },
                { status: 400 }
            );
        }

        // Verify the ID token using Firebase Admin
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Fetch user data from Firestore using Admin SDK (bypasses security rules)
        const userDoc = await adminDb.collection("users").doc(uid).get();

        if (!userDoc.exists) {
            return NextResponse.json(
                { error: "User profile not found" },
                { status: 404 }
            );
        }

        const userData = userDoc.data();
        const role = userData?.role;

        // Check if user is admin or super_admin
        if (role !== "admin" && role !== "super_admin") {
            return NextResponse.json(
                { error: "Admin access required", isAdmin: false },
                { status: 403 }
            );
        }

        // Return admin user data
        return NextResponse.json({
            isAdmin: true,
            user: {
                id: uid,
                username: userData?.username || decodedToken.email?.split("@")[0],
                email: decodedToken.email || "",
                role: role,
                name: userData?.name || "Admin",
                avatar: userData?.avatar,
                status: userData?.status || "active",
                createdAt: userData?.createdAt || new Date().toISOString(),
                phone: userData?.phone,
            },
        });
    } catch (error: unknown) {
        console.error("Admin verification error:", error);
        const message = error instanceof Error ? error.message : "Verification failed";
        return NextResponse.json({ error: message }, { status: 401 });
    }
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
