"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ApiService } from "@/services/api-service";
import { FooterContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Save,
    RotateCcw,
    MapPin,
    Mail,
    Phone,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Globe,
} from "lucide-react";

export default function FooterPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isSaving, setIsSaving] = React.useState(false);

    const [formData, setFormData] = React.useState<FooterContent>({
        description: "",
        address: "",
        email: "",
        phone: "",
        socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
        },
        copyright: "",
        navLinks: [],
    });

    const fetchFooter = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getFooter();
            if (data) {
                setFormData(data);
            }
        } catch (error) {
            console.error("Failed to fetch footer content:", error);
            toast.error("Failed to load content");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchFooter();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await ApiService.saveFooter(formData);
            toast.success("Footer updated successfully");
        } catch (error) {
            console.error("Failed to save:", error);
            toast.error("Failed to save changes");
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        fetchFooter();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Footer Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage global footer content and contact info
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-5"
                >
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                        Contact Information
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Short Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Brief company slogan..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            Address
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-slate-400" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                        />
                    </div>
                </motion.div>

                {/* Social Links & Copyright */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-5"
                >
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">
                        Social Media & Links
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                                <Facebook className="w-4 h-4 text-blue-600" />
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={formData.socialLinks.facebook}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-sky-500" />
                                Twitter (X) URL
                            </label>
                            <input
                                type="url"
                                value={formData.socialLinks.twitter}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="https://twitter.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                                <Instagram className="w-4 h-4 text-pink-600" />
                                Instagram URL
                            </label>
                            <input
                                type="url"
                                value={formData.socialLinks.instagram}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="https://instagram.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-blue-700" />
                                LinkedIn URL
                            </label>
                            <input
                                type="url"
                                value={formData.socialLinks.linkedin}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-400" />
                            Copyright Text
                        </label>
                        <input
                            type="text"
                            value={formData.copyright}
                            onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="© 2024 Care. All rights reserved."
                        />
                    </div>

                </motion.div>
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
