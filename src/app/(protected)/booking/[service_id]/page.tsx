"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SERVICES } from "@/lib/mock-data";
import { mockStore } from "@/lib/store";

const DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];
const DISTRICTS = {
    "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
    "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
    "Sylhet": ["Sylhet", "Sunamganj", "Habiganj"],
    "Rajshahi": ["Rajshahi", "Bogra", "Pabna"],
    "Khulna": ["Khulna", "Jessore", "Kushtia"]
};

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const serviceId = params.service_id as string;
    const service = SERVICES.find(s => s.id === serviceId);

    const [duration, setDuration] = useState(1);
    const [division, setDivision] = useState(DIVISIONS[0]);
    const [district, setDistrict] = useState(DISTRICTS["Dhaka"][0]); // Default first district
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Reset district when division changes
        // @ts-ignore
        setDistrict(DISTRICTS[division]?.[0] || "");
    }, [division]);

    if (!service) {
        return <div className="p-8 text-center">Service not found</div>;
    }

    const totalCost = service.pricePerHr * duration;

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate Network
        await new Promise(r => setTimeout(r, 1000));

        mockStore.createBooking({
            serviceId: service.id,
            serviceName: service.title,
            date: new Date().toISOString().split('T')[0], // Today for simplicity
            duration: `${duration} hrs`,
            location: `${address}, ${district}, ${division}`,
            totalCost: totalCost,
        });

        toast.success("Booking confirmed successfully!");
        router.push("/my-bookings");
        setLoading(false);
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Complete Your Booking</h1>
                <p className="text-muted-foreground">You are booking: <span className="font-semibold text-primary">{service.title}</span></p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm md:p-8">
                <form onSubmit={handleBooking} className="space-y-6">

                    {/* Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration">Service Duration (Hours)</Label>
                        <Input
                            type="number"
                            id="duration"
                            min={1}
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                            required
                        />
                        <p className="text-sm text-muted-foreground">Rate: ৳{service.pricePerHr}/hr</p>
                    </div>

                    {/* Location Section */}
                    <div className="space-y-4 rounded-lg bg-muted/30 p-4">
                        <h3 className="font-medium">Service Location</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Division</Label>
                                <Select
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                >
                                    {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>District</Label>
                                <Select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                >
                                    {/* @ts-ignore */}
                                    {DISTRICTS[division]?.map(d => <option key={d} value={d}>{d}</option>)}
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Full Address / Area</Label>
                            <Input
                                id="address"
                                placeholder="House #12, Road #5, Block B"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="flex items-center justify-between rounded-lg border bg-secondary/20 p-4">
                        <span className="font-medium">Total Cost:</span>
                        <span className="text-2xl font-bold text-primary">৳{totalCost}</span>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Confirming..." : "Confirm Booking"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
