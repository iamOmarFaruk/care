"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApiService } from "@/services/api-service";
import { AdminUser } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Search,
    UserPlus,
    Pencil,
    Trash2,
    Shield,
    ShieldAlert,
    CheckCircle2,
    XCircle,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
} from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = React.useState<AdminUser[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedUser, setSelectedUser] = React.useState<AdminUser | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [deleteConfirm, setDeleteConfirm] = React.useState<AdminUser | null>(null);

    // Form state
    const [formData, setFormData] = React.useState<Partial<AdminUser>>({
        role: "user",
        status: "active",
    });

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            toast.error("Failed to load users");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phone || "").includes(searchQuery)
    );

    const openEditModal = (user: AdminUser) => {
        setSelectedUser(user);
        setFormData({
            role: user.role,
            status: user.status,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;

        try {
            await ApiService.updateUser({
                id: selectedUser.id,
                ...formData,
            });

            // Optimistic update
            const updated = users.map((u) =>
                u.id === selectedUser.id ? { ...u, ...formData } : u
            );
            setUsers(updated as AdminUser[]);
            toast.success("User updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to update user:", error);
            toast.error("Failed to update user");
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;

        try {
            await ApiService.deleteUser(deleteConfirm.id);

            // Optimistic update
            const updated = users.filter((u) => u.id !== deleteConfirm.id);
            setUsers(updated);

            toast.success("User deleted successfully");
            setDeleteConfirm(null);
        } catch (error) {
            console.error("Failed to delete user:", error);
            toast.error("Failed to delete user");
        }
    };

    const toggleStatus = async (user: AdminUser) => {
        const newStatus: AdminUser["status"] = user.status === "active" ? "disabled" : "active";
        try {
            await ApiService.updateUser({
                id: user.id,
                status: newStatus,
            });

            // Optimistic update
            const updated = users.map((u) =>
                u.id === user.id ? { ...u, status: newStatus } : u
            );
            setUsers(updated);

            toast.success(`User ${newStatus === "active" ? "activated" : "disabled"}`);
        } catch (error) {
            console.error("Failed to toggle status:", error);
            toast.error("Failed to update status");
        }
    };

    if (isLoading && users.length === 0) {
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
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Users Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage registered users and administrators
                    </p>
                </div>
                {/*  <Button className="w-fit">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                </Button> */}
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/50">
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    User
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Role
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Join Date
                                </th>
                                <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            <AnimatePresence>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        user.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                        {user.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                        <Mail className="w-3 h-3" />
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${user.role === "super_admin"
                                                    ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                                                    : user.role === "admin"
                                                        ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                                                        : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600"
                                                    }`}
                                            >
                                                {user.role === "super_admin" || user.role === "admin" ? (
                                                    <ShieldAlert className="w-3 h-3" />
                                                ) : (
                                                    <User className="w-3 h-3" />
                                                )}
                                                {user.role.replace("_", " ").toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${user.status === "active"
                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                                                    : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                                                    }`}
                                            >
                                                {user.status === "active" ? (
                                                    <CheckCircle2 className="w-3 h-3" />
                                                ) : (
                                                    <XCircle className="w-3 h-3" />
                                                )}
                                                {user.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Tooltip content="Edit User">
                                                    <button
                                                        onClick={() => openEditModal(user)}
                                                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip
                                                    content={user.status === "active" ? "Suspend User" : "Activate User"}
                                                >
                                                    <button
                                                        onClick={() => toggleStatus(user)}
                                                        className={`p-2 rounded-lg transition-colors ${user.status === "active"
                                                            ? "hover:bg-amber-50 dark:hover:bg-amber-900/30 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
                                                            : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                            }`}
                                                    >
                                                        <Shield className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip content="Delete User">
                                                    <button
                                                        onClick={() => setDeleteConfirm(user)}
                                                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        No users found matching your search.
                    </div>
                )}
            </motion.div>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit User"
                size="md"
            >
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Role
                        </label>
                        <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value as AdminUser["role"] })
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="super_admin">Super Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value as AdminUser["status"],
                                })
                            }
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                            <option value="active">Active</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Update User
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${deleteConfirm?.name}"? This action cannot be undone.`}
                confirmText="Delete User"
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
