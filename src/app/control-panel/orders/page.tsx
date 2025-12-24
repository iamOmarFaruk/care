"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApiService, NotAuthenticatedError } from "@/services/api-service";
import { Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip";
import { toast } from "sonner";
import {
    Search,
    Filter,
    Eye,
    CheckCircle2,
    XCircle,
    Truck,
    MapPin,
    Calendar,
    User,
    FileText,
} from "lucide-react";

// Types for Order
type OrderItem = Booking & {
    userName: string;
    userEmail: string;
};

const statusColors: Record<OrderItem["status"], string> = {
    pending: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    confirmed: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    in_progress: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
    cancelled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

const statusOptions: { value: OrderItem["status"]; label: string }[] = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
];

export default function OrdersPage() {
    const [orders, setOrders] = React.useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<string>("all");
    const [selectedOrder, setSelectedOrder] = React.useState<OrderItem | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
    const [confirmCancel, setConfirmCancel] = React.useState<OrderItem | null>(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const data = await ApiService.getAllBookings();
            // Cast to OrderItem[] as our API now returns enriched data with userName/Email
            setOrders(data as unknown as OrderItem[]);
        } catch (error) {
            // Silently ignore NotAuthenticatedError (user not logged in)
            if (error instanceof NotAuthenticatedError) {
                console.log("Not authenticated, skipping orders fetch");
                return;
            }
            console.error("Failed to fetch orders:", error);
            toast.error("Failed to load orders");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            (order.userName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (order.userEmail || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = async (orderId: string, newStatus: OrderItem["status"]) => {
        try {
            await ApiService.updateBookingStatus(orderId, newStatus);

            // Optimistic update
            const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
            setOrders(updated);

            toast.success(`Order status updated to ${newStatus.replace("_", " ")}`);

            if (selectedOrder?.id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleCancelOrder = () => {
        if (confirmCancel) {
            handleStatusChange(confirmCancel.id, "cancelled");
            setConfirmCancel(null);
        }
    };

    const viewOrder = (order: OrderItem) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    if (isLoading && orders.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Orders Management</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    View and manage all service bookings
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                        >
                            <option value="all">All Status</option>
                            {statusOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
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
                                    Order ID
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Service
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Date & Time
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Status
                                </th>
                                <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Amount
                                </th>
                                <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            <AnimatePresence>
                                {filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.03 }}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">
                                                #{order.id.slice(0, 8).toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                    {order.userName}
                                                </p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{order.userEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600 dark:text-slate-300">
                                                {order.serviceName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">{order.date}</p>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">{order.time}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    order.status !== "cancelled" &&
                                                    handleStatusChange(
                                                        order.id,
                                                        e.target.value as OrderItem["status"]
                                                    )
                                                }
                                                disabled={order.status === "cancelled"}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer focus:outline-none disabled:cursor-not-allowed ${statusColors[order.status]}`}
                                            >
                                                {statusOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                ৳{order.totalCost.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <Tooltip content="View Details">
                                                    <button
                                                        onClick={() => viewOrder(order)}
                                                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </Tooltip>
                                                {order.status !== "cancelled" && order.status !== "completed" && (
                                                    <Tooltip content="Cancel Order">
                                                        <button
                                                            onClick={() => setConfirmCancel(order)}
                                                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </Tooltip>
                                                )}
                                                {order.status === "pending" && (
                                                    <Tooltip content="Confirm Order">
                                                        <button
                                                            onClick={() => handleStatusChange(order.id, "confirmed")}
                                                            className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
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

                {filteredOrders.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No orders found</p>
                    </div>
                )}
            </motion.div>

            {/* View Order Modal */}
            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Order Details"
                size="lg"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Order ID & Status */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Order ID</p>
                                <p className="text-lg font-mono font-semibold text-slate-800 dark:text-white">
                                    #{selectedOrder.id.slice(0, 8).toUpperCase()}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border capitalize ${statusColors[selectedOrder.status]
                                    }`}
                            >
                                {selectedOrder.status.replace("_", " ")}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Customer Information
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Name</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {selectedOrder.userName}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {selectedOrder.userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Schedule
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {selectedOrder.date} at {selectedOrder.time}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Duration: {selectedOrder.duration}
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    Location
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{selectedOrder.location}</p>
                            </div>
                        </div>

                        {/* Service & Cost */}
                        <div className="flex items-center justify-between bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/40 dark:to-teal-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-900/50">
                            <div>
                                <p className="text-xs text-teal-600 dark:text-teal-400">Service</p>
                                <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                                    {selectedOrder.serviceName}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-teal-600 dark:text-teal-400">Total Amount</p>
                                <p className="text-xl font-bold text-teal-800 dark:text-teal-300">
                                    ৳{selectedOrder.totalCost.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Notes */}
                        {selectedOrder.notes && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-900/50">
                                <h4 className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-2">
                                    Customer Notes
                                </h4>
                                <p className="text-sm text-amber-800 dark:text-amber-300">{selectedOrder.notes}</p>
                            </div>
                        )}

                        {/* Actions */}
                        {selectedOrder.status !== "cancelled" && selectedOrder.status !== "completed" && (
                            <div className="flex gap-3 pt-2">
                                {selectedOrder.status === "pending" && (
                                    <Button
                                        onClick={() => {
                                            handleStatusChange(selectedOrder.id, "confirmed");
                                        }}
                                        className="flex-1"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Confirm Order
                                    </Button>
                                )}
                                {selectedOrder.status === "confirmed" && (
                                    <Button
                                        onClick={() => {
                                            handleStatusChange(selectedOrder.id, "in_progress");
                                        }}
                                        className="flex-1"
                                    >
                                        <Truck className="w-4 h-4 mr-2" />
                                        Start Service
                                    </Button>
                                )}
                                {selectedOrder.status === "in_progress" && (
                                    <Button
                                        onClick={() => {
                                            handleStatusChange(selectedOrder.id, "completed");
                                        }}
                                        className="flex-1"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Mark Completed
                                    </Button>
                                )}
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        setConfirmCancel(selectedOrder);
                                    }}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* Cancel Confirmation */}
            <ConfirmDialog
                isOpen={!!confirmCancel}
                onClose={() => setConfirmCancel(null)}
                onConfirm={handleCancelOrder}
                title="Cancel Order"
                message={`Are you sure you want to cancel order #${confirmCancel?.id.slice(0, 8).toUpperCase()}? This action cannot be undone.`}
                confirmText="Cancel Order"
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
