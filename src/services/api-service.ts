import { Booking, SliderContent, AboutContent, FooterContent, Testimonial } from "@/types";
import { AdminUser, ServiceItem } from "@/lib/admin-data";
import { auth } from "@/lib/firebase";

// Helper for getting Firebase ID token
async function getAuthToken(): Promise<string | null> {
    try {
        const user = auth.currentUser;
        if (!user) return null;
        return await user.getIdToken();
    } catch (error) {
        console.error("Failed to get auth token:", error);
        return null;
    }
}

// Helper for making API requests with authentication
async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
    const token = await getAuthToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
    };

    // Add auth header if token is available
    if (token) {
        (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API call failed: ${response.statusText}`);
    }

    return response.json();
}

export const ApiService = {
    // Services
    getServices: () => fetchApi<ServiceItem[]>("/api/admin/services"),
    addService: (service: ServiceItem) =>
        fetchApi<void>("/api/admin/services", {
            method: "POST",
            body: JSON.stringify(service),
        }),
    updateService: (service: ServiceItem) =>
        fetchApi<void>("/api/admin/services", {
            method: "PUT",
            body: JSON.stringify(service),
        }),
    deleteService: (id: string) =>
        fetchApi<void>(`/api/admin/services?id=${id}`, {
            method: "DELETE",
        }),

    // Users
    getUsers: () => fetchApi<AdminUser[]>("/api/admin/users"),
    updateUser: (user: Partial<AdminUser> & { id: string }) =>
        fetchApi<void>("/api/admin/users", {
            method: "PUT",
            body: JSON.stringify(user),
        }),
    deleteUser: (id: string) =>
        fetchApi<void>(`/api/admin/users?id=${id}`, {
            method: "DELETE",
        }),

    // Orders
    getAllBookings: () => fetchApi<Booking[]>("/api/admin/orders"),
    updateBookingStatus: (id: string, status: string) =>
        fetchApi<void>("/api/admin/orders", {
            method: "PUT",
            body: JSON.stringify({ id, status }),
        }),

    // Content - Sliders
    getSliders: () => fetchApi<SliderContent[]>("/api/admin/content/sliders"),
    saveSliders: (sliders: SliderContent[]) =>
        fetchApi<void>("/api/admin/content/sliders", {
            method: "POST",
            body: JSON.stringify(sliders),
        }),

    // Content - About
    getAbout: () => fetchApi<AboutContent>("/api/admin/content/about"),
    saveAbout: (about: AboutContent) =>
        fetchApi<void>("/api/admin/content/about", {
            method: "POST",
            body: JSON.stringify(about),
        }),

    // Content - Footer
    getFooter: () => fetchApi<FooterContent>("/api/admin/content/footer"),
    saveFooter: (footer: FooterContent) =>
        fetchApi<void>("/api/admin/content/footer", {
            method: "POST",
            body: JSON.stringify(footer),
        }),

    // Content - Testimonials
    getTestimonials: () => fetchApi<Testimonial[]>("/api/admin/testimonials"),
    saveTestimonials: (testimonials: Testimonial[]) => // Legacy bulk save if needed, or singular
        fetchApi<void>("/api/admin/testimonials/bulk", { // If we want to save all at once like mock
            method: "POST",
            body: JSON.stringify(testimonials),
        }),
    // For individual operations if we switch to that pattern
    addTestimonial: (testimonial: Testimonial) =>
        fetchApi<void>("/api/admin/testimonials", {
            method: "POST",
            body: JSON.stringify(testimonial),
        }),
    updateTestimonial: (testimonial: Testimonial) =>
        fetchApi<void>("/api/admin/testimonials", {
            method: "PUT",
            body: JSON.stringify(testimonial),
        }),
    deleteTestimonial: (id: string) =>
        fetchApi<void>(`/api/admin/testimonials?id=${id}`, {
            method: "DELETE",
        }),
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
