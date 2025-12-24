import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

// Public API - get single service by ID
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const doc = await adminDb.collection("services").doc(id).get();

        if (!doc.exists) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        const service = {
            id: doc.id,
            ...doc.data(),
        };

        // Don't return inactive services publicly
        if ((service as any).isActive === false) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error("Failed to fetch service:", error);
        return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
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
