import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vibecodr - Landing Page",
  description: "Votre future super landing page Vibecodr",
  icons: {
    icon: "/favicon.ico",           // Navigateur classique
    shortcut: "/favicon.ico",       // Alias legacy
    apple: "/apple-touch-icon.png", // Si présent plus tard
    other: [
      { rel: "icon", url: "/icon-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <GoogleTagManager />
        <GoogleAnalytics />
      </head>
      <body className={cn(geistSans.variable, geistMono.variable)} suppressHydrationWarning>
        <GoogleTagManagerNoscript />
        {children}
      </body>
    </html>
  );
}
