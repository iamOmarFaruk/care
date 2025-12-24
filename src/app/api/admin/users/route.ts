import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { verifyAdmin, unauthorizedResponse, forbiddenResponse, badRequestResponse } from "@/lib/auth-utils";
import { userUpdateSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
    // Verify admin access
    const admin = await verifyAdmin(request);
    if (!admin) {
        return unauthorizedResponse("Admin access required");
    }

    try {
        const snapshot = await adminDb.collection("users").get();
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return NextResponse.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
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
        const validation = userUpdateSchema.safeParse(body);
        if (!validation.success) {
            return badRequestResponse(validation.error.flatten().fieldErrors);
        }

        const { id, ...data } = validation.data;

        // Prevent non-super_admin from changing roles to super_admin
        if (data.role === "super_admin" && admin.role !== "super_admin") {
            return forbiddenResponse("Only super_admin can assign super_admin role");
        }

        // Prevent users from modifying their own role
        if (id === admin.uid && data.role) {
            return forbiddenResponse("Cannot modify your own role");
        }

        await adminDb.collection("users").doc(id).update(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update user:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
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
            return badRequestResponse({ id: ["User ID required"] });
        }

        // Prevent self-deletion
        if (id === admin.uid) {
            return forbiddenResponse("Cannot delete your own account");
        }

        // Prevent deleting super_admins (only super_admin can delete super_admin)
        const userDoc = await adminDb.collection("users").doc(id).get();
        if (userDoc.exists && userDoc.data()?.role === "super_admin" && admin.role !== "super_admin") {
            return forbiddenResponse("Only super_admin can delete super_admin accounts");
        }

        await adminDb.collection("users").doc(id).delete();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
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
