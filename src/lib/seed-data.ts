// This file contains data ONLY for the server-side seeding script.
// It avoids importing React components or client-side code.

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

// Seed Data
export const SEED_DATA = {
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

    services: [
        {
            id: "baby-care",
            title: "Child Care & Babysitting",
            description: "Reliable and loving nannies to take care of your children while you are away. We ensure safety and engagement.",
            icon: "baby-care",
            pricePerHr: 500,
            image: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=2670&auto=format&fit=crop",
            features: [
                "Certified Nannies",
                "Educational Activities",
                "Meal Preparation",
                "Bedtime Routine"
            ],
            isActive: true,
        },
        {
            id: "elderly-care",
            title: "Elderly Care Companion",
            description: "Compassionate caregivers to assist your elderly parents with daily activities, medication, and companionship.",
            icon: "elderly-care",
            pricePerHr: 600,
            image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2670&auto=format&fit=crop",
            features: [
                "Medication Reminders",
                "Mobility Assistance",
                "Personal Hygiene",
                "Doctor Visits"
            ],
            isActive: true,
        },
        {
            id: "special-care",
            title: "Special Needs Support",
            description: "Professional care for individuals with special needs, ensuring comfort, dignity, and proper medical attention.",
            icon: "special-care",
            pricePerHr: 700,
            image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2670&auto=format&fit=crop",
            features: [
                "Specialized Training",
                "Therapy Support",
                "24/7 Monitoring",
                "Emergency Handling"
            ],
            isActive: true,
        }
    ] as ServiceItem[],

    testimonials: [
        { id: 1, name: "Rahim Uddin", role: "Father of 2", content: "Care.xyz has been a lifesaver for us. We found an amazing nanny for our twins within 24 hours. Highly professional!", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop", isVisible: true },
        { id: 2, name: "Fatima Begum", role: "Daughter", content: "I was worried about leaving my mother alone at home. The caregiver from Care.xyz is like a family member now. Very trusted.", avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2574&auto=format&fit=crop", isVisible: true },
        { id: 3, name: "Tanvir Ahmed", role: "Business Owner", content: "Professional service and transparent pricing. I booked specialized care for my brother, and the experience was seamless.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop", isVisible: true },
        { id: 4, name: "Ayesha Khan", role: "Mother of 3", content: "Finding a reliable nanny was stressful until Care.xyz matched us with someone caring and punctual. Our kids love her!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2600&auto=format&fit=crop", isVisible: true },
        { id: 5, name: "Mohammad Ali", role: "Son", content: "My dad needed daily assistance. The caregiver is compassionate and always on time. Peace of mind for our family.", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2600&auto=format&fit=crop", isVisible: true },
    ] as TestimonialItem[],

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
        // 2 Admins
        {
            id: "admin-1",
            username: "admin",
            email: "admin@care.xyz",
            role: "super_admin",
            name: "Super Admin",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-01-01T00:00:00Z",
        },
        {
            id: "admin-2",
            username: "manager",
            email: "manager@care.xyz",
            role: "admin",
            name: "Operations Manager",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-02-01T00:00:00Z",
        },
        // 5 Users
        {
            id: "user-1",
            username: "alice_w",
            email: "user1@care.xyz",
            role: "user",
            name: "Alice Williams",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-06-15T10:30:00Z",
        },
        {
            id: "user-2",
            username: "bob_smith",
            email: "user2@care.xyz",
            role: "user",
            name: "Bob Smith",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-07-20T14:00:00Z",
        },
        {
            id: "user-3",
            username: "carol_d",
            email: "user3@care.xyz",
            role: "user",
            name: "Carol Davis",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-08-10T09:15:00Z",
        },
        {
            id: "user-4",
            username: "david_m",
            email: "user4@care.xyz",
            role: "user",
            name: "David Miller",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-09-05T11:20:00Z",
        },
        {
            id: "user-5",
            username: "eva_g",
            email: "user5@care.xyz",
            role: "user",
            name: "Eva Green",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            status: "active",
            createdAt: "2024-10-12T16:45:00Z",
        },
    ] as AdminUser[],

    orders: [
        {
            id: "order-1",
            userId: "user-1",
            userName: "Alice Williams",
            userEmail: "user1@care.xyz",
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
            userId: "user-2",
            userName: "Bob Smith",
            userEmail: "user2@care.xyz",
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
            userId: "user-3",
            userName: "Carol Davis",
            userEmail: "user3@care.xyz",
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
            userId: "user-1",
            userName: "Alice Williams",
            userEmail: "user1@care.xyz",
            serviceId: "baby-care",
            serviceName: "Child Care & Babysitting",
            date: "2024-12-15",
            time: "09:00",
            duration: "3 hours",
            location: "Sylhet, Bangladesh",
            totalCost: 1500,
            status: "completed",
            createdAt: "2024-12-14T16:20:00Z",
        },
        {
            id: "order-5",
            userId: "user-4",
            userName: "David Miller",
            userEmail: "user4@care.xyz",
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
        {
            id: "order-6",
            userId: "user-5",
            userName: "Eva Green",
            userEmail: "user5@care.xyz",
            serviceId: "baby-care",
            serviceName: "Child Care & Babysitting",
            date: "2025-01-05",
            time: "10:00",
            duration: "5 hours",
            location: "Khulna, Bangladesh",
            totalCost: 2500,
            status: "cancelled",
            createdAt: "2024-12-20T12:00:00Z",
        },
    ] as OrderItem[],
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
