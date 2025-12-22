"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MotionDiv, fadeInUp, staggerContainer } from "@/components/ui/motion";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About Us", href: "/#about" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const pathname = usePathname();
    const router = useRouter();

    // Smooth scroll handler for hash links
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.includes('#')) {
            const hash = href.split('#')[1];
            const basePath = href.split('#')[0] || '/';

            if (pathname === basePath || (pathname === '/' && basePath === '/')) {
                e.preventDefault();
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    window.history.pushState(null, '', href);
                }
            } else {
                e.preventDefault();
                router.push(href);
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY < lastScrollY.current) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
                setIsVisible(false);
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-500 ease-in-out",
            isVisible
                ? "translate-y-0"
                : "-translate-y-full"
        )}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-colors duration-300 text-teal-600">
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 bg-teal-600 text-white"
                    >
                        <Heart className="h-5 w-5 fill-current" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight transition-colors duration-300 text-teal-600">Care.xyz</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:gap-8">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleSmoothScroll(e, item.href)}
                            className={cn(
                                "relative text-base font-semibold transition-all duration-300 hover:text-teal-600 group",
                                pathname === item.href
                                    ? "text-slate-900"
                                    : "text-slate-700"
                            )}
                        >
                            {item.label}
                            <motion.span
                                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-teal-600 transition-all group-hover:w-full"
                                initial={false}
                            />
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex md:items-center md:gap-4">
                    <Button variant="secondary" asChild className="transition-transform hover:scale-105 active:scale-95">
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild className="transition-transform hover:scale-105 active:scale-95">
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="flex items-center justify-center rounded-md p-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 md:hidden text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Toggle menu</span>
                    <motion.span
                        initial={false}
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </motion.span>
                </button>
            </div>

            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-t border-slate-200/40 bg-white/95 backdrop-blur-sm"
                    >
                        <motion.div
                            variants={staggerContainer(0.05, 0.1)}
                            initial="initial"
                            animate="animate"
                            className="space-y-1 p-4"
                        >
                            {NAV_ITEMS.map((item) => (
                                <motion.div key={item.href} variants={fadeInUp}>
                                    <Link
                                        href={item.href}
                                        onClick={(e) => {
                                            handleSmoothScroll(e, item.href);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "block select-none rounded-md px-3 py-2.5 text-lg font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-teal-600 hover:translate-x-1",
                                            pathname === item.href ? "text-slate-900" : "text-slate-700"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-4 flex flex-col gap-2 border-t border-slate-200/40 pt-4"
                            >
                                <Button variant="outline" asChild className="w-full justify-start transition-all duration-200 hover:translate-x-1">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                                </Button>
                                <Button asChild className="w-full justify-start transition-all duration-200 hover:translate-x-1">
                                    <Link href="/register" onClick={() => setIsOpen(false)}>Get Started</Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
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
