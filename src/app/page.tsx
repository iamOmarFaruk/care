"use client";

import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/mock-data";
import Link from "next/link";
import { MotionDiv, MotionH2, MotionP, fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/components/ui/motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 overflow-hidden">
        <MotionDiv
          variants={staggerContainer(0.3)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"
        >
          <MotionDiv
            variants={fadeInLeft}
            className="relative aspect-square overflow-hidden rounded-2xl lg:aspect-auto lg:h-[600px]"
          >
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
              alt="Happy family"
              className="h-full w-full object-cover"
            />
          </MotionDiv>
          <MotionDiv variants={fadeInRight} className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Empowering Families with Trusted Care
            </h2>
            <p className="text-lg text-muted-foreground">
              At Care.xyz, our mission is to make caregiving easy, secure, and accessible for everyone.
              We understand the challenges of finding reliable help for your loved ones.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you need a nanny for your children, a companion for your elderly parents, or specialized
              support for sick family members, we connect you with verified and compassionate professionals.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </MotionDiv>
        </MotionDiv>
      </section>

      <ServicesGrid />

      {/* Testimonials */}
      <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900/50">
        <MotionDiv
          variants={staggerContainer(0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-12 text-center">
            <MotionH2
              variants={fadeInUp}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Trusted by Families
            </MotionH2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <MotionDiv
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <p className="mb-6 text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>
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
