import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailContent from "@/components/sections/ServiceDetailContent";
import { adminDb } from "@/lib/firebase-admin";
import { Service } from "@/types";

// Helper to fetch service data
async function getService(id: string): Promise<Service | null> {
    try {
        const doc = await adminDb.collection("services").doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() } as Service;
    } catch (error) {
        console.error("Error fetching service:", error);
        return null;
    }
}

// Generate Metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        return {
            title: "Service Not Found",
            description: "The requested service could not be found."
        };
    }

    return {
        title: `${service.title} | Care.xyz`,
        description: service.description,
        openGraph: {
            title: service.title,
            description: service.description,
            images: [
                {
                    url: service.image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        notFound();
    }

    return <ServiceDetailContent service={service} />;
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
