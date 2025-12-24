"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import ServiceDetailContent from "@/components/sections/ServiceDetailContent";
import { Loader2 } from "lucide-react";
import type { Service } from "@/types";

export default function ServiceDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await fetch(`/api/services/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setService(data);
                } else if (res.status === 404) {
                    setError(true);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch service:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !service) {
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
