"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore, TestimonialItem } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Plus,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    Quote,
    Star,
} from "lucide-react";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = React.useState<TestimonialItem[]>([]);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState<TestimonialItem | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<TestimonialItem | null>(null);

    const [formData, setFormData] = React.useState({
        name: "",
        role: "",
        content: "",
        avatar: "",
        isVisible: true,
    });

    React.useEffect(() => {
        setTestimonials(adminStore.getTestimonials());
    }, []);

    const resetForm = () => {
        setFormData({ name: "", role: "", content: "", avatar: "", isVisible: true });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (item: TestimonialItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            avatar: item.avatar,
            isVisible: item.isVisible,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            const updated = testimonials.map((t) =>
                t.id === editingItem.id ? { ...t, ...formData } : t
            );
            adminStore.saveTestimonials(updated);
            setTestimonials(updated);
            toast.success("Testimonial updated!");
        } else {
            const newItem: TestimonialItem = {
                id: Date.now(),
                ...formData,
            };
            const updated = [...testimonials, newItem];
            adminStore.saveTestimonials(updated);
            setTestimonials(updated);
            toast.success("Testimonial added!");
        }

        setIsFormOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        if (deleteConfirm) {
            const updated = testimonials.filter((t) => t.id !== deleteConfirm.id);
            adminStore.saveTestimonials(updated);
            setTestimonials(updated);
            toast.success("Testimonial deleted!");
            setDeleteConfirm(null);
        }
    };

    const toggleVisibility = (item: TestimonialItem) => {
        const updated = testimonials.map((t) =>
            t.id === item.id ? { ...t, isVisible: !t.isVisible } : t
        );
        adminStore.saveTestimonials(updated);
        setTestimonials(updated);
        toast.success(item.isVisible ? "Hidden from website" : "Now visible on website");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Testimonials</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage customer reviews and testimonials
                    </p>
                </div>
                <Button onClick={openAddModal} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}

                            className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border p-5 ${item.isVisible ? "border-slate-200 dark:border-slate-700" : "border-red-200 dark:border-red-900/50 opacity-60"
                                }`}
                        >
                            {/* Quote Icon */}
                            <Quote className="absolute top-4 right-4 w-8 h-8 text-teal-100" />

                            {/* Avatar & Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                                    {item.avatar ? (
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold text-lg">
                                            {item.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4 mb-4 italic">
                                "{item.content}"
                            </p>

                            {/* Status Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span
                                    className={`px-2 py-1 rounded-lg text-xs font-medium ${item.isVisible
                                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                        }`}
                                >
                                    {item.isVisible ? "Visible" : "Hidden"}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                                <Tooltip content="Edit">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                </Tooltip>
                                <Tooltip content={item.isVisible ? "Hide" : "Show"}>
                                    <button
                                        onClick={() => toggleVisibility(item)}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm transition-colors ${item.isVisible
                                            ? "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                                            : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                            }`}
                                    >
                                        {item.isVisible ? (
                                            <>
                                                <EyeOff className="w-4 h-4" />
                                                Hide
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="w-4 h-4" />
                                                Show
                                            </>
                                        )}
                                    </button>
                                </Tooltip>
                                <Tooltip content="Delete">
                                    <button
                                        onClick={() => setDeleteConfirm(item)}
                                        className="p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </Tooltip>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {testimonials.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Star className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        No testimonials yet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Add customer reviews to display on your website
                    </p>
                    <Button onClick={openAddModal}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Testimonial
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
                title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Role / Title
                            </label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, role: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                                placeholder="Father of 2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Avatar URL (optional)
                        </label>
                        <input
                            type="url"
                            value={formData.avatar}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, avatar: e.target.value }))
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="https://..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Testimonial Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, content: e.target.value }))
                            }
                            required
                            rows={4}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="What the customer said..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, isVisible: !prev.isVisible }))
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${formData.isVisible ? "bg-teal-500" : "bg-slate-300 dark:bg-slate-600"
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isVisible ? "left-7" : "left-1"
                                    }`}
                            />
                        </button>
                        <span className="text-sm text-slate-600 dark:text-slate-300">Show on website</span>
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
                            {editingItem ? "Update" : "Add"} Testimonial
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={handleDelete}
                title="Delete Testimonial"
                message={`Are you sure you want to delete the testimonial from "${deleteConfirm?.name}"?`}
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
