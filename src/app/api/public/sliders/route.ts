import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Public API - no auth required
export async function GET() {
    try {
        const doc = await adminDb.collection("content").doc("sliders").get();
        const sliders = doc.exists ? doc.data()?.items || [] : [];

        // Sort by order if available
        return NextResponse.json(
            sliders.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
        );
    } catch (error) {
        console.error("Failed to fetch sliders:", error);
        return NextResponse.json({ error: "Failed to fetch sliders" }, { status: 500 });
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
