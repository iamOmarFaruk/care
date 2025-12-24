import { z } from "zod";

// Helper to sanitize text input (remove HTML tags, trim whitespace)
export function sanitizeText(text: string): string {
    return text
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .trim();
}

// User roles enum
export const userRoleSchema = z.enum(["super_admin", "admin", "user"]);
export const userStatusSchema = z.enum(["active", "disabled"]);
export const orderStatusSchema = z.enum(["pending", "confirmed", "in_progress", "completed", "cancelled"]);

// Service validation
export const serviceSchema = z.object({
    id: z.string().min(1, "ID is required"),
    title: z.string().min(3, "Title must be at least 3 characters").max(100).transform(sanitizeText),
    description: z.string().min(10, "Description must be at least 10 characters").max(1000).transform(sanitizeText),
    icon: z.string().optional(),
    pricePerHr: z.number().positive("Price must be positive"),
    image: z.string().url("Invalid image URL"),
    features: z.array(z.string().transform(sanitizeText)),
    isActive: z.boolean(),
});

// User update validation (for admin updating user)
export const userUpdateSchema = z.object({
    id: z.string().min(1, "User ID is required"),
    role: userRoleSchema.optional(),
    status: userStatusSchema.optional(),
    fullName: z.string().min(1).max(100).transform(sanitizeText).optional(),
    email: z.string().email().optional(),
});

// Booking/Order validation
export const bookingSchema = z.object({
    serviceId: z.string().min(1, "Service ID is required"),
    serviceName: z.string().min(1).transform(sanitizeText),
    date: z.string().refine((val) => {
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }, "Date must be today or in the future"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format (HH:MM)"),
    duration: z.string().min(1),
    location: z.string().min(5, "Location must be at least 5 characters").max(500).transform(sanitizeText),
    totalCost: z.number().positive("Total cost must be positive"),
    notes: z.string().max(1000).transform(sanitizeText).optional(),
});

// Order status update (for admin)
export const orderStatusUpdateSchema = z.object({
    id: z.string().min(1, "Order ID is required"),
    status: orderStatusSchema,
});

// Testimonial validation
export const testimonialSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    name: z.string().min(2, "Name must be at least 2 characters").max(100).transform(sanitizeText),
    role: z.string().min(1).max(100).transform(sanitizeText),
    content: z.string().min(10, "Content must be at least 10 characters").max(500).transform(sanitizeText),
    avatar: z.string().url("Invalid avatar URL"),
    isVisible: z.boolean(),
});

// Slider validation
export const sliderSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(3).max(100).transform(sanitizeText),
    subtitle: z.string().min(5).max(200).transform(sanitizeText),
    ctaText: z.string().min(1).max(50).transform(sanitizeText),
    ctaLink: z.string().min(1),
    backgroundImage: z.string().url("Invalid background image URL"),
    order: z.number().int().positive(),
});

export const slidersArraySchema = z.array(sliderSchema);

// About content validation
export const aboutSchema = z.object({
    title: z.string().min(5).max(100).transform(sanitizeText),
    description: z.string().min(20).max(2000).transform(sanitizeText),
    image: z.string().url("Invalid image URL"),
    features: z.array(z.string().transform(sanitizeText)),
    // Extended optional fields
    subtitle: z.string().max(200).transform(sanitizeText).optional(),
    stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
    })).optional(),
    images: z.array(z.string().url()).optional(),
});

// Footer validation
export const footerSchema = z.object({
    copyright: z.string().min(1).max(200).transform(sanitizeText),
    socialLinks: z.object({
        facebook: z.string().url().or(z.literal("")),
        instagram: z.string().url().or(z.literal("")),
        twitter: z.string().url().or(z.literal("")),
        linkedin: z.string().url().or(z.literal("")),
    }),
    navLinks: z.array(z.object({
        label: z.string().min(1).max(50).transform(sanitizeText),
        href: z.string().min(1),
    })).optional(),
    // Extended optional fields
    description: z.string().max(500).transform(sanitizeText).optional(),
    address: z.string().max(300).transform(sanitizeText).optional(),
    email: z.string().email().or(z.literal("")).optional(),
    phone: z.string().max(50).optional(),
});

// Type exports
export type ServiceInput = z.infer<typeof serviceSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type SliderInput = z.infer<typeof sliderSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type FooterInput = z.infer<typeof footerSchema>;

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
