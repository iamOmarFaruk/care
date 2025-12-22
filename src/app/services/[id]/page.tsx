import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/mock-data";

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
            images: [
                {
                    url: service.image,
                    width: 1200,
                    height: 630,
                    alt: service.title,
                },
            ],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
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

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
                <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                    <Link href="/#services">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
                    </Link>
                </Button>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Column */}
                <div className="overflow-hidden rounded-2xl border shadow-lg">
                    <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Content Column */}
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                Trusted Care
                            </span>
                            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-foreground">
                                Verified Pros
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                            {service.title}
                        </h1>
                        <p className="mt-4 text-xl text-muted-foreground">
                            {service.description}
                        </p>
                    </div>

                    <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-foreground">Service Features</h3>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {service.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-50 p-6 dark:bg-slate-900">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Starting from</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary">৳{service.pricePerHr}</span>
                                <span className="text-muted-foreground">/hour</span>
                            </div>
                        </div>
                        <Button size="lg" className="px-8 text-lg" asChild>
                            <Link href={`/booking/${service.id}`}>
                                Book This Service
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
