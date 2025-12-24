"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { FooterContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Save,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Globe,
    Plus,
    Trash,
    Link as LinkIcon,
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

    const [newLink, setNewLink] = React.useState({ label: "", href: "" });

    const handleAddLink = () => {
        if (!newLink.label || !newLink.href) {
            toast.error("Please fill in both label and URL");
            return;
        }

        const updatedLinks = [...formData.navLinks, newLink];
        setFormData({ ...formData, navLinks: updatedLinks });
        setNewLink({ label: "", href: "" });
        toast.success("Link added");
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = formData.navLinks.filter((_, i) => i !== index);
        setFormData({ ...formData, navLinks: updatedLinks });
        toast.success("Link removed");
    };

    const fetchFooter = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getFooter();
            if (data) {
                setFormData(data);
            }
        } catch (error) {
            // Silently ignore NotAuthenticatedError (user not logged in)
            if (error instanceof NotAuthenticatedError) {
                console.log("Not authenticated, skipping footer fetch");
                return;
            }
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



    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Footer Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage global footer content and contact info
                    </p>
                </div>
                <div className="flex items-center gap-3">
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

            <div className="space-y-6">
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


                {/* Footer Menu Links */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6"
                >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                            Footer Menu Links
                        </h2>
                        <span className="text-sm text-slate-500">{formData.navLinks.length} Links</span>
                    </div>

                    <div className="space-y-4">
                        {/* List of existing links */}
                        {formData.navLinks.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {formData.navLinks.map((link, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:border-teal-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                                <LinkIcon className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                                    {link.label}
                                                </p>
                                                <p className="text-xs text-slate-500 truncate">{link.href}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleRemoveLink(idx)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Remove link"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-100 dark:border-slate-700 rounded-xl">
                                <LinkIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No menu links added yet</p>
                            </div>
                        )}

                        {/* Add new link form */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Add New Link</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newLink.label}
                                        onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                        placeholder="Link Label (e.g. Services)"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={newLink.href}
                                        onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                        placeholder="URL or Path (e.g. /services)"
                                    />
                                </div>
                                <Button
                                    onClick={handleAddLink}
                                    variant="outline"
                                    className="sm:w-auto w-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/40"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Link
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
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
