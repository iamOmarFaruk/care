"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mockStore } from "@/lib/store";
import { toast } from "sonner";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // Check auth
        const user = mockStore.getUser();
        if (!user) {
            toast.error("Please log in to continue.");
            // Redirect to login, but maybe store the intended destination?
            // For simplicity, just login.
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return <>{children}</>;
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
