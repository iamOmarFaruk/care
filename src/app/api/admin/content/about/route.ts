import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";
import { aboutSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const doc = await adminDb.collection("content").doc("about").get();
        return NextResponse.json(doc.exists ? doc.data() : null);
    } catch (error) {
        console.error("Failed to fetch about content:", error);
        return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const data = await request.json();

        // Validate input
        const validation = aboutSchema.safeParse(data);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        await adminDb.collection("content").doc("about").set(validation.data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save about content:", error);
        return NextResponse.json({ error: "Failed to save about content" }, { status: 500 });
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
