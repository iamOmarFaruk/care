import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Public API - no auth required
export async function GET() {
    try {
        const doc = await adminDb.collection("content").doc("about").get();
        return NextResponse.json(doc.exists ? doc.data() : null);
    } catch (error) {
        console.error("Failed to fetch about content:", error);
        return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
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
