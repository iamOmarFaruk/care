import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-lg hover:from-teal-800 hover:to-teal-900 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
                outline: "border-2 border-white/80 bg-transparent text-white shadow-md hover:bg-white/20 hover:border-white hover:shadow-lg active:scale-[0.98]",
                secondary: "bg-slate-100 text-slate-900 shadow-md hover:bg-slate-200 hover:shadow-lg active:scale-[0.98]",
                ghost: "hover:bg-slate-100 hover:text-slate-900",
                link: "text-teal-600 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2.5",
                sm: "h-9 rounded-full px-4 py-2 text-xs",
                lg: "h-12 rounded-full px-10 py-3.5",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
