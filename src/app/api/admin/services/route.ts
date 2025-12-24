import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";
import { serviceSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const snapshot = await adminDb.collection("services").get();
        const services = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return NextResponse.json(services);
    } catch (error) {
        console.error("Failed to fetch services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const body = await request.json();

        // Validate input
        const validation = serviceSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, ...data } = validation.data;
        await adminDb.collection("services").doc(id).set(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to add service:", error);
        return NextResponse.json({ error: "Failed to add service" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const body = await request.json();

        // Validate input
        const validation = serviceSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, ...data } = validation.data;
        await adminDb.collection("services").doc(id).update(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update service:", error);
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return badRequestResponse({ id: ["Service ID required"] });
        }

        await adminDb.collection("services").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete service:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
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
