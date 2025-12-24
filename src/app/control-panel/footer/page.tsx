"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { adminStore, FooterContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Save,
    X,
    Plus,
    Facebook,
    Instagram,
    Linkedin,
    Link as LinkIcon,
} from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export default function FooterPage() {
    const [footer, setFooter] = React.useState<FooterContent | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        copyright: "",
        socialLinks: {
            facebook: "",
            instagram: "",
            twitter: "",
            linkedin: "",
        },
        navLinks: [{ label: "", href: "" }],
    });

    React.useEffect(() => {
        const data = adminStore.getFooter();
        setFooter(data);
        setFormData({
            copyright: data.copyright,
            socialLinks: { ...data.socialLinks },
            navLinks: data.navLinks.length > 0 ? [...data.navLinks] : [{ label: "", href: "" }],
        });
    }, []);

    const handleSave = () => {
        const filteredNavLinks = formData.navLinks.filter(
            (link) => link.label.trim() !== "" && link.href.trim() !== ""
        );
        const updated: FooterContent = {
            ...formData,
            navLinks: filteredNavLinks,
        };
        adminStore.saveFooter(updated);
        setFooter(updated);
        setIsEditing(false);
        toast.success("Footer updated!");
    };

    const handleCancel = () => {
        if (footer) {
            setFormData({
                copyright: footer.copyright,
                socialLinks: { ...footer.socialLinks },
                navLinks: footer.navLinks.length > 0 ? [...footer.navLinks] : [{ label: "", href: "" }],
            });
        }
        setIsEditing(false);
    };

    const addNavLink = () => {
        setFormData((prev) => ({
            ...prev,
            navLinks: [...prev.navLinks, { label: "", href: "" }],
        }));
    };

    const removeNavLink = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            navLinks: prev.navLinks.filter((_, i) => i !== index),
        }));
    };

    const updateNavLink = (index: number, field: "label" | "href", value: string) => {
        setFormData((prev) => ({
            ...prev,
            navLinks: prev.navLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            ),
        }));
    };

    const updateSocialLink = (key: keyof typeof formData.socialLinks, value: string) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [key]: value },
        }));
    };

    if (!footer) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Footer Settings</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Customize your website footer content
                    </p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} className="w-fit">
                        Edit Footer
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

            <div className="grid md:grid-cols-2 gap-6">
                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Social Media Links</h3>

                    {isEditing ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <input
                                    type="url"
                                    value={formData.socialLinks.facebook}
                                    onChange={(e) => updateSocialLink("facebook", e.target.value)}
                                    placeholder="Facebook URL"
                                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                                </div>
                                <input
                                    type="url"
                                    value={formData.socialLinks.instagram}
                                    onChange={(e) => updateSocialLink("instagram", e.target.value)}
                                    placeholder="Instagram URL"
                                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <XIcon className="w-4 h-4 text-slate-800 dark:text-white" />
                                </div>
                                <input
                                    type="url"
                                    value={formData.socialLinks.twitter}
                                    onChange={(e) => updateSocialLink("twitter", e.target.value)}
                                    placeholder="X (Twitter) URL"
                                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Linkedin className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                                </div>
                                <input
                                    type="url"
                                    value={formData.socialLinks.linkedin}
                                    onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                                    placeholder="LinkedIn URL"
                                    className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {footer.socialLinks.facebook && (
                                <a
                                    href={footer.socialLinks.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Facebook className="w-4 h-4" />
                                    {footer.socialLinks.facebook}
                                </a>
                            )}
                            {footer.socialLinks.instagram && (
                                <a
                                    href={footer.socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Instagram className="w-4 h-4" />
                                    {footer.socialLinks.instagram}
                                </a>
                            )}
                            {footer.socialLinks.twitter && (
                                <a
                                    href={footer.socialLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <XIcon className="w-3.5 h-3.5" />
                                    {footer.socialLinks.twitter}
                                </a>
                            )}
                            {footer.socialLinks.linkedin && (
                                <a
                                    href={footer.socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    {footer.socialLinks.linkedin}
                                </a>
                            )}
                        </div>
                    )}
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Navigation Links</h3>

                    {isEditing ? (
                        <div className="space-y-3">
                            {formData.navLinks.map((link, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={link.label}
                                        onChange={(e) => updateNavLink(index, "label", e.target.value)}
                                        placeholder="Label"
                                        className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        value={link.href}
                                        onChange={(e) => updateNavLink(index, "href", e.target.value)}
                                        placeholder="URL"
                                        className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                    />
                                    {formData.navLinks.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeNavLink(index)}
                                            className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addNavLink}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Link
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {footer.navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                                >
                                    <LinkIcon className="w-3 h-3" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:col-span-2"
                >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Copyright Text</h3>

                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.copyright}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, copyright: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="© 2024 Care.xyz. All rights reserved."
                        />
                    ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-300">{footer.copyright}</p>
                    )}
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
