"use client";

import { SERVICES, TESTIMONIALS } from "./mock-data";

// Types
export type AdminUser = {
    id: string;
    username: string;
    email: string;
    role: "super_admin" | "admin" | "user";
    name: string;
    avatar?: string;
    status: "active" | "disabled";
    createdAt: string;
};

export type SliderContent = {
    id: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    order: number;
};

export type AboutContent = {
    title: string;
    description: string;
    image: string;
    features: string[];
};

export type ServiceItem = {
    id: string;
    title: string;
    description: string;
    icon: string;
    pricePerHr: number;
    image: string;
    features: string[];
    isActive: boolean;
};

export type TestimonialItem = {
    id: number;
    name: string;
    role: string;
    content: string;
    avatar: string;
    isVisible: boolean;
};

export type FooterContent = {
    copyright: string;
    socialLinks: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    navLinks: { label: string; href: string }[];
};

export type OrderItem = {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    duration: string;
    location: string;
    totalCost: number;
    status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
    notes?: string;
    createdAt: string;
};

// Initial Mock Data
export const INITIAL_ADMIN_DATA = {
    sliders: [
        {
            id: "slider-1",
            title: "Professional Child Care Services",
            subtitle: "Trusted nannies and babysitters for your little ones",
            ctaText: "Book Now",
            ctaLink: "/services/baby-care",
            backgroundImage:
                "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=2670&auto=format&fit=crop",
            order: 1,
        },
        {
            id: "slider-2",
            title: "Compassionate Elderly Care",
            subtitle: "Dedicated companions for your loved ones",
            ctaText: "Learn More",
            ctaLink: "/services/elderly-care",
            backgroundImage:
                "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2670&auto=format&fit=crop",
            order: 2,
        },
        {
            id: "slider-3",
            title: "Special Needs Support",
            subtitle: "Professional care with dignity and respect",
            ctaText: "Get Started",
            ctaLink: "/services/special-care",
            backgroundImage:
                "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2670&auto=format&fit=crop",
            order: 3,
        },
    ] as SliderContent[],

    about: {
        title: "Trusted Care for Your Family",
        description:
            "At Care.xyz, our mission is to make caregiving easy, secure, and accessible for everyone. We understand the challenges of finding reliable help for your loved ones. Whether you need a nanny for your children, a companion for your elderly parents, or specialized support for sick family members, we connect you with verified and compassionate professionals.",
        image:
            "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2670&auto=format&fit=crop",
        features: [
            "Verified Caregivers",
            "24/7 Support",
            "Flexible Scheduling",
            "Affordable Rates",
        ],
    } as AboutContent,

    services: SERVICES.map((s, i) => ({
        ...s,
        icon: s.id,
        isActive: true,
    })) as ServiceItem[],

    testimonials: TESTIMONIALS.map((t) => ({
        ...t,
        isVisible: true,
    })) as TestimonialItem[],

    footer: {
        copyright: "© 2024 Care.xyz. All rights reserved.",
        socialLinks: {
            facebook: "https://facebook.com/carexyz",
            instagram: "https://instagram.com/carexyz",
            twitter: "https://twitter.com/carexyz",
            linkedin: "https://linkedin.com/company/carexyz",
        },
        navLinks: [
            { label: "About Us", href: "/#about" },
            { label: "Services", href: "/#services" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
        ],
    } as FooterContent,

    users: [
        {
            id: "user-1",
            username: "admin",
            email: "admin@care.xyz",
            role: "super_admin",
            name: "Super Admin",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-01-01T00:00:00Z",
        },
        {
            id: "user-2",
            username: "john_doe",
            email: "john@example.com",
            role: "user",
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-06-15T10:30:00Z",
        },
        {
            id: "user-3",
            username: "sarah_khan",
            email: "sarah@example.com",
            role: "user",
            name: "Sarah Khan",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-07-20T14:00:00Z",
        },
        {
            id: "user-4",
            username: "demo_user",
            email: "demo@example.com",
            role: "user",
            name: "Demo User",
            status: "disabled",
            createdAt: "2024-08-10T09:15:00Z",
        },
    ] as AdminUser[],

    orders: [
        {
            id: "order-1",
            userId: "user-2",
            userName: "John Doe",
            userEmail: "john@example.com",
            serviceId: "baby-care",
            serviceName: "Child Care & Babysitting",
            date: "2024-12-25",
            time: "09:00",
            duration: "4 hours",
            location: "Dhaka, Bangladesh",
            totalCost: 2000,
            status: "pending",
            notes: "Need someone experienced with toddlers",
            createdAt: "2024-12-23T15:30:00Z",
        },
        {
            id: "order-2",
            userId: "user-3",
            userName: "Sarah Khan",
            userEmail: "sarah@example.com",
            serviceId: "elderly-care",
            serviceName: "Elderly Care Companion",
            date: "2024-12-26",
            time: "10:00",
            duration: "8 hours",
            location: "Chittagong, Bangladesh",
            totalCost: 4800,
            status: "confirmed",
            createdAt: "2024-12-22T11:00:00Z",
        },
        {
            id: "order-3",
            userId: "user-2",
            userName: "John Doe",
            userEmail: "john@example.com",
            serviceId: "special-care",
            serviceName: "Special Needs Support",
            date: "2024-12-20",
            time: "14:00",
            duration: "6 hours",
            location: "Dhaka, Bangladesh",
            totalCost: 4200,
            status: "completed",
            createdAt: "2024-12-18T08:45:00Z",
        },
        {
            id: "order-4",
            userId: "user-3",
            userName: "Sarah Khan",
            userEmail: "sarah@example.com",
            serviceId: "baby-care",
            serviceName: "Child Care & Babysitting",
            date: "2024-12-15",
            time: "18:00",
            duration: "3 hours",
            location: "Sylhet, Bangladesh",
            totalCost: 1500,
            status: "completed",
            createdAt: "2024-12-14T16:20:00Z",
        },
        {
            id: "order-5",
            userId: "user-4",
            userName: "Demo User",
            userEmail: "demo@example.com",
            serviceId: "elderly-care",
            serviceName: "Elderly Care Companion",
            date: "2024-12-28",
            time: "08:00",
            duration: "12 hours",
            location: "Rajshahi, Bangladesh",
            totalCost: 7200,
            status: "pending",
            createdAt: "2024-12-23T20:00:00Z",
        },
    ] as OrderItem[],
};

// Storage keys
const ADMIN_STORAGE_KEYS = {
    isAdmin: "care_admin_session",
    sliders: "care_admin_sliders",
    about: "care_admin_about",
    services: "care_admin_services",
    testimonials: "care_admin_testimonials",
    footer: "care_admin_footer",
    users: "care_admin_users",
    orders: "care_admin_orders",
};

// Helper to get or initialize data
function getStoredData<T>(key: string, defaultData: T): T {
    if (typeof window === "undefined") return defaultData;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
}

function setStoredData<T>(key: string, data: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
}

// Admin Store
export const adminStore = {
    // Auth
    adminLogin: (username: string, password: string): AdminUser | null => {
        if (username === "admin" && password === "admin") {
            const adminUser = INITIAL_ADMIN_DATA.users.find(
                (u) => u.username === "admin"
            );
            if (adminUser) {
                setStoredData(ADMIN_STORAGE_KEYS.isAdmin, adminUser);
                return adminUser;
            }
        }
        return null;
    },

    adminLogout: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(ADMIN_STORAGE_KEYS.isAdmin);
    },

    getAdminSession: (): AdminUser | null => {
        return getStoredData<AdminUser | null>(ADMIN_STORAGE_KEYS.isAdmin, null);
    },

    isAdmin: (): boolean => {
        const session = adminStore.getAdminSession();
        return session !== null && (session.role === "super_admin" || session.role === "admin");
    },

    // Sliders
    getSliders: (): SliderContent[] => {
        return getStoredData(ADMIN_STORAGE_KEYS.sliders, INITIAL_ADMIN_DATA.sliders);
    },
    saveSliders: (sliders: SliderContent[]) => {
        setStoredData(ADMIN_STORAGE_KEYS.sliders, sliders);
    },

    // About
    getAbout: (): AboutContent => {
        return getStoredData(ADMIN_STORAGE_KEYS.about, INITIAL_ADMIN_DATA.about);
    },
    saveAbout: (about: AboutContent) => {
        setStoredData(ADMIN_STORAGE_KEYS.about, about);
    },

    // Services
    getServices: (): ServiceItem[] => {
        return getStoredData(ADMIN_STORAGE_KEYS.services, INITIAL_ADMIN_DATA.services);
    },
    saveServices: (services: ServiceItem[]) => {
        setStoredData(ADMIN_STORAGE_KEYS.services, services);
    },

    // Testimonials
    getTestimonials: (): TestimonialItem[] => {
        return getStoredData(
            ADMIN_STORAGE_KEYS.testimonials,
            INITIAL_ADMIN_DATA.testimonials
        );
    },
    saveTestimonials: (testimonials: TestimonialItem[]) => {
        setStoredData(ADMIN_STORAGE_KEYS.testimonials, testimonials);
    },

    // Footer
    getFooter: (): FooterContent => {
        return getStoredData(ADMIN_STORAGE_KEYS.footer, INITIAL_ADMIN_DATA.footer);
    },
    saveFooter: (footer: FooterContent) => {
        setStoredData(ADMIN_STORAGE_KEYS.footer, footer);
    },

    // Users
    getUsers: (): AdminUser[] => {
        return getStoredData(ADMIN_STORAGE_KEYS.users, INITIAL_ADMIN_DATA.users);
    },
    saveUsers: (users: AdminUser[]) => {
        setStoredData(ADMIN_STORAGE_KEYS.users, users);
    },

    // Orders
    getOrders: (): OrderItem[] => {
        return getStoredData(ADMIN_STORAGE_KEYS.orders, INITIAL_ADMIN_DATA.orders);
    },
    saveOrders: (orders: OrderItem[]) => {
        setStoredData(ADMIN_STORAGE_KEYS.orders, orders);
    },
    updateOrderStatus: (orderId: string, status: OrderItem["status"]) => {
        const orders = adminStore.getOrders();
        const updated = orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
        );
        adminStore.saveOrders(updated);
        return updated;
    },
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2024-12-24
 * │ Updated: 2024-12-24
 * └─ care ───┘
 */
