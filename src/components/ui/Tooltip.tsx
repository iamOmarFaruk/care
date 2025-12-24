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
    const [coords, setCoords] = React.useState({ top: 0, left: 0, transform: "" });
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const tooltipRef = React.useRef<HTMLDivElement>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const updatePosition = () => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();

        // Initial positioning logic (same as before) to get a starting point
        let top = 0;
        let left = 0;
        let transform = "";

        switch (position) {
            case "top":
                top = rect.top - 10;
                left = rect.left + rect.width / 2;
                transform = "translate(-50%, -100%)";
                break;
            case "right":
                top = rect.top + rect.height / 2;
                left = rect.right + 10;
                transform = "translate(0, -50%)";
                break;
            case "bottom":
                top = rect.bottom + 10;
                left = rect.left + rect.width / 2;
                transform = "translate(-50%, 0)";
                break;
            case "left":
                top = rect.top + rect.height / 2;
                left = rect.left - 10;
                transform = "translate(-100%, -50%)";
                break;
        }

        setCoords({ top, left, transform });
    };

    const showTooltip = () => {
        updatePosition();
        timeoutRef.current = setTimeout(() => {
            updatePosition();
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

    // Layout effect to clamp position if overflowing
    React.useLayoutEffect(() => {
        if (isVisible && tooltipRef.current) {
            const rect = tooltipRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const padding = 10;

            let newLeft = coords.left;
            let newTop = coords.top;
            let hasChanged = false;

            // Horizontal Clamping
            if (rect.right > viewportWidth - padding) {
                const overflow = rect.right - (viewportWidth - padding);
                newLeft -= overflow;
                hasChanged = true;
            } else if (rect.left < padding) {
                const overflow = padding - rect.left;
                newLeft += overflow;
                hasChanged = true;
            }

            // Vertical Clamping
            if (rect.bottom > viewportHeight - padding) {
                const overflow = rect.bottom - (viewportHeight - padding);
                newTop -= overflow;
                hasChanged = true;
            } else if (rect.top < padding) {
                const overflow = padding - rect.top;
                newTop += overflow;
                hasChanged = true;
            }

            if (hasChanged) {
                setCoords(prev => ({ ...prev, left: newLeft, top: newTop }));
            }
        }
    }, [isVisible, coords.left, coords.top, coords.transform]);

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
                                ref={tooltipRef}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position: "fixed",
                                    top: coords.top,
                                    left: coords.left,
                                    transform: coords.transform,
                                }}
                                className="z-[9999] px-3 py-1.5 text-xs font-medium text-white bg-slate-800 rounded-lg whitespace-nowrap shadow-lg pointer-events-none"
                            >
                                {content}
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
