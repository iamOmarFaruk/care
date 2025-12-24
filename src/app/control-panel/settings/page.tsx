"use client";

import * as React from "react";
import { toast } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Save,
    Loader2,
    Moon,
    Sun,
    Monitor,
    Check,
    Globe,
    Mail,
    Trash2,
} from "lucide-react";

interface SettingsState {
    appearance: {
        theme: "light" | "dark" | "system";
    };
    general: {
        siteName: string;
        siteEmail: string;
        timezone: string;
    };
}

const initialSettings: SettingsState = {
    appearance: {
        theme: "system",
    },
    general: {
        siteName: "Care.xyz",
        siteEmail: "admin@care.xyz",
        timezone: "Asia/Dhaka",
    },
};

export default function AdminSettingsPage() {
    const { theme, setTheme } = useTheme();
    const [settings, setSettings] = React.useState<SettingsState>(initialSettings);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast.success("Settings saved successfully!");
    };

    const handleInputChange = (
        category: keyof SettingsState,
        key: string,
        value: string
    ) => {
        // @ts-ignore
        setSettings((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value,
            },
        }));
    };

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

            <div className="space-y-6">
                {/* General Settings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
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
                </div>

                {/* Appearance Settings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                        Appearance
                    </h3>
                    <div className="space-y-3">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-3 gap-3">
                            {themeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setTheme(option.value)}
                                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${theme === option.value
                                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/30"
                                        : "border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
                                        }`}
                                >
                                    {theme === option.value && (
                                        <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </span>
                                    )}
                                    <option.icon
                                        className={`w-6 h-6 ${theme === option.value
                                            ? "text-teal-500"
                                            : "text-slate-400"
                                            }`}
                                    />
                                    <span
                                        className={`text-sm font-medium ${theme === option.value
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
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-200 dark:border-red-900/50 p-6">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                        Danger Zone
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Irreversible actions. Please proceed with caution.
                    </p>

                    <div className="flex items-center justify-between p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                        <div>
                            <p className="font-medium text-red-700 dark:text-red-400">
                                Delete Profile
                            </p>
                            <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-0.5">
                                Permanently remove your account and all associated data
                            </p>
                        </div>
                        <Button
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 text-white border-none"
                            onClick={() => toast.error("This action cannot be undone!")}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Profile
                        </Button>
                    </div>
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
