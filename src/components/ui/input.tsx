import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-11 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
