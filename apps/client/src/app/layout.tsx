"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LayoutWrapper } from "@/components/layouts/layout-wrapper";
import { TenantProvider } from "@/components/providers/tenant-provider";
import ReactQueryProvider from "@/components/providers/query-client";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import Favicon from "./Favicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <TenantProvider>
        <html lang='en' className='h-full'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-sidebar h-full`}
          >
            <Toaster />
            <AuthProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem
                disableTransitionOnChange
              >
                <div className='flex flex-col h-full'>
                  <LayoutWrapper>{children}</LayoutWrapper>
                </div>
              </ThemeProvider>
            </AuthProvider>
          </body>
        </html>
      </TenantProvider>
    </ReactQueryProvider>
  );
}
