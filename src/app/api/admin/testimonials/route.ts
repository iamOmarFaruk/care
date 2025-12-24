import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";
import { testimonialSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const snapshot = await adminDb.collection("testimonials").get();
        const testimonials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
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
        const validation = testimonialSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, ...data } = validation.data;

        // Use provided ID or let Firestore generate
        if (id) {
            await adminDb.collection("testimonials").doc(id.toString()).set(data);
        } else {
            await adminDb.collection("testimonials").add(data);
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to add testimonial:", error);
        return NextResponse.json({ error: "Failed to add testimonial" }, { status: 500 });
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
        const validation = testimonialSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, ...data } = validation.data;

        if (!id) {
            return badRequestResponse({ id: ["Testimonial ID required"] });
        }

        await adminDb.collection("testimonials").doc(id.toString()).update(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update testimonial:", error);
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
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
            return badRequestResponse({ id: ["Testimonial ID required"] });
        }

        await adminDb.collection("testimonials").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete testimonial:", error);
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
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
