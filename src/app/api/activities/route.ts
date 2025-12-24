
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(request: Request) {
    try {
        // Basic auth check (token should be validated by middleware or client-side check + headers)
        // For now, we assume the client sends a token or we rely on session cookies if implemented.
        // In a real app, verify the Authorization header.

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "20");

        const activitiesRef = adminDb.collection("activities");
        const snapshot = await activitiesRef.orderBy("timestamp", "desc").limit(limit).get();

        const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(activities);
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
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
