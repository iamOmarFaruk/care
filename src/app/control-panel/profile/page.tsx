"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { adminStore, AdminUser } from "@/lib/admin-data";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Mail,
    Shield,
    Calendar,
    Camera,
    Save,
    X,
    CheckCircle,
    Loader2,
} from "lucide-react";

export default function AdminProfilePage() {
    const [user, setUser] = React.useState<AdminUser | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        avatar: "",
    });

    React.useEffect(() => {
        const currentUser = adminStore.getAdminSession();
        if (currentUser) {
            setUser(currentUser);
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                avatar: currentUser.avatar || "",
            });
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update user in store (mock update)
        if (user) {
            const updatedUser = {
                ...user,
                name: formData.name,
                email: formData.email,
                avatar: formData.avatar,
            };
            setUser(updatedUser);
        }

        setIsSaving(false);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                avatar: user.avatar || "",
            });
        }
        setIsEditing(false);
    };

    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case "super_admin":
                return "bg-amber-500 text-white";
            case "admin":
                return "bg-gradient-to-r from-teal-500 to-emerald-500 text-white";
            default:
                return "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        My Profile
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your personal information and account settings
                    </p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="w-fit">
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2"
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                {/* Profile Header with Gradient */}
                <div className="relative h-32 bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNHYyaC00di0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                </div>

                {/* Avatar Section */}
                <div className="relative px-6 pb-6">
                    <div className="relative -mt-16 mb-4">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white dark:bg-slate-700 border-4 border-white dark:border-slate-800 shadow-lg">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-white">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <button className="absolute bottom-2 right-2 w-10 h-10 rounded-xl bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center shadow-lg transition-colors">
                                <Camera className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                    {user.name}
                                </h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeStyle(
                                        user.role
                                    )}`}
                                >
                                    {user.role.replace("_", " ").toUpperCase()}
                                </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400">@{user.username}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${user.status === "active"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                                    }`}
                            >
                                <CheckCircle className="w-4 h-4" />
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <User className="w-5 h-5 text-teal-500" />
                        Personal Information
                    </h3>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            {isEditing ? (
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                />
                            ) : (
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                    <User className="w-5 h-5 text-slate-400" />
                                    <span className="text-slate-700 dark:text-slate-200">
                                        {user.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            {isEditing ? (
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            ) : (
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <span className="text-slate-700 dark:text-slate-200">
                                        {user.email}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Username</Label>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <span className="text-xs font-medium text-slate-400">@</span>
                                <span className="text-slate-700 dark:text-slate-200">
                                    {user.username}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Account Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-teal-500" />
                        Account Details
                    </h3>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <Shield className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-700 dark:text-slate-200 capitalize">
                                    {user.role.replace("_", " ")}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Account Status</Label>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                                <span className="text-slate-700 dark:text-slate-200 capitalize">
                                    {user.status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Member Since</Label>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <Calendar className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-700 dark:text-slate-200">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Avatar URL (for editing) */}
            {isEditing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Camera className="w-5 h-5 text-teal-500" />
                        Profile Picture
                    </h3>

                    <div className="space-y-2">
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                            placeholder="Enter avatar image URL"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Enter a valid image URL to update your profile picture
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
