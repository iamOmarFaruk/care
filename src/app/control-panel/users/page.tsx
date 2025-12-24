"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminStore, AdminUser } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Plus,
    Pencil,
    Trash2,
    Shield,
    ShieldCheck,
    UserCheck,
    UserX,
    Search,
    Mail,
    Calendar,
} from "lucide-react";

const roleColors: Record<AdminUser["role"], string> = {
    super_admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    admin: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    user: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const roleLabels: Record<AdminUser["role"], string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    user: "User",
};

export default function UsersPage() {
    const [users, setUsers] = React.useState<AdminUser[]>([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<AdminUser | null>(null);
    const [deleteConfirm, setDeleteConfirm] = React.useState<AdminUser | null>(null);

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        username: "",
        role: "user" as AdminUser["role"],
        status: "active" as AdminUser["status"],
    });

    React.useEffect(() => {
        setUsers(adminStore.getUsers());
    }, []);

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            username: "",
            role: "user",
            status: "active",
        });
        setEditingUser(null);
    };

    const openAddModal = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const openEditModal = (user: AdminUser) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            status: user.status,
        });
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            const updated = users.map((u) =>
                u.id === editingUser.id ? { ...u, ...formData } : u
            );
            adminStore.saveUsers(updated);
            setUsers(updated);
            toast.success("User updated!");
        } else {
            const newUser: AdminUser = {
                id: `user-${Date.now()}`,
                ...formData,
                createdAt: new Date().toISOString(),
            };
            const updated = [...users, newUser];
            adminStore.saveUsers(updated);
            setUsers(updated);
            toast.success("User added!");
        }

        setIsFormOpen(false);
        resetForm();
    };

    const handleDelete = () => {
        if (deleteConfirm) {
            if (deleteConfirm.role === "super_admin") {
                toast.error("Cannot delete super admin!");
                setDeleteConfirm(null);
                return;
            }
            const updated = users.filter((u) => u.id !== deleteConfirm.id);
            adminStore.saveUsers(updated);
            setUsers(updated);
            toast.success("User deleted!");
            setDeleteConfirm(null);
        }
    };

    const toggleStatus = (user: AdminUser) => {
        if (user.role === "super_admin") {
            toast.error("Cannot disable super admin!");
            return;
        }
        const updated = users.map((u) =>
            u.id === user.id
                ? { ...u, status: u.status === "active" ? "disabled" : "active" }
                : u
        ) as AdminUser[];
        adminStore.saveUsers(updated);
        setUsers(updated);
        toast.success(user.status === "active" ? "User disabled" : "User activated");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Users Management</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage user accounts and permissions
                    </p>
                </div>
                <Button onClick={openAddModal} className="w-fit">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                </Button>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 transition-all"
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
                                    Username
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Role
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Joined
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
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600">
                                                    {user.avatar ? (
                                                        <img
                                                            src={user.avatar}
                                                            alt={user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white font-medium">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-300">@{user.username}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${roleColors[user.role]
                                                    }`}
                                            >
                                                {user.role === "super_admin" && <ShieldCheck className="w-3 h-3" />}
                                                {user.role === "admin" && <Shield className="w-3 h-3" />}
                                                {roleLabels[user.role]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${user.status === "active"
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                    }`}
                                            >
                                                {user.status === "active" ? "Active" : "Disabled"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
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
                                                <Tooltip content={user.status === "active" ? "Disable" : "Enable"}>
                                                    <button
                                                        onClick={() => toggleStatus(user)}
                                                        className={`p-2 rounded-lg transition-colors ${user.status === "active"
                                                            ? "hover:bg-amber-50 dark:hover:bg-amber-900/30 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400"
                                                            : "hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                                                            }`}
                                                    >
                                                        {user.status === "active" ? (
                                                            <UserX className="w-4 h-4" />
                                                        ) : (
                                                            <UserCheck className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </Tooltip>
                                                {user.role !== "super_admin" && (
                                                    <Tooltip content="Delete User">
                                                        <button
                                                            onClick={() => setDeleteConfirm(user)}
                                                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No users found</p>
                    </div>
                )}
            </motion.div>

            {/* Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => {
                    setIsFormOpen(false);
                    resetForm();
                }}
                title={editingUser ? "Edit User" : "Add New User"}
                size="md"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, name: e.target.value }))
                            }
                            required
                            className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Username
                            </label>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, username: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                required
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1.5">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        role: e.target.value as AdminUser["role"],
                                    }))
                                }
                                disabled={editingUser?.role === "super_admin"}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
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
                                    setFormData((prev) => ({
                                        ...prev,
                                        status: e.target.value as AdminUser["status"],
                                    }))
                                }
                                disabled={editingUser?.role === "super_admin"}
                                className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                            >
                                <option value="active">Active</option>
                                <option value="disabled">Disabled</option>
                            </select>
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
                            {editingUser ? "Update" : "Add"} User
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
