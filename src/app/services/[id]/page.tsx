import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/mock-data";
import ServiceDetailContent from "@/components/sections/ServiceDetailContent";

// Since we are using static export or simple runtime, we can use generateStaticParams if needed, 
// but for now standard dynamic route.

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { id } = await params;
    const service = SERVICES.find((s) => s.id === id);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.title,
        description: service.description,
        keywords: [
            service.title,
            "care services",
            "Bangladesh caregiving",
            ...service.features,
        ],
        openGraph: {
            title: `${service.title} | Care.xyz`,
            description: service.description,
            images: [service.image],
        },
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { id } = await params;
    const service = SERVICES.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    // Omit icon from service object as it's not serializable (contains React components)
    // and not needed by the Client Component.
    const { icon, ...serializableService } = service;

    return <ServiceDetailContent service={serializableService} />;
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
