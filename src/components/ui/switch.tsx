"use client";

import * as React from "react";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    className?: string;
}

export function Switch({
    checked,
    onCheckedChange,
    disabled = false,
    id,
    className = "",
}: SwitchProps) {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={`
                relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full
                p-0.5 transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2
                focus:ring-offset-white dark:focus:ring-offset-slate-900
                ${checked
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/25"
                    : "bg-slate-300 dark:bg-slate-600"
                }
                ${disabled ? "cursor-not-allowed opacity-50" : "hover:shadow-md"}
                ${className}
            `}
        >
            <span
                className={`
                    inline-block h-6 w-6 rounded-full bg-white shadow-md
                    transition-all duration-300 ease-in-out
                    ${checked ? "translate-x-5" : "translate-x-0"}
                `}
            />
        </button>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 24-12-24
 * │ Updated: 24-12-24
 * └─ care ───┘
 */
