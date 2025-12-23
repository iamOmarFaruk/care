"use client";

import Link from "next/link";
import { Heart, Facebook, Instagram, Linkedin } from "lucide-react";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";

const XIcon = ({ className }: { className?: string }) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export function Footer() {
    return (
        <footer className="bg-gradient-to-t from-teal-50/80 via-white to-white py-8 md:py-16">
            <MotionDiv
                variants={staggerContainer(0.1)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="container mx-auto px-4 flex flex-col items-center justify-center text-center gap-5 md:gap-8"
            >
                {/* Logo Section */}
                <MotionDiv variants={fadeInUp} className="flex flex-col items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white transition-transform group-hover:scale-110">
                            <Heart className="h-6 w-6 fill-current" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-teal-900 group-hover:text-teal-700 transition-colors">Care.xyz</span>
                    </Link>
                </MotionDiv>

                {/* Navigation Links */}
                <MotionDiv variants={fadeInUp}>
                    <nav>
                        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm font-medium text-muted-foreground">
                            <li><Link href="/#about" className="hover:text-teal-600 transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover:text-teal-600 transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link></li>
                            <li><Link href="/terms" className="hover:text-teal-600 transition-colors">Terms</Link></li>
                        </ul>
                    </nav>
                </MotionDiv>

                {/* Social Icons */}
                <MotionDiv variants={fadeInUp} className="flex gap-5 md:gap-6">
                    <a href="#" className="text-muted-foreground hover:text-teal-600 hover:scale-110 transition-all">
                        <span className="sr-only">Facebook</span>
                        <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-teal-600 hover:scale-110 transition-all">
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-teal-600 hover:scale-110 transition-all">
                        <span className="sr-only">X (Twitter)</span>
                        <XIcon className="h-4 w-4 mt-0.5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-teal-600 hover:scale-110 transition-all">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5" />
                    </a>
                </MotionDiv>

                {/* Copyright */}
                <MotionDiv variants={fadeInUp} className="pt-2 md:pt-4">
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} Care.xyz. All rights reserved.
                    </p>
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
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
