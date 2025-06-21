import { ThemeProvider } from "@/components/atoms/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport = {
    viewportFit: "cover",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    title: "Plane AI",
    description: "Plane AI is a website that allows you to create and share your own plane AI models.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} h-dvh w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex h-full w-full flex-col overflow-hidden">
                        {children}
                    </div>
                    <Toaster richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
