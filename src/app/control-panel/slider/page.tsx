"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { adminStore, SliderContent } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Plus,
    Pencil,
    Trash2,
    GripVertical,
    Image as ImageIcon,
    Link as LinkIcon,
} from "lucide-react";

export default function SliderPage() {
    const [sliders, setSliders] = React.useState<SliderContent[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState<SliderContent | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<SliderContent | null>(null);

    const [formData, setFormData] = React.useState({
        title: "",
        subtitle: "",
        ctaText: "",
        ctaLink: "",
        backgroundImage: "",
    });

    React.useEffect(() => {
        setSliders(adminStore.getSliders());
    }, []);

    const resetForm = () => {
        setFormData({
            title: "",
            subtitle: "",
            ctaText: "",
            ctaLink: "",
            backgroundImage: "",
        });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (item: SliderContent) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            subtitle: item.subtitle,
            ctaText: item.ctaText,
            ctaLink: item.ctaLink,
            backgroundImage: item.backgroundImage,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            const updated = sliders.map((s) =>
                s.id === editingItem.id ? { ...s, ...formData } : s
            );
            adminStore.saveSliders(updated);
            setSliders(updated);
            toast.success("Slider updated!");
        } else {
            const newSlider: SliderContent = {
                id: `slider-${Date.now()}`,
                order: sliders.length + 1,
                ...formData,
            };
            const updated = [...sliders, newSlider];
            adminStore.saveSliders(updated);
            setSliders(updated);
            toast.success("Slider added!");
        }

        setIsFormOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        if (deleteConfirm) {
            const updated = sliders.filter((s) => s.id !== deleteConfirm.id);
            adminStore.saveSliders(updated);
            setSliders(updated);
            toast.success("Slider deleted!");
            setDeleteConfirm(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Hero Slider</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage hero section slides
                    </p>
                </div>
                <Button onClick={openAddModal} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slide
                </Button>
            </div>

            {/* Slider List */}
            <div className="space-y-4">
                {sliders.map((slide, index) => (
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row">
                            {/* Image Preview */}
                            <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-slate-100">
                                {slide.backgroundImage ? (
                                    <img
                                        src={slide.backgroundImage}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-lg">
                                        Slide {index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 md:p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                                            {slide.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                            {slide.subtitle}
                                        </p>

                                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-1.5">
                                                <LinkIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                                <span className="font-medium">{slide.ctaText}</span>
                                            </div>
                                            <span className="text-slate-400 dark:text-slate-500">→</span>
                                            <span className="text-slate-500 dark:text-slate-400">{slide.ctaLink}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1">
                                        <Tooltip content="Edit Slide">
                                            <button
                                                onClick={() => openEditModal(slide)}
                                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="Delete Slide">
                                            <button
                                                onClick={() => setDeleteConfirm(slide)}
                                                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="Drag to Reorder">
                                            <button className="p-2 rounded-lg text-slate-400 cursor-grab">
                                                <GripVertical className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {sliders.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        No slides yet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Add slides to your hero section
                    </p>
                    <Button onClick={openAddModal}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Slide
                    </Button>
                </div>
            )}

            {/* Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    resetForm();
                }}
                title={editingItem ? "Edit Slide" : "Add New Slide"}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
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
                            required
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Professional Child Care Services"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                            }
                            required
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Trusted nannies and babysitters for your little ones"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Button Text
                            </label>
                            <input
                                type="text"
                                value={formData.ctaText}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, ctaText: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="Book Now"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Button Link
                            </label>
                            <input
                                type="text"
                                value={formData.ctaLink}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, ctaLink: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="/services/baby-care"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Background Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.backgroundImage}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    backgroundImage: e.target.value,
                                }))
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="https://images.unsplash.com/..."
                        />
                        {formData.backgroundImage && (
                            <div className="mt-3 rounded-xl overflow-hidden h-32 bg-slate-100 dark:bg-slate-700">
                                <img
                                    src={formData.backgroundImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setIsFormOpen(false);
                                resetForm();
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            {editingItem ? "Update" : "Add"} Slide
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={handleDelete}
                title="Delete Slide"
                message="Are you sure you want to delete this slide? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
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
