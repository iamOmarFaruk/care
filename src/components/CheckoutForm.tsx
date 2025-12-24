
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

export default function CheckoutForm({ amount, onSuccess, onCancel }: { amount: number, onSuccess: (paymentIntentId: string) => void, onCancel: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: window.location.origin + '/payment-check',
                },
                redirect: "if_required",
            });

            if (error) {
                setErrorMessage(error.message ?? "An unknown error occurred");
                setProcessing(false);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                onSuccess(paymentIntent.id);
            } else {
                setErrorMessage("Payment status: " + (paymentIntent?.status || "unknown"));
                setProcessing(false);
            }
        } catch (e: any) {
            setErrorMessage(e.message || "An error occurred");
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
            <div className="flex gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={processing}
                    className="border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={!stripe || processing} className="bg-teal-600 hover:bg-teal-700 text-white">
                    {processing ? "Processing..." : `Pay ৳${amount}`}
                </Button>
            </div>
        </form>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-25
 * │ Updated: 24-12-25
 * └─ Care ───┘
 */
