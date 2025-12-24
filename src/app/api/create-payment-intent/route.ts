
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { verifyIdToken, unauthorizedResponse, badRequestResponse } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
    const user = await verifyIdToken(request);
    if (!user) {
        return unauthorizedResponse("Please login to initiate payment");
    }

    try {
        const { amount } = await request.json();

        if (!amount || typeof amount !== "number") {
            return badRequestResponse({ amount: ["Amount is required and must be a number"] });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe expects amount in cents
            currency: "bdt", // Using Bangladeshi Taka as implied by the symbol ৳
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                userId: user.uid,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Failed to create payment intent:", error);
        return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
    }
}
