export type User = {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    nid?: string;
    photo?: string;
    bio?: string;
    role?: 'user' | 'admin';
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export type Booking = {
    id: string;
    serviceId: string;
    serviceName: string;
    date: string;
    duration: string; // e.g. "2 Days"
    location: string;
    totalCost: number;
    status: BookingStatus;
    userEmail: string;
    createdAt: string;
}

// Simple browser-only storage helper
const STORAGE_KEY_USER = 'care_user';
const STORAGE_KEY_BOOKINGS = 'care_bookings';

export const mockStore = {
    login: (email: string, name: string = "Demo User") => {
        if (typeof window === 'undefined') return;
        const user: User = {
            email,
            name,
            phone: "+880 1712 345678",
            address: "123 Care Street, Dhaka",
            nid: "1234567890",
            photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            bio: "I am a regular customer looking for elderly care services."
        };
        // Check if we have a stored user first
        const stored = localStorage.getItem(STORAGE_KEY_USER);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.email === email) return parsed;
        }

        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
        return user;
    },

    logout: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(STORAGE_KEY_USER);
    },

    getUser: (): User | null => {
        if (typeof window === 'undefined') return null;
        const stored = localStorage.getItem(STORAGE_KEY_USER);
        return stored ? JSON.parse(stored) : null;
    },

    updateUser: (updates: Partial<User>) => {
        if (typeof window === 'undefined') return null;
        const currentUser = mockStore.getUser();
        if (!currentUser) return null;

        const updatedUser = { ...currentUser, ...updates };
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
        return updatedUser;
    },

    createBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
        if (typeof window === 'undefined') return;
        const newBooking: Booking = {
            ...booking,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            status: 'Pending'
        };

        const bookings = mockStore.getBookings();
        bookings.push(newBooking);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
        return newBooking;
    },

    getBookings: (userEmail?: string): Booking[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY_BOOKINGS);
        const allBookings: Booking[] = stored ? JSON.parse(stored) : [];

        if (userEmail) {
            return allBookings.filter(b => b.userEmail === userEmail);
        }
        return allBookings;
    },

    cancelBooking: (bookingId: string) => {
        if (typeof window === 'undefined') return;
        const bookings = mockStore.getBookings();
        const updatedBookings = bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'Cancelled' as BookingStatus } : b
        );
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updatedBookings));
    }
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
