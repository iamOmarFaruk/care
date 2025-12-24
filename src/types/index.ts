export type UserRole = "super_admin" | "admin" | "user";

export interface UserProfile {
    uid: string;
    email: string;
    role: UserRole;
    fullName?: string;
    contactNumber?: string;
    nid?: string;
    photoURL?: string;
    address?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    pricePerHr: number;
    image: string;
    icon?: string; // Storing icon name for now, or URL
    features: string[];
    isActive: boolean;
}

export type OrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface Booking {
    id: string;
    userId: string;
    serviceId: string;
    serviceName: string; // Snapshot
    date: string; // ISO date string or separate date/time
    time: string;
    duration: string;
    location: string;
    totalCost: number;
    status: OrderStatus;
    notes?: string;
    createdAt: string;
    // Enriched fields (added by admin APIs)
    userName?: string;
    userEmail?: string;
}

export interface SliderContent {
    id: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    order: number;
}

export interface AboutContent {
    title: string;
    description: string;
    image: string;
    features: string[];
    // Extended fields for admin panel
    subtitle?: string;
    stats?: { value: string; label: string }[];
    images?: string[];
}

export interface FooterContent {
    copyright: string;
    socialLinks: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    navLinks: { label: string; href: string }[];
    // Extended fields for admin panel
    description?: string;
    address?: string;
    email?: string;
    phone?: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    avatar: string;
    isVisible: boolean;
    rating?: number;
}

export interface ActivityLog {
    id: string;
    userId: string;
    userName: string;
    action: string;
    details: string;
    timestamp: string; // ISO
    type: 'order' | 'user' | 'system';
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
