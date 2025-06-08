import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aura - Simple Feature Request Management",
  description:
    "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
  keywords: [
    "feature requests",
    "user feedback",
    "product management",
    "voting",
    "prioritization",
  ],
  authors: [{ name: "Aura Team" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Aura - Simple Feature Request Management",
    description:
      "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura - Simple Feature Request Management",
    description:
      "Collect, prioritize, and manage feature requests from your users with Aura's simple, embeddable voting board.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
