"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: "light" | "dark";
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = React.useState<Theme>("system");
    const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light");
    const [mounted, setMounted] = React.useState(false);

    // Load theme from localStorage on mount
    React.useEffect(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored && ["light", "dark", "system"].includes(stored)) {
            setThemeState(stored);
        }
        setMounted(true);
    }, []);

    // Update resolved theme and apply to document
    React.useEffect(() => {
        if (!mounted) return;

        const updateTheme = () => {
            const resolved = theme === "system" ? getSystemTheme() : theme;
            setResolvedTheme(resolved);

            const root = document.documentElement;
            root.classList.remove("light", "dark");
            root.classList.add(resolved);
        };

        updateTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                updateTheme();
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, mounted]);

    const setTheme = React.useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    }, []);

    // Prevent flash of incorrect theme
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-24
 * │ Updated: 2025-12-24
 * └─ care ───┘
 */
