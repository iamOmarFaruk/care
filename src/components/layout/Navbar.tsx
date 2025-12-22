"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About Us", href: "/#about" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Mock checking if user is on auth pages to hide nav or change style?
    // For now, we show it everywhere.

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Heart className="h-5 w-5 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-primary">Care.xyz</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-base font-semibold transition-colors hover:text-primary",
                                pathname === item.href ? "text-foreground" : "text-foreground/80"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex md:items-center md:gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Toggle menu</span>
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-b md:hidden animate-in slide-in-from-top-1">
                    <div className="space-y-1 p-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block select-none rounded-md px-3 py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground",
                                    pathname === item.href ? "bg-accent text-foreground" : "text-foreground/80"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                            <Button variant="outline" asChild className="w-full justify-start">
                                <Link href="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                            </Button>
                            <Button asChild className="w-full justify-start">
                                <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
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
