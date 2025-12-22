import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden bg-slate-900 py-12 md:py-24 lg:py-32 xl:py-48 pt-24 -mt-16">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop"
                    alt="Caring nurse holding seniors hand"
                    className="h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-white lg:text-6xl fade-in-up">
                        Reliable Care for <span className="text-primary">Your Loved Ones</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-200 fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Professional babysitting, accessible elderly support, and specialized care services.
                        We make caregiving easy, secure, and accessible for everyone.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Button size="lg" className="min-w-[200px] text-lg" asChild>
                            <Link href="/register">Find a Caregiver</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="min-w-[200px] bg-transparent text-lg text-white hover:bg-white/10 hover:text-white" asChild>
                            <Link href="/#services">Explore Services</Link>
                        </Button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-white/80 fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">500+</span>
                            <span className="text-sm uppercase tracking-wide">Caregivers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">2k+</span>
                            <span className="text-sm uppercase tracking-wide">Families</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">4.9</span>
                            <span className="text-sm uppercase tracking-wide">Rating</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
