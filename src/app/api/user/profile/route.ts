import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";

// GET - Fetch user profile by UID (from auth token)
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const userDoc = await adminDb.collection("users").doc(uid).get();

        if (!userDoc.exists) {
            return NextResponse.json({ exists: false });
        }

        return NextResponse.json({
            exists: true,
            profile: { id: userDoc.id, ...userDoc.data() }
        });
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

// POST - Create or update user profile
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split("Bearer ")[1];
        const decodedToken = await adminAuth.verifyIdToken(token);
        const uid = decodedToken.uid;

        const body = await request.json();

        // Prevent users from setting their own role to admin
        if (body.role && body.role !== "user") {
            // Check if user already has a profile with admin role
            const existingDoc = await adminDb.collection("users").doc(uid).get();
            if (!existingDoc.exists || existingDoc.data()?.role === "user") {
                // New user or regular user trying to set admin role - not allowed
                body.role = "user";
            }
            // If they're already admin, keep their role
        }

        const userRef = adminDb.collection("users").doc(uid);
        await userRef.set(body, { merge: true });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save user profile:", error);
        return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
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
