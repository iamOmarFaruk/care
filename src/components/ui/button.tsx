import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-[#0d9488] text-white shadow-lg hover:bg-[#115e59] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]",
                destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700",
                outline: "border-2 border-[#0d9488] bg-transparent text-[#0d9488] shadow-md hover:bg-[#0d9488]/10 hover:shadow-lg active:scale-[0.98]",
                secondary: "bg-[#d97706] text-white shadow-md hover:bg-[#92400e] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
                ghost: "hover:bg-slate-100 hover:text-slate-900",
                link: "text-[#0d9488] underline-offset-4 hover:underline",
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
