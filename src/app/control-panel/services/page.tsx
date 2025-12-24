"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApiService } from "@/services/api-service";
import { ServiceItem } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Plus,
    Pencil,
    Trash2,
    Baby,
    HeartHandshake,
    Stethoscope,
    X,
    Check,
    DollarSign,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    "baby-care": Baby,
    "elderly-care": HeartHandshake,
    "special-care": Stethoscope,
};

export default function ServicesPage() {
    const [services, setServices] = React.useState<ServiceItem[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingService, setEditingService] = React.useState<ServiceItem | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<ServiceItem | null>(null);

    // Form state
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        pricePerHr: 500,
        image: "",
        features: [""],
        isActive: true,
        icon: "baby-care", // Default icon
    });

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getServices();
            setServices(data);
        } catch (error) {
            console.error("Failed to fetch services:", error);
            toast.error("Failed to load services");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchServices();
    }, []);

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            pricePerHr: 500,
            image: "",
            features: [""],
            isActive: true,
            icon: "baby-care",
        });
        setEditingService(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (service: ServiceItem) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            pricePerHr: service.pricePerHr,
            image: service.image,
            features: service.features.length > 0 ? service.features : [""],
            isActive: service.isActive,
            icon: service.icon,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const filteredFeatures = formData.features.filter((f) => f.trim() !== "");

        try {
            if (editingService) {
                // Update existing
                const updatedService = {
                    ...editingService,
                    ...formData,
                    features: filteredFeatures,
                };
                await ApiService.updateService(updatedService);

                const updated = services.map((s) =>
                    s.id === editingService.id ? updatedService : s
                );
                setServices(updated);
                toast.success("Service updated successfully!");
            } else {
                // Add new
                const newService: ServiceItem = {
                    id: `service-${Date.now()}`, // Temporary ID, Firestore will gen real one if we let it, but keepingconsistent
                    ...formData,
                    features: filteredFeatures,
                };
                // If API handles ID gen, we should refetch or return created obj. 
                // Creating with client-side ID for list consistency until refetch
                await ApiService.addService(newService);

                // Ideally we refetch here to get server ID, but for now simple optimistic-ish
                const updated = [...services, newService];
                setServices(updated);
                toast.success("Service added successfully!");
            }
            setIsFormOpen(false);
            resetForm();
        } catch (error) {
            console.error("Failed to save service:", error);
            toast.error("Failed to save service");
        }
    };

    const handleDelete = async () => {
        if (deleteConfirm) {
            try {
                await ApiService.deleteService(deleteConfirm.id);
                const updated = services.filter((s) => s.id !== deleteConfirm.id);
                setServices(updated);
                toast.success("Service deleted successfully!");
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Failed to delete service:", error);
                toast.error("Failed to delete service");
            }
        }
    };

    const toggleActive = async (service: ServiceItem) => {
        const updatedService = { ...service, isActive: !service.isActive };
        try {
            await ApiService.updateService(updatedService);

            const updated = services.map((s) =>
                s.id === service.id ? updatedService : s
            );
            setServices(updated);
            toast.success(
                service.isActive ? "Service deactivated" : "Service activated"
            );
        } catch (error) {
            console.error("Failed to toggle service:", error);
            toast.error("Failed to update service");
        }
    };

    const addFeatureField = () => {
        setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
    };

    const removeFeatureField = (index: number) => {
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

    if (isLoading && services.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Services Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your care services and pricing
                    </p>
                </div>
                <Button onClick={openAddModal} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </Button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Baby;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border overflow-hidden ${service.isActive ? "border-slate-200 dark:border-slate-700" : "border-red-200 dark:border-red-900/50 opacity-60"
                                    }`}
                            >
                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <span
                                            className={`px-2 py-1 rounded-lg text-xs font-medium ${service.isActive
                                                ? "bg-emerald-500 text-white"
                                                : "bg-red-500 text-white"
                                                }`}
                                        >
                                            {service.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 left-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                        {service.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <DollarSign className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                                            ৳{service.pricePerHr}
                                        </span>
                                        <span className="text-sm text-slate-400 dark:text-slate-500">/hour</span>
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {service.features.slice(0, 3).map((feature, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                        {service.features.length > 3 && (
                                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-lg">
                                                +{service.features.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                                        <Tooltip content="Edit Service">
                                            <button
                                                onClick={() => openEditModal(service)}
                                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </button>
                                        </Tooltip>
                                        <Tooltip content={service.isActive ? "Deactivate" : "Activate"}>
                                            <button
                                                onClick={() => toggleActive(service)}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${service.isActive
                                                    ? "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/30"
                                                    : "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                                    }`}
                                            >
                                                {service.isActive ? (
                                                    <>
                                                        <X className="w-4 h-4" />
                                                        Disable
                                                    </>
                                                ) : (
                                                    <>
                                                        <Check className="w-4 h-4" />
                                                        Enable
                                                    </>
                                                )}
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="Delete Service">
                                            <button
                                                onClick={() => setDeleteConfirm(service)}
                                                className="p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {services.length === 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-12 text-center">
                    <Baby className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        No services yet
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        Add your first service to get started
                    </p>
                    <Button onClick={openAddModal}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                </div>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    resetForm();
                }}
                title={editingService ? "Edit Service" : "Add New Service"}
                size="lg"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Service Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, title: e.target.value }))
                            }
                            required
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="e.g., Child Care & Babysitting"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, description: e.target.value }))
                            }
                            required
                            rows={3}
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            placeholder="Describe the service..."
                        />
                    </div>

                    {/* Price & Image */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Price per Hour (৳)
                            </label>
                            <input
                                type="number"
                                value={formData.pricePerHr}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        pricePerHr: Number(e.target.value),
                                    }))
                                }
                                required
                                min={0}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            />
                        </div>
                        <div>
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
                        </div>
                    </div>

                    {/* Features */}
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
                                        placeholder="e.g., Certified Nannies"
                                    />
                                    {formData.features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeatureField(index)}
                                            className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addFeatureField}
                            className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                        >
                            + Add Feature
                        </button>
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${formData.isActive ? "bg-teal-500" : "bg-slate-300 dark:bg-slate-600"
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.isActive ? "left-7" : "left-1"
                                    }`}
                            />
                        </button>
                        <span className="text-sm text-slate-600 dark:text-slate-300">Service is active</span>
                    </div>

                    {/* Submit */}
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
                            {editingService ? "Update Service" : "Add Service"}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={handleDelete}
                title="Delete Service"
                message={`Are you sure you want to delete "${deleteConfirm?.title}"? This action cannot be undone.`}
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
