import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Public API - no auth required
export async function GET() {
    try {
        const snapshot = await adminDb.collection("testimonials").get();
        const testimonials = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .filter((t: any) => t.isVisible !== false); // Only visible testimonials

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
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
