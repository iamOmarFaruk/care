// tailwind.config.ts
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0d9488", // Teal
                "primary-dark": "#115e59", // Darker teal
                secondary: "#d97706", // Dark golden amber
                "secondary-dark": "#92400e", // Darker amber
            },
        },
    },
    plugins: [],
};

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 2025-12-22
 * │ Updated: 2025-12-22
 * └─ care ───┘
 */
