import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy
} from "firebase/firestore";
import { Service, Booking, SliderContent, AboutContent, FooterContent, Testimonial, UserProfile } from "@/types";

export const DbService = {
    // Services
    getServices: async (): Promise<Service[]> => {
        const snapshot = await getDocs(collection(db, "services"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    },

    getServiceById: async (id: string): Promise<Service | null> => {
        const docRef = doc(db, "services", id);
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as Service) : null;
    },

    // Bookings (Orders)
    createBooking: async (booking: Omit<Booking, "id">): Promise<string> => {
        const docRef = await addDoc(collection(db, "bookings"), booking);
        return docRef.id;
    },

    getUserBookings: async (userId: string): Promise<Booking[]> => {
        const q = query(
            collection(db, "bookings"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    },

    getAllBookings: async (): Promise<Booking[]> => { // Admin only
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
    },

    updateBookingStatus: async (id: string, status: Booking["status"]): Promise<void> => {
        const docRef = doc(db, "bookings", id);
        await updateDoc(docRef, { status });
    },

    // Content Management
    getSliders: async (): Promise<SliderContent[]> => {
        const docRef = doc(db, "content", "sliders");
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data().items as SliderContent[]) : [];
    },

    getAboutContent: async (): Promise<AboutContent | null> => {
        const docRef = doc(db, "content", "about");
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data() as AboutContent) : null;
    },

    getFooterContent: async (): Promise<FooterContent | null> => {
        const docRef = doc(db, "content", "footer");
        const snapshot = await getDoc(docRef);
        return snapshot.exists() ? (snapshot.data() as FooterContent) : null;
    },

    getTestimonials: async (): Promise<Testimonial[]> => {
        const snapshot = await getDocs(collection(db, "testimonials"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
    },

    // Users
    getAllUsers: async (): Promise<UserProfile[]> => {
        const snapshot = await getDocs(collection(db, "users"));
        return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
    }
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
