import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Heart className="h-5 w-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-primary">Care.xyz</span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Making caregiving easy, secure, and accessible for everyone.
                            Find trusted help for your loved ones today.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Services</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/services/baby-care" className="hover:text-primary">Child Care</Link></li>
                            <li><Link href="/services/elderly-care" className="hover:text-primary">Elderly Care</Link></li>
                            <li><Link href="/services/special-care" className="hover:text-primary">Special Needs</Link></li>
                            <li><Link href="/services" className="hover:text-primary">View All</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Company</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-foreground">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-primary">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Care.xyz. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                            <span className="sr-only">LinkedIn</span>
                            <Linkedin className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
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
