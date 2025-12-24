"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    position?: "top" | "right" | "bottom" | "left";
    delay?: number;
}

const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
};

const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent",
};

export function Tooltip({
    children,
    content,
    position = "top",
    delay = 200,
}: TooltipProps) {
    const [isVisible, setIsVisible] = React.useState(false);
    const [coords, setCoords] = React.useState({ top: 0, left: 0 });
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;

        switch (position) {
            case "top":
                top = rect.top - 10; // offset
                left = rect.left + rect.width / 2;
                break;
            case "right":
                top = rect.top + rect.height / 2;
                left = rect.right + 10;
                break;
            case "bottom":
                top = rect.bottom + 10;
                left = rect.left + rect.width / 2;
                break;
            case "left":
                top = rect.top + rect.height / 2;
                left = rect.left - 10;
                break;
        }

        setCoords({ top, left });
    };

    const showTooltip = () => {
        updatePosition();
        timeoutRef.current = setTimeout(() => {
            updatePosition(); // Update again just in case
            setIsVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    return (
        <>
            <div
                ref={triggerRef}
                className="relative inline-flex"
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
            >
                {children}
            </div>
            {isVisible &&
                typeof document !== "undefined" &&
                createPortal(
                    <AnimatePresence>
                        {isVisible && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position: "fixed",
                                    top: coords.top,
                                    left: coords.left,
                                    // Use translate based on position to center/align correctly
                                    transform:
                                        position === "top" ? "translate(-50%, -100%)" :
                                            position === "bottom" ? "translate(-50%, 0)" :
                                                position === "left" ? "translate(-100%, -50%)" :
                                                    "translate(0, -50%)", // right
                                }}
                                className="z-[9999] px-3 py-1.5 text-xs font-medium text-white bg-slate-800 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
                            >
                                {content}
                                <span
                                    className={cn(
                                        "absolute w-0 h-0 border-4",
                                        position === "top" ? "top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent" :
                                            position === "bottom" ? "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent" :
                                                position === "left" ? "left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent" :
                                                    "right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent"
                                    )}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </>
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
