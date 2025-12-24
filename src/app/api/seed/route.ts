import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";
import { SEED_DATA } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
    // Protect seed endpoint with secret key
    const { searchParams } = new URL(request.url);
    const providedSecret = searchParams.get("secret") || request.headers.get("X-Seed-Secret");
    const expectedSecret = process.env.SEED_SECRET;

    // If SEED_SECRET is set in env, require it
    if (expectedSecret && providedSecret !== expectedSecret) {
        return NextResponse.json(
            { error: "Unauthorized. Seed secret required." },
            { status: 401 }
        );
    }

    try {
        const batch = adminDb.batch();

        // 1. Seed Services
        SEED_DATA.services.forEach((service) => {
            const ref = adminDb.collection("services").doc(service.id);
            batch.set(ref, service);
        });

        // 2. Seed Content
        // Sliders
        const sliderRef = adminDb.collection("content").doc("sliders");
        batch.set(sliderRef, { items: SEED_DATA.sliders });

        // About
        const aboutRef = adminDb.collection("content").doc("about");
        batch.set(aboutRef, SEED_DATA.about);

        // Footer
        const footerRef = adminDb.collection("content").doc("footer");
        batch.set(footerRef, SEED_DATA.footer);

        // 3. Seed Testimonials
        SEED_DATA.testimonials.forEach((t) => {
            const ref = adminDb.collection("testimonials").doc(t.id.toString());
            batch.set(ref, t);
        });

        // 4. Seed Users (Auth & Firestore)
        const users = SEED_DATA.users;
        const password = process.env.SEED_USER_PASSWORD || "care1234"; // Default password for all

        for (const user of users) {
            // Create or Update Auth User
            let authUid = user.id;
            try {
                // Try to get existing user by email first
                const existingUser = await adminAuth.getUserByEmail(user.email);
                authUid = existingUser.uid;
                // User exists
            } catch (e) {
                // User doesn't exist or other error, try to create
                const err = e as { message?: string; code?: string };
                const errorMessage = err?.message || String(e);
                const errorCode = err?.code || '';

                if (errorCode === 'auth/user-not-found' || errorMessage.includes('no user record')) {
                    try {
                        const newUser = await adminAuth.createUser({
                            uid: user.id,
                            email: user.email,
                            emailVerified: true,
                            password: password,
                            displayName: user.name,
                            photoURL: user.avatar,
                        });
                        authUid = newUser.uid;
                    } catch (createErr) {
                        const createError = createErr as { message?: string; code?: string };
                        const createMsg = createError?.message || String(createErr);
                        const createCode = createError?.code || '';

                        if (createCode === 'auth/uid-already-exists' || createMsg.includes('already exists')) {
                            try {
                                const userByUid = await adminAuth.getUser(user.id);
                                authUid = userByUid.uid;
                            } catch {
                                console.error(`Could not find user by UID ${user.id}:`, createMsg);
                            }
                        } else {
                            console.error(`Failed to create user ${user.email}:`, createMsg);
                        }
                    }
                } else {
                    console.error(`Error checking user ${user.email}:`, errorMessage);
                }
            }

            // Set Firestore Document
            const ref = adminDb.collection("users").doc(user.id);
            batch.set(ref, {
                uid: user.id, // Matches Auth UID
                email: user.email,
                role: user.role, // Important for RBAC
                fullName: user.name,
                photoURL: user.avatar,
                status: user.status,
                createdAt: user.createdAt,
                username: user.username
            });
        }

        // 5. Seed Orders (Bookings)
        SEED_DATA.orders.forEach((order) => {
            const ref = adminDb.collection("bookings").doc(order.id);
            batch.set(ref, {
                ...order,
            });
        });

        await batch.commit();

        return NextResponse.json({
            success: true,
            message: "Database seeded successfully with Admins, Users, Services, Content, and Orders."
        });
    } catch (error) {
        console.error("Seeding Error:", error);
        const err = error as { message?: string };
        return NextResponse.json({ success: false, error: err?.message || String(error) }, { status: 500 });
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
