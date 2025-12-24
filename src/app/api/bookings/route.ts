import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyIdToken, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";
import { bookingSchema } from "@/lib/validations";

// Get user's bookings
export async function GET(request: NextRequest) {
    const user = await verifyIdToken(request);
    if (!user) {
        return unauthorizedResponse("Please login to view your bookings");
    }

    try {
        const snapshot = await adminDb
            .collection("bookings")
            .where("userId", "==", user.uid)
            .orderBy("createdAt", "desc")
            .get();

        const bookings = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
    }
}

// Create new booking
export async function POST(request: NextRequest) {
    const user = await verifyIdToken(request);
    if (!user) {
        return unauthorizedResponse("Please login to create a booking");
    }

    try {
        const body = await request.json();

        // Validate input
        const validation = bookingSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const bookingData = {
            ...validation.data,
            userId: user.uid,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        const docRef = await adminDb.collection("bookings").add(bookingData);

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: "Booking created successfully",
        });
    } catch (error) {
        console.error("Failed to create booking:", error);
        return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }
}

// Cancel booking
export async function PUT(request: NextRequest) {
    const user = await verifyIdToken(request);
    if (!user) {
        return unauthorizedResponse("Please login to cancel a booking");
    }

    try {
        const { id, action } = await request.json();

        if (!id) {
            return badRequestResponse({ id: ["Booking ID is required"] });
        }

        // Get the booking first
        const bookingRef = adminDb.collection("bookings").doc(id);
        const booking = await bookingRef.get();

        if (!booking.exists) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // Verify ownership
        if (booking.data()?.userId !== user.uid) {
            return NextResponse.json({ error: "Not authorized to modify this booking" }, { status: 403 });
        }

        // Only allow cancellation by user
        if (action === "cancel") {
            const currentStatus = booking.data()?.status;
            if (currentStatus === "completed" || currentStatus === "cancelled") {
                return NextResponse.json(
                    { error: "Cannot cancel a completed or already cancelled booking" },
                    { status: 400 }
                );
            }

            await bookingRef.update({ status: "cancelled" });
            return NextResponse.json({ success: true, message: "Booking cancelled" });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
        console.error("Failed to update booking:", error);
        return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
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
