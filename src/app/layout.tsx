import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Care.xyz | Trusted Care Services",
    template: "%s | Care.xyz",
  },
  description:
    "Reliable and trusted care services for children, elderly, and special needs. Book babysitting, elderly care, and special needs support in Bangladesh.",
  keywords: [
    "care services",
    "babysitting",
    "elderly care",
    "special needs care",
    "Bangladesh caregiving",
    "child care",
    "home care",
    "trusted caregivers",
  ],
  authors: [{ name: "Care.xyz Team" }],
  creator: "Care.xyz",
  publisher: "Care.xyz",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://care.xyz",
    siteName: "Care.xyz",
    title: "Care.xyz | Trusted Care Services",
    description:
      "Reliable and trusted care services for children, elderly, and special needs in Bangladesh.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Care.xyz - Trusted Care Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care.xyz | Trusted Care Services",
    description:
      "Reliable and trusted care services for children, elderly, and special needs in Bangladesh.",
    images: [
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  metadataBase: new URL("https://care.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-right" richColors />
      </body>
    </html>
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
