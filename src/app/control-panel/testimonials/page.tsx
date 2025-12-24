"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Plus,
    Pencil,
    Trash2,
    Quote,
    Star,
    MessageSquare,
} from "lucide-react";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState<Testimonial | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<Testimonial | null>(null);

    const [formData, setFormData] = React.useState({
        name: "",
        role: "",
        content: "",
        rating: 5,
        avatar: "",
    });

    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getTestimonials();
            setTestimonials(data);
        } catch (error) {
            // Silently ignore NotAuthenticatedError (user not logged in)
            if (error instanceof NotAuthenticatedError) {
                console.log("Not authenticated, skipping testimonials fetch");
                return;
            }
            console.error("Failed to fetch testimonials:", error);
            toast.error("Failed to load testimonials");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTestimonials();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            role: "",
            content: "",
            rating: 5,
            avatar: "",
        });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (item: Testimonial) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            rating: item.rating ?? 5,
            avatar: item.avatar || "",
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingItem) {
                const updatedItem = {
                    ...editingItem,
                    ...formData,
                };
                await ApiService.updateTestimonial(updatedItem);

                const updated = testimonials.map((t) =>
                    t.id === editingItem.id ? updatedItem : t
                );
                setTestimonials(updated);
                toast.success("Testimonial updated!");
            } else {
                const newItem: Testimonial = {
                    id: `testimonial-${Date.now()}`,
                    ...formData,
                    isVisible: true,
                };
                // In real app, API returns the created item with server ID
                await ApiService.addTestimonial(newItem);

                const updated = [...testimonials, newItem];
                setTestimonials(updated);
                toast.success("Testimonial added!");
            }
            setIsFormOpen(false);
            resetForm();
        } catch (error) {
            console.error("Failed to save testimonial:", error);
            toast.error("Failed to save changes");
        }
    };

    const handleDelete = async () => {
        if (deleteConfirm) {
            try {
                await ApiService.deleteTestimonial(deleteConfirm.id);
                const updated = testimonials.filter((t) => t.id !== deleteConfirm.id);
                setTestimonials(updated);
                toast.success("Testimonial deleted!");
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Failed to delete testimonial:", error);
                toast.error("Failed to delete testimonial");
            }
        }
    };

    if (isLoading && testimonials.length === 0) {
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
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Testimonials</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage client reviews and feedback
                    </p>
                </div>
                <Button onClick={openAddModal} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                </Button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold overflow-hidden">
                                        {item.avatar ? (
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            item.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                                <Quote className="w-6 h-6 text-teal-100 dark:text-teal-900/30" />
                            </div>

                            <div className="flex-1 mb-4">
                                <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                                    "{item.content}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3.5 h-3.5 ${i < (item.rating ?? 5)
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-slate-300 dark:text-slate-600"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tooltip content="Edit">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip content="Delete">
                                        <button
                                            onClick={() => setDeleteConfirm(item)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {testimonials.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        No testimonials yet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Add client feedback to build trust
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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Client Name
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
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Parent of two"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Review Content
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, content: e.target.value }))
                            }
                            required
                            rows={3}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Share their experience..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                value={formData.avatar}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, avatar: e.target.value }))
                                }
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            />
                        </div>
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
                message="Are you sure you want to delete this testimonial? This action cannot be undone."
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
