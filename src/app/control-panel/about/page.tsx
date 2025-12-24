"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { adminStore, AboutContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, X, Plus, Image as ImageIcon, Check } from "lucide-react";

export default function AboutPage() {
    const [about, setAbout] = React.useState<AboutContent | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        image: "",
        features: [""],
    });

    React.useEffect(() => {
        const data = adminStore.getAbout();
        setAbout(data);
        setFormData({
            title: data.title,
            description: data.description,
            image: data.image,
            features: data.features.length > 0 ? data.features : [""],
        });
    }, []);

    const handleSave = () => {
        const filteredFeatures = formData.features.filter((f) => f.trim() !== "");
        const updated: AboutContent = {
            ...formData,
            features: filteredFeatures,
        };
        adminStore.saveAbout(updated);
        setAbout(updated);
        setIsEditing(false);
        toast.success("About section updated!");
    };

    const handleCancel = () => {
        if (about) {
            setFormData({
                title: about.title,
                description: about.description,
                image: about.image,
                features: about.features.length > 0 ? about.features : [""],
            });
        }
        setIsEditing(false);
    };

    const addFeature = () => {
        setFormData((prev) => ({
            ...prev,
            features: [...prev.features, ""],
        }));
    };

    const removeFeature = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const updateFeature = (index: number, value: string) => {
        setFormData((prev) => ({
            ...prev,
            features: prev.features.map((f, i) => (i === index ? value : f)),
        }));
    };

    if (!about) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">About Section</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage the about section content on your homepage
                    </p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="w-fit">
                        Edit Content
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto bg-slate-100 dark:bg-slate-700">
                        {isEditing ? (
                            <div className="p-6 space-y-4">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, image: e.target.value }))
                                    }
                                    className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    placeholder="https://..."
                                />
                                {formData.image && (
                                    <div className="rounded-xl overflow-hidden h-40">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : about.image ? (
                            <img
                                src={about.image}
                                alt="About section"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                                <ImageIcon className="w-16 h-16" />
                            </div>
                        )}
                    </div>

                    {/* Text Content */}
                    <div className="p-6 md:p-8 space-y-6">
                        {isEditing ? (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, title: e.target.value }))
                                        }
                                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        rows={5}
                                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                        Features
                                    </label>
                                    <div className="space-y-2">
                                        {formData.features.map((feature, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={feature}
                                                    onChange={(e) => updateFeature(index, e.target.value)}
                                                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                                    placeholder="Feature..."
                                                />
                                                {formData.features.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFeature(index)}
                                                        className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Feature
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                                        {about.title}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {about.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
                                        Key Features
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {about.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Preview Note */}
            {isEditing && (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 dark:text-amber-400 text-sm">!</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Editing Mode</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            Changes will be saved to local storage. In production, this will update your database.
                        </p>
                    </div>
                </div>
            )}
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
