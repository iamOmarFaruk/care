"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Settings,
    Bell,
    Shield,
    Palette,
    Globe,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Save,
    Loader2,
    Moon,
    Sun,
    Monitor,
    Check,
} from "lucide-react";

interface SettingsState {
    notifications: {
        emailNotifications: boolean;
        orderUpdates: boolean;
        newUsers: boolean;
        systemAlerts: boolean;
    };
    security: {
        twoFactorAuth: boolean;
        sessionTimeout: string;
    };
    appearance: {
        theme: "light" | "dark" | "system";
        compactMode: boolean;
    };
    general: {
        siteName: string;
        siteEmail: string;
        timezone: string;
    };
}

const initialSettings: SettingsState = {
    notifications: {
        emailNotifications: true,
        orderUpdates: true,
        newUsers: true,
        systemAlerts: true,
    },
    security: {
        twoFactorAuth: false,
        sessionTimeout: "30",
    },
    appearance: {
        theme: "system",
        compactMode: false,
    },
    general: {
        siteName: "Care.xyz",
        siteEmail: "admin@care.xyz",
        timezone: "Asia/Dhaka",
    },
};

export default function AdminSettingsPage() {
    const [settings, setSettings] = React.useState<SettingsState>(initialSettings);
    const [isSaving, setIsSaving] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<
        "general" | "notifications" | "security" | "appearance"
    >("general");

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success("Settings saved successfully!");
    };

    const handleSwitchChange = (
        category: keyof Pick<SettingsState, "notifications" | "security" | "appearance">,
        key: string,
        value: boolean
    ) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value,
            },
        }));
    };

    const handleInputChange = (
        category: keyof SettingsState,
        key: string,
        value: string
    ) => {
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value,
            },
        }));
    };

    const tabs = [
        { id: "general" as const, label: "General", icon: Globe },
        { id: "notifications" as const, label: "Notifications", icon: Bell },
        { id: "security" as const, label: "Security", icon: Shield },
        { id: "appearance" as const, label: "Appearance", icon: Palette },
    ];

    const themeOptions = [
        { value: "light" as const, label: "Light", icon: Sun },
        { value: "dark" as const, label: "Dark", icon: Moon },
        { value: "system" as const, label: "System", icon: Monitor },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                        Settings
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your admin panel preferences and configurations
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-fit flex items-center gap-2"
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4" />
                    )}
                    Save Changes
                </Button>
            </div>

            {/* Settings Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-2 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all cursor-pointer ${activeTab === tab.id
                                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Settings Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-teal-500" />
                                General Settings
                            </h3>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="siteName">Site Name</Label>
                                    <Input
                                        id="siteName"
                                        value={settings.general.siteName}
                                        onChange={(e) =>
                                            handleInputChange("general", "siteName", e.target.value)
                                        }
                                        placeholder="Enter site name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="siteEmail">Admin Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            id="siteEmail"
                                            type="email"
                                            className="pl-10"
                                            value={settings.general.siteEmail}
                                            onChange={(e) =>
                                                handleInputChange("general", "siteEmail", e.target.value)
                                            }
                                            placeholder="Enter admin email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <select
                                        id="timezone"
                                        className="w-full h-11 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 cursor-pointer appearance-none"
                                        value={settings.general.timezone}
                                        onChange={(e) =>
                                            handleInputChange("general", "timezone", e.target.value)
                                        }
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'right 12px center',
                                            backgroundSize: '20px',
                                        }}
                                    >
                                        <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                                        <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                                        <option value="UTC">UTC (GMT+0)</option>
                                        <option value="America/New_York">
                                            America/New_York (GMT-5)
                                        </option>
                                        <option value="Europe/London">Europe/London (GMT+0)</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === "notifications" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-teal-500" />
                                Notification Preferences
                            </h3>

                            <div className="space-y-5">
                                {[
                                    {
                                        key: "emailNotifications",
                                        label: "Email Notifications",
                                        description: "Receive important updates via email",
                                    },
                                    {
                                        key: "orderUpdates",
                                        label: "Order Updates",
                                        description: "Get notified when orders are placed or updated",
                                    },
                                    {
                                        key: "newUsers",
                                        label: "New User Registrations",
                                        description: "Get alerts when new users register",
                                    },
                                    {
                                        key: "systemAlerts",
                                        label: "System Alerts",
                                        description: "Receive system and security alerts",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.key}
                                        className="flex items-center justify-between p-5 bg-white dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-sm"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-700 dark:text-slate-200">
                                                {item.label}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                                {item.description}
                                            </p>
                                        </div>
                                        <Switch
                                            checked={
                                                settings.notifications[
                                                item.key as keyof typeof settings.notifications
                                                ]
                                            }
                                            onCheckedChange={(checked: boolean) =>
                                                handleSwitchChange("notifications", item.key, checked)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Security Settings */}
                    {activeTab === "security" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-teal-500" />
                                    Security Settings
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-sm">
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-700 dark:text-slate-200">
                                                Two-Factor Authentication
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <Switch
                                            checked={settings.security.twoFactorAuth}
                                            onCheckedChange={(checked: boolean) =>
                                                handleSwitchChange("security", "twoFactorAuth", checked)
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="sessionTimeout">
                                            Session Timeout (minutes)
                                        </Label>
                                        <Input
                                            id="sessionTimeout"
                                            type="number"
                                            value={settings.security.sessionTimeout}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "security",
                                                    "sessionTimeout",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter timeout in minutes"
                                        />
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Automatically log out after inactivity period
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Change Password */}
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-teal-500" />
                                    Change Password
                                </h3>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="currentPassword"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter current password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="w-5 h-5" />
                                                ) : (
                                                    <Eye className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input
                                            id="newPassword"
                                            type="password"
                                            placeholder="Enter new password"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm new password"
                                        />
                                    </div>

                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === "appearance" && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-teal-500" />
                                Appearance Settings
                            </h3>

                            <div className="space-y-6">
                                {/* Theme Selection */}
                                <div className="space-y-3">
                                    <Label>Theme</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {themeOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() =>
                                                    setSettings((prev) => ({
                                                        ...prev,
                                                        appearance: {
                                                            ...prev.appearance,
                                                            theme: option.value,
                                                        },
                                                    }))
                                                }
                                                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${settings.appearance.theme === option.value
                                                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30"
                                                    : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                                                    }`}
                                            >
                                                {settings.appearance.theme === option.value && (
                                                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                                                        <Check className="w-3 h-3 text-white" />
                                                    </span>
                                                )}
                                                <option.icon
                                                    className={`w-6 h-6 ${settings.appearance.theme === option.value
                                                        ? "text-teal-500"
                                                        : "text-slate-400"
                                                        }`}
                                                />
                                                <span
                                                    className={`text-sm font-medium ${settings.appearance.theme === option.value
                                                        ? "text-teal-700 dark:text-teal-300"
                                                        : "text-slate-600 dark:text-slate-300"
                                                        }`}
                                                >
                                                    {option.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Compact Mode */}
                                <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 transition-all duration-200 hover:shadow-sm">
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-700 dark:text-slate-200">
                                            Compact Mode
                                        </p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                            Reduce spacing and padding in the dashboard
                                        </p>
                                    </div>
                                    <Switch
                                        checked={settings.appearance.compactMode}
                                        onCheckedChange={(checked: boolean) =>
                                            handleSwitchChange("appearance", "compactMode", checked)
                                        }
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
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
