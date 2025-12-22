export type User = {
    name: string;
    email: string;
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
    createdAt: string;
}

// Simple browser-only storage helper
const STORAGE_KEY_USER = 'care_user';
const STORAGE_KEY_BOOKINGS = 'care_bookings';

export const mockStore = {
    login: (email: string, name: string = "Demo User") => {
        if (typeof window === 'undefined') return;
        const user: User = { email, name };
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

    getBookings: (): Booking[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY_BOOKINGS);
        return stored ? JSON.parse(stored) : [];
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
