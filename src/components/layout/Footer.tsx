"use client";

import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30 overflow-hidden">
            <MotionDiv
                variants={staggerContainer(0.1)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
            >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                    {/* Brand Column */}
                    <MotionDiv variants={fadeInUp} className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                                <Heart className="h-5 w-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-teal-600">Care.xyz</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Making caregiving easy, secure, and accessible for everyone.
                            Find trusted help for your loved ones today.
                        </p>
                    </MotionDiv>

                    {/* Quick Links */}
                    <MotionDiv variants={fadeInUp}>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Services</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/services/baby-care" className="transition-colors hover:text-teal-600">Child Care</Link></li>
                            <li><Link href="/services/elderly-care" className="transition-colors hover:text-teal-600">Elderly Care</Link></li>
                            <li><Link href="/services/special-care" className="transition-colors hover:text-teal-600">Special Needs</Link></li>
                            <li><Link href="/services" className="transition-colors hover:text-teal-600">View All</Link></li>
                        </ul>
                    </MotionDiv>

                    <MotionDiv variants={fadeInUp}>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="transition-colors hover:text-teal-600">About Us</Link></li>
                            <li><Link href="/careers" className="transition-colors hover:text-teal-600">Careers</Link></li>
                            <li><Link href="/blog" className="transition-colors hover:text-teal-600">Blog</Link></li>
                            <li><Link href="/contact" className="transition-colors hover:text-teal-600">Contact</Link></li>
                        </ul>
                    </MotionDiv>

                    <MotionDiv variants={fadeInUp}>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="transition-colors hover:text-teal-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="transition-colors hover:text-teal-600">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="transition-colors hover:text-teal-600">Cookie Policy</Link></li>
                        </ul>
                    </MotionDiv>
                </div>

                <MotionDiv
                    variants={fadeInUp}
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
                >
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Care.xyz. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-muted-foreground transition-all hover:text-teal-600 hover:scale-110">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-all hover:text-teal-600 hover:scale-110">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-all hover:text-teal-600 hover:scale-110">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-all hover:text-teal-600 hover:scale-110">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </MotionDiv>
            </MotionDiv>
        </footer>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ [care] ───┘
 */
