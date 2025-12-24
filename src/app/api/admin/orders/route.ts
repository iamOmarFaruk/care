import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";
import { orderStatusUpdateSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        // Fetch bookings
        const bookingsSnap = await adminDb.collection("bookings").orderBy("createdAt", "desc").get();
        const bookings = bookingsSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Fetch users to enrich booking data
        const usersSnap = await adminDb.collection("users").get();
        const userMap = new Map();
        usersSnap.forEach(doc => {
            userMap.set(doc.id, doc.data());
        });

        const enrichedBookings = bookings.map((booking: any) => {
            const user = userMap.get(booking.userId);
            return {
                ...booking,
                userName: user?.fullName || "Unknown User",
                userEmail: user?.email || "No Email",
            };
        });

        return NextResponse.json(enrichedBookings);
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
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
        const validation = orderStatusUpdateSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, status } = validation.data;
        await adminDb.collection("bookings").doc(id).update({ status });

        // Log activity
        await adminDb.collection("activities").add({
            userId: admin.uid,
            userName: admin.email?.split('@')[0] || "Admin",
            action: "updated_order_status",
            details: `Updated order #${id} status to ${status}`,
            timestamp: new Date().toISOString(),
            type: "order"
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update order status:", error);
        return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
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
