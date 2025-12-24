"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    User as UserIcon,
    Calendar,
    CreditCard,
    MapPin,
    Settings,
    LogOut,
    Menu,
    X,
    Plus,
    Bell,
    Shield,
    Camera,
    ChevronRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockStore, Booking, User } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

// --- Types ---
type TabId = 'overview' | 'profile' | 'bookings' | 'payments' | 'address' | 'settings';

// --- Components ---

// 1. Overview Section
const OverviewSection = ({ user, bookings, onViewAllBookings }: { user: User, bookings: Booking[], onViewAllBookings: () => void }) => {
    const pendingCount = bookings.filter(b => b.status === "Pending").length;
    const activeCount = bookings.filter(b => b.status === "Confirmed").length;
    const completedCount = bookings.filter(b => b.status === "Completed").length;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{pendingCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{activeCount}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completed</p>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{completedCount}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h2>
                    <Button variant="ghost" className="text-teal-600 hover:text-teal-700 dark:text-teal-400" onClick={onViewAllBookings}>
                        View All
                    </Button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {bookings.length > 0 ? (
                        bookings.slice(0, 3).map((booking) => (
                            <div key={booking.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-white">{booking.serviceName}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            {new Date(booking.date).toLocaleDateString()} • {booking.duration}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' :
                                        booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' :
                                            booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' :
                                                'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-slate-500">No recent activity</div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 2. Profile Section
const ProfileSection = ({ user, onUpdate }: { user: User, onUpdate: (data: Partial<User>) => void }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || '',
        address: user.address || '',
        nid: user.nid || '',
        bio: user.bio || ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 border-4 border-white dark:border-slate-800 shadow-lg relative group">
                            <img
                                src={user.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Personal Information</h2>
                            <Button
                                variant={isEditing ? "ghost" : "outline"}
                                onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-slate-600 dark:text-slate-400 font-semibold">Full Name</Label>
                                    <Input
                                        value={formData.name}
                                        disabled={!isEditing}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-slate-600 dark:text-slate-400 font-semibold">Email</Label>
                                    <Input
                                        value={user.email}
                                        disabled
                                        className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-slate-600 dark:text-slate-400 font-semibold">Phone Number</Label>
                                    <Input
                                        value={formData.phone}
                                        disabled={!isEditing}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+880..."
                                        className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-slate-600 dark:text-slate-400 font-semibold">NID Number</Label>
                                    <Input
                                        value={formData.nid}
                                        disabled={!isEditing}
                                        onChange={(e) => setFormData({ ...formData, nid: e.target.value })}
                                        placeholder="Enter National ID"
                                        className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-600 dark:text-slate-400 font-semibold">Address</Label>
                                <Input
                                    value={formData.address}
                                    disabled={!isEditing}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Your full address"
                                    className="h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-slate-600 dark:text-slate-400 font-semibold">Bio</Label>
                                <Textarea
                                    value={formData.bio}
                                    disabled={!isEditing}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell us a bit about yourself..."
                                    className="min-h-[120px] rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
                                />
                            </div>

                            {isEditing && (
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Bookings Section
const BookingsSection = ({ bookings, onCancel }: { bookings: Booking[], onCancel: (id: string) => void }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Booking History</h2>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.id} className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{booking.serviceName}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium border ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200 dark:text-green-400 dark:border-green-800 dark:bg-green-900/30' :
                                                booking.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:text-amber-400 dark:border-amber-800 dark:bg-amber-900/30' :
                                                    booking.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 dark:text-red-400 dark:border-red-800 dark:bg-red-900/30' :
                                                        'bg-slate-50 text-slate-700 border-slate-200 dark:text-slate-400 dark:border-slate-700 dark:bg-slate-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> {new Date(booking.date).toLocaleDateString()}
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                                            {booking.duration}
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                            📍 {booking.location || "Location not specified"}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right mr-4">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Cost</p>
                                            <p className="text-lg font-bold text-teal-600 dark:text-teal-400">৳{booking.totalCost}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {booking.status === 'Pending' && (
                                                <Button variant="destructive" size="sm" onClick={() => onCancel(booking.id)}>
                                                    Cancel
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/orders/${booking.id}`}>Details</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-800 dark:text-white">No bookings yet</h3>
                            <Button asChild className="mt-4" variant="outline">
                                <Link href="/#services">Book a Service</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. Payments Section (Mock)
const PaymentsSection = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Payment Methods</h2>
            <Button className="gap-2 bg-teal-600 text-white hover:bg-teal-700">
                <Plus className="w-4 h-4" /> Add New Card
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <CreditCard className="w-8 h-8 opacity-80" />
                        <span className="font-mono text-lg opacity-80">VISA</span>
                    </div>
                    <div className="space-y-1 mb-6">
                        <p className="text-xs opacity-60 uppercase tracking-wider">Card Number</p>
                        <p className="font-mono text-xl tracking-widest">**** **** **** 4242</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs opacity-60 uppercase tracking-wider">Card Holder</p>
                            <p className="font-medium tracking-wide">OMAR FARUK</p>
                        </div>
                        <div>
                            <p className="text-xs opacity-60 uppercase tracking-wider">Expires</p>
                            <p className="font-mono font-medium">12/28</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer min-h-[220px]">
                <Plus className="w-8 h-8 mb-2" />
                <span className="font-medium">Add Payment Method</span>
            </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 flex gap-3 text-yellow-800 dark:text-yellow-200">
            <Shield className="w-5 h-5 shrink-0" />
            <p className="text-sm">Your payment information is securely encrypted and stored. We never share your details with third parties.</p>
        </div>
    </div>
);

// 5. Address Section (Mock)
const AddressSection = ({ user }: { user: User }) => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Saved Addresses</h2>
            <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" /> Add Address
            </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl shadow-sm border border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10 relative">
                <div className="absolute top-4 right-4">
                    <span className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 text-xs font-bold px-2 py-1 rounded">DEFAULT</span>
                </div>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm text-teal-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">Home</h3>
                        <p className="text-slate-600 dark:text-slate-300">{user.address || "123 Care Street, Dhaka, Bangladesh"}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{user.phone}</p>
                        <div className="flex gap-3 mt-4">
                            <Button variant="link" className="p-0 h-auto text-teal-600 font-semibold">Edit</Button>
                            <Button variant="link" className="p-0 h-auto text-red-500 font-semibold" disabled>Delete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// 6. Settings Section
const SettingsSection = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Account Settings</h2>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">Notifications</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your email and sms notifications</p>
                    </div>
                </div>
                <Button variant="outline">Manage</Button>
            </div>

            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        <Shield className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white">Privacy & Security</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Change password and security questions</p>
                    </div>
                </div>
                <Button variant="outline">Update</Button>
            </div>

            <div className="p-6 flex items-center justify-between bg-red-50/50 dark:bg-red-900/10">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-600 dark:text-red-400">Danger Zone</h3>
                        <p className="text-sm text-red-500/80 dark:text-red-400/80">Delete account or disable details</p>
                    </div>
                </div>
                <Button variant="destructive">Delete Account</Button>
            </div>
        </div>
    </div>
);


// --- Main Page Component ---

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = mockStore.getUser();
        if (!currentUser) {
            router.push("/login?redirect=/dashboard");
            return;
        }
        setUser(currentUser);
        refreshBookings(currentUser.email);
        setLoading(false);
    }, [router]);

    const refreshBookings = (email: string) => {
        const userBookings = mockStore.getBookings(email);
        setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    };

    const handleUpdateProfile = (data: Partial<User>) => {
        const updated = mockStore.updateUser(data);
        if (updated) {
            setUser(updated);
            // Show toast or success message here
        }
    };

    const handleCancelBooking = (id: string) => {
        setCancelBookingId(id);
    };

    const confirmCancelBooking = () => {
        if (cancelBookingId) {
            mockStore.cancelBooking(cancelBookingId);
            if (user) refreshBookings(user.email);
            setCancelBookingId(null);
        }
    };

    if (loading) return null; // Or a spinner

    const MENU_ITEMS: { id: TabId; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'bookings', label: 'My Bookings', icon: Calendar },
        { id: 'profile', label: 'Profile Settings', icon: UserIcon },
        { id: 'payments', label: 'Payment Methods', icon: CreditCard },
        { id: 'address', label: 'Addresses', icon: MapPin },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden mb-4">
                        <Button variant="outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="w-full justify-between">
                            <span className="flex items-center gap-2">
                                <Menu className="w-4 h-4" /> Menu
                            </span>
                            <span className="text-slate-500">{MENU_ITEMS.find(i => i.id === activeTab)?.label}</span>
                        </Button>
                    </div>

                    {/* Sidebar */}
                    <aside className={cn(
                        "lg:w-64 shrink-0 transition-all duration-300 ease-in-out",
                        isMobileMenuOpen ? "block" : "hidden lg:block"
                    )}>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden sticky top-24">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-teal-50/50 dark:bg-teal-900/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-800 flex items-center justify-center text-teal-700 dark:text-teal-200 font-bold text-lg">
                                        {user?.name.charAt(0)}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-bold text-slate-800 dark:text-white truncate">{user?.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                                    </div>
                                </div>
                            </div>
                            <nav className="p-2 space-y-1">
                                {MENU_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                            activeTab === item.id
                                                ? "bg-teal-600 text-white shadow-md shadow-teal-500/20"
                                                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400")} />
                                        {item.label}
                                    </button>
                                ))}
                                <div className="h-px bg-slate-100 dark:bg-slate-700 my-2 mx-4" />
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'overview' && <OverviewSection user={user!} bookings={bookings} onViewAllBookings={() => setActiveTab('bookings')} />}
                                {activeTab === 'profile' && <ProfileSection user={user!} onUpdate={handleUpdateProfile} />}
                                {activeTab === 'bookings' && <BookingsSection bookings={bookings} onCancel={handleCancelBooking} />}
                                {activeTab === 'payments' && <PaymentsSection />}
                                {activeTab === 'address' && <AddressSection user={user!} />}
                                {activeTab === 'settings' && <SettingsSection />}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Cancel Booking Confirmation Dialog */}
            <ConfirmDialog
                isOpen={!!cancelBookingId}
                onClose={() => setCancelBookingId(null)}
                onConfirm={confirmCancelBooking}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone and you may need to rebook if you change your mind."
                confirmText="Yes, Cancel Booking"
                cancelText="Keep Booking"
                variant="warning"
            />
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
