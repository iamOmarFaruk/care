"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv, fadeInUp } from "@/components/ui/motion";

export default function NotFound() {
    return (
        <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center bg-background px-4 text-center">
            <MotionDiv
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-9xl font-black text-gray-200 dark:text-gray-800">404</h1>
            </MotionDiv>
            <MotionDiv
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="relative -mt-12 space-y-4"
            >
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Page not found
                </h2>
                <p className="max-w-md text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
                <div className="pt-4">
                    <Button asChild size="lg">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </MotionDiv>
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
