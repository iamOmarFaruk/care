import { Baby, HeartHandshake, Stethoscope } from "lucide-react";

export const SERVICES = [
    {
        id: "baby-care",
        title: "Child Care & Babysitting",
        description: "Reliable and loving nannies to take care of your children while you are away. We ensure safety and engagement.",
        icon: Baby,
        pricePerHr: 500,
        image: "https://images.unsplash.com/photo-1595231712421-933df5771f28?q=80&w=2670&auto=format&fit=crop",
        features: [
            "Certified Nannies",
            "Educational Activities",
            "Meal Preparation",
            "Bedtime Routine"
        ]
    },
    {
        id: "elderly-care",
        title: "Elderly Care Companion",
        description: "Compassionate caregivers to assist your elderly parents with daily activities, medication, and companionship.",
        icon: HeartHandshake,
        pricePerHr: 600,
        image: "https://images.unsplash.com/photo-1573107145544-71281bcfa612?q=80&w=2668&auto=format&fit=crop",
        features: [
            "Medication Reminders",
            "Mobility Assistance",
            "Personal Hygiene",
            "Doctor Visits"
        ]
    },
    {
        id: "special-care",
        title: "Special Needs Support",
        description: "Professional care for individuals with special needs, ensuring comfort, dignity, and proper medical attention.",
        icon: Stethoscope,
        pricePerHr: 700,
        image: "https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?q=80&w=2670&auto=format&fit=crop",
        features: [
            "Specialized Training",
            "Therapy Support",
            "24/7 Monitoring",
            "Emergency Handling"
        ]
    }
];

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Rahim Uddin",
        role: "Father of 2",
        content: "Care.xyz has been a lifesaver for us. We found an amazing nanny for our twins within 24 hours. Highly professional!",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop" // South asian looking male
    },
    {
        id: 2,
        name: "Fatima Begum",
        role: "Daughter",
        content: "I was worried about leaving my mother alone at home. The caregiver from Care.xyz is like a family member now. Very trusted.",
        avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=2574&auto=format&fit=crop" // South asian looking female
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "Business Owner",
        content: "Professional service and transparent pricing. I booked specialized care for my brother, and the experience was seamless.",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2574&auto=format&fit=crop"
    }
];

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-23
 * └─ care ───┘
 */
