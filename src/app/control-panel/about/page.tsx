"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { AboutContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Save,
    RotateCcw,
    FileText,
    Image as ImageIcon,
    Layout,
    CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);

    // Initial state matching standard structure
    const [formData, setFormData] = React.useState<AboutContent>({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        stats: [],
        features: [],
        images: [],
    });

    const fetchAbout = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getAbout();
            if (data) {
                // Ensure arrays initialized
                setFormData({
                    ...data,
                    stats: data.stats || [],
                    features: data.features || [],
                    images: data.images || [],
                });
            }
        } catch (error) {
            // Silently ignore NotAuthenticatedError (user not logged in)
            if (error instanceof NotAuthenticatedError) {
                console.log("Not authenticated, skipping about fetch");
                return;
            }
            console.error("Failed to fetch about content:", error);
            toast.error("Failed to load content");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAbout();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const dataToSave = {
                ...formData,
                // cleanup empty entries if needed, or rely on form validation
            };
            await ApiService.saveAbout(dataToSave);
            toast.success("About page updated successfully");
        } catch (error) {
            console.error("Failed to save:", error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        // Reload original data
        fetchAbout();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">About Us Page</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage content for the About Us section
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleReset} disabled={isSaving}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Main Content Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Text */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Main Content</h2>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                    Section Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    placeholder="About Care"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    placeholder="Providing compassionate care since 2020"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    placeholder="Write about your company mission and values..."
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Layout className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Features & Mission</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Key Features (One per line)
                                </label>
                                <span className="text-xs text-slate-400">Displayed as list items</span>
                            </div>

                            <textarea
                                value={formData.features?.join("\n") || ""}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value.split("\n") })}
                                rows={5}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="Certified Caregivers&#10;24/7 Support&#10;Affordable Pricing"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Images & Stats */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <ImageIcon className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Images</h2>
                        </div>

                        <div className="space-y-4">
                            {formData.images?.map((img, idx) => (
                                <div key={idx} className="space-y-2">
                                    <label className="text-xs font-medium text-slate-500">Image {idx + 1} URL</label>
                                    <input
                                        type="url"
                                        value={img}
                                        onChange={(e) => {
                                            const newImages = [...(formData.images || [])];
                                            newImages[idx] = e.target.value;
                                            setFormData({ ...formData, images: newImages });
                                        }}
                                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    />
                                    {img && (
                                        <div className="h-32 rounded-lg overflow-hidden bg-slate-100">
                                            <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {(formData.images?.length || 0) < 2 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setFormData({ ...formData, images: [...(formData.images || []), ""] })}
                                >
                                    Add Image
                                </Button>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Stats</h2>
                        </div>

                        <div className="space-y-4">
                            {formData.stats?.map((stat, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl space-y-2">
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...(formData.stats || [])];
                                            newStats[idx] = { ...newStats[idx], value: e.target.value };
                                            setFormData({ ...formData, stats: newStats });
                                        }}
                                        placeholder="Value (e.g. 500+)"
                                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800"
                                    />
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...(formData.stats || [])];
                                            newStats[idx] = { ...newStats[idx], label: e.target.value };
                                            setFormData({ ...formData, stats: newStats });
                                        }}
                                        placeholder="Label (e.g. Happy Clients)"
                                        className="w-full px-3 py-1.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800"
                                    />
                                </div>
                            ))}
                            {(formData.stats?.length || 0) < 4 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setFormData({ ...formData, stats: [...(formData.stats || []), { value: "", label: "" }] })}
                                >
                                    Add Stat
                                </Button>
                            )}
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2024-12-24
 * │ Updated: 2024-12-24
 * └─ care ───┘
 */
